package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CajaDTO {
    private Long id;
    private String nombre;
    private String fechaApertura;
    private String fechaCierre;
    private BigDecimal montoInicial;
    private BigDecimal totalVentasEfectivo;
    private BigDecimal totalVentasDigital;
    private BigDecimal totalIngresos;
    private BigDecimal totalEgresos;
    private BigDecimal montoEsperado;
    private BigDecimal montoContado;
    private BigDecimal diferencia;
    private String estado;
    private String observaciones;
    private Long usuarioId;
    private String usuarioNombre;
    private List<MovimientoCajaDTO> movimientos = new ArrayList<>();

    public CajaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getFechaApertura() { return fechaApertura; }
    public void setFechaApertura(String fechaApertura) { this.fechaApertura = fechaApertura; }
    public String getFechaCierre() { return fechaCierre; }
    public void setFechaCierre(String fechaCierre) { this.fechaCierre = fechaCierre; }
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
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public String getUsuarioNombre() { return usuarioNombre; }
    public void setUsuarioNombre(String usuarioNombre) { this.usuarioNombre = usuarioNombre; }
    public List<MovimientoCajaDTO> getMovimientos() { return movimientos; }
    public void setMovimientos(List<MovimientoCajaDTO> movimientos) { this.movimientos = movimientos; }
}
