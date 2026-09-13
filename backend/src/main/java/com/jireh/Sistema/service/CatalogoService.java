package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.CatalogoItemDTO;
import com.jireh.Sistema.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CatalogoService {

    private final CategoriaRepository categoriaRepository;
    private final MarcaRepository marcaRepository;
    private final UnidadMedidaRepository unidadMedidaRepository;
    private final MetodoPagoRepository metodoPagoRepository;

    public CatalogoService(
            CategoriaRepository categoriaRepository,
            MarcaRepository marcaRepository,
            UnidadMedidaRepository unidadMedidaRepository,
            MetodoPagoRepository metodoPagoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.marcaRepository = marcaRepository;
        this.unidadMedidaRepository = unidadMedidaRepository;
        this.metodoPagoRepository = metodoPagoRepository;
    }

    @Transactional(readOnly = true)
    public List<CatalogoItemDTO> listarCategorias() {
        List<CatalogoItemDTO> list = new ArrayList<>();
        categoriaRepository.findAll().forEach(c ->
                list.add(new CatalogoItemDTO(c.getId(), c.getNombre(), c.getDescripcion(), null, c.getEstado()))
        );
        return list;
    }

    @Transactional(readOnly = true)
    public List<CatalogoItemDTO> listarMarcas() {
        List<CatalogoItemDTO> list = new ArrayList<>();
        marcaRepository.findAll().forEach(m ->
                list.add(new CatalogoItemDTO(m.getId(), m.getNombre(), m.getDescripcion(), null, m.getEstado()))
        );
        return list;
    }

    @Transactional(readOnly = true)
    public List<CatalogoItemDTO> listarUnidadesMedida() {
        List<CatalogoItemDTO> list = new ArrayList<>();
        unidadMedidaRepository.findAll().forEach(u ->
                list.add(new CatalogoItemDTO(u.getId(), u.getNombre(), null, u.getAbreviatura(), u.getEstado()))
        );
        return list;
    }

    @Transactional(readOnly = true)
    public List<CatalogoItemDTO> listarMetodosPago() {
        List<CatalogoItemDTO> list = new ArrayList<>();
        metodoPagoRepository.findAll().forEach(mp ->
                list.add(new CatalogoItemDTO(mp.getId(), mp.getNombre(), mp.getDescripcion(), null, mp.getEstado()))
        );
        return list;
    }
}
