package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OrdenCompraDTO {
    private Long id;
    private String numero;
    private String fecha;
    private String fechaEsperada;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
    private String estado;
    private String observaciones;
    private Long proveedorId;
    private String proveedorRuc;
    private String proveedorRazonSocial;
    private Long usuarioId;
    private List<DetalleOrdenCompraDTO> detalles = new ArrayList<>();

    public OrdenCompraDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public String getFechaEsperada() { return fechaEsperada; }
    public void setFechaEsperada(String fechaEsperada) { this.fechaEsperada = fechaEsperada; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public BigDecimal getIgv() { return igv; }
    public void setIgv(BigDecimal igv) { this.igv = igv; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public Long getProveedorId() { return proveedorId; }
    public void setProveedorId(Long proveedorId) { this.proveedorId = proveedorId; }
    public String getProveedorRuc() { return proveedorRuc; }
    public void setProveedorRuc(String proveedorRuc) { this.proveedorRuc = proveedorRuc; }
    public String getProveedorRazonSocial() { return proveedorRazonSocial; }
    public void setProveedorRazonSocial(String proveedorRazonSocial) { this.proveedorRazonSocial = proveedorRazonSocial; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public List<DetalleOrdenCompraDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleOrdenCompraDTO> detalles) { this.detalles = detalles; }
}
