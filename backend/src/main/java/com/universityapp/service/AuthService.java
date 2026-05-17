package com.universityapp.service;

import com.universityapp.entity.Student;
import com.universityapp.entity.User;
import com.universityapp.entity.UserRole;
import com.universityapp.dto.*;
import com.universityapp.repository.StudentRepository;
import com.universityapp.repository.UserRepository;
import com.universityapp.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    /**
     * Student রেজিস্ট্রেশন
     */
    @Transactional
    public AuthResponse registerStudent(StudentRegisterRequest request) {
        log.info("ছাত্র রেজিস্ট্রেশনের অনুরোধ: {}", request.getEmail());

        // ১. Email already exist কিনা চেক করা
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে");
        }

        // २. Student ID duplicate কিনা চেক করা
        if (studentRepository.existsByStudentId(request.getStudentId())) {
            throw new RuntimeException("এই ছাত্র আইডি ইতিমধ্যে রেজিস্টার করা হয়েছে");
        }

        // ३. User তৈরি করা
        User user = User.builder()
                .email(request.getEmail())
                .username(request.getEmail().split("@")[0] + "_" + request.getStudentId())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .role(UserRole.STUDENT)
                .isActive(true)
                .build();

        user = userRepository.save(user);
        log.info("ব্যবহারকারী তৈরি হয়েছে: {} (ID: {})", user.getEmail(), user.getId());

        // ४. Student রেকর্ড তৈরি করা
        Student student = Student.builder()
                .user(user)
                .studentId(request.getStudentId())
                .department(request.getDepartment())
                .enrollmentDate(LocalDateTime.now())
                .build();

        student = studentRepository.save(student);
        log.info("ছাত্র রেকর্ড তৈরি হয়েছে: {} (Student ID: {})", user.getEmail(), student.getStudentId());

        // ५. JWT Token generate করা
        String token = jwtUtil.generateToken(user.getEmail(), user.getId().toString(), UserRole.STUDENT.name());

        return buildAuthResponse(user, token);
    }

    /**
     * ব্যবহারকারী লগইন
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        log.info("লগইন অনুরোধ: {}", request.getEmail());

        // ১. Email দিয়ে user খোঁজা
        User user = userRepository.findByEmailAndIsActiveTrue(request.getEmail())
                .orElseThrow(() -> new RuntimeException("ইমেইল বা পাসওয়ার্ড ভুল"));

        // २. পাসওয়ার্ড verify করা
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            log.warn("লগইন ব্যর্থ - ভুল পাসওয়ার্ড: {}", request.getEmail());
            throw new RuntimeException("ইমেইল বা পাসওয়ার্ড ভুল");
        }

        log.info("সফল লগইন: {} (Role: {})", user.getEmail(), user.getRole());

        // ३. JWT Token generate করা
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getId().toString(),
                user.getRole().name()
        );

        return buildAuthResponse(user, token);
    }

    /**
     * Email দিয়ে user খোঁজা (internal use)
     */
    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("ব্যবহারকারী খুঁজে পাওয়া যায়নি"));
    }

    /**
     * AuthResponse build করা
     */
    private AuthResponse buildAuthResponse(User user, String token) {
        AuthResponse.UserInfo userInfo = AuthResponse.UserInfo.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFullName())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .build();

        return AuthResponse.builder()
                .token(token)
                .user(userInfo)
                .build();
    }
}
