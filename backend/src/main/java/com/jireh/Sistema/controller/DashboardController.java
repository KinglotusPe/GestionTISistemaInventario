package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.DashboardResumenDTO;
import com.jireh.Sistema.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/resumen")
    public ResponseEntity<DashboardResumenDTO> obtenerResumen() {
        return ResponseEntity.ok(dashboardService.obtenerResumen());
    }
}
