package com.beefin.services.service;

import java.util.*;

import com.beefin.services.dto.GroupRequest;
import com.beefin.services.dto.GroupResponse;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;
import com.beefin.services.model.Group;

@Service
public class GroupService{
    public static final String COL_NAME = "groups";





    public List<GroupResponse> getAllGroups(){
        try{
            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> future =db.collection(COL_NAME).get();

            List<QueryDocumentSnapshot>groupsFromDB = future.get().getDocuments();

            List<GroupResponse> convertedGroups = new ArrayList<>(groupsFromDB.size());

            for(QueryDocumentSnapshot group: groupsFromDB){
                convertedGroups.add(mapToGroupResponse(group.getId(), group.toObject(Group.class)));
            }
            return convertedGroups;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }


    public HttpStatus deleteGroup(String groupID){
        try{
            Firestore db = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> deleteResult = db.collection(COL_NAME).document(groupID).delete();

            return HttpStatus.OK;
        }catch(Exception e){
            e.printStackTrace();
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    //still need to write the update function

    private GroupResponse mapToGroupResponse(String id, Group group){
        return new GroupResponse(group.getId(), group.getName(), group.getGroupLeader(), group.getLeaderboard(), group.getUsersInvolved());
    }

    public HttpStatus createGroup(GroupRequest groupData){


                try{
                    Firestore db = FirestoreClient.getFirestore();

                    ApiFuture<QuerySnapshot> future = db.collection(COL_NAME).whereEqualTo("name", groupData.getName()).get();

                    List<QueryDocumentSnapshot>documents = future.get().getDocuments();

                    boolean duplicate = documents.isEmpty();

                    if(!duplicate){
                        return null;
                    }else{
                        ApiFuture<DocumentReference> addedDocRef = db.collection(COL_NAME).add(groupData);
                        return HttpStatus.OK;
                    }
                }catch(Exception e){
                    e.printStackTrace();
                    return null;
                }
    }

    public List<GroupResponse> getGroup(String groupID){
        try{
            Firestore db = FirestoreClient.getFirestore();

            DocumentReference docRef = db.collection(COL_NAME).document(groupID);

            ApiFuture<DocumentSnapshot>future = docRef.get();

            DocumentSnapshot document =future.get();

            if(document.exists()){
                GroupResponse group = mapToGroupResponse(document.getId(), document.toObject(Group.class));

                List<GroupResponse> list = new ArrayList<>(1);
                list.add(group);
                return list;
            }else {
                return null;
            }
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

}