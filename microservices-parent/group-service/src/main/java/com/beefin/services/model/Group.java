package com.beefin.services.model;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.firestore.annotation.ServerTimestamp;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class Group{
    private String id;
    private String name;
    private String groupLeader;
    private ArrayList<User> leaderBoard = new ArrayList<User>();
    private ArrayList<User> usersInvolved = new ArrayList<User>();

    @ServerTimestamp
    private Date createdAt;
    @ServerTimestamp
    private Date updatedAt;

    public Group (String id,
                  String name,
                  String groupLeader,
                  ArrayList<User> leaderBoard,
                  ArrayList<User>usersInvolved){
        this.id = id;
        this.name = name;
        this.groupLeader = groupLeader;
        this.leaderBoard = leaderBoard;
        this.usersInvolved = usersInvolved
    }
    public ArrayList<User> getUsersInvolved(){
        return this.usersInvolved;
    }

    public ArrayList<User> getLeaderboard() {
        return this.leaderboard;
    }
    public ArrayList<User> getGroupLeader(){
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