package com.universityapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.universityapp"})
public class UniversityManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(UniversityManagementApplication.class, args);
    }
}
