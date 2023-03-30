package com.beefin.services.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class Workout {
    private Date workoutDate;
    private List<Exercise> exerciseList;
}
