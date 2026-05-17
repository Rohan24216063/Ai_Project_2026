package com.universityapp.dto;

import lombok.*;
import com.universityapp.entity.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;

    private UserInfo user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserInfo {

        private Long id;
        private String email;
        private String username;
        private String firstName;
        private String lastName;
        private String fullName;
        private UserRole role;
        private Boolean isActive;
    }
}
