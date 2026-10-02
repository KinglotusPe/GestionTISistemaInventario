package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.UsuarioDTO;
import com.jireh.Sistema.security.RequirePermission;
import com.jireh.Sistema.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    }

    @PostMapping
    @RequirePermission("USUARIO_CREAR")
    public ResponseEntity<UsuarioDTO> crear(@RequestBody UsuarioDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.crearUsuario(dto));
    }

    @PutMapping("/{id}")
    @RequirePermission("USUARIO_EDITAR")
    public ResponseEntity<UsuarioDTO> actualizar(@PathVariable Long id, @RequestBody UsuarioDTO dto) {
        return ResponseEntity.ok(usuarioService.actualizarUsuario(id, dto));
    }

    @PatchMapping("/{id}/estado")
    @RequirePermission("USUARIO_DESACTIVAR")
    public ResponseEntity<Map<String, String>> cambiarEstado(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        Boolean estado = body.getOrDefault("estado", true);
        usuarioService.cambiarEstado(id, estado);
        return ResponseEntity.ok(Map.of("mensaje", "Estado actualizado correctamente"));
    }
}
