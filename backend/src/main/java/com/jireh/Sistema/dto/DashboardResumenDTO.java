package com.jireh.Sistema.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DashboardResumenDTO {
    private BigDecimal ventasHoy = BigDecimal.ZERO;
    private Long cantidadVentasHoy = 0L;
    private BigDecimal ventasMes = BigDecimal.ZERO;
    private BigDecimal comprasMes = BigDecimal.ZERO;
    private BigDecimal utilidadBrutaMes = BigDecimal.ZERO;
    private Long totalProductos = 0L;
    private Long productosStockBajo = 0L;
    private Long productosSinStock = 0L;
    private Long totalClientes = 0L;
    private Long totalProveedores = 0L;
    private BigDecimal totalPorCobrar = BigDecimal.ZERO;
    private BigDecimal totalPorPagar = BigDecimal.ZERO;
    private List<Map<String, Object>> topProductos = new ArrayList<>();
    private List<Map<String, Object>> ventasUltimosDias = new ArrayList<>();
    private List<Map<String, Object>> distribucionMetodosPago = new ArrayList<>();
    private List<VentaDTO> ultimasVentas = new ArrayList<>();
    private List<ProductoDTO> alertasStock = new ArrayList<>();

    public DashboardResumenDTO() {}

    public BigDecimal getVentasHoy() { return ventasHoy; }
    public void setVentasHoy(BigDecimal ventasHoy) { this.ventasHoy = ventasHoy; }
    public Long getCantidadVentasHoy() { return cantidadVentasHoy; }
    public void setCantidadVentasHoy(Long cantidadVentasHoy) { this.cantidadVentasHoy = cantidadVentasHoy; }
    public BigDecimal getVentasMes() { return ventasMes; }
    public void setVentasMes(BigDecimal ventasMes) { this.ventasMes = ventasMes; }
    public BigDecimal getComprasMes() { return comprasMes; }
    public void setComprasMes(BigDecimal comprasMes) { this.comprasMes = comprasMes; }
    public BigDecimal getUtilidadBrutaMes() { return utilidadBrutaMes; }
    public void setUtilidadBrutaMes(BigDecimal utilidadBrutaMes) { this.utilidadBrutaMes = utilidadBrutaMes; }
    public Long getTotalProductos() { return totalProductos; }
    public void setTotalProductos(Long totalProductos) { this.totalProductos = totalProductos; }
    public Long getProductosStockBajo() { return productosStockBajo; }
    public void setProductosStockBajo(Long productosStockBajo) { this.productosStockBajo = productosStockBajo; }
    public Long getProductosSinStock() { return productosSinStock; }
    public void setProductosSinStock(Long productosSinStock) { this.productosSinStock = productosSinStock; }
    public Long getTotalClientes() { return totalClientes; }
    public void setTotalClientes(Long totalClientes) { this.totalClientes = totalClientes; }
    public Long getTotalProveedores() { return totalProveedores; }
    public void setTotalProveedores(Long totalProveedores) { this.totalProveedores = totalProveedores; }
    public BigDecimal getTotalPorCobrar() { return totalPorCobrar; }
    public void setTotalPorCobrar(BigDecimal totalPorCobrar) { this.totalPorCobrar = totalPorCobrar; }
    public BigDecimal getTotalPorPagar() { return totalPorPagar; }
    public void setTotalPorPagar(BigDecimal totalPorPagar) { this.totalPorPagar = totalPorPagar; }
    public List<Map<String, Object>> getTopProductos() { return topProductos; }
    public void setTopProductos(List<Map<String, Object>> topProductos) { this.topProductos = topProductos; }
    public List<Map<String, Object>> getVentasUltimosDias() { return ventasUltimosDias; }
    public void setVentasUltimosDias(List<Map<String, Object>> ventasUltimosDias) { this.ventasUltimosDias = ventasUltimosDias; }
    public List<Map<String, Object>> getDistribucionMetodosPago() { return distribucionMetodosPago; }
    public void setDistribucionMetodosPago(List<Map<String, Object>> distribucionMetodosPago) { this.distribucionMetodosPago = distribucionMetodosPago; }
    public List<VentaDTO> getUltimasVentas() { return ultimasVentas; }
    public void setUltimasVentas(List<VentaDTO> ultimasVentas) { this.ultimasVentas = ultimasVentas; }
    public List<ProductoDTO> getAlertasStock() { return alertasStock; }
    public void setAlertasStock(List<ProductoDTO> alertasStock) { this.alertasStock = alertasStock; }
}
