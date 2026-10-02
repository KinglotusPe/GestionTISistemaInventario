package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.CompraDTO;
import com.jireh.Sistema.dto.DetalleCompraDTO;
import com.jireh.Sistema.dto.DetalleOrdenCompraDTO;
import com.jireh.Sistema.dto.OrdenCompraDTO;
import com.jireh.Sistema.entity.Compra;
import com.jireh.Sistema.entity.CuentaPagar;
import com.jireh.Sistema.entity.DetalleCompra;
import com.jireh.Sistema.entity.DetalleOrdenCompra;
import com.jireh.Sistema.entity.Inventario;
import com.jireh.Sistema.entity.MovimientoInventario;
import com.jireh.Sistema.entity.OrdenCompra;
import com.jireh.Sistema.entity.Producto;
import com.jireh.Sistema.entity.Proveedor;
import com.jireh.Sistema.entity.Usuario;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.CompraRepository;
import com.jireh.Sistema.repository.CuentaPagarRepository;
import com.jireh.Sistema.repository.InventarioRepository;
import com.jireh.Sistema.repository.MovimientoInventarioRepository;
import com.jireh.Sistema.repository.OrdenCompraRepository;
import com.jireh.Sistema.repository.ProductoRepository;
import com.jireh.Sistema.repository.ProveedorRepository;
import com.jireh.Sistema.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompraService {

    private final CompraRepository compraRepository;
    private final OrdenCompraRepository ordenCompraRepository;
    private final ProveedorRepository proveedorRepository;
    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final MovimientoInventarioRepository movimientoInventarioRepository;
    private final CuentaPagarRepository cuentaPagarRepository;
    private final UsuarioRepository usuarioRepository;
    private final AuditoriaService auditoriaService;

    public CompraService(
            CompraRepository compraRepository,
            OrdenCompraRepository ordenCompraRepository,
            ProveedorRepository proveedorRepository,
            ProductoRepository productoRepository,
            InventarioRepository inventarioRepository,
            MovimientoInventarioRepository movimientoInventarioRepository,
            CuentaPagarRepository cuentaPagarRepository,
            UsuarioRepository usuarioRepository,
            AuditoriaService auditoriaService) {
        this.compraRepository = compraRepository;
        this.ordenCompraRepository = ordenCompraRepository;
        this.proveedorRepository = proveedorRepository;
        this.productoRepository = productoRepository;
        this.inventarioRepository = inventarioRepository;
        this.movimientoInventarioRepository = movimientoInventarioRepository;
        this.cuentaPagarRepository = cuentaPagarRepository;
        this.usuarioRepository = usuarioRepository;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public List<CompraDTO> listarCompras() {
        List<Compra> lista = compraRepository.findAllByOrderByFechaDesc();
        List<CompraDTO> dtos = new ArrayList<>();
        for (Compra c : lista) {
            dtos.add(convertirCompraADTO(c));
        }
        return dtos;
    }

    @Transactional
    public CompraDTO registrarCompra(CompraDTO req) {
        if (req.getProveedorId() == null) {
            throw new BusinessException("Debe seleccionar un proveedor para la compra.");
        }
        if (req.getDetalles() == null || req.getDetalles().isEmpty()) {
            throw new BusinessException("La compra debe incluir al menos un producto.");
        }

        Proveedor prov = proveedorRepository.findById(req.getProveedorId())
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con ID: " + req.getProveedorId()));

        Usuario usuario = usuarioRepository.findById(req.getUsuarioId() != null ? req.getUsuarioId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String num = req.getNumero() != null && !req.getNumero().trim().isEmpty()
                ? req.getNumero().trim()
                : "COM-" + String.format("%06d", compraRepository.count() + 101);

        Compra compra = new Compra();
        compra.setNumero(num);
        compra.setFecha(LocalDateTime.now());
        compra.setEstado("REGISTRADA");
        compra.setProveedor(prov);
        compra.setUsuario(usuario);

        BigDecimal subtotal = BigDecimal.ZERO;
        List<DetalleCompra> detalles = new ArrayList<>();

        for (DetalleCompraDTO d : req.getDetalles()) {
            Producto prod = productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + d.getProductoId()));

            int cant = d.getCantidad() != null && d.getCantidad() > 0 ? d.getCantidad() : 1;
            BigDecimal precio = d.getPrecioUnitario() != null ? d.getPrecioUnitario() : prod.getPrecioCompra();
            BigDecimal sub = precio.multiply(BigDecimal.valueOf(cant));
            subtotal = subtotal.add(sub);

            DetalleCompra item = new DetalleCompra();
            item.setCompra(compra);
            item.setProducto(prod);
            item.setCantidad(cant);
            item.setPrecioUnitario(precio);
            item.setSubtotal(sub);
            detalles.add(item);

            // Aumento de inventario
            Inventario inv = inventarioRepository.findByProductoId(prod.getId()).orElse(null);
            int stockAnt = inv != null ? inv.getStockActual() : 0;
            int stockPost = stockAnt + cant;

            if (inv != null) {
                inv.setStockActual(stockPost);
                inv.setFechaActualizacion(LocalDateTime.now());
                inventarioRepository.save(inv);
            }

            // Actualizar costo de producto
            prod.setPrecioCompra(precio);
            productoRepository.save(prod);

            // Movimiento de Kárdex
            MovimientoInventario mov = new MovimientoInventario();
            mov.setTipoMovimiento("COMPRA");
            mov.setCantidad(cant);
            mov.setStockAnterior(stockAnt);
            mov.setStockPosterior(stockPost);
            mov.setMotivo("Compra a proveedor " + prov.getRazonSocial() + " (" + num + ")");
            mov.setFecha(LocalDateTime.now());
            mov.setProducto(prod);
            mov.setUsuario(usuario);
            movimientoInventarioRepository.save(mov);
        }

        BigDecimal igv = subtotal.multiply(new BigDecimal("0.18"));
        BigDecimal total = subtotal.add(igv);

        compra.setSubtotal(subtotal);
        compra.setIgv(igv);
        compra.setTotal(total);
        compra.getDetalles().addAll(detalles);

        Compra guardada = compraRepository.save(compra);

        // Registro de Cuenta por Pagar
        CuentaPagar cxp = new CuentaPagar();
        cxp.setCompra(guardada);
        cxp.setProveedor(prov);
        cxp.setMontoTotal(total);
        cxp.setMontoPagado(total); // por defecto asumida pagada en contado salvo crédito
        cxp.setSaldoPendiente(BigDecimal.ZERO);
        cxp.setFechaEmision(LocalDateTime.now());
        cxp.setFechaVencimiento(LocalDate.now().plusDays(30));
        cxp.setEstado("PAGADA");
        cuentaPagarRepository.save(cxp);

        auditoriaService.registrar(usuario.getId(), usuario.getUsuario(), "COMPRAS", "REGISTRAR_COMPRA", "COMPRA", guardada.getId(), "Compra registrada " + guardada.getNumero() + " a " + prov.getRazonSocial() + " Total S/ " + total, null);

        return convertirCompraADTO(guardada);
    }

    @Transactional(readOnly = true)
    public List<OrdenCompraDTO> listarOrdenesCompra() {
        List<OrdenCompra> lista = ordenCompraRepository.findAllByOrderByFechaDesc();
        List<OrdenCompraDTO> dtos = new ArrayList<>();
        for (OrdenCompra oc : lista) {
            dtos.add(convertirOrdenADTO(oc));
        }
        return dtos;
    }

    @Transactional
    public OrdenCompraDTO crearOrdenCompra(OrdenCompraDTO req) {
        if (req.getProveedorId() == null) {
            throw new BusinessException("Debe seleccionar un proveedor para la orden de compra.");
        }
        if (req.getDetalles() == null || req.getDetalles().isEmpty()) {
            throw new BusinessException("La orden debe incluir al menos un producto.");
        }

        Proveedor prov = proveedorRepository.findById(req.getProveedorId())
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado"));

        Usuario usuario = usuarioRepository.findById(req.getUsuarioId() != null ? req.getUsuarioId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String num = "OC-" + String.format("%06d", ordenCompraRepository.count() + 101);

        OrdenCompra oc = new OrdenCompra();
        oc.setNumero(num);
        oc.setFecha(LocalDateTime.now());
        oc.setFechaEsperada(LocalDate.now().plusDays(5));
        oc.setEstado("PENDIENTE");
        oc.setObservaciones(req.getObservaciones());
        oc.setProveedor(prov);
        oc.setUsuario(usuario);

        BigDecimal subtotal = BigDecimal.ZERO;
        List<DetalleOrdenCompra> detalles = new ArrayList<>();

        for (DetalleOrdenCompraDTO d : req.getDetalles()) {
            Producto prod = productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            int cant = d.getCantidad() != null ? d.getCantidad() : 1;
            BigDecimal precio = d.getPrecioUnitario() != null ? d.getPrecioUnitario() : prod.getPrecioCompra();
            BigDecimal sub = precio.multiply(BigDecimal.valueOf(cant));
            subtotal = subtotal.add(sub);

            DetalleOrdenCompra item = new DetalleOrdenCompra();
            item.setOrdenCompra(oc);
            item.setProducto(prod);
            item.setCantidad(cant);
            item.setPrecioUnitario(precio);
            item.setSubtotal(sub);
            detalles.add(item);
        }

        BigDecimal igv = subtotal.multiply(new BigDecimal("0.18"));
        BigDecimal total = subtotal.add(igv);

        oc.setSubtotal(subtotal);
        oc.setIgv(igv);
        oc.setTotal(total);
        oc.setDetalles(detalles);

        OrdenCompra guardada = ordenCompraRepository.save(oc);
        auditoriaService.registrar(usuario.getId(), usuario.getUsuario(), "COMPRAS", "CREAR_ORDEN", "ORDEN_COMPRA", guardada.getId(), "Orden de compra generada " + guardada.getNumero() + " para " + prov.getRazonSocial(), null);

        return convertirOrdenADTO(guardada);
    }

    @Transactional
    public CompraDTO convertirOrdenEnCompra(Long ordenId, Long usuarioId) {
        OrdenCompra oc = ordenCompraRepository.findById(ordenId)
                .orElseThrow(() -> new ResourceNotFoundException("Orden de compra no encontrada"));

        if ("RECIBIDA".equals(oc.getEstado())) {
            throw new BusinessException("Esta orden de compra ya fue recepcionada.");
        }

        CompraDTO cReq = new CompraDTO();
        cReq.setProveedorId(oc.getProveedor().getId());
        cReq.setUsuarioId(usuarioId != null ? usuarioId : oc.getUsuario().getId());
        cReq.setNumero("F-" + oc.getNumero());

        List<DetalleCompraDTO> detList = new ArrayList<>();
        for (DetalleOrdenCompra d : oc.getDetalles()) {
            DetalleCompraDTO item = new DetalleCompraDTO();
            item.setProductoId(d.getProducto().getId());
            item.setCantidad(d.getCantidad());
            item.setPrecioUnitario(d.getPrecioUnitario());
            item.setSubtotal(d.getSubtotal());
            detList.add(item);
        }
        cReq.setDetalles(detList);

        CompraDTO compraRegistrada = registrarCompra(cReq);

        oc.setEstado("RECIBIDA");
        oc.setObservaciones((oc.getObservaciones() != null ? oc.getObservaciones() + " | " : "") + "Recepcionada en compra " + compraRegistrada.getNumero());
        ordenCompraRepository.save(oc);

        return compraRegistrada;
    }

    private CompraDTO convertirCompraADTO(Compra c) {
        CompraDTO d = new CompraDTO();
        d.setId(c.getId());
        d.setNumero(c.getNumero());
        d.setFecha(c.getFecha() != null ? c.getFecha().toString() : "");
        d.setEstado(c.getEstado());
        d.setSubtotal(c.getSubtotal());
        d.setIgv(c.getIgv());
        d.setTotal(c.getTotal());
        if (c.getProveedor() != null) {
            d.setProveedorId(c.getProveedor().getId());
            d.setProveedorRuc(c.getProveedor().getRuc());
            d.setProveedorRazonSocial(c.getProveedor().getRazonSocial());
        }
        if (c.getUsuario() != null) {
            d.setUsuarioId(c.getUsuario().getId());
        }
        List<DetalleCompraDTO> detDtos = new ArrayList<>();
        if (c.getDetalles() != null) {
            for (DetalleCompra item : c.getDetalles()) {
                DetalleCompraDTO dd = new DetalleCompraDTO();
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
        d.setDetalles(detDtos);
        return d;
    }

    private OrdenCompraDTO convertirOrdenADTO(OrdenCompra oc) {
        OrdenCompraDTO d = new OrdenCompraDTO();
        d.setId(oc.getId());
        d.setNumero(oc.getNumero());
        d.setFecha(oc.getFecha() != null ? oc.getFecha().toString() : "");
        d.setFechaEsperada(oc.getFechaEsperada() != null ? oc.getFechaEsperada().toString() : "");
        d.setSubtotal(oc.getSubtotal());
        d.setIgv(oc.getIgv());
        d.setTotal(oc.getTotal());
        d.setEstado(oc.getEstado());
        d.setObservaciones(oc.getObservaciones());
        if (oc.getProveedor() != null) {
            d.setProveedorId(oc.getProveedor().getId());
            d.setProveedorRuc(oc.getProveedor().getRuc());
            d.setProveedorRazonSocial(oc.getProveedor().getRazonSocial());
        }
        if (oc.getUsuario() != null) {
            d.setUsuarioId(oc.getUsuario().getId());
        }
        List<DetalleOrdenCompraDTO> detDtos = new ArrayList<>();
        if (oc.getDetalles() != null) {
            for (DetalleOrdenCompra item : oc.getDetalles()) {
                DetalleOrdenCompraDTO dd = new DetalleOrdenCompraDTO();
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
        d.setDetalles(detDtos);
        return d;
    }
}
