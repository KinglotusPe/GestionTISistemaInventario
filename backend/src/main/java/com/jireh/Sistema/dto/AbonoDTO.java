package com.jireh.Sistema.dto;

import java.math.BigDecimal;

public class AbonoDTO {
    private Long id;
    private Long cuentaId;
    private BigDecimal monto;
    private String fecha;
    private Long metodoPagoId;
    private String metodoPagoNombre;
    private String nota;
    private Long usuarioId;

    public AbonoDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCuentaId() { return cuentaId; }
    public void setCuentaId(Long cuentaId) { this.cuentaId = cuentaId; }
    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
    public Long getMetodoPagoId() { return metodoPagoId; }
    public void setMetodoPagoId(Long metodoPagoId) { this.metodoPagoId = metodoPagoId; }
    public String getMetodoPagoNombre() { return metodoPagoNombre; }
    public void setMetodoPagoNombre(String metodoPagoNombre) { this.metodoPagoNombre = metodoPagoNombre; }
    public String getNota() { return nota; }
    public void setNota(String nota) { this.nota = nota; }
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
