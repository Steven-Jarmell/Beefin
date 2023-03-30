package com.beefin.services.controller;

import com.beefin.services.dto.AuthenticationRequest;
import com.beefin.services.dto.AuthenticationResponse;
import com.beefin.services.dto.UserRequest;
import com.beefin.services.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> createUser(@RequestBody UserRequest userRequest) throws ExecutionException, InterruptedException {
        if ( userRequest.getEmail() == null || userRequest.getPassword() == null || userRequest.getFirstName() == null || userRequest.getLastName() == null) {
            return new ResponseEntity<AuthenticationResponse>(new AuthenticationResponse(), HttpStatus.BAD_REQUEST);
        }

        AuthenticationResponse response = authenticationService.register(userRequest);

        if (response == null) {
            return new ResponseEntity<AuthenticationResponse>((AuthenticationResponse) null, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<AuthenticationResponse>(response, HttpStatus.OK);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.authenticate(request);

        // If the user is unverified or there was a server error, it might have returned null
        if (response == null ) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        authenticationService.validateToken(token);
        return "Token is valid";
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("id") String id) {
        authenticationService.verifyUser(id);
        return ResponseEntity.ok("Verified, you may now log in");
    }
}
