package com.universityapp.entity;

public enum UserRole {
    STUDENT("ছাত্র"),
    STAFF("কর্মচারী"),
    TEACHER("শিক্ষক"),
    DEPARTMENT_HEAD("বিভাগীয় প্রধান"),
    ADMIN("প্রশাসক");

    private final String bengaliName;

    UserRole(String bengaliName) {
        this.bengaliName = bengaliName;
    }

    public String getBengaliName() {
        return bengaliName;
    }
}
