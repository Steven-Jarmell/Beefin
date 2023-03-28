package com.beefin.services.service;

import com.beefin.services.dto.ExerciseRequest;
import com.beefin.services.dto.ExerciseResponse;
import com.beefin.services.model.Exercise;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExerciseService {

    public static final String COL_NAME = "exercises";

    public List<ExerciseResponse> getExercise(String exerciseID) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document(exerciseID);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            if (document.exists()) {
                ExerciseResponse exercise = mapToExerciseResponse(document.getId(), document.toObject(Exercise.class));

                List<ExerciseResponse> list = new ArrayList<>(1);
                list.add(exercise);

                return list;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<ExerciseResponse> getAllExercises() {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously retrieve all documents
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).get();


            // future.get() blocks on response
            List<QueryDocumentSnapshot> exercisesFromDB = future.get().getDocuments();

            List<ExerciseResponse> convertedExercises = new ArrayList<>(exercisesFromDB.size());

            for (QueryDocumentSnapshot exercise : exercisesFromDB) {
                convertedExercises.add(mapToExerciseResponse(exercise.getId(), exercise.toObject(Exercise.class)));
            }

            return convertedExercises;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private ExerciseResponse mapToExerciseResponse(String id, Exercise exercise) {
        return ExerciseResponse.builder()
                .id(id)
                .name(exercise.getName())
                .compoundLift(exercise.isCompoundLift())
                .build();
    }

    public HttpStatus update(ExerciseRequest exerciseRequest) {
        try{
            Firestore db = FirestoreClient.getFirestore();

            // Ensure the exercise exists
            DocumentReference docRef = db.collection(COL_NAME).document(exerciseRequest.getId());
            // asynchronously retrieve the document
            ApiFuture<DocumentSnapshot> future = docRef.get();
            // block on response
            DocumentSnapshot document = future.get();

            // If it does not exist, return BAD_REQUEST
            if (!document.exists()) {
                return HttpStatus.BAD_REQUEST;
            }

            // Ensure the name won't conflict
            if (exerciseRequest.getName() != null) {
                ApiFuture<QuerySnapshot> duplicateUser = db.collection(COL_NAME).whereEqualTo("name", exerciseRequest.getName()).get();

                // future.get() blocks on response
                List<QueryDocumentSnapshot> documents = duplicateUser.get().getDocuments();

                boolean conflict = documents.isEmpty();

                // If the email they try to update to already exists, return BAD_REQUEST
                if (!conflict) {
                    return HttpStatus.BAD_REQUEST;
                }

            }

            Map<String, Object> updatedExercise = new HashMap<>();

            if (exerciseRequest.getName() != null) updatedExercise.put("name", exerciseRequest.getName());
            if (exerciseRequest != null) updatedExercise.put("compoundLift", exerciseRequest.isCompoundLift());

            // Get the user and update the attributes that have changed
            ApiFuture<WriteResult> collectionsApiFuture = db.collection(COL_NAME)
                    .document(exerciseRequest.getId())
                    .update(updatedExercise);

            // Ideally would want to check to make sure the update was successful, but the documentation is hard to find
            return HttpStatus.OK;
            // If there is any exception, throw an internal server error
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public HttpStatus deleteExercise(String exerciseID) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Get the document and delete it
            ApiFuture<WriteResult> deleteResult = db.collection(COL_NAME)
                    .document(exerciseID)
                    .delete();

            return HttpStatus.OK;
            // If there is any error, return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public HttpStatus createExercise(ExerciseRequest exerciseRequest) {
        Exercise exercise = Exercise.builder()
                .name(exerciseRequest.getName())
                .compoundLift(exerciseRequest.isCompoundLift())
                .build();

        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously check if exercise already exists in the database
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).whereEqualTo("name", exerciseRequest.getName()).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            boolean duplicate = documents.isEmpty();

            if (!duplicate) {
                return null;
            } else {
                // If they don't exist, add them and return CREATED
                ApiFuture<DocumentReference> addedDocRef = db.collection(COL_NAME).add(exercise);

                return HttpStatus.OK;
            }
            // If there's any unexpected error, print the stack trace and return INTERNAL_SERVER_ERROR
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
