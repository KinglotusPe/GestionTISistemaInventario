package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.AbonoDTO;
import com.jireh.Sistema.dto.CuentaCobrarDTO;
import com.jireh.Sistema.dto.CuentaPagarDTO;
import com.jireh.Sistema.service.FinanzasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/finanzas")
@CrossOrigin(origins = "*")
public class FinanzasController {

    private final FinanzasService finanzasService;

    public FinanzasController(FinanzasService finanzasService) {
        this.finanzasService = finanzasService;
    }

    @GetMapping("/cuentas-cobrar")
    public ResponseEntity<List<CuentaCobrarDTO>> listarCuentasCobrar() {
        return ResponseEntity.ok(finanzasService.listarCuentasCobrar());
    }

    @PostMapping("/cuentas-cobrar/abono")
    public ResponseEntity<CuentaCobrarDTO> registrarAbonoCliente(@RequestBody AbonoDTO dto) {
        return ResponseEntity.ok(finanzasService.registrarAbonoCliente(dto));
    }

    @GetMapping("/cuentas-pagar")
    public ResponseEntity<List<CuentaPagarDTO>> listarCuentasPagar() {
        return ResponseEntity.ok(finanzasService.listarCuentasPagar());
    }

    @PostMapping("/cuentas-pagar/abono")
    public ResponseEntity<CuentaPagarDTO> registrarAbonoProveedor(@RequestBody AbonoDTO dto) {
        return ResponseEntity.ok(finanzasService.registrarAbonoProveedor(dto));
    }
}
