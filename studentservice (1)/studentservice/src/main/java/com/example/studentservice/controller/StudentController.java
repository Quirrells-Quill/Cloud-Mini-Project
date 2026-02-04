package com.example.studentservice.controller;

import com.example.studentservice.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public void addStudent(@RequestBody Map<String, String> body) {
        service.addStudent(body.get("studentId"), body);
    }

    @GetMapping("/{id}")
    public Map<String, Object> getDetails(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        response.put("student", service.getStudent(id));
        response.put("course", service.getCourse(id));
        return response;
    }
}
