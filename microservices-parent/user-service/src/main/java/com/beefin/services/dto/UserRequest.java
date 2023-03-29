package com.beefin.services.dto;

import com.beefin.services.model.Workout;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<String> roles;
    private float pointsEarned;
    private Workout workoutCompleted;
}
