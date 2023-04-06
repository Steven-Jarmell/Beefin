package com.beefin.services.model;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.firestore.annotation.ServerTimestamp;
import jdk.jfr.DataAmount;
import lombok.*;


import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@Builder

public class Group{
    private String id;
    private String name;
    private User groupLeader;
    private ArrayList<User> leaderBoard = new ArrayList<User>();
    private ArrayList<User> usersInvolved = new ArrayList<User>();

    @ServerTimestamp
    private Date createdAt;
    @ServerTimestamp
    private Date updatedAt;

    public Group (String id,
                  String name,
                  User groupLeader,
                  ArrayList<User> leaderBoard,
                  ArrayList<User>usersInvolved){
        this.id = id;
        this.name = name;
        this.groupLeader = groupLeader;
        this.leaderBoard = leaderBoard;
        this.usersInvolved = usersInvolved;
    }
    public ArrayList<User> getUsersInvolved(){
        return this.usersInvolved;
    }
    public String getId(){
        return this.id;
    }
    public ArrayList<User> getLeaderboard() {
        return this.leaderBoard;
    }
    public User getGroupLeader(){
        return this.groupLeader;
    }
    public void setLeaderboard(ArrayList<User> leaderBoard){
        this.leaderBoard = leaderBoard;
    }
    public void renameGroup(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setUsersInvolved(ArrayList<User> usersInvolved){
        this.usersInvolved = usersInvolved;
    }
    private void setGroupLeader(User groupLeader){
        this.groupLeader = groupLeader;
    }
}