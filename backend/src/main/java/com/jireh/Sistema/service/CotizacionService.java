package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.CotizacionDTO;
import com.jireh.Sistema.dto.DetalleCotizacionDTO;
import com.jireh.Sistema.dto.DetalleVentaDTO;
import com.jireh.Sistema.dto.VentaDTO;
import com.jireh.Sistema.entity.Cliente;
import com.jireh.Sistema.entity.Cotizacion;
import com.jireh.Sistema.entity.DetalleCotizacion;
import com.jireh.Sistema.entity.Producto;
import com.jireh.Sistema.entity.Usuario;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.ClienteRepository;
import com.jireh.Sistema.repository.CotizacionRepository;
import com.jireh.Sistema.repository.ProductoRepository;
import com.jireh.Sistema.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CotizacionService {

    private final CotizacionRepository cotizacionRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final VentaService ventaService;
    private final AuditoriaService auditoriaService;

    public CotizacionService(
            CotizacionRepository cotizacionRepository,
            ClienteRepository clienteRepository,
            ProductoRepository productoRepository,
            UsuarioRepository usuarioRepository,
            VentaService ventaService,
            AuditoriaService auditoriaService) {
        this.cotizacionRepository = cotizacionRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
        this.ventaService = ventaService;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public List<CotizacionDTO> listarCotizaciones() {
        List<Cotizacion> lista = cotizacionRepository.findAllByOrderByFechaDesc();
        List<CotizacionDTO> dtos = new ArrayList<>();
        for (Cotizacion c : lista) {
            dtos.add(convertirADTO(c));
        }
        return dtos;
    }

    @Transactional
    public CotizacionDTO crearCotizacion(CotizacionDTO req) {
        if (req.getDetalles() == null || req.getDetalles().isEmpty()) {
            throw new BusinessException("La cotización debe contener al menos un producto.");
        }

        Cliente cliente = clienteRepository.findById(req.getClienteId() != null ? req.getClienteId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado"));

        Usuario usuario = usuarioRepository.findById(req.getUsuarioId() != null ? req.getUsuarioId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        String numero = "COT-" + String.format("%06d", cotizacionRepository.count() + 101);

        Cotizacion cotizacion = new Cotizacion();
        cotizacion.setNumero(numero);
        cotizacion.setFecha(LocalDateTime.now());
        cotizacion.setVigenciaDias(req.getVigenciaDias() != null ? req.getVigenciaDias() : 15);
        cotizacion.setEstado("PENDIENTE");
        cotizacion.setObservaciones(req.getObservaciones());
        cotizacion.setCliente(cliente);
        cotizacion.setUsuario(usuario);

        BigDecimal subtotal = BigDecimal.ZERO;
        List<DetalleCotizacion> detalles = new ArrayList<>();

        for (DetalleCotizacionDTO d : req.getDetalles()) {
            Producto prod = productoRepository.findById(d.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

            DetalleCotizacion item = new DetalleCotizacion();
            item.setCotizacion(cotizacion);
            item.setProducto(prod);
            item.setNombrePresentacion(d.getNombrePresentacion() != null ? d.getNombrePresentacion() : "Unidad");
            item.setCantidad(d.getCantidad() != null ? d.getCantidad() : 1);
            item.setPrecioUnitario(d.getPrecioUnitario() != null ? d.getPrecioUnitario() : prod.getPrecioVenta());
            item.setDescuento(d.getDescuento() != null ? d.getDescuento() : BigDecimal.ZERO);

            BigDecimal lineSub = item.getPrecioUnitario().multiply(BigDecimal.valueOf(item.getCantidad())).subtract(item.getDescuento());
            item.setSubtotal(lineSub);
            subtotal = subtotal.add(lineSub);
            detalles.add(item);
        }

        BigDecimal igv = subtotal.multiply(new BigDecimal("0.18"));
        BigDecimal total = subtotal.add(igv);

        cotizacion.setSubtotal(subtotal);
        cotizacion.setIgv(igv);
        cotizacion.setTotal(total);
        cotizacion.setDetalles(detalles);

        Cotizacion guardada = cotizacionRepository.save(cotizacion);

        auditoriaService.registrar(usuario.getId(), usuario.getUsuario(), "VENTAS", "CREAR_COTIZACION", "COTIZACION", guardada.getId(), "Emisión de cotización " + guardada.getNumero() + " para " + cliente.getNombres(), null);

        return convertirADTO(guardada);
    }

    @Transactional
    public VentaDTO convertirEnVenta(Long cotizacionId, Long usuarioId, Long metodoPagoId) {
        Cotizacion cot = cotizacionRepository.findById(cotizacionId)
                .orElseThrow(() -> new ResourceNotFoundException("Cotización no encontrada"));

        if ("CONVERTIDA_EN_VENTA".equals(cot.getEstado())) {
            throw new BusinessException("Esta cotización ya fue convertida en una venta previamente.");
        }

        VentaDTO vReq = new VentaDTO();
        vReq.setClienteId(cot.getCliente().getId());
        vReq.setUsuarioId(usuarioId != null ? usuarioId : cot.getUsuario().getId());
        vReq.setMetodoPagoId(metodoPagoId != null ? metodoPagoId : 1L);

        List<DetalleVentaDTO> vDetalles = new ArrayList<>();
        for (DetalleCotizacion d : cot.getDetalles()) {
            DetalleVentaDTO dv = new DetalleVentaDTO();
            dv.setProductoId(d.getProducto().getId());
            dv.setCantidad(d.getCantidad());
            dv.setPrecioUnitario(d.getPrecioUnitario());
            dv.setSubtotal(d.getSubtotal());
            vDetalles.add(dv);
        }
        vReq.setDetalles(vDetalles);

        VentaDTO ventaEmitida = ventaService.registrarVenta(vReq);

        cot.setEstado("CONVERTIDA_EN_VENTA");
        cot.setObservaciones((cot.getObservaciones() != null ? cot.getObservaciones() + " | " : "") + "Convertida en venta " + ventaEmitida.getNumero());
        cotizacionRepository.save(cot);

        auditoriaService.registrar(usuarioId, "USUARIO", "VENTAS", "CONVERTIR_COTIZACION", "COTIZACION", cot.getId(), "Cotización " + cot.getNumero() + " convertida a venta " + ventaEmitida.getNumero(), null);

        return ventaEmitida;
    }

    private CotizacionDTO convertirADTO(Cotizacion c) {
        CotizacionDTO d = new CotizacionDTO();
        d.setId(c.getId());
        d.setNumero(c.getNumero());
        d.setFecha(c.getFecha() != null ? c.getFecha().toString() : "");
        d.setVigenciaDias(c.getVigenciaDias());
        d.setSubtotal(c.getSubtotal());
        d.setIgv(c.getIgv());
        d.setTotal(c.getTotal());
        d.setEstado(c.getEstado());
        d.setObservaciones(c.getObservaciones());

        if (c.getCliente() != null) {
            d.setClienteId(c.getCliente().getId());
            String nom = (c.getCliente().getNombres() != null ? c.getCliente().getNombres() : "")
                    + " " + (c.getCliente().getApellidos() != null ? c.getCliente().getApellidos() : "");
            d.setClienteNombre(nom.trim().isEmpty() ? c.getCliente().getRazonSocial() : nom.trim());
            d.setClienteDocumento(c.getCliente().getNumeroDocumento());
        }

        if (c.getUsuario() != null) {
            d.setUsuarioId(c.getUsuario().getId());
        }

        List<DetalleCotizacionDTO> detDtos = new ArrayList<>();
        if (c.getDetalles() != null) {
            for (DetalleCotizacion item : c.getDetalles()) {
                DetalleCotizacionDTO dd = new DetalleCotizacionDTO();
                dd.setId(item.getId());
                if (item.getProducto() != null) {
                    dd.setProductoId(item.getProducto().getId());
                    dd.setProductoCodigo(item.getProducto().getCodigo());
                    dd.setProductoNombre(item.getProducto().getNombre());
                }
                dd.setNombrePresentacion(item.getNombrePresentacion());
                dd.setCantidad(item.getCantidad());
                dd.setPrecioUnitario(item.getPrecioUnitario());
                dd.setDescuento(item.getDescuento());
                dd.setSubtotal(item.getSubtotal());
                detDtos.add(dd);
            }
        }
        d.setDetalles(detDtos);
        return d;
    }
}
