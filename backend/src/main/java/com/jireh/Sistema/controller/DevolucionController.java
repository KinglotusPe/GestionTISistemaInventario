package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.DevolucionDTO;
import com.jireh.Sistema.service.DevolucionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devoluciones")
@CrossOrigin(origins = "*")
public class DevolucionController {

    private final DevolucionService devolucionService;

    public DevolucionController(DevolucionService devolucionService) {
        this.devolucionService = devolucionService;
    }

    @GetMapping
    public ResponseEntity<List<DevolucionDTO>> listar() {
        return ResponseEntity.ok(devolucionService.listarDevoluciones());
    }

    @PostMapping
    public ResponseEntity<DevolucionDTO> registrar(@RequestBody DevolucionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(devolucionService.registrarDevolucion(dto));
    }
}
