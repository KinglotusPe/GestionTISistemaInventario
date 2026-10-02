package com.jireh.Sistema.entity;

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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "caja")
public class Caja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String nombre = "Caja Principal";

    @Column(name = "fecha_apertura", nullable = false)
    private LocalDateTime fechaApertura = LocalDateTime.now();

    @Column(name = "fecha_cierre")
    private LocalDateTime fechaCierre;

    @Column(name = "monto_inicial", nullable = false, precision = 12, scale = 2)
    private BigDecimal montoInicial = BigDecimal.ZERO;

    @Column(name = "total_ventas_efectivo", precision = 12, scale = 2)
    private BigDecimal totalVentasEfectivo = BigDecimal.ZERO;

    @Column(name = "total_ventas_digital", precision = 12, scale = 2)
    private BigDecimal totalVentasDigital = BigDecimal.ZERO;

    @Column(name = "total_ingresos", precision = 12, scale = 2)
    private BigDecimal totalIngresos = BigDecimal.ZERO;

    @Column(name = "total_egresos", precision = 12, scale = 2)
    private BigDecimal totalEgresos = BigDecimal.ZERO;

    @Column(name = "monto_esperado", precision = 12, scale = 2)
    private BigDecimal montoEsperado = BigDecimal.ZERO;

    @Column(name = "monto_contado", precision = 12, scale = 2)
    private BigDecimal montoContado;

    @Column(precision = 12, scale = 2)
    private BigDecimal diferencia = BigDecimal.ZERO;

    @Column(nullable = false, length = 20)
    private String estado = "ABIERTA";

    @Column(length = 250)
    private String observaciones;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "caja", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<MovimientoCaja> movimientos = new ArrayList<>();

    public Caja() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public LocalDateTime getFechaApertura() { return fechaApertura; }
    public void setFechaApertura(LocalDateTime fechaApertura) { this.fechaApertura = fechaApertura; }
    public LocalDateTime getFechaCierre() { return fechaCierre; }
    public void setFechaCierre(LocalDateTime fechaCierre) { this.fechaCierre = fechaCierre; }
    public BigDecimal getMontoInicial() { return montoInicial; }
    public void setMontoInicial(BigDecimal montoInicial) { this.montoInicial = montoInicial; }
    public BigDecimal getTotalVentasEfectivo() { return totalVentasEfectivo; }
    public void setTotalVentasEfectivo(BigDecimal totalVentasEfectivo) { this.totalVentasEfectivo = totalVentasEfectivo; }
    public BigDecimal getTotalVentasDigital() { return totalVentasDigital; }
    public void setTotalVentasDigital(BigDecimal totalVentasDigital) { this.totalVentasDigital = totalVentasDigital; }
    public BigDecimal getTotalIngresos() { return totalIngresos; }
    public void setTotalIngresos(BigDecimal totalIngresos) { this.totalIngresos = totalIngresos; }
    public BigDecimal getTotalEgresos() { return totalEgresos; }
    public void setTotalEgresos(BigDecimal totalEgresos) { this.totalEgresos = totalEgresos; }
    public BigDecimal getMontoEsperado() { return montoEsperado; }
    public void setMontoEsperado(BigDecimal montoEsperado) { this.montoEsperado = montoEsperado; }
    public BigDecimal getMontoContado() { return montoContado; }
    public void setMontoContado(BigDecimal montoContado) { this.montoContado = montoContado; }
    public BigDecimal getDiferencia() { return diferencia; }
    public void setDiferencia(BigDecimal diferencia) { this.diferencia = diferencia; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public List<MovimientoCaja> getMovimientos() { return movimientos; }
    public void setMovimientos(List<MovimientoCaja> movimientos) { this.movimientos = movimientos; }
}
