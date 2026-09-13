package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.ProductoDTO;
import com.jireh.Sistema.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> listarTodos() {
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> guardar(@RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.guardar(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> desactivar(@PathVariable Long id) {
        productoService.desactivar(id);
        Map<String, Object> resp = new HashMap<>();
        resp.put("success", true);
        resp.put("message", "Producto desactivado correctamente");
        return ResponseEntity.ok(resp);
    }
}
