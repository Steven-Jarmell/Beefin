package com.beefin.services.controller;


import com.beefin.services.dto.GroupRequest;
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

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {
    @Autowired
    private final GroupService groupService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<GroupResponse> getGroups(@RequestParam Optional<String> id) {
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

    @PostMapping
    public ResponseEntity<String> createGroup(@RequestBody GroupRequest groupRequest) {
        if (groupRequest.getGroupLeaderID() == null || groupRequest.getName() == null) {
            return new ResponseEntity<String>("Bad Request", HttpStatus.BAD_REQUEST);
        }

        HttpStatus response = groupService.createGroup(groupRequest);

        return new ResponseEntity<String>("Group Created", response);
    }

    @PutMapping
    public ResponseEntity<String> updateGroup(@RequestBody GroupRequest groupRequest) {
        if (groupRequest.getId() == null) {
            return new ResponseEntity<>("Did not specify group ID in update", HttpStatus.BAD_REQUEST);
        }

        HttpStatus code = groupService.updateGroup(groupRequest);

        if (code == HttpStatus.OK) {
            return new ResponseEntity<String>("Group was updated successfully", code);
        } else if (code == HttpStatus.BAD_REQUEST){
            return new ResponseEntity<String>("Group Does not Exist", code);
        } else {
            return new ResponseEntity<String>("Unexpected error occurred while updating", code);
        }
    }

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