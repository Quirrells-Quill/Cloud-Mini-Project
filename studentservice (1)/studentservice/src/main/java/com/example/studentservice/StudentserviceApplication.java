package com.example.studentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class StudentserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentserviceApplication.class, args);
    }
}
