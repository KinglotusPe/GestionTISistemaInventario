package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.LoginRequest;
import com.jireh.Sistema.dto.LoginResponse;
import com.jireh.Sistema.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.autenticar(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/demo-usuarios")
    public ResponseEntity<Map<String, Object>> getDemoUsuarios() {
        Map<String, Object> info = new HashMap<>();
        info.put("admin", Map.of("usuario", "admin", "rol", "ADMINISTRADOR", "contrasena", "admin"));
        info.put("vendedor", Map.of("usuario", "vendedor", "rol", "VENDEDOR", "contrasena", "vendedor123"));
        info.put("almacen", Map.of("usuario", "almacenero", "rol", "ALMACENERO", "contrasena", "almacen123"));
        return ResponseEntity.ok(info);
    }
}
