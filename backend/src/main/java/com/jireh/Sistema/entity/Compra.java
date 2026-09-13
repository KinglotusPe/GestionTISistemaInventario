package com.jireh.Sistema.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String numero;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal igv = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    // Relación con proveedor
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "proveedor_id", nullable = false)
    private Proveedor proveedor;

    // Relación con usuario
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Relación con detalles de compra
    @OneToMany(
        mappedBy = "compra",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<DetalleCompra> detalles = new ArrayList<>();

    // Constructor requerido por JPA
    public Compra() {
    }

    // Constructor para crear una compra
    public Compra(String numero, Proveedor proveedor, Usuario usuario) {
        this.numero = numero;
        this.proveedor = proveedor;
        this.usuario = usuario;
        this.fecha = LocalDateTime.now();
        this.estado = "REGISTRADA";
        this.subtotal = BigDecimal.ZERO;
        this.igv = BigDecimal.ZERO;
        this.total = BigDecimal.ZERO;
    }

    public Long getId() {
        return id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getIgv() {
        return igv;
    }

    public void setIgv(BigDecimal igv) {
        this.igv = igv;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<DetalleCompra> getDetalles() {
        return detalles;
    }

    // Agregar detalle
    public void agregarDetalle(DetalleCompra detalle) {
        detalles.add(detalle);
        detalle.setCompra(this);
    }

    // Eliminar detalle
    public void eliminarDetalle(DetalleCompra detalle) {
        detalles.remove(detalle);
        detalle.setCompra(null);
    }
}