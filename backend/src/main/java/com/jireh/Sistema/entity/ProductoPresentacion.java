package com.jireh.Sistema.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "producto_presentacion")
public class ProductoPresentacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(name = "nombre_presentacion", nullable = false, length = 80)
    private String nombrePresentacion;

    @Column(name = "factor_equivalencia", nullable = false, precision = 10, scale = 2)
    private BigDecimal factorEquivalencia = BigDecimal.ONE;

    @Column(name = "precio_costo", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioCosto = BigDecimal.ZERO;

    @Column(name = "precio_venta", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioVenta = BigDecimal.ZERO;

    @Column(name = "precio_mayorista", precision = 12, scale = 2)
    private BigDecimal precioMayorista;

    @Column(name = "codigo_barras", length = 50)
    private String codigoBarras;

    @Column(name = "es_default", nullable = false)
    private Boolean esDefault = false;

    @Column(nullable = false)
    private Boolean estado = true;

    public ProductoPresentacion() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
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
