package com.beefin.services.config;

import com.beefin.services.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request, // Intercept every request and provide new data within response
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain // Chain of responsibility containing list of filters we need to execute
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Check if there is an authorization header that is JWT
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract jwt from the header
        jwt = authHeader.substring(7);

        // Extract user email from jwt
        userEmail = jwtService.extractUsername(jwt);

        // When getAuthentication() returns null, it means the user is not authenticated yet
        // Get user details from database, check if the user is valid or not, and if they are, authenticate them
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Get the user from the database

            UserDetails userDetails = null;

            try {
                Firestore db = FirestoreClient.getFirestore();

                ApiFuture<QuerySnapshot> future = db.collection("users").whereEqualTo("email", userEmail).get();

                List<QueryDocumentSnapshot> documents = future.get().getDocuments();

                QueryDocumentSnapshot userDocument = documents.get(0);

                userDetails = userDocument.toObject(User.class);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    // Update the SecurityContextHolder
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    filterChain.doFilter(request, response);
                }
            } catch (Exception e) {
                e.printStackTrace();
                filterChain.doFilter(request, response);
            }
            return;
        }
    }
}
