package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.MovimientoDTO;
import com.jireh.Sistema.service.InventarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class InventarioController {

    private final InventarioService inventarioService;

    public InventarioController(InventarioService inventarioService) {
        this.inventarioService = inventarioService;
    }

    @GetMapping("/movimientos")
    public ResponseEntity<List<MovimientoDTO>> listarMovimientos() {
        return ResponseEntity.ok(inventarioService.listarMovimientos());
    }
}
