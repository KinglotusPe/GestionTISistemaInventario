package com.jireh.Sistema.dto;

public class CatalogoItemDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String abreviatura;
    private Boolean estado;

    public CatalogoItemDTO() { }

    public CatalogoItemDTO(Long id, String nombre, String descripcion, String abreviatura, Boolean estado) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.abreviatura = abreviatura;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getAbreviatura() { return abreviatura; }
    public void setAbreviatura(String abreviatura) { this.abreviatura = abreviatura; }

    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }
}
