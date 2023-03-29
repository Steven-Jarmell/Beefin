package com.beefin.services.model;

import com.google.cloud.firestore.annotation.ServerTimestamp;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data // Bundles features of toString, getter/setter, RequiredArgsConstructor
@NoArgsConstructor // Generates a constructor with no parameters
@AllArgsConstructor // Generates a constructor with all parameters
@Builder // Lets you produce code to have your class instantiable
public class User {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private List<String> roles;

    private boolean isVerified = true;

    private float pointsEarned;

    private List<Workout> workoutsCompleted;

    @ServerTimestamp
    private Date createdAt;

    @ServerTimestamp
    private Date updatedAt;

}
