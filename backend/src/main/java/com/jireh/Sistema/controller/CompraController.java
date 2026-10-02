package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.CompraDTO;
import com.jireh.Sistema.dto.OrdenCompraDTO;
import com.jireh.Sistema.entity.Proveedor;
import com.jireh.Sistema.repository.ProveedorRepository;
import com.jireh.Sistema.security.RequirePermission;
import com.jireh.Sistema.service.CompraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;
    private final ProveedorRepository proveedorRepository;

    public CompraController(CompraService compraService, ProveedorRepository proveedorRepository) {
        this.compraService = compraService;
        this.proveedorRepository = proveedorRepository;
    }

    // ==================== COMPRAS ====================
    @GetMapping("/compras")
    public ResponseEntity<List<CompraDTO>> listarCompras() {
        return ResponseEntity.ok(compraService.listarCompras());
    }

    @PostMapping("/compras")
    @RequirePermission("COMPRA_CREAR")
    public ResponseEntity<CompraDTO> registrarCompra(@RequestBody CompraDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compraService.registrarCompra(dto));
    }

    // ==================== ÓRDENES DE COMPRA ====================
    @GetMapping("/ordenes-compra")
    public ResponseEntity<List<OrdenCompraDTO>> listarOrdenesCompra() {
        return ResponseEntity.ok(compraService.listarOrdenesCompra());
    }

    @PostMapping("/ordenes-compra")
    @RequirePermission("ORDEN_COMPRA_CREAR")
    public ResponseEntity<OrdenCompraDTO> crearOrdenCompra(@RequestBody OrdenCompraDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compraService.crearOrdenCompra(dto));
    }

    @PostMapping("/ordenes-compra/{id}/convertir-compra")
    @RequirePermission("COMPRA_CREAR")
    public ResponseEntity<CompraDTO> convertirOrdenEnCompra(@PathVariable Long id, @RequestBody(required = false) Map<String, Long> body) {
        Long usuarioId = body != null ? body.get("usuarioId") : null;
        return ResponseEntity.ok(compraService.convertirOrdenEnCompra(id, usuarioId));
    }

    // ==================== PROVEEDORES ====================
    @GetMapping("/proveedores")
    public ResponseEntity<List<Proveedor>> listarProveedores() {
        return ResponseEntity.ok(proveedorRepository.findAll());
    }

    @PostMapping("/proveedores")
    @RequirePermission("PROVEEDOR_CREAR")
    public ResponseEntity<Proveedor> guardarProveedor(@RequestBody Proveedor prov) {
        return ResponseEntity.status(HttpStatus.CREATED).body(proveedorRepository.save(prov));
    }
}
