package com.beefin.services.service;

import java.util.*;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.beefin.services.model.Group;

@Service
public class GroupService{
    public static final String COL_NAME = "groups";

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Group createGroup(){

    }
}