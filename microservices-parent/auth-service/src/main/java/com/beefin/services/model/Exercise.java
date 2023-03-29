package com.beefin.services.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Exercise {
    private String id;

    private String name;

    // 0 if it is a compound lift, 1 if it is an accessory movement
    private boolean compoundLift;

    private int numSets;

    private int numRepsPerSet;

    // Average combined weight for the set
    private float averageWeight;
}
