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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.stream.Stream;

@Service
public class UserService {

    public static final String COL_NAME = "users";

    /**
     * Create Operation on User Entity
     * @param userData UserRequest object containing the data from the request
     * @return CONFLICT if duplicate exists, CREATED if successfully created, and INTERNAL_SERVER_ERROR if unexpected error
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public HttpStatus createUser(UserRequest userData) throws ExecutionException, InterruptedException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Check if user already exists in the database
            DocumentReference docRef = db.collection(COL_NAME).document(userData.getEmail());

            ApiFuture<DocumentSnapshot> future = docRef.get();

            boolean duplicate = future.get().exists();

            // If user exists return CONFLICT
            if (duplicate) {
                return HttpStatus.CONFLICT;
            } else {
                // If they don't exist, add them and return CREATED
                ApiFuture<DocumentReference> addedDocRef = db.collection(COL_NAME).add(userData);
                return HttpStatus.CREATED;
            }
        // If there's any unexpected error, print the stack trace and return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * Read Operation on User Entity
     * @return All users in the database
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public List<UserResponse> getAllUsers() throws ExecutionException, InterruptedException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously retrieve all documents
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> usersFromDB = future.get().getDocuments();

            // Make a new ArrayList of the same size as the number of users
            List<User> convertedUsers = new ArrayList(usersFromDB.size());

            // For each user pulled from the database, turn them back into a User object
            for (QueryDocumentSnapshot user : usersFromDB) {
                convertedUsers.add(user.toObject(User.class));
            }

            // Convert the user objects to the UserResponse object
            return convertedUsers.stream().map(this::mapToUserResponse).toList();
        } catch (Exception e) {
            return null;
        }
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
    public HttpStatus update(UserRequest userData) throws ExecutionException, InterruptedException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Get the user and update the attributes that have changed
            ApiFuture<WriteResult> collectionsApiFuture = db.collection(COL_NAME)
                    .document(userData.getId())
                    .set(userData);

            return HttpStatus.OK;
        // If there is any exception, throw an internal server error
        } catch (Exception e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * Delete Operation on User Entity
     * @param userID ID of user to be deleted
     * @return String stating that the User was deleted
     */
    public HttpStatus deleteUser(String userID) throws ExecutionException, InterruptedException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Get the document and delete it
            ApiFuture<WriteResult> deleteResult = db.collection(COL_NAME)
                    .document(userID)
                    .delete();

            // If delete goes through, return OK
            if (deleteResult.isDone()) {
                return HttpStatus.OK;
            } else {
            // Make sure the request deleting was valid aswell
                return HttpStatus.BAD_REQUEST;
            }
        // If there is any error, return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public UserResponse getUser(String userID) throws ExecutionException, InterruptedException {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document(userID);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            if (document.exists()) {
                return mapToUserResponse(document.toObject(User.class));
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
