package com.universityapp.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRegisterRequest {

    @NotBlank(message = "প্রথম নাম প্রয়োজন")
    @Size(min = 2, message = "নাম কমপক্ষে ২ অক্ষর হতে হবে")
    private String firstName;

    @NotBlank(message = "শেষ নাম প্রয়োজন")
    private String lastName;

    @NotBlank(message = "ইমেইল প্রয়োজন")
    @Email(message = "সঠিক ইমেইল ঠিকানা লিখুন")
    private String email;

    @NotBlank(message = "ফোন নম্বর প্রয়োজন")
    @Pattern(regexp = "^[০-৯0-9]{10,11}$", message = "সঠিক ফোন নম্বর লিখুন")
    private String phone;

    @NotBlank(message = "ছাত্র আইডি প্রয়োজন")
    private String studentId;

    @NotBlank(message = "বিভাগ নির্বাচন করুন")
    private String department;

    @NotBlank(message = "পাসওয়ার্ড প্রয়োজন")
    @Size(min = 8, message = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
            message = "পাসওয়ার্ডে বড় অক্ষর, ছোট অক্ষর এবং সংখ্যা থাকতে হবে"
    )
    private String password;
}
