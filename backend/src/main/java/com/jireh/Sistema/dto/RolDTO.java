package com.jireh.Sistema.dto;

import java.util.ArrayList;
import java.util.List;

public class RolDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Boolean estado;
    private List<Long> permisoIds = new ArrayList<>();
    private List<String> permisoCodigos = new ArrayList<>();

    public RolDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }
    public List<Long> getPermisoIds() { return permisoIds; }
    public void setPermisoIds(List<Long> permisoIds) { this.permisoIds = permisoIds; }
    public List<String> getPermisoCodigos() { return permisoCodigos; }
    public void setPermisoCodigos(List<String> permisoCodigos) { this.permisoCodigos = permisoCodigos; }
}
