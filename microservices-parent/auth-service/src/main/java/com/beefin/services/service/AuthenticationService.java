package com.beefin.services.service;

import com.beefin.services.config.EmailDetails;
import com.beefin.services.config.EmailService;
import com.beefin.services.config.JwtService;
import com.beefin.services.dto.AuthenticationRequest;
import com.beefin.services.dto.AuthenticationResponse;
import com.beefin.services.dto.UserRequest;
import com.beefin.services.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    public static final String COL_NAME = "users";

    @Value("${SECRET_KEY}")
    private String SECRET_KEY;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(UserRequest request) {

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(request.getRoles())
                .isVerified(false)
                .pointsEarned(0F)
                .workoutsCompleted(new ArrayList<>())
                .friendsList(new ArrayList<>())
                .groupsList(new ArrayList<>())
                .build();

        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously check if user already exists in the database
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).whereEqualTo("email", request.getEmail()).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            boolean duplicate = documents.isEmpty();

            if (!duplicate) {
                return null;
            } else {
                // If they don't exist, add them and return CREATED
                ApiFuture<DocumentReference> addedDocRef = db.collection(COL_NAME).add(user);

                EmailDetails details = EmailDetails.builder()
                        .recipient(user.getEmail())
                        .subject("DO NOT REPLY - Verify Account")
                        .msgBody("Click this link to verify your account: \n" +
                                "http://localhost:8080/api/auth/verify?id=" + addedDocRef.get().getId())
                        .build();

                emailService.sendSimpleMail(details);

                return new AuthenticationResponse();

                /*

                var jwtToken = jwtService.generateToken(user);

                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();
                 */
            }
            // If there's any unexpected error, print the stack trace and return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        // If we get here, the user is authenticated
        // Generate token and send it back

        User user;

        try {
            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> future = db.collection("users").whereEqualTo("email", request.getEmail()).get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            QueryDocumentSnapshot userDocument = documents.get(0);

            user = userDocument.toObject(User.class);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        // Check if user is verified or not
        if (!user.getIsVerified()) {
            return null;
        }

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public void verifyUser(String id) {
        // Get user from database
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Ensure the user exists
            DocumentReference docRef = db.collection(COL_NAME).document(id);
            // asynchronously retrieve the document
            ApiFuture<DocumentSnapshot> future = docRef.get();
            // block on response
            DocumentSnapshot document = future.get();

            // If it does not exist, return
            if (!document.exists()) {
                return;
            }

            Map<String, Object> updates = new HashMap<>();
            updates.put("isVerified", true);

            ApiFuture<WriteResult> collectionsApiFuture = db.collection(COL_NAME)
                    .document(id)
                    .update(updates);

            collectionsApiFuture.get();

            // Update was successful

        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
    }
}
