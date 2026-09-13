package com.jireh.Sistema.controller;

import com.jireh.Sistema.dto.CatalogoItemDTO;
import com.jireh.Sistema.service.CatalogoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CatalogoController {

    private final CatalogoService catalogoService;

    public CatalogoController(CatalogoService catalogoService) {
        this.catalogoService = catalogoService;
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<CatalogoItemDTO>> listarCategorias() {
        return ResponseEntity.ok(catalogoService.listarCategorias());
    }

    @GetMapping("/marcas")
    public ResponseEntity<List<CatalogoItemDTO>> listarMarcas() {
        return ResponseEntity.ok(catalogoService.listarMarcas());
    }

    @GetMapping("/unidades-medida")
    public ResponseEntity<List<CatalogoItemDTO>> listarUnidadesMedida() {
        return ResponseEntity.ok(catalogoService.listarUnidadesMedida());
    }

    @GetMapping("/metodos-pago")
    public ResponseEntity<List<CatalogoItemDTO>> listarMetodosPago() {
        return ResponseEntity.ok(catalogoService.listarMetodosPago());
    }
}
