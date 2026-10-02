package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.DetalleDevolucionDTO;
import com.jireh.Sistema.dto.DevolucionDTO;
import com.jireh.Sistema.entity.DetalleDevolucion;
import com.jireh.Sistema.entity.Devolucion;
import com.jireh.Sistema.entity.Inventario;
import com.jireh.Sistema.entity.MovimientoInventario;
import com.jireh.Sistema.entity.Producto;
import com.jireh.Sistema.entity.Usuario;
import com.jireh.Sistema.entity.Venta;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.DevolucionRepository;
import com.jireh.Sistema.repository.InventarioRepository;
import com.jireh.Sistema.repository.MovimientoInventarioRepository;
import com.jireh.Sistema.repository.ProductoRepository;
import com.jireh.Sistema.repository.UsuarioRepository;
import com.jireh.Sistema.repository.VentaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DevolucionService {

    private final DevolucionRepository devolucionRepository;
    private final VentaRepository ventaRepository;
    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final UsuarioRepository usuarioRepository;
    private final AuditoriaService auditoriaService;

    public DevolucionService(
            DevolucionRepository devolucionRepository,
            VentaRepository ventaRepository,
            ProductoRepository productoRepository,
            InventarioRepository inventarioRepository,
            MovimientoInventarioRepository movimientoInventarioRepository,
            UsuarioRepository usuarioRepository,
            AuditoriaService auditoriaService) {
        this.devolucionRepository = devolucionRepository;
        this.ventaRepository = ventaRepository;
        this.productoRepository = productoRepository;
        this.inventarioRepository = inventarioRepository;
        this.movimientoInventarioRepository = movimientoInventarioRepository;
        this.usuarioRepository = usuarioRepository;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public List<DevolucionDTO> listarDevoluciones() {
        List<Devolucion> lista = devolucionRepository.findAllByOrderByFechaDesc();
        List<DevolucionDTO> dtos = new ArrayList<>();
        for (Devolucion d : lista) {
            dtos.add(convertirADTO(d));
        }
        return dtos;
    }

    @Transactional
    public DevolucionDTO registrarDevolucion(DevolucionDTO req) {
        if (req.getVentaId() == null) {
            throw new BusinessException("Debe especificar la venta a la cual pertenece la devolución.");
        }
        if (req.getDetalles() == null || req.getDetalles().isEmpty()) {
            throw new BusinessException("Debe indicar al menos un producto a devolver.");
        }

        Venta venta = ventaRepository.findById(req.getVentaId())
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con ID: " + req.getVentaId()));

        Usuario usuario = usuarioRepository.findById(req.getUsuarioId() != null ? req.getUsuarioId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String numero = "DEV-" + String.format("%06d", devolucionRepository.count() + 101);

        Devolucion dev = new Devolucion();
        dev.setNumero(numero);
        dev.setFecha(LocalDateTime.now());
        dev.setMotivo(req.getMotivo() != null ? req.getMotivo() : "Devolución por defecto o cambio");
        dev.setVenta(venta);
        dev.setUsuario(usuario);
        dev.setEstado("PROCESADA");

        BigDecimal totalDev = BigDecimal.ZERO;
        List<DetalleDevolucion> detalles = new ArrayList<>();

        for (DetalleDevolucionDTO d : req.getDetalles()) {
            Producto prod = productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            int cantDevuelta = d.getCantidad() != null && d.getCantidad() > 0 ? d.getCantidad() : 1;
            BigDecimal precio = d.getPrecioUnitario() != null ? d.getPrecioUnitario() : prod.getPrecioVenta();
            BigDecimal sub = precio.multiply(BigDecimal.valueOf(cantDevuelta));
            totalDev = totalDev.add(sub);

            DetalleDevolucion item = new DetalleDevolucion();
            item.setDevolucion(dev);
            item.setProducto(prod);
            item.setCantidad(cantDevuelta);
            item.setPrecioUnitario(precio);
            item.setSubtotal(sub);
            detalles.add(item);

            // Restitución automática a inventario
            Inventario inv = inventarioRepository.findByProductoId(prod.getId()).orElse(null);
            int stockAnt = inv != null ? inv.getStockActual() : 0;
            int stockPost = stockAnt + cantDevuelta;

            if (inv != null) {
                inv.setStockActual(stockPost);
                inv.setFechaActualizacion(LocalDateTime.now());
                inventarioRepository.save(inv);
            }

            // Registrar movimiento de restitución en Kárdex
            MovimientoInventario mov = new MovimientoInventario();
            mov.setTipoMovimiento("DEVOLUCION_VENTA");
            mov.setCantidad(cantDevuelta);
            mov.setStockAnterior(stockAnt);
            mov.setStockPosterior(stockPost);
            mov.setMotivo("Devolución de venta " + venta.getNumero() + " (" + numero + "): " + dev.getMotivo());
            mov.setFecha(LocalDateTime.now());
            mov.setProducto(prod);
            mov.setUsuario(usuario);
            movimientoInventarioRepository.save(mov);
        }

        dev.setTotalDevuelto(totalDev);
        dev.setDetalles(detalles);

        // Actualizar estado de la venta
        venta.setEstado("DEVUELTA");
        ventaRepository.save(venta);

        Devolucion guardada = devolucionRepository.save(dev);

        auditoriaService.registrar(usuario.getId(), usuario.getUsuario(), "VENTAS", "DEVOLUCION", "DEVOLUCION", guardada.getId(), "Devolución registrada " + guardada.getNumero() + " sobre venta " + venta.getNumero() + " por monto S/ " + totalDev, null);

        return convertirADTO(guardada);
    }

    private DevolucionDTO convertirADTO(Devolucion d) {
        DevolucionDTO dto = new DevolucionDTO();
        dto.setId(d.getId());
        dto.setNumero(d.getNumero());
        dto.setFecha(d.getFecha() != null ? d.getFecha().toString() : "");
        dto.setMotivo(d.getMotivo());
        dto.setTotalDevuelto(d.getTotalDevuelto());
        dto.setEstado(d.getEstado());

        if (d.getVenta() != null) {
            dto.setVentaId(d.getVenta().getId());
            dto.setVentaNumero(d.getVenta().getNumero());
            if (d.getVenta().getCliente() != null) {
                String nom = (d.getVenta().getCliente().getNombres() != null ? d.getVenta().getCliente().getNombres() : "")
                        + " " + (d.getVenta().getCliente().getApellidos() != null ? d.getVenta().getCliente().getApellidos() : "");
                dto.setClienteNombre(nom.trim().isEmpty() ? d.getVenta().getCliente().getRazonSocial() : nom.trim());
            }
        }

        if (d.getUsuario() != null) {
            dto.setUsuarioId(d.getUsuario().getId());
        }

        List<DetalleDevolucionDTO> detDtos = new ArrayList<>();
        if (d.getDetalles() != null) {
            for (DetalleDevolucion item : d.getDetalles()) {
                DetalleDevolucionDTO dd = new DetalleDevolucionDTO();
                dd.setId(item.getId());
                if (item.getProducto() != null) {
                    dd.setProductoId(item.getProducto().getId());
                    dd.setProductoCodigo(item.getProducto().getCodigo());
                    dd.setProductoNombre(item.getProducto().getNombre());
                }
                dd.setCantidad(item.getCantidad());
                dd.setPrecioUnitario(item.getPrecioUnitario());
                dd.setSubtotal(item.getSubtotal());
                detDtos.add(dd);
            }
        }
        dto.setDetalles(detDtos);
        return dto;
    }
}
