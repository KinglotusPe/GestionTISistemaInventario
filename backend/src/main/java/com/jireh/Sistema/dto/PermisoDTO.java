package com.jireh.Sistema.dto;

public class PermisoDTO {
    private Long id;
    private String codigo;
    private String nombre;
    private String modulo;
    private String descripcion;

    public PermisoDTO() {}

    public PermisoDTO(Long id, String codigo, String nombre, String modulo, String descripcion) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.modulo = modulo;
        this.descripcion = descripcion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getModulo() { return modulo; }
    public void setModulo(String modulo) { this.modulo = modulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}
