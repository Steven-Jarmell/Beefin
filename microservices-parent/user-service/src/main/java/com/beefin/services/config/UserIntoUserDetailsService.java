package com.beefin.services.config;

import com.beefin.services.dto.UserResponse;
import com.beefin.services.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserIntoUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> duplicateUser = db.collection("users").whereEqualTo("email", userEmail).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> document = duplicateUser.get().getDocuments();

            Optional<UserResponse> user = Optional.of(document.get(0).toObject(UserResponse.class));

            return user.map(User::new)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
