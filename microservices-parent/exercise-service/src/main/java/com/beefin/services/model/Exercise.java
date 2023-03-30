package com.beefin.services.model;

import com.google.cloud.firestore.annotation.ServerTimestamp;
import lombok.*;

import java.util.Date;

@Data // Bundles features of toString, getter/setter, RequiredArgsConstructor
@NoArgsConstructor // Generates a constructor with no parameters
@AllArgsConstructor // Generates a constructor with all parameters
@Builder // Lets you produce code to have your class instantiable
public class Exercise {

    // Created by the database
    private String id;

    private String name;

    // 0 if it is a compound lift, 1 if it is an accessory movement
    private boolean compoundLift;

    @ServerTimestamp
    private Date createdAt;

    @ServerTimestamp
    private Date updatedAt;

}
