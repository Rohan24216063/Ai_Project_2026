package com.universityapp.dto;

import lombok.*;
import com.universityapp.entity.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {

    private String email;

    private String password;
}
