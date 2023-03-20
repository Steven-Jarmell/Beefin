package com.been.services.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroupController {

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}