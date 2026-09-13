package com.jireh.Sistema.dto;

public class MovimientoDTO {
    private Long id;
    private String tipoMovimiento;
    private Integer cantidad;
    private Integer stockAnterior;
    private Integer stockPosterior;
    private String motivo;
    private String fecha;
    private Long productoId;
    private String productoNombre;
    private Long usuarioId;

    public MovimientoDTO() { }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipoMovimiento() { return tipoMovimiento; }
    public void setTipoMovimiento(String tipoMovimiento) { this.tipoMovimiento = tipoMovimiento; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Integer getStockAnterior() { return stockAnterior; }
    public void setStockAnterior(Integer stockAnterior) { this.stockAnterior = stockAnterior; }

    public Integer getStockPosterior() { return stockPosterior; }
    public void setStockPosterior(Integer stockPosterior) { this.stockPosterior = stockPosterior; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public String getProductoNombre() { return productoNombre; }
    public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
