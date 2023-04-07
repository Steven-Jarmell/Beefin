package com.beefin.services.dto;
import com.beefin.services.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupRequest {
    private String id;
    private String name;
    private User groupLeader;
    private ArrayList<User> leaderBoard = new ArrayList<User>();
    private ArrayList<User> usersInvolved = new ArrayList<User>();
}
