package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.EmpresaConfigDTO;
import com.jireh.Sistema.service.EmpresaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresa")
@CrossOrigin(origins = "*")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping
    public ResponseEntity<EmpresaConfigDTO> obtenerConfiguracion() {
        return ResponseEntity.ok(empresaService.obtenerConfiguracion());
    }

    @PutMapping
    public ResponseEntity<EmpresaConfigDTO> actualizarConfiguracion(@RequestBody EmpresaConfigDTO dto) {
        return ResponseEntity.ok(empresaService.actualizarConfiguracion(dto));
    }
}
