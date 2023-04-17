package com.beefin.services.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Workout {
    private Date workoutDate;
    private List<Exercise> exerciseList;
}
