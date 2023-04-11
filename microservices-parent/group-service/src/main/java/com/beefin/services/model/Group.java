package com.beefin.services.model;

import com.google.cloud.firestore.annotation.ServerTimestamp;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Group{
    private String id;
    private String name;
    private String groupLeaderID;
    private List<String> groupMembers;

    @ServerTimestamp
    private Date createdAt;
    @ServerTimestamp
    private Date updatedAt;
}