package com.beefin.services.config;

import com.beefin.services.dto.UserResponse;
import com.beefin.services.model.User;
import com.beefin.services.service.UserService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserIntoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> duplicateUser = db.collection("users").whereEqualTo("email", userId).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> document = duplicateUser.get().getDocuments();

            Optional<UserResponse> user = Optional.of(document.get(0).toObject(UserResponse.class));

            return user.map(UserInfoUserDetails::new)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
