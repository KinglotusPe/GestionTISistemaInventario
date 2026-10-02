package com.jireh.Sistema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria")
public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(nullable = false, length = 60)
    private String username;

    @Column(nullable = false, length = 60)
    private String modulo;

    @Column(nullable = false, length = 60)
    private String accion;

    @Column(length = 60)
    private String entidad;

    @Column(name = "entidad_id")
    private Long entidadId;

    @Column(length = 300)
    private String descripcion;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora = LocalDateTime.now();

    @Column(name = "ip_origen", length = 45)
    private String ipOrigen;

    public Auditoria() {}

    public Auditoria(Long usuarioId, String username, String modulo, String accion, String entidad, Long entidadId, String descripcion, String ipOrigen) {
        this.usuarioId = usuarioId;
        this.username = username;
        this.modulo = modulo;
        this.accion = accion;
        this.entidad = entidad;
        this.entidadId = entidadId;
        this.descripcion = descripcion;
        this.ipOrigen = ipOrigen;
        this.fechaHora = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getModulo() { return modulo; }
    public void setModulo(String modulo) { this.modulo = modulo; }
    public String getAccion() { return accion; }
    public void setAccion(String accion) { this.accion = accion; }
    public String getEntidad() { return entidad; }
    public void setEntidad(String entidad) { this.entidad = entidad; }
    public Long getEntidadId() { return entidadId; }
    public void setEntidadId(Long entidadId) { this.entidadId = entidadId; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
    public String getIpOrigen() { return ipOrigen; }
    public void setIpOrigen(String ipOrigen) { this.ipOrigen = ipOrigen; }
}
