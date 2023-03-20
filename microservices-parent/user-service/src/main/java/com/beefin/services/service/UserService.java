/**
 * UserService class to implement CRUD Operations.
 * Used in UserController class
 *
 * @author Steven Jarmell
 * @version 1.0.0
 */
package com.beefin.services.service;

import com.beefin.services.dto.UserRequest;
import com.beefin.services.dto.UserResponse;
import com.beefin.services.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    public static final String COL_NAME = "users";

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Create Operation on User Entity
     * @param userData UserRequest object containing the data from the request
     * @return CONFLICT if duplicate exists, CREATED if successfully created, and INTERNAL_SERVER_ERROR if unexpected error
     */
    public User createUser(UserRequest userData) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously check if user already exists in the database
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).whereEqualTo("email", userData.getEmail()).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            boolean duplicate = documents.isEmpty();

            // If user exists return CONFLICT
            if (!duplicate) {
                //return HttpStatus.CONFLICT;
                return null;
            } else {
                // If they don't exist, add them and return CREATED
                userData.setPassword(passwordEncoder.encode(userData.getPassword()));
                ApiFuture<DocumentReference> addedDocRef = db.collection(COL_NAME).add(userData);

                // Definitely a better way to do this
                String addedDocId = addedDocRef.get().getId();

                DocumentReference docRef = db.collection(COL_NAME).document(addedDocId);

                ApiFuture<DocumentSnapshot> newFuture = docRef.get();

                DocumentSnapshot document = newFuture.get();

                return document.toObject(User.class);
                //return HttpStatus.CREATED;
            }
        // If there's any unexpected error, print the stack trace and return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Read Operation on User Entity
     * @return All users in the database
     */
    public List<UserResponse> getAllUsers() {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously retrieve all documents
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> usersFromDB = future.get().getDocuments();

            // Make a new ArrayList of the same size as the number of users
            List<UserResponse> convertedUsers = new ArrayList<>(usersFromDB.size());

            // For each user pulled from the database, turn them back into a User object
            for (QueryDocumentSnapshot user : usersFromDB) {
                convertedUsers.add(mapToUserResponse(user.getId(), user.toObject(User.class)));
            }

            // Convert the user objects to the UserResponse object
            return convertedUsers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Helper method to map the User objects from the database to the UserResponse objects
     * @param user User from the database
     * @return A UserResponse object representing that user
     */
    private UserResponse mapToUserResponse (String userID, User user) {
        return UserResponse.builder()
                .id(userID)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .roles(user.getRoles())
                .build();
    }

    /**
     * Update Operation on User Entity
     * @param userData User to be updated
     * @return String representing the timestamp of when the user was created
     */
    public HttpStatus update(UserRequest userData) {
        try{
            Firestore db = FirestoreClient.getFirestore();

            // Ensure the user exists
            DocumentReference docRef = db.collection(COL_NAME).document(userData.getId());
            // asynchronously retrieve the document
            ApiFuture<DocumentSnapshot> future = docRef.get();
            // block on response
            DocumentSnapshot document = future.get();

            // If it does not exist, return BAD_REQUEST
            if (!document.exists()) {
                return HttpStatus.BAD_REQUEST;
            }

            // Ensure the email won't conflict with another user's email
            // Asynchronously check if user with new email already exists in the database
            if (userData.getEmail() != null) {
                ApiFuture<QuerySnapshot> duplicateUser = db.collection(COL_NAME).whereEqualTo("email", userData.getEmail()).get();

                // future.get() blocks on response
                List<QueryDocumentSnapshot> documents = duplicateUser.get().getDocuments();

                boolean conflict = documents.isEmpty();

                // If the email they try to update to already exists, return BAD_REQUEST
                if (!conflict) {
                    return HttpStatus.BAD_REQUEST;
                }

            }

            Map<String, Object> updatedUser = new HashMap<>();

            if (userData.getFirstName() != null) updatedUser.put("firstName", userData.getFirstName());
            if (userData.getLastName() != null) updatedUser.put("lastName", userData.getLastName());
            if (userData.getEmail() != null) updatedUser.put("email", userData.getEmail());
            if (userData.getPassword() != null) updatedUser.put("password", passwordEncoder.encode(userData.getPassword()));
            if (userData.getRoles() != null) updatedUser.put("roles", userData.getRoles());

            // Get the user and update the attributes that have changed
            ApiFuture<WriteResult> collectionsApiFuture = db.collection(COL_NAME)
                    .document(userData.getId())
                    .update(updatedUser);

            // Ideally would want to check to make sure the update was successful, but the documentation is hard to find
            return HttpStatus.OK;
        // If there is any exception, throw an internal server error
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * Delete Operation on User Entity
     * @param userID ID of user to be deleted
     * @return String stating that the User was deleted
     */
    public HttpStatus deleteUser(String userID) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Get the document and delete it
            ApiFuture<WriteResult> deleteResult = db.collection(COL_NAME)
                    .document(userID)
                    .delete();

            return HttpStatus.OK;
        // If there is any error, return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    /**
     * Method to get a single user from the database
     * @param userID the ID of the user to retrieve
     * @return ArrayList of size 1 with the User retrieved
     */
    public List<UserResponse> getUser(String userID) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document(userID);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            if (document.exists()) {
                UserResponse user = mapToUserResponse(document.getId(), document.toObject(User.class));

                List<UserResponse> list = new ArrayList<>(1);
                list.add(user);

                return list;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}