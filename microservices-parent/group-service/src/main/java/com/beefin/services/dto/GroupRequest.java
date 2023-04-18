package com.beefin.services.dto;
import com.beefin.services.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupRequest {
    private String id;
    private String name;
    private String groupLeaderID;
    private String newGroupMember;
}
