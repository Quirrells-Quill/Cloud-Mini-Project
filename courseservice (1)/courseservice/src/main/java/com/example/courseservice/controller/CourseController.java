package com.example.courseservice.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/course")
public class CourseController {

    @GetMapping("/{studentId}")
    public Map<String, Object> getCourse(@PathVariable String studentId) {

        Map<String, Object> course = new HashMap<>();
        course.put("courseId", "CSE101");
        course.put("courseName", "Distributed Systems");
        course.put("credits", 4);

        return course;
    }
}
