package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CuentaPagarDTO {
    private Long id;
    private Long compraId;
    private String compraNumero;
    private Long proveedorId;
    private String proveedorRazonSocial;
    private BigDecimal montoTotal;
    private BigDecimal montoPagado;
    private BigDecimal saldoPendiente;
    private String fechaEmision;
    private String fechaVencimiento;
    private String estado;
    private List<AbonoDTO> abonos = new ArrayList<>();

    public CuentaPagarDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCompraId() { return compraId; }
    public void setCompraId(Long compraId) { this.compraId = compraId; }
    public String getCompraNumero() { return compraNumero; }
    public void setCompraNumero(String compraNumero) { this.compraNumero = compraNumero; }
    public Long getProveedorId() { return proveedorId; }
    public void setProveedorId(Long proveedorId) { this.proveedorId = proveedorId; }
    public String getProveedorRazonSocial() { return proveedorRazonSocial; }
    public void setProveedorRazonSocial(String proveedorRazonSocial) { this.proveedorRazonSocial = proveedorRazonSocial; }
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
