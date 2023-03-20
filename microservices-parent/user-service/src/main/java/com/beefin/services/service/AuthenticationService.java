package com.beefin.services.service;

import com.beefin.services.config.JwtService;
import com.beefin.services.dto.AuthenticationRequest;
import com.beefin.services.dto.AuthenticationResponse;
import com.beefin.services.dto.UserRequest;
import com.beefin.services.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    public static final String COL_NAME = "users";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(UserRequest request) {

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(request.getRoles())
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

                var jwtToken = jwtService.generateToken(user);

                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .build();
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

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
