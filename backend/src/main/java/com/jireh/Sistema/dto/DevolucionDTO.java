package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class DevolucionDTO {
    private Long id;
    private String numero;
    private String fecha;
    private String motivo;
    private BigDecimal totalDevuelto;
    private String estado;
    private Long ventaId;
    private String ventaNumero;
    private String clienteNombre;
    private Long usuarioId;
    private List<DetalleDevolucionDTO> detalles = new ArrayList<>();

    public DevolucionDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
    public BigDecimal getTotalDevuelto() { return totalDevuelto; }
    public void setTotalDevuelto(BigDecimal totalDevuelto) { this.totalDevuelto = totalDevuelto; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public Long getVentaId() { return ventaId; }
    public void setVentaId(Long ventaId) { this.ventaId = ventaId; }
    public String getVentaNumero() { return ventaNumero; }
    public void setVentaNumero(String ventaNumero) { this.ventaNumero = ventaNumero; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public List<DetalleDevolucionDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetalleDevolucionDTO> detalles) { this.detalles = detalles; }
}
