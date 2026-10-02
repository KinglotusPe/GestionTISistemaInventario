package com.jireh.Sistema.dto;

import java.math.BigDecimal;

public class ProductoPresentacionDTO {
    private Long id;
    private Long productoId;
    private String nombrePresentacion;
    private BigDecimal factorEquivalencia;
    private BigDecimal precioCosto;
    private BigDecimal precioVenta;
    private BigDecimal precioMayorista;
    private String codigoBarras;
    private Boolean esDefault;
    private Boolean estado;

    public ProductoPresentacionDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    public String getNombrePresentacion() { return nombrePresentacion; }
    public void setNombrePresentacion(String nombrePresentacion) { this.nombrePresentacion = nombrePresentacion; }
    public BigDecimal getFactorEquivalencia() { return factorEquivalencia; }
    public void setFactorEquivalencia(BigDecimal factorEquivalencia) { this.factorEquivalencia = factorEquivalencia; }
    public BigDecimal getPrecioCosto() { return precioCosto; }
    public void setPrecioCosto(BigDecimal precioCosto) { this.precioCosto = precioCosto; }
    public BigDecimal getPrecioVenta() { return precioVenta; }
    public void setPrecioVenta(BigDecimal precioVenta) { this.precioVenta = precioVenta; }
    public BigDecimal getPrecioMayorista() { return precioMayorista; }
    public void setPrecioMayorista(BigDecimal precioMayorista) { this.precioMayorista = precioMayorista; }
    public String getCodigoBarras() { return codigoBarras; }
    public void setCodigoBarras(String codigoBarras) { this.codigoBarras = codigoBarras; }
    public Boolean getEsDefault() { return esDefault; }
    public void setEsDefault(Boolean esDefault) { this.esDefault = esDefault; }
    public Boolean getEstado() { return estado; }
    public void setEstado(Boolean estado) { this.estado = estado; }
}
