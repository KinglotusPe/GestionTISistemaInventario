package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.AuditoriaDTO;
import com.jireh.Sistema.entity.Auditoria;
import com.jireh.Sistema.repository.AuditoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuditoriaService {

    private final AuditoriaRepository auditoriaRepository;

    public AuditoriaService(AuditoriaRepository auditoriaRepository) {
        this.auditoriaRepository = auditoriaRepository;
    }

    @Transactional
    public void registrar(Long usuarioId, String username, String modulo, String accion, String entidad, Long entidadId, String descripcion, String ipOrigen) {
        try {
            Auditoria a = new Auditoria(usuarioId, username != null ? username : "sistema", modulo, accion, entidad, entidadId, descripcion, ipOrigen != null ? ipOrigen : "127.0.0.1");
            auditoriaRepository.save(a);
        } catch (Exception ignored) {
        }
    }

    @Transactional(readOnly = true)
    public List<AuditoriaDTO> listarUltimas() {
        List<Auditoria> list = auditoriaRepository.findTop100ByOrderByFechaHoraDesc();
        List<AuditoriaDTO> dtos = new ArrayList<>();
        for (Auditoria a : list) {
            AuditoriaDTO d = new AuditoriaDTO();
            d.setId(a.getId());
            d.setUsuarioId(a.getUsuarioId());
            d.setUsername(a.getUsername());
            d.setModulo(a.getModulo());
            d.setAccion(a.getAccion());
            d.setEntidad(a.getEntidad());
            d.setEntidadId(a.getEntidadId());
            d.setDescripcion(a.getDescripcion());
            d.setFechaHora(a.getFechaHora() != null ? a.getFechaHora().toString() : "");
            d.setIpOrigen(a.getIpOrigen());
            dtos.add(d);
        }
        return dtos;
    }
}
