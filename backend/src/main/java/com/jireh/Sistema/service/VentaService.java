package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.DetalleVentaDTO;
import com.jireh.Sistema.dto.VentaDTO;
import com.jireh.Sistema.entity.*;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final UsuarioRepository usuarioRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;

    public VentaService(
            VentaRepository ventaRepository,
            ClienteRepository clienteRepository,
            ProductoRepository productoRepository,
            InventarioRepository inventarioRepository,
            MetodoPagoRepository metodoPagoRepository,
            UsuarioRepository usuarioRepository,
            MovimientoInventarioRepository movimientoInventarioRepository) {
        this.ventaRepository = ventaRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
        this.inventarioRepository = inventarioRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.usuarioRepository = usuarioRepository;
        this.movimientoInventarioRepository = movimientoInventarioRepository;
    }

    @Transactional(readOnly = true)
    public List<VentaDTO> listarVentas() {
        List<Venta> ventas = ventaRepository.findAll();
        List<VentaDTO> dtos = new ArrayList<>();
        for (Venta v : ventas) {
            VentaDTO dto = new VentaDTO();
            dto.setId(v.getId());
            dto.setNumero(v.getNumero());
            dto.setFecha(v.getFecha().toString());
            dto.setSubtotal(v.getSubtotal());
            dto.setIgv(v.getIgv());
            dto.setTotal(v.getTotal());
            dto.setEstado(v.getEstado());

            if (v.getCliente() != null) {
                dto.setClienteId(v.getCliente().getId());
                String nombreCompleto = (v.getCliente().getNombres() != null ? v.getCliente().getNombres() : "")
                        + " " + (v.getCliente().getApellidos() != null ? v.getCliente().getApellidos() : "");
                dto.setClienteNombre(nombreCompleto.trim().isEmpty() ? v.getCliente().getRazonSocial() : nombreCompleto.trim());
            }

            if (v.getMetodoPago() != null) {
                dto.setMetodoPagoId(v.getMetodoPago().getId());
                dto.setMetodoPagoNombre(v.getMetodoPago().getNombre());
            }

            if (v.getUsuario() != null) {
                dto.setUsuarioId(v.getUsuario().getId());
            }

            List<DetalleVentaDTO> detDtos = new ArrayList<>();
            for (DetalleVenta d : v.getDetalles()) {
                DetalleVentaDTO dDto = new DetalleVentaDTO();
                dDto.setId(d.getId());
                if (d.getProducto() != null) {
                    dDto.setProductoId(d.getProducto().getId());
                    dDto.setProductoCodigo(d.getProducto().getCodigo());
                    dDto.setProductoNombre(d.getProducto().getNombre());
                }
                dDto.setCantidad(d.getCantidad());
                dDto.setPrecioUnitario(d.getPrecioUnitario());
                dDto.setSubtotal(d.getSubtotal());
                detDtos.add(dDto);
            }
            dto.setDetalles(detDtos);
            dtos.add(dto);
        }
        return dtos;
    }

    @Transactional
    public VentaDTO registrarVenta(VentaDTO req) {
        if (req.getDetalles() == null || req.getDetalles().isEmpty()) {
            throw new BusinessException("La venta debe contener al menos un producto.");
        }

        Cliente cliente = null;
        if (req.getClienteId() != null) {
            cliente = clienteRepository.findById(req.getClienteId()).orElse(null);
        }
        if (cliente == null) {
            cliente = clienteRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("No existen clientes registrados para asociar la venta."));
        }

        MetodoPago metodoPago = null;
        if (req.getMetodoPagoId() != null) {
            metodoPago = metodoPagoRepository.findById(req.getMetodoPagoId()).orElse(null);
        }
        if (metodoPago == null) {
            metodoPago = metodoPagoRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("No existen métodos de pago registrados."));
        }

        Usuario usuario = usuarioRepository.findAll().stream().findFirst().orElse(null);

        long count = ventaRepository.count();
        String numeroVenta = req.getNumero() != null && !req.getNumero().isBlank()
                ? req.getNumero()
                : String.format("VNT-%06d", count + 101);

        Venta venta = new Venta();
        venta.setNumero(numeroVenta);
        venta.setFecha(LocalDateTime.now());
        venta.setEstado("COMPLETADA");
        venta.setCliente(cliente);
        venta.setMetodoPago(metodoPago);
        venta.setUsuario(usuario);

        BigDecimal total = req.getTotal() != null ? req.getTotal() : BigDecimal.ZERO;
        BigDecimal subtotal = req.getSubtotal() != null ? req.getSubtotal() : total.divide(BigDecimal.valueOf(1.18), 2, java.math.RoundingMode.HALF_UP);
        BigDecimal igv = req.getIgv() != null ? req.getIgv() : total.subtract(subtotal);

        venta.setSubtotal(subtotal);
        venta.setIgv(igv);
        venta.setTotal(total);

        List<DetalleVenta> detalles = new ArrayList<>();

        for (DetalleVentaDTO dReq : req.getDetalles()) {
            Producto prod = productoRepository.findById(dReq.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + dReq.getProductoId()));

            DetalleVenta detalle = new DetalleVenta();
            detalle.setVenta(venta);
            detalle.setProducto(prod);
            detalle.setCantidad(dReq.getCantidad());
            detalle.setPrecioUnitario(dReq.getPrecioUnitario() != null ? dReq.getPrecioUnitario() : prod.getPrecioVenta());
            detalle.setSubtotal(dReq.getSubtotal() != null ? dReq.getSubtotal() : detalle.getPrecioUnitario().multiply(BigDecimal.valueOf(dReq.getCantidad())));
            detalle.setDescuento(BigDecimal.ZERO);
            detalles.add(detalle);

            // Descontar inventario y registrar movimiento
            Inventario inv = inventarioRepository.findByProductoId(prod.getId()).orElse(null);
            int stockAnterior = inv != null ? inv.getStockActual() : 0;
            int stockPosterior = Math.max(0, stockAnterior - dReq.getCantidad());

            if (inv != null) {
                inv.setStockActual(stockPosterior);
                inv.setFechaActualizacion(LocalDateTime.now());
                inventarioRepository.save(inv);
            }

            MovimientoInventario mov = new MovimientoInventario();
            mov.setTipoMovimiento("SALIDA");
            mov.setCantidad(dReq.getCantidad());
            mov.setStockAnterior(stockAnterior);
            mov.setStockPosterior(stockPosterior);
            mov.setMotivo("Venta " + numeroVenta);
            mov.setFecha(LocalDateTime.now());
            mov.setProducto(prod);
            mov.setUsuario(usuario);
            movimientoInventarioRepository.save(mov);
        }

        venta.getDetalles().addAll(detalles);
        Venta guardada = ventaRepository.save(venta);

        req.setId(guardada.getId());
        req.setNumero(guardada.getNumero());
        req.setFecha(guardada.getFecha().toString());
        return req;
    }
}
