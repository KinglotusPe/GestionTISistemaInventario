package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.CotizacionDTO;
import com.jireh.Sistema.dto.VentaDTO;
import com.jireh.Sistema.service.CotizacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cotizaciones")
@CrossOrigin(origins = "*")
public class CotizacionController {

    private final CotizacionService cotizacionService;

    public CotizacionController(CotizacionService cotizacionService) {
        this.cotizacionService = cotizacionService;
    }

    @GetMapping
    public ResponseEntity<List<CotizacionDTO>> listar() {
        return ResponseEntity.ok(cotizacionService.listarCotizaciones());
    }

    @PostMapping
    public ResponseEntity<CotizacionDTO> crear(@RequestBody CotizacionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cotizacionService.crearCotizacion(dto));
    }

    @PostMapping("/{id}/convertir-venta")
    public ResponseEntity<VentaDTO> convertirEnVenta(@PathVariable Long id, @RequestBody(required = false) Map<String, Long> body) {
        Long usuarioId = body != null ? body.get("usuarioId") : null;
        Long metodoPagoId = body != null ? body.get("metodoPagoId") : null;
        return ResponseEntity.ok(cotizacionService.convertirEnVenta(id, usuarioId, metodoPagoId));
    }
}
