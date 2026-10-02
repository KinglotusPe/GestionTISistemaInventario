package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.PermisoDTO;
import com.jireh.Sistema.dto.RolDTO;
import com.jireh.Sistema.entity.Permiso;
import com.jireh.Sistema.entity.Rol;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.PermisoRepository;
import com.jireh.Sistema.repository.RolRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RolService {

    private final RolRepository rolRepository;
    private final PermisoRepository permisoRepository;
    private final AuditoriaService auditoriaService;

    public RolService(RolRepository rolRepository, PermisoRepository permisoRepository, AuditoriaService auditoriaService) {
        this.rolRepository = rolRepository;
        this.permisoRepository = permisoRepository;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public List<RolDTO> listarRoles() {
        List<Rol> roles = rolRepository.findAll();
        List<RolDTO> dtos = new ArrayList<>();
        for (Rol r : roles) {
            RolDTO d = new RolDTO();
            d.setId(r.getId());
            d.setNombre(r.getNombre());
            d.setDescripcion(r.getDescripcion());
            d.setEstado(r.getEstado());
            if (r.getPermisos() != null) {
                List<Long> pIds = new ArrayList<>();
                List<String> pCodes = new ArrayList<>();
                for (Permiso p : r.getPermisos()) {
                    pIds.add(p.getId());
                    pCodes.add(p.getCodigo());
                }
                d.setPermisoIds(pIds);
                d.setPermisoCodigos(pCodes);
            }
            dtos.add(d);
        }
        return dtos;
    }

    @Transactional(readOnly = true)
    public List<PermisoDTO> listarPermisos() {
        List<Permiso> list = permisoRepository.findAll();
        List<PermisoDTO> dtos = new ArrayList<>();
        for (Permiso p : list) {
            dtos.add(new PermisoDTO(p.getId(), p.getCodigo(), p.getNombre(), p.getModulo(), p.getDescripcion()));
        }
        return dtos;
    }

    @Transactional
    public RolDTO actualizarPermisosRol(Long rolId, List<Long> permisoIds) {
        Rol rol = rolRepository.findById(rolId)
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));

        Set<Permiso> nuevosPermisos = new HashSet<>();
        if (permisoIds != null && !permisoIds.isEmpty()) {
            nuevosPermisos.addAll(permisoRepository.findAllById(permisoIds));
        }
        rol.setPermisos(nuevosPermisos);
        Rol guardado = rolRepository.save(rol);

        auditoriaService.registrar(null, "ADMIN", "SEGURIDAD", "PERMISOS", "ROL", rolId, "Actualización de permisos para rol " + rol.getNombre(), null);

        RolDTO d = new RolDTO();
        d.setId(guardado.getId());
        d.setNombre(guardado.getNombre());
        d.setDescripcion(guardado.getDescripcion());
        d.setEstado(guardado.getEstado());
        List<Long> pIds = new ArrayList<>();
        List<String> pCodes = new ArrayList<>();
        for (Permiso p : guardado.getPermisos()) {
            pIds.add(p.getId());
            pCodes.add(p.getCodigo());
        }
        d.setPermisoIds(pIds);
        d.setPermisoCodigos(pCodes);
        return d;
    }
}
