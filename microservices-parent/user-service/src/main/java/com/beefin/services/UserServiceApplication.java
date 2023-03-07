package com.beefin.services;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) throws IOException {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}