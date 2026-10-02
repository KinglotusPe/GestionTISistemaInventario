package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CuentaCobrarDTO {
    private Long id;
    private Long ventaId;
    private String ventaNumero;
    private Long clienteId;
    private String clienteNombre;
    private BigDecimal montoTotal;
    private BigDecimal montoPagado;
    private BigDecimal saldoPendiente;
    private String fechaEmision;
    private String fechaVencimiento;
    private String estado;
    private List<AbonoDTO> abonos = new ArrayList<>();

    public CuentaCobrarDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVentaId() { return ventaId; }
    public void setVentaId(Long ventaId) { this.ventaId = ventaId; }
    public String getVentaNumero() { return ventaNumero; }
    public void setVentaNumero(String ventaNumero) { this.ventaNumero = ventaNumero; }
    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }
    public String getClienteNombre() { return clienteNombre; }
    public void setClienteNombre(String clienteNombre) { this.clienteNombre = clienteNombre; }
    public BigDecimal getMontoTotal() { return montoTotal; }
    public void setMontoTotal(BigDecimal montoTotal) { this.montoTotal = montoTotal; }
    public BigDecimal getMontoPagado() { return montoPagado; }
    public void setMontoPagado(BigDecimal montoPagado) { this.montoPagado = montoPagado; }
    public BigDecimal getSaldoPendiente() { return saldoPendiente; }
    public void setSaldoPendiente(BigDecimal saldoPendiente) { this.saldoPendiente = saldoPendiente; }
    public String getFechaEmision() { return fechaEmision; }
    public void setFechaEmision(String fechaEmision) { this.fechaEmision = fechaEmision; }
    public String getFechaVencimiento() { return fechaVencimiento; }
    public void setFechaVencimiento(String fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public List<AbonoDTO> getAbonos() { return abonos; }
    public void setAbonos(List<AbonoDTO> abonos) { this.abonos = abonos; }
}
