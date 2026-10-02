package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.AbonoDTO;
import com.jireh.Sistema.dto.CuentaCobrarDTO;
import com.jireh.Sistema.dto.CuentaPagarDTO;
import com.jireh.Sistema.entity.AbonoCuentaCobrar;
import com.jireh.Sistema.entity.AbonoCuentaPagar;
import com.jireh.Sistema.entity.CuentaCobrar;
import com.jireh.Sistema.entity.CuentaPagar;
import com.jireh.Sistema.entity.MetodoPago;
import com.jireh.Sistema.entity.Usuario;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.AbonoCuentaCobrarRepository;
import com.jireh.Sistema.repository.AbonoCuentaPagarRepository;
import com.jireh.Sistema.repository.CuentaCobrarRepository;
import com.jireh.Sistema.repository.CuentaPagarRepository;
import com.jireh.Sistema.repository.MetodoPagoRepository;
import com.jireh.Sistema.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FinanzasService {

    private final CuentaCobrarRepository cuentaCobrarRepository;
    private final AbonoCuentaCobrarRepository abonoCuentaCobrarRepository;
    private final CuentaPagarRepository cuentaPagarRepository;
    private final AbonoCuentaPagarRepository abonoCuentaPagarRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final UsuarioRepository usuarioRepository;
    private final AuditoriaService auditoriaService;

    public FinanzasService(
            CuentaCobrarRepository cuentaCobrarRepository,
            AbonoCuentaCobrarRepository abonoCuentaCobrarRepository,
            CuentaPagarRepository cuentaPagarRepository,
            AbonoCuentaPagarRepository abonoCuentaPagarRepository,
            MetodoPagoRepository metodoPagoRepository,
            UsuarioRepository usuarioRepository,
            AuditoriaService auditoriaService) {
        this.cuentaCobrarRepository = cuentaCobrarRepository;
        this.abonoCuentaCobrarRepository = abonoCuentaCobrarRepository;
        this.cuentaPagarRepository = cuentaPagarRepository;
        this.abonoCuentaPagarRepository = abonoCuentaPagarRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.usuarioRepository = usuarioRepository;
        this.auditoriaService = auditoriaService;
    }

    // ==================== CUENTAS POR COBRAR ====================
    @Transactional(readOnly = true)
    public List<CuentaCobrarDTO> listarCuentasCobrar() {
        List<CuentaCobrar> lista = cuentaCobrarRepository.findAllByOrderByFechaEmisionDesc();
        List<CuentaCobrarDTO> dtos = new ArrayList<>();
        for (CuentaCobrar c : lista) {
            CuentaCobrarDTO d = new CuentaCobrarDTO();
            d.setId(c.getId());
            d.setMontoTotal(c.getMontoTotal());
            d.setMontoPagado(c.getMontoPagado());
            d.setSaldoPendiente(c.getSaldoPendiente());
            d.setFechaEmision(c.getFechaEmision() != null ? c.getFechaEmision().toString() : "");
            d.setFechaVencimiento(c.getFechaVencimiento() != null ? c.getFechaVencimiento().toString() : "");
            d.setEstado(c.getEstado());

            if (c.getVenta() != null) {
                d.setVentaId(c.getVenta().getId());
                d.setVentaNumero(c.getVenta().getNumero());
            }
            if (c.getCliente() != null) {
                d.setClienteId(c.getCliente().getId());
                String nom = (c.getCliente().getNombres() != null ? c.getCliente().getNombres() : "")
                        + " " + (c.getCliente().getApellidos() != null ? c.getCliente().getApellidos() : "");
                d.setClienteNombre(nom.trim().isEmpty() ? c.getCliente().getRazonSocial() : nom.trim());
            }
            dtos.add(d);
        }
        return dtos;
    }

    @Transactional
    public CuentaCobrarDTO registrarAbonoCliente(AbonoDTO req) {
        if (req.getCuentaId() == null) throw new BusinessException("ID de cuenta por cobrar es requerido");
        if (req.getMonto() == null || req.getMonto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("El monto del abono debe ser mayor a 0");
        }

        CuentaCobrar c = cuentaCobrarRepository.findById(req.getCuentaId())
                .orElseThrow(() -> new ResourceNotFoundException("Cuenta por cobrar no encontrada"));

        MetodoPago mp = metodoPagoRepository.findById(req.getMetodoPagoId() != null ? req.getMetodoPagoId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado"));

        Usuario u = usuarioRepository.findById(req.getUsuarioId() != null ? req.getUsuarioId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        AbonoCuentaCobrar ab = new AbonoCuentaCobrar();
        ab.setCuentaCobrar(c);
        ab.setMonto(req.getMonto());
        ab.setFecha(LocalDateTime.now());
        ab.setMetodoPago(mp);
        ab.setNota(req.getNota());
        ab.setUsuario(u);
        abonoCuentaCobrarRepository.save(ab);

        c.setMontoPagado(c.getMontoPagado().add(req.getMonto()));
        BigDecimal nuevoSaldo = c.getMontoTotal().subtract(c.getMontoPagado());
        if (nuevoSaldo.compareTo(BigDecimal.ZERO) <= 0) {
            c.setSaldoPendiente(BigDecimal.ZERO);
            c.setEstado("PAGADA");
        } else {
            c.setSaldoPendiente(nuevoSaldo);
            c.setEstado("PARCIAL");
        }
        cuentaCobrarRepository.save(c);

        auditoriaService.registrar(u.getId(), u.getUsuario(), "FINANZAS", "ABONO_COBRAR", "CUENTA_COBRAR", c.getId(), "Abono recibido de S/ " + req.getMonto() + " a cuenta por cobrar " + c.getId(), null);

        CuentaCobrarDTO d = new CuentaCobrarDTO();
        d.setId(c.getId());
        d.setMontoTotal(c.getMontoTotal());
        d.setMontoPagado(c.getMontoPagado());
        d.setSaldoPendiente(c.getSaldoPendiente());
        d.setEstado(c.getEstado());
        return d;
    }

    // ==================== CUENTAS POR PAGAR ====================
    @Transactional(readOnly = true)
    public List<CuentaPagarDTO> listarCuentasPagar() {
        List<CuentaPagar> lista = cuentaPagarRepository.findAllByOrderByFechaEmisionDesc();
        List<CuentaPagarDTO> dtos = new ArrayList<>();
        for (CuentaPagar c : lista) {
            CuentaPagarDTO d = new CuentaPagarDTO();
            d.setId(c.getId());
            d.setMontoTotal(c.getMontoTotal());
            d.setMontoPagado(c.getMontoPagado());
            d.setSaldoPendiente(c.getSaldoPendiente());
            d.setFechaEmision(c.getFechaEmision() != null ? c.getFechaEmision().toString() : "");
            d.setFechaVencimiento(c.getFechaVencimiento() != null ? c.getFechaVencimiento().toString() : "");
            d.setEstado(c.getEstado());

            if (c.getCompra() != null) {
                d.setCompraId(c.getCompra().getId());
                d.setCompraNumero(c.getCompra().getNumero());
            }
            if (c.getProveedor() != null) {
                d.setProveedorId(c.getProveedor().getId());
                d.setProveedorRazonSocial(c.getProveedor().getRazonSocial());
            }
            dtos.add(d);
        }
        return dtos;
    }

    @Transactional
    public CuentaPagarDTO registrarAbonoProveedor(AbonoDTO req) {
        if (req.getCuentaId() == null) throw new BusinessException("ID de cuenta por pagar es requerido");
        if (req.getMonto() == null || req.getMonto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("El monto del abono debe ser mayor a 0");
        }

        CuentaPagar c = cuentaPagarRepository.findById(req.getCuentaId())
                .orElseThrow(() -> new ResourceNotFoundException("Cuenta por pagar no encontrada"));

        MetodoPago mp = metodoPagoRepository.findById(req.getMetodoPagoId() != null ? req.getMetodoPagoId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado"));

        Usuario u = usuarioRepository.findById(req.getUsuarioId() != null ? req.getUsuarioId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        AbonoCuentaPagar ab = new AbonoCuentaPagar();
        ab.setCuentaPagar(c);
        ab.setMonto(req.getMonto());
        ab.setFecha(LocalDateTime.now());
        ab.setMetodoPago(mp);
        ab.setNota(req.getNota());
        ab.setUsuario(u);
        abonoCuentaPagarRepository.save(ab);

        c.setMontoPagado(c.getMontoPagado().add(req.getMonto()));
        BigDecimal nuevoSaldo = c.getMontoTotal().subtract(c.getMontoPagado());
        if (nuevoSaldo.compareTo(BigDecimal.ZERO) <= 0) {
            c.setSaldoPendiente(BigDecimal.ZERO);
            c.setEstado("PAGADA");
        } else {
            c.setSaldoPendiente(nuevoSaldo);
            c.setEstado("PARCIAL");
        }
        cuentaPagarRepository.save(c);

        auditoriaService.registrar(u.getId(), u.getUsuario(), "FINANZAS", "ABONO_PAGAR", "CUENTA_PAGAR", c.getId(), "Abono realizado de S/ " + req.getMonto() + " a cuenta por pagar " + c.getId(), null);

        CuentaPagarDTO d = new CuentaPagarDTO();
        d.setId(c.getId());
        d.setMontoTotal(c.getMontoTotal());
        d.setMontoPagado(c.getMontoPagado());
        d.setSaldoPendiente(c.getSaldoPendiente());
        d.setEstado(c.getEstado());
        return d;
    }
}
