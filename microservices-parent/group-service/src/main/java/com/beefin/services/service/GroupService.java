package com.beefin.services.service;

import java.util.*;

import com.beefin.services.dto.GroupRequest;
import com.beefin.services.dto.GroupResponse;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;
import com.beefin.services.model.Group;

@Service
public class GroupService{
    public static final String COL_NAME = "groups";

    public List<GroupResponse> getAllGroups(){
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Asynchronously retrieve all documents
            ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).get();

            // future.get() blocks on response
            List<QueryDocumentSnapshot> groupsFromDB = future.get().getDocuments();

            // Make a new ArrayList of the same size as the number of groups
            List<GroupResponse> convertedGroups = new ArrayList<>(groupsFromDB.size());

            // For each group pulled from the database, turn them back into a Group object
            for (QueryDocumentSnapshot group : groupsFromDB) {
                convertedGroups.add(mapToGroupResponse(group.getId(), group.toObject(Group.class)));
            }
            // Convert the group objects to the GroupResponse object
            return convertedGroups;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public HttpStatus deleteGroup(String groupID){
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Get the document and delete it
            ApiFuture<WriteResult> deleteResult = db.collection(COL_NAME)
                    .document(groupID)
                    .delete();

            return HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private GroupResponse mapToGroupResponse(String id, Group group){
        return GroupResponse.builder()
                .groupMembers(group.getGroupMembers())
                .groupLeaderID(group.getGroupLeaderID())
                .id(id)
                .name(group.getName())
                .build();
    }

    public List<GroupResponse> getGroup(String groupID){
        try {
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document(groupID);

            ApiFuture<DocumentSnapshot> future = docRef.get();

            DocumentSnapshot document = future.get();

            if (document.exists()) {
                GroupResponse group = mapToGroupResponse(document.getId(), document.toObject(Group.class));

                List<GroupResponse> list = new ArrayList<>(1);
                list.add(group);

                return list;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String createGroup(GroupRequest groupRequest) {
        ArrayList<String> initialGroupList = new ArrayList<>();
        initialGroupList.add(groupRequest.getGroupLeaderID());

        Group newGroup = Group.builder()
                .name(groupRequest.getName())
                .groupLeaderID(groupRequest.getGroupLeaderID())
                .groupMembers(initialGroupList)
                .build();

        try {
            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<DocumentReference> addedDocRef = db.collection(COL_NAME).add(newGroup);

            // Block until the doc is added
            //addedDocRef.get()

            return addedDocRef.get().getId();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public HttpStatus updateGroup(GroupRequest groupRequest) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Ensure the user exists
            DocumentReference docRef = db.collection(COL_NAME).document(groupRequest.getId());
            // asynchronously retrieve the document
            ApiFuture<DocumentSnapshot> future = docRef.get();
            // block on response
            DocumentSnapshot document = future.get();

            // If it does not exist, return BAD_REQUEST
            if (!document.exists()) {
                return HttpStatus.BAD_REQUEST;
            }

            Map<String, Object> updatedGroup = new HashMap<>();

            if (groupRequest.getName() != null) updatedGroup.put("name", groupRequest.getName());
            if (groupRequest.getGroupLeaderID() != null) updatedGroup.put("groupLeaderID", groupRequest.getGroupLeaderID());

            // Get the user and update the attributes that have changed
            ApiFuture<WriteResult> collectionsApiFuture = db.collection(COL_NAME)
                    .document(groupRequest.getId())
                    .update(updatedGroup);

            // Confirm that data has been successfully saved by blocking on the operation
            collectionsApiFuture.get();

            // If we are adding a member of the group, append to the list
            if (groupRequest.getNewGroupMember() != null) {
                db.collection(COL_NAME)
                        .document(groupRequest.getId())
                        .update("groupMembers", FieldValue.arrayUnion(groupRequest.getNewGroupMember()));
            }

            return HttpStatus.OK;

        } catch (Exception e) {
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}