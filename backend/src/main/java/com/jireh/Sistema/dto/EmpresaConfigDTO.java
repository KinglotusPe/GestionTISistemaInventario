package com.jireh.Sistema.dto;

import java.math.BigDecimal;

public class EmpresaConfigDTO {
    private Long id;
    private String razonSocial;
    private String nombreComercial;
    private String ruc;
    private String direccion;
    private String telefono;
    private String correo;
    private String monedaSimbolo;
    private String monedaNombre;
    private BigDecimal igvPorcentaje;
    private String mensajeTicket;

    public EmpresaConfigDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRazonSocial() { return razonSocial; }
    public void setRazonSocial(String razonSocial) { this.razonSocial = razonSocial; }
    public String getNombreComercial() { return nombreComercial; }
    public void setNombreComercial(String nombreComercial) { this.nombreComercial = nombreComercial; }
    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getMonedaSimbolo() { return monedaSimbolo; }
    public void setMonedaSimbolo(String monedaSimbolo) { this.monedaSimbolo = monedaSimbolo; }
    public String getMonedaNombre() { return monedaNombre; }
    public void setMonedaNombre(String monedaNombre) { this.monedaNombre = monedaNombre; }
    public BigDecimal getIgvPorcentaje() { return igvPorcentaje; }
    public void setIgvPorcentaje(BigDecimal igvPorcentaje) { this.igvPorcentaje = igvPorcentaje; }
    public String getMensajeTicket() { return mensajeTicket; }
    public void setMensajeTicket(String mensajeTicket) { this.mensajeTicket = mensajeTicket; }
}
