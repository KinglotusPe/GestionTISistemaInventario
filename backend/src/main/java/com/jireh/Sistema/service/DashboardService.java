package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.DashboardResumenDTO;
import com.jireh.Sistema.dto.ProductoDTO;
import com.jireh.Sistema.dto.VentaDTO;
import com.jireh.Sistema.entity.Compra;
import com.jireh.Sistema.entity.CuentaCobrar;
import com.jireh.Sistema.entity.CuentaPagar;
import com.jireh.Sistema.entity.DetalleVenta;
import com.jireh.Sistema.entity.Inventario;
import com.jireh.Sistema.entity.Producto;
import com.jireh.Sistema.entity.Venta;
import com.jireh.Sistema.repository.ClienteRepository;
import com.jireh.Sistema.repository.CompraRepository;
import com.jireh.Sistema.repository.CuentaCobrarRepository;
import com.jireh.Sistema.repository.CuentaPagarRepository;
import com.jireh.Sistema.repository.InventarioRepository;
import com.jireh.Sistema.repository.ProductoRepository;
import com.jireh.Sistema.repository.ProveedorRepository;
import com.jireh.Sistema.repository.VentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final VentaRepository ventaRepository;
    private final CompraRepository compraRepository;
    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final ClienteRepository clienteRepository;
    private final ProveedorRepository proveedorRepository;
    private final CuentaCobrarRepository cuentaCobrarRepository;
    private final CuentaPagarRepository cuentaPagarRepository;
    private final VentaService ventaService;

    public DashboardService(
            VentaRepository ventaRepository,
            CompraRepository compraRepository,
            ProductoRepository productoRepository,
            InventarioRepository inventarioRepository,
            ClienteRepository clienteRepository,
            ProveedorRepository proveedorRepository,
            CuentaCobrarRepository cuentaCobrarRepository,
            CuentaPagarRepository cuentaPagarRepository,
            VentaService ventaService) {
        this.ventaRepository = ventaRepository;
        this.compraRepository = compraRepository;
        this.productoRepository = productoRepository;
        this.inventarioRepository = inventarioRepository;
        this.clienteRepository = clienteRepository;
        this.proveedorRepository = proveedorRepository;
        this.cuentaCobrarRepository = cuentaCobrarRepository;
        this.cuentaPagarRepository = cuentaPagarRepository;
        this.ventaService = ventaService;
    }

    @Transactional(readOnly = true)
    public DashboardResumenDTO obtenerResumen() {
        DashboardResumenDTO dto = new DashboardResumenDTO();

        LocalDate hoy = LocalDate.now();
        List<Venta> todasVentas = ventaRepository.findAll();
        List<Compra> todasCompras = compraRepository.findAll();
        List<Inventario> inventarios = inventarioRepository.findAll();
        List<Producto> productos = productoRepository.findAll();

        // 1. Métricas de Ventas
        BigDecimal ventasHoy = BigDecimal.ZERO;
        long cantVentasHoy = 0;
        BigDecimal ventasMes = BigDecimal.ZERO;
        BigDecimal costoVentasMes = BigDecimal.ZERO;

        Map<String, BigDecimal> ventasPorDiaMap = new HashMap<>();
        Map<String, BigDecimal> ventasPorMetodo = new HashMap<>();
        Map<Long, Integer> cantPorProducto = new HashMap<>();
        Map<Long, BigDecimal> montoPorProducto = new HashMap<>();

        for (Venta v : todasVentas) {
            if ("ANULADA".equals(v.getEstado())) continue;

            LocalDate fVenta = v.getFecha() != null ? v.getFecha().toLocalDate() : hoy;
            BigDecimal totalV = v.getTotal() != null ? v.getTotal() : BigDecimal.ZERO;

            if (fVenta.equals(hoy)) {
                ventasHoy = ventasHoy.add(totalV);
                cantVentasHoy++;
            }

            if (fVenta.getMonthValue() == hoy.getMonthValue() && fVenta.getYear() == hoy.getYear()) {
                ventasMes = ventasMes.add(totalV);

                // Calcular costo de productos vendidos para utilidad real
                if (v.getDetalles() != null) {
                    for (DetalleVenta d : v.getDetalles()) {
                        if (d.getProducto() != null && d.getProducto().getPrecioCompra() != null) {
                            BigDecimal cost = d.getProducto().getPrecioCompra().multiply(BigDecimal.valueOf(d.getCantidad()));
                            costoVentasMes = costoVentasMes.add(cost);
                        }
                    }
                }
            }

            // Agrupar por últimos días
            String keyDia = fVenta.format(DateTimeFormatter.ofPattern("dd/MM"));
            ventasPorDiaMap.put(keyDia, ventasPorDiaMap.getOrDefault(keyDia, BigDecimal.ZERO).add(totalV));

            // Métodos de pago
            String metodo = v.getMetodoPago() != null ? v.getMetodoPago().getNombre() : "Efectivo";
            ventasPorMetodo.put(metodo, ventasPorMetodo.getOrDefault(metodo, BigDecimal.ZERO).add(totalV));

            // Ranking productos
            if (v.getDetalles() != null) {
                for (DetalleVenta d : v.getDetalles()) {
                    if (d.getProducto() != null) {
                        Long pid = d.getProducto().getId();
                        cantPorProducto.put(pid, cantPorProducto.getOrDefault(pid, 0) + d.getCantidad());
                        montoPorProducto.put(pid, montoPorProducto.getOrDefault(pid, BigDecimal.ZERO).add(d.getSubtotal()));
                    }
                }
            }
        }

        dto.setVentasHoy(ventasHoy);
        dto.setCantidadVentasHoy(cantVentasHoy);
        dto.setVentasMes(ventasMes);

        // 2. Compras del Mes
        BigDecimal comprasMes = BigDecimal.ZERO;
        for (Compra c : todasCompras) {
            LocalDate fC = c.getFecha() != null ? c.getFecha().toLocalDate() : hoy;
            if (fC.getMonthValue() == hoy.getMonthValue() && fC.getYear() == hoy.getYear()) {
                comprasMes = comprasMes.add(c.getTotal() != null ? c.getTotal() : BigDecimal.ZERO);
            }
        }
        dto.setComprasMes(comprasMes);

        // 3. Utilidad Real (Ventas mes - Costo de ventas)
        BigDecimal utilidad = ventasMes.subtract(costoVentasMes);
        dto.setUtilidadBrutaMes(utilidad.compareTo(BigDecimal.ZERO) >= 0 ? utilidad : BigDecimal.ZERO);

        // 4. Inventario y Alertas
        long stockBajo = 0;
        long sinStock = 0;
        List<ProductoDTO> alertas = new ArrayList<>();

        for (Inventario inv : inventarios) {
            Producto p = inv.getProducto();
            if (p != null) {
                int actual = inv.getStockActual();
                int min = p.getStockMinimo() != null ? p.getStockMinimo() : 5;
                if (actual <= 0) {
                    sinStock++;
                    ProductoDTO pd = new ProductoDTO();
                    pd.setId(p.getId());
                    pd.setCodigo(p.getCodigo());
                    pd.setNombre(p.getNombre());
                    pd.setStockActual(actual);
                    pd.setStockMinimo(min);
                    alertas.add(pd);
                } else if (actual <= min) {
                    stockBajo++;
                    ProductoDTO pd = new ProductoDTO();
                    pd.setId(p.getId());
                    pd.setCodigo(p.getCodigo());
                    pd.setNombre(p.getNombre());
                    pd.setStockActual(actual);
                    pd.setStockMinimo(min);
                    alertas.add(pd);
                }
            }
        }

        dto.setTotalProductos((long) productos.size());
        dto.setProductosStockBajo(stockBajo);
        dto.setProductosSinStock(sinStock);
        dto.setAlertasStock(alertas.stream().limit(8).collect(Collectors.toList()));

        // 5. Clientes y Proveedores
        dto.setTotalClientes(clienteRepository.count());
        dto.setTotalProveedores(proveedorRepository.count());

        // 6. Cuentas por Cobrar y Cuentas por Pagar
        BigDecimal saldoCobrar = BigDecimal.ZERO;
        for (CuentaCobrar cc : cuentaCobrarRepository.findAll()) {
            if (!"PAGADA".equals(cc.getEstado()) && cc.getSaldoPendiente() != null) {
                saldoCobrar = saldoCobrar.add(cc.getSaldoPendiente());
            }
        }
        dto.setTotalPorCobrar(saldoCobrar);

        BigDecimal saldoPagar = BigDecimal.ZERO;
        for (CuentaPagar cp : cuentaPagarRepository.findAll()) {
            if (!"PAGADA".equals(cp.getEstado()) && cp.getSaldoPendiente() != null) {
                saldoPagar = saldoPagar.add(cp.getSaldoPendiente());
            }
        }
        dto.setTotalPorPagar(saldoPagar);

        // 7. Top Productos Vendidos
        List<Map<String, Object>> topList = new ArrayList<>();
        Map<Long, Producto> prodMap = productos.stream().collect(Collectors.toMap(Producto::getId, p -> p));
        cantPorProducto.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue()))
                .limit(5)
                .forEach(entry -> {
                    Producto p = prodMap.get(entry.getKey());
                    if (p != null) {
                        Map<String, Object> item = new HashMap<>();
                        item.put("productoId", p.getId());
                        item.put("codigo", p.getCodigo());
                        item.put("nombre", p.getNombre());
                        item.put("cantidad", entry.getValue());
                        item.put("monto", montoPorProducto.getOrDefault(entry.getKey(), BigDecimal.ZERO));
                        topList.add(item);
                    }
                });
        dto.setTopProductos(topList);

        // 8. Gráfico Últimos 7 Días
        List<Map<String, Object>> diasList = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate d = hoy.minusDays(i);
            String fechaKey = d.format(DateTimeFormatter.ofPattern("dd/MM"));
            Map<String, Object> dm = new HashMap<>();
            dm.put("fecha", fechaKey);
            dm.put("total", ventasPorDiaMap.getOrDefault(fechaKey, BigDecimal.ZERO));
            diasList.add(dm);
        }
        dto.setVentasUltimosDias(diasList);

        // 9. Distribución Métodos de Pago
        List<Map<String, Object>> metodosList = new ArrayList<>();
        ventasPorMetodo.forEach((k, v) -> {
            Map<String, Object> mm = new HashMap<>();
            mm.put("metodo", k);
            mm.put("total", v);
            metodosList.add(mm);
        });
        dto.setDistribucionMetodosPago(metodosList);

        // 10. Últimas 5 Ventas
        List<VentaDTO> ultimas = ventaService.listarVentas().stream().limit(6).collect(Collectors.toList());
        dto.setUltimasVentas(ultimas);

        return dto;
    }
}
