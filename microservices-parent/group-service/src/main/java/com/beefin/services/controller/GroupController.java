package com.been.services.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    public GroupController(GroupService groupService){
        this.groupService = groupService;
    }
    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}