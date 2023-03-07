package com.beefin.services.service;
/**
 * UserService class to implement CRUD Operations.
 * Used in UserController class
 *
 * @author Steven Jarmell
 * @version 1.0.0
 */

import com.beefin.services.dto.UserRequest;
import com.beefin.services.dto.UserResponse;
import com.beefin.services.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    public static final String COL_NAME = "users";

    /**
     * Create Operation on User Entity
     * @param userData UserRequest object containing the data from the request
     * @return String with Firebase generated UserID
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public String createUser(UserRequest userData) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<DocumentReference> addedDocRef  = db.collection(COL_NAME).add(userData);
        return "Added document with ID: " + addedDocRef.get().getId();
    }

    /**
     * Read Operation on User Entity
     * @return All users in the database
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public List<UserResponse> getAllUsers() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        // Asynchronously retrieve all documents
        ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).get();

        List<QueryDocumentSnapshot> usersFromDB = future.get().getDocuments();
        List<User> convertedUsers = new ArrayList(usersFromDB.size());

        for (QueryDocumentSnapshot user : usersFromDB) {
            convertedUsers.add(user.toObject(User.class));
        }

        return convertedUsers.stream().map(this::mapToUserResponse).toList();
    }

    /**
     * Helper method to map the User objects from the database to the UserResponse objects
     * @param user User from the database
     * @return A UserResponse object representing that user
     */
    private UserResponse mapToUserResponse (User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

    /**
     * Update Operation on User Entity
     * @param userData User to be updated
     * @return String representing the timestamp of when the user was created
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public String update(UserRequest userData) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = db.collection(COL_NAME).document(userData.getName()).set(userData);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    /**
     * Delete Operaiton on User Entity
     * @param userID ID of user to be deleted
     * @return String stating that the User was deleted
     */
    public String deleteUser(String userID) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> deleteResult = db.collection(COL_NAME).document(userID).delete();
        return "User with id " + userID + " deleted";
    }
}
