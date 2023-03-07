package com.beefin.services.controller;

import com.beefin.services.dto.UserRequest;
import com.beefin.services.dto.UserResponse;
import com.beefin.services.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public String createUser(@RequestBody UserRequest userRequest) throws ExecutionException, InterruptedException {
        return userService.createUser(userRequest);
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public List<UserResponse> getAllUsers() throws ExecutionException, InterruptedException {
        return userService.getAllUsers();
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public String updateUser(@RequestBody UserRequest userRequest) throws ExecutionException, InterruptedException {
        return userService.update(userRequest);
    }

    @DeleteMapping
    @ResponseStatus(code = HttpStatus.OK)
    public String deleteUser(@RequestParam String userID) throws ExecutionException, InterruptedException {
        return userService.deleteUser(userID);
    }
}
