package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.MovimientoDTO;
import com.jireh.Sistema.entity.MovimientoInventario;
import com.jireh.Sistema.repository.MovimientoInventarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventarioService {

    private final MovimientoInventarioRepository movimientoInventarioRepository;

    public InventarioService(MovimientoInventarioRepository movimientoInventarioRepository) {
        this.movimientoInventarioRepository = movimientoInventarioRepository;
    }

    @Transactional(readOnly = true)
    public List<MovimientoDTO> listarMovimientos() {
        List<MovimientoInventario> movs = movimientoInventarioRepository.findAllByOrderByFechaDesc();
        List<MovimientoDTO> dtoList = new ArrayList<>();
        for (MovimientoInventario m : movs) {
            MovimientoDTO dto = new MovimientoDTO();
            dto.setId(m.getId());
            dto.setTipoMovimiento(m.getTipoMovimiento());
            dto.setCantidad(m.getCantidad());
            dto.setStockAnterior(m.getStockAnterior());
            dto.setStockPosterior(m.getStockPosterior());
            dto.setMotivo(m.getMotivo());
            dto.setFecha(m.getFecha() != null ? m.getFecha().toString() : "");
            if (m.getProducto() != null) {
                dto.setProductoId(m.getProducto().getId());
                dto.setProductoNombre(m.getProducto().getNombre());
            }
            if (m.getUsuario() != null) {
                dto.setUsuarioId(m.getUsuario().getId());
            }
            dtoList.add(dto);
        }
        return dtoList;
    }
}
