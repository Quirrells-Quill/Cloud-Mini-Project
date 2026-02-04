package com.example.studentservice.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class StudentService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final Map<String, Object> students = new HashMap<>();

    // ADD STUDENT
    public void addStudent(String id, Object student) {
        students.put(id, student);
    }

    // CB #2 — STUDENT VALIDATION
    @CircuitBreaker(name = "studentRuleCB", fallbackMethod = "studentFallback")
    public Object getStudent(String id) {
        if (!students.containsKey(id)) {
            throw new RuntimeException("Invalid student");
        }
        return students.get(id);
    }

    public Object studentFallback(String id, Throwable ex) {
        return "Student record not found or invalid";
    }

    // CB #1 — COURSE SERVICE FAILURE + RETRY
    @Retryable(maxAttempts = 3)
    @CircuitBreaker(name = "courseServiceCB", fallbackMethod = "courseFallback")
    public Object getCourse(String id) {
        return restTemplate.getForObject(
                "http://localhost:8082/course/" + id,
                Object.class
        );
    }

    public Object courseFallback(String id, Throwable ex) {
        return "Course service temporarily unavailable";
    }
}
