package com.beefin.services.controller;


import com.beefin.services.dto.GroupResponse;
import com.beefin.services.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {
    @Autowired
    private final GroupService groupService;


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<GroupResponse> getGroups(@RequestParam Optional<String> id) throws ExecutionException, InterruptedException {
        if (id.isPresent()) {
            List<GroupResponse> group = groupService.getGroup(id.get());

            if (group == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group does not exist");



            }else{
                return group;
            }
        }else {
            List<GroupResponse> allGroups = groupService.getAllGroups();

            if (allGroups == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unexpected error occured while getting groups");
            } else {
                return allGroups;
            }
        }
    }

    //write update group method

    @DeleteMapping
    public ResponseEntity<String> deleteGroup(@RequestParam String groupID){
        if(groupID == null){
            return new ResponseEntity<String>("All groupID required", HttpStatus.BAD_REQUEST);
        }
        HttpStatus code = groupService.deleteGroup(groupID);

        if(code == HttpStatus.OK){
            return new ResponseEntity<String>("Group was deleted successfully", code);
        }else{
            return new ResponseEntity<String>("unexpected error occured while deleting or group does not exist", code);
        }
    }
}