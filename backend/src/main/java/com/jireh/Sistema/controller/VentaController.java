package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.VentaDTO;
import com.jireh.Sistema.service.VentaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @GetMapping
    public ResponseEntity<List<VentaDTO>> listarVentas() {
        return ResponseEntity.ok(ventaService.listarVentas());
    }

    @PostMapping
    public ResponseEntity<VentaDTO> registrarVenta(@RequestBody VentaDTO req) {
        return ResponseEntity.ok(ventaService.registrarVenta(req));
    }
}
