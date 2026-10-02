package com.jireh.Sistema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "empresa_config")
public class EmpresaConfig {

    @Id
    private Long id = 1L;

    @Column(name = "razon_social", nullable = false, length = 150)
    private String razonSocial;

    @Column(name = "nombre_comercial", nullable = false, length = 150)
    private String nombreComercial;

    @Column(nullable = false, length = 20)
    private String ruc;

    @Column(nullable = false, length = 200)
    private String direccion;

    @Column(length = 30)
    private String telefono;

    @Column(length = 100)
    private String correo;

    @Column(name = "moneda_simbolo", length = 10)
    private String monedaSimbolo = "S/";

    @Column(name = "moneda_nombre", length = 30)
    private String monedaNombre = "Soles";

    @Column(name = "igv_porcentaje", precision = 5, scale = 2)
    private BigDecimal igvPorcentaje = new BigDecimal("18.00");

    @Column(name = "mensaje_ticket", length = 250)
    private String mensajeTicket;

    public EmpresaConfig() {}

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
