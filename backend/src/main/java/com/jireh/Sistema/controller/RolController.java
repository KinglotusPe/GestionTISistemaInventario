package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.PermisoDTO;
import com.jireh.Sistema.dto.RolDTO;
import com.jireh.Sistema.security.RequirePermission;
import com.jireh.Sistema.service.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping
    public ResponseEntity<List<RolDTO>> listarRoles() {
        return ResponseEntity.ok(rolService.listarRoles());
    }

    @GetMapping("/permisos")
    public ResponseEntity<List<PermisoDTO>> listarPermisos() {
        return ResponseEntity.ok(rolService.listarPermisos());
    }

    @PutMapping("/{id}/permisos")
    @RequirePermission("ROL_GESTIONAR")
    public ResponseEntity<RolDTO> actualizarPermisos(@PathVariable Long id, @RequestBody Map<String, List<Long>> body) {
        List<Long> permisoIds = body.getOrDefault("permisoIds", List.of());
        return ResponseEntity.ok(rolService.actualizarPermisosRol(id, permisoIds));
    }
}
