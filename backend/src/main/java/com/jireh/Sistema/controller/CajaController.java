package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.CajaDTO;
import com.jireh.Sistema.dto.MovimientoCajaDTO;
import com.jireh.Sistema.security.RequirePermission;
import com.jireh.Sistema.service.CajaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/caja")
@CrossOrigin(origins = "*")
public class CajaController {

    private final CajaService cajaService;

    public CajaController(CajaService cajaService) {
        this.cajaService = cajaService;
    }

    @GetMapping("/activa")
    public ResponseEntity<CajaDTO> obtenerCajaActiva(@RequestParam(required = false) Long usuarioId) {
        return ResponseEntity.ok(cajaService.obtenerCajaActiva(usuarioId));
    }

    @PostMapping("/abrir")
    @RequirePermission("CAJA_ABRIR")
    public ResponseEntity<CajaDTO> abrirCaja(@RequestBody Map<String, Object> body) {
        Long usuarioId = body.get("usuarioId") != null ? Long.valueOf(body.get("usuarioId").toString()) : 1L;
        BigDecimal montoInicial = body.get("montoInicial") != null ? new BigDecimal(body.get("montoInicial").toString()) : BigDecimal.ZERO;
        String observaciones = body.get("observaciones") != null ? body.get("observaciones").toString() : null;
        return ResponseEntity.ok(cajaService.abrirCaja(usuarioId, montoInicial, observaciones));
    }

    @PostMapping("/movimiento")
    @RequirePermission("CAJA_INGRESO")
    public ResponseEntity<MovimientoCajaDTO> registrarMovimiento(@RequestBody Map<String, Object> body) {
        Long cajaId = Long.valueOf(body.get("cajaId").toString());
        String tipo = body.get("tipo").toString();
        String concepto = body.get("concepto").toString();
        BigDecimal monto = new BigDecimal(body.get("monto").toString());
        Long metodoPagoId = body.get("metodoPagoId") != null ? Long.valueOf(body.get("metodoPagoId").toString()) : 1L;
        Long usuarioId = body.get("usuarioId") != null ? Long.valueOf(body.get("usuarioId").toString()) : 1L;

        return ResponseEntity.ok(cajaService.registrarMovimiento(cajaId, tipo, concepto, monto, metodoPagoId, usuarioId));
    }

    @PostMapping("/cerrar")
    @RequirePermission("CAJA_CERRAR")
    public ResponseEntity<CajaDTO> cerrarCaja(@RequestBody Map<String, Object> body) {
        Long cajaId = Long.valueOf(body.get("cajaId").toString());
        BigDecimal montoContado = body.get("montoContado") != null ? new BigDecimal(body.get("montoContado").toString()) : null;
        String observaciones = body.get("observaciones") != null ? body.get("observaciones").toString() : null;
        Long usuarioId = body.get("usuarioId") != null ? Long.valueOf(body.get("usuarioId").toString()) : 1L;

        return ResponseEntity.ok(cajaService.cerrarCaja(cajaId, montoContado, observaciones, usuarioId));
    }

    @GetMapping("/historial")
    public ResponseEntity<List<CajaDTO>> listarHistorial() {
        return ResponseEntity.ok(cajaService.listarHistorialCajas());
    }
}
