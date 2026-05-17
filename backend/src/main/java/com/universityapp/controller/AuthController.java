package com.universityapp.controller;

import com.universityapp.dto.*;
import com.universityapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private final AuthService authService;

    /**
     * ছাত্র রেজিস্ট্রেশন POST /api/v1/auth/register/student
     */
    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(
            @Valid @RequestBody StudentRegisterRequest request,
            BindingResult bindingResult) {

        log.info("ছাত্র রেজিস্ট্রেশন অনুরোধ: {}", request.getEmail());

        // Validation error check করা
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));

            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("ফর্ম ভ্যালিডেশন ব্যর্থ", errors));
        }

        try {
            AuthResponse response = authService.registerStudent(request);
            log.info("ছাত্র সফলভাবে রেজিস্টার হয়েছে: {}", request.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("রেজিস্ট্রেশন ব্যর্থ: {}", e.getMessage());
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("রেজিস্ট্রেশন ব্যর্থ", e.getMessage()));
        }
    }

    /**
     * লগইন POST /api/v1/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult) {

        log.info("লগইন অনুরোধ: {}", request.getEmail());

        // Validation error check করা
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));

            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("ফর্ম ভ্যালিডেশন ব্যর্থ", errors));
        }

        try {
            AuthResponse response = authService.login(request);
            log.info("সফল লগইন: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("লগইন ব্যর্থ: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("লগইন ব্যর্থ", e.getMessage()));
        }
    }

    /**
     * Health check GET /api/v1/auth/health
     */
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(new SuccessResponse("✅ Authentication সার্ভার চলছে", "OK"));
    }

    // Inner classes for responses
    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    static class ErrorResponse {

        private String error;
        private String message;
    }

    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    static class SuccessResponse {

        private String message;
        private String status;
    }
}
