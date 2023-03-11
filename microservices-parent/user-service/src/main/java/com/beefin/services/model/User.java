package com.beefin.services.model;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.firestore.annotation.ServerTimestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data // Bundles features of toString, getter/setter, RequiredArgsConstructor
@NoArgsConstructor // Generates a constructor with no parameters
@AllArgsConstructor // Generates a constructor with all parameters
@Builder // Lets you produce code to have your class instantiable
public class User {
    private String id;
    private String name;
    private String email;
    private String password;
    private boolean isVerified;
    @ServerTimestamp
    private Date createdAt;
    @ServerTimestamp
    private Date updatedAt;
}
