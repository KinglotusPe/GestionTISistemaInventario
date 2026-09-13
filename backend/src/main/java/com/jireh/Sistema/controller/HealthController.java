package com.jireh.Sistema.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", "UP");
        resp.put("timestamp", LocalDateTime.now().toString());
        resp.put("message", "Backend Spring Boot - Plastiquería Jireh Operativo");
        return ResponseEntity.ok(resp);
    }
}
