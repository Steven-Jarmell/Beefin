package com.beefin.services.controller;

import com.beefin.services.dto.ExerciseRequest;
import com.beefin.services.dto.ExerciseResponse;
import com.beefin.services.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    @Autowired
    private final ExerciseService exerciseService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ExerciseResponse> getExercises(@RequestParam Optional<String> id) {
        // If a GET request is made with an id provided, only get that exercise if they exist
        if (id.isPresent()) {
            List<ExerciseResponse> exercise = exerciseService.getExercise(id.get());

            if (exercise == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exercise does not exist");
            } else {
                return exercise;
            }
        } else {
            List<ExerciseResponse> allExercises = exerciseService.getAllExercises();

            if (allExercises == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unexpected error occurred while getting exercises");
            } else {
                return allExercises;
            }
        }
    }

    @PostMapping ResponseEntity<String> createExercise(@RequestBody ExerciseRequest exerciseRequest) {
        if (exerciseRequest.getName() == null) {
            return new ResponseEntity<String>("Invalid arguments to create exercise", HttpStatus.BAD_REQUEST);
        }

        HttpStatus code = exerciseService.createExercise(exerciseRequest);

        if (code == HttpStatus.OK) {
            return new ResponseEntity<String>("Exercise was created successfully", code);
        } else {
            return new ResponseEntity<String>("Unexpected error occurred while updating", code);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateExercise(@RequestBody ExerciseRequest exerciseRequest)  {
        if (exerciseRequest.getId() == null) {
            return new ResponseEntity<String>("Did not specify exercise ID in update", HttpStatus.BAD_REQUEST);
        }

        HttpStatus code = exerciseService.update(exerciseRequest);

        if (code == HttpStatus.OK) {
            return new ResponseEntity<String>("Exercise was updated successfully", code);
        } else if (code == HttpStatus.BAD_REQUEST){
            return new ResponseEntity<String>("Exercise does not exist", code);
        } else {
            return new ResponseEntity<String>("Unexpected error occurred while updating", code);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteExercise(@RequestParam String exerciseID) {
        if (exerciseID == null) {
            return new ResponseEntity<String>("Exercise ID required", HttpStatus.BAD_REQUEST);
        }

        HttpStatus code = exerciseService.deleteExercise(exerciseID);

        if (code == HttpStatus.OK) {
            return new ResponseEntity<String>("Exercise was deleted successfully", code);
        } else {
            return new ResponseEntity<String>("Unexpected error occurred while deleting or exercise does not exist", code);
        }
    }
}
