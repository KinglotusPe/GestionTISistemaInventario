package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class VentaDTO {
    private Long id;
    private String numero;
    private String fecha;
    private Long clienteId;
    private String clienteNombre;
    private Long usuarioId;
    private Long metodoPagoId;
    private String metodoPagoNombre;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
    private String estado;
    private List<DetalleVentaDTO> detalles = new ArrayList<>();

    public VentaDTO() { }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Long getMetodoPagoId() { return metodoPagoId; }
    public void setMetodoPagoId(Long metodoPagoId) { this.metodoPagoId = metodoPagoId; }

    public String getMetodoPagoNombre() { return metodoPagoNombre; }
    public void setMetodoPagoNombre(String metodoPagoNombre) { this.metodoPagoNombre = metodoPagoNombre; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getIgv() { return igv; }
    public void setIgv(BigDecimal igv) { this.igv = igv; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public List<DetalleVentaDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleVentaDTO> detalles) { this.detalles = detalles; }
}
