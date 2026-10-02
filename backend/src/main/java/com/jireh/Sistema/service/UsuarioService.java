package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.UsuarioDTO;
import com.jireh.Sistema.entity.Permiso;
import com.jireh.Sistema.entity.Rol;
import com.jireh.Sistema.entity.Usuario;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.RolRepository;
import com.jireh.Sistema.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final AuditoriaService auditoriaService;

    public UsuarioService(UsuarioRepository usuarioRepository, RolRepository rolRepository, AuditoriaService auditoriaService) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<UsuarioDTO> dtos = new ArrayList<>();
        for (Usuario u : usuarios) {
            UsuarioDTO d = new UsuarioDTO();
            d.setId(u.getId());
            d.setUsuario(u.getUsuario());
            d.setNombres(u.getNombres());
            d.setApellidos(u.getApellidos());
            d.setCorreo(u.getCorreo());
            d.setTelefono(u.getTelefono());
            d.setEstado(u.getEstado());
            if (u.getRol() != null) {
                d.setRolId(u.getRol().getId());
                d.setRolNombre(u.getRol().getNombre());
                if (u.getRol().getPermisos() != null) {
                    List<String> codigos = new ArrayList<>();
                    for (Permiso p : u.getRol().getPermisos()) {
                        codigos.add(p.getCodigo());
                    }
                    d.setPermisos(codigos);
                }
            }
            dtos.add(d);
        }
        return dtos;
    }

    @Transactional(readOnly = true)
    public UsuarioDTO obtenerPorId(Long id) {
        Usuario u = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
        UsuarioDTO d = new UsuarioDTO();
        d.setId(u.getId());
        d.setUsuario(u.getUsuario());
        d.setNombres(u.getNombres());
        d.setApellidos(u.getApellidos());
        d.setCorreo(u.getCorreo());
        d.setTelefono(u.getTelefono());
        d.setEstado(u.getEstado());
        if (u.getRol() != null) {
            d.setRolId(u.getRol().getId());
            d.setRolNombre(u.getRol().getNombre());
        }
        return d;
    }

    @Transactional
    public UsuarioDTO crearUsuario(UsuarioDTO dto) {
        if (dto.getUsuario() == null || dto.getUsuario().trim().isEmpty()) {
            throw new BusinessException("El nombre de usuario es obligatorio");
        }
        if (usuarioRepository.findByUsuario(dto.getUsuario().trim()).isPresent()) {
            throw new BusinessException("El nombre de usuario ya está registrado en el sistema");
        }
        if (dto.getContrasena() == null || dto.getContrasena().trim().isEmpty()) {
            throw new BusinessException("La contraseña es obligatoria");
        }

        Usuario u = new Usuario();
        u.setUsuario(dto.getUsuario().trim());
        u.setContrasena(dto.getContrasena().trim());
        u.setNombres(dto.getNombres() != null ? dto.getNombres().trim() : "");
        u.setApellidos(dto.getApellidos() != null ? dto.getApellidos().trim() : "");
        u.setCorreo(dto.getCorreo() != null ? dto.getCorreo().trim() : dto.getUsuario().trim() + "@jireh.com");
        u.setTelefono(dto.getTelefono());
        u.setEstado(dto.getEstado() != null ? dto.getEstado() : true);

        Long rolId = dto.getRolId() != null ? dto.getRolId() : 2L;
        Rol rol = rolRepository.findById(rolId)
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado con ID: " + rolId));
        u.setRol(rol);

        Usuario guardado = usuarioRepository.save(u);
        auditoriaService.registrar(null, "ADMIN", "SISTEMA", "CREAR", "USUARIO", guardado.getId(), "Creación de usuario " + guardado.getUsuario(), null);

        dto.setId(guardado.getId());
        dto.setRolNombre(rol.getNombre());
        return dto;
    }

    @Transactional
    public UsuarioDTO actualizarUsuario(Long id, UsuarioDTO dto) {
        Usuario u = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        if (dto.getNombres() != null) u.setNombres(dto.getNombres().trim());
        if (dto.getApellidos() != null) u.setApellidos(dto.getApellidos().trim());
        if (dto.getCorreo() != null) u.setCorreo(dto.getCorreo().trim());
        if (dto.getTelefono() != null) u.setTelefono(dto.getTelefono().trim());
        if (dto.getEstado() != null) u.setEstado(dto.getEstado());

        if (dto.getContrasena() != null && !dto.getContrasena().trim().isEmpty()) {
            u.setContrasena(dto.getContrasena().trim());
        }

        if (dto.getRolId() != null) {
            Rol rol = rolRepository.findById(dto.getRolId())
                    .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
            u.setRol(rol);
        }

        Usuario guardado = usuarioRepository.save(u);
        auditoriaService.registrar(null, "ADMIN", "SISTEMA", "ACTUALIZAR", "USUARIO", guardado.getId(), "Actualización de usuario " + guardado.getUsuario(), null);
        dto.setId(guardado.getId());
        return dto;
    }

    @Transactional
    public void cambiarEstado(Long id, Boolean estado) {
        Usuario u = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        u.setEstado(estado);
        usuarioRepository.save(u);
        auditoriaService.registrar(null, "ADMIN", "SISTEMA", "ESTADO", "USUARIO", id, "Cambio de estado a " + estado + " para usuario " + u.getUsuario(), null);
    }
}
