package com.jireh.Sistema.dto;

import java.math.BigDecimal;

public class MovimientoCajaDTO {
    private Long id;
    private Long cajaId;
    private String tipo;
    private String concepto;
    private BigDecimal monto;
    private Long metodoPagoId;
    private String metodoPagoNombre;
    private String fecha;
    private Long usuarioId;

    public MovimientoCajaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCajaId() { return cajaId; }
    public void setCajaId(Long cajaId) { this.cajaId = cajaId; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getConcepto() { return concepto; }
    public void setConcepto(String concepto) { this.concepto = concepto; }
    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }
    public Long getMetodoPagoId() { return metodoPagoId; }
    public void setMetodoPagoId(Long metodoPagoId) { this.metodoPagoId = metodoPagoId; }
    public String getMetodoPagoNombre() { return metodoPagoNombre; }
    public void setMetodoPagoNombre(String metodoPagoNombre) { this.metodoPagoNombre = metodoPagoNombre; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
