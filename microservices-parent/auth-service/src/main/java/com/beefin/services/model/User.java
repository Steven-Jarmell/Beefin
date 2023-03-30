package com.beefin.services.model;

import com.beefin.services.dto.UserResponse;
import com.google.cloud.firestore.annotation.ServerTimestamp;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data // Bundles features of toString, getter/setter, RequiredArgsConstructor
@NoArgsConstructor // Generates a constructor with no parameters
@AllArgsConstructor // Generates a constructor with all parameters
@Builder // Lets you produce code to have your class instantiable
public class User implements UserDetails {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private List<String> roles;

    private Boolean isVerified;

    private Float pointsEarned;

    private List<Workout> workoutsCompleted;

    private List<String> friendsList;

    private List<String> groupsList;

    @ServerTimestamp
    private Date createdAt;

    @ServerTimestamp
    private Date updatedAt;

    public User (UserResponse userData) {
        this.id = userData.getId();
        this.firstName = userData.getFirstName();
        this.lastName = userData.getLastName();
        this.email = userData.getEmail();
        this.password = userData.getPassword();
        this.roles = userData.getRoles();
        this.pointsEarned = 0F;
        this.workoutsCompleted = new ArrayList<>();
        this.friendsList = new ArrayList<>();
        this.groupsList = new ArrayList<>();
    }

    // Methods for UserDetails class
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // Change when implement registration verification
    @Override
    public boolean isEnabled() {
        return true;
    }
}