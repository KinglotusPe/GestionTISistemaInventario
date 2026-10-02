package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.AuditoriaDTO;
import com.jireh.Sistema.security.RequirePermission;
import com.jireh.Sistema.service.AuditoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auditoria")
@CrossOrigin(origins = "*")
public class AuditoriaController {

    private final AuditoriaService auditoriaService;

    public AuditoriaController(AuditoriaService auditoriaService) {
        this.auditoriaService = auditoriaService;
    }

    @GetMapping
    @RequirePermission("AUDITORIA_VER")
    public ResponseEntity<List<AuditoriaDTO>> listarUltimas() {
        return ResponseEntity.ok(auditoriaService.listarUltimas());
    }
}
