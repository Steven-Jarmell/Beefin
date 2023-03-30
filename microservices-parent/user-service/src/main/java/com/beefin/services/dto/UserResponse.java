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
public class UserResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<String> roles;
    private Float pointsEarned;
    private List<Workout> workoutsCompleted;
    private List<String> friendsList;
    private List<String> groupsList;
}
