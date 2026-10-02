package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.CajaDTO;
import com.jireh.Sistema.dto.MovimientoCajaDTO;
import com.jireh.Sistema.entity.Caja;
import com.jireh.Sistema.entity.MetodoPago;
import com.jireh.Sistema.entity.MovimientoCaja;
import com.jireh.Sistema.entity.Usuario;
import com.jireh.Sistema.exception.BusinessException;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.CajaRepository;
import com.jireh.Sistema.repository.MetodoPagoRepository;
import com.jireh.Sistema.repository.MovimientoCajaRepository;
import com.jireh.Sistema.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CajaService {

    private final CajaRepository cajaRepository;
    private final MovimientoCajaRepository movimientoCajaRepository;
    private final UsuarioRepository usuarioRepository;
    private final MetodoPagoRepository metodoPagoRepository;
    private final AuditoriaService auditoriaService;

    public CajaService(
            CajaRepository cajaRepository,
            MovimientoCajaRepository movimientoCajaRepository,
            UsuarioRepository usuarioRepository,
            MetodoPagoRepository metodoPagoRepository,
            AuditoriaService auditoriaService) {
        this.cajaRepository = cajaRepository;
        this.movimientoCajaRepository = movimientoCajaRepository;
        this.usuarioRepository = usuarioRepository;
        this.metodoPagoRepository = metodoPagoRepository;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public CajaDTO obtenerCajaActiva(Long usuarioId) {
        Caja caja = null;
        if (usuarioId != null) {
            caja = cajaRepository.findFirstByUsuarioIdAndEstadoOrderByFechaAperturaDesc(usuarioId, "ABIERTA").orElse(null);
        }
        if (caja == null) {
            caja = cajaRepository.findFirstByEstadoOrderByFechaAperturaDesc("ABIERTA").orElse(null);
        }
        if (caja == null) {
            return null;
        }
        return convertirADTO(caja, true);
    }

    @Transactional
    public CajaDTO abrirCaja(Long usuarioId, BigDecimal montoInicial, String observaciones) {
        Caja existente = cajaRepository.findFirstByEstadoOrderByFechaAperturaDesc("ABIERTA").orElse(null);
        if (existente != null) {
            return convertirADTO(existente, true);
        }

        Usuario usuario = usuarioRepository.findById(usuarioId != null ? usuarioId : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Caja caja = new Caja();
        caja.setNombre("Caja - " + usuario.getUsuario());
        caja.setFechaApertura(LocalDateTime.now());
        caja.setMontoInicial(montoInicial != null ? montoInicial : BigDecimal.ZERO);
        caja.setMontoEsperado(caja.getMontoInicial());
        caja.setEstado("ABIERTA");
        caja.setObservaciones(observaciones);
        caja.setUsuario(usuario);

        Caja guardada = cajaRepository.save(caja);

        auditoriaService.registrar(usuario.getId(), usuario.getUsuario(), "FINANZAS", "APERTURA_CAJA", "CAJA", guardada.getId(), "Apertura de caja con fondo inicial S/ " + caja.getMontoInicial(), null);

        return convertirADTO(guardada, false);
    }

    @Transactional
    public MovimientoCajaDTO registrarMovimiento(Long cajaId, String tipo, String concepto, BigDecimal monto, Long metodoPagoId, Long usuarioId) {
        Caja caja = cajaRepository.findById(cajaId)
                .orElseThrow(() -> new ResourceNotFoundException("Caja no encontrada"));

        if (!"ABIERTA".equals(caja.getEstado())) {
            throw new BusinessException("No se pueden registrar movimientos en una caja cerrada.");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId != null ? usuarioId : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        MovimientoCaja m = new MovimientoCaja();
        m.setCaja(caja);
        m.setTipo(tipo != null ? tipo.toUpperCase() : "INGRESO");
        m.setConcepto(concepto);
        m.setMonto(monto != null ? monto : BigDecimal.ZERO);
        m.setFecha(LocalDateTime.now());
        m.setUsuario(usuario);

        if (metodoPagoId != null) {
            MetodoPago mp = metodoPagoRepository.findById(metodoPagoId).orElse(null);
            m.setMetodoPago(mp);
        }

        if ("INGRESO".equals(m.getTipo()) || "VENTA".equals(m.getTipo()) || "COBRO".equals(m.getTipo())) {
            caja.setTotalIngresos(caja.getTotalIngresos().add(m.getMonto()));
            caja.setMontoEsperado(caja.getMontoEsperado().add(m.getMonto()));
        } else if ("EGRESO".equals(m.getTipo())) {
            caja.setTotalEgresos(caja.getTotalEgresos().add(m.getMonto()));
            caja.setMontoEsperado(caja.getMontoEsperado().subtract(m.getMonto()));
        }

        cajaRepository.save(caja);
        MovimientoCaja guardado = movimientoCajaRepository.save(m);

        MovimientoCajaDTO dto = new MovimientoCajaDTO();
        dto.setId(guardado.getId());
        dto.setCajaId(caja.getId());
        dto.setTipo(guardado.getTipo());
        dto.setConcepto(guardado.getConcepto());
        dto.setMonto(guardado.getMonto());
        dto.setFecha(guardado.getFecha().toString());
        dto.setUsuarioId(usuario.getId());
        return dto;
    }

    @Transactional
    public CajaDTO cerrarCaja(Long cajaId, BigDecimal montoContado, String observaciones, Long usuarioId) {
        Caja caja = cajaRepository.findById(cajaId)
                .orElseThrow(() -> new ResourceNotFoundException("Caja no encontrada"));

        if (!"ABIERTA".equals(caja.getEstado())) {
            throw new BusinessException("La caja ya se encuentra cerrada.");
        }

        caja.setFechaCierre(LocalDateTime.now());
        caja.setEstado("CERRADA");
        caja.setMontoContado(montoContado != null ? montoContado : caja.getMontoEsperado());
        caja.setDiferencia(caja.getMontoContado().subtract(caja.getMontoEsperado()));
        if (observaciones != null) {
            caja.setObservaciones((caja.getObservaciones() != null ? caja.getObservaciones() + " | " : "") + observaciones);
        }

        Caja guardada = cajaRepository.save(caja);

        auditoriaService.registrar(usuarioId, "USUARIO", "FINANZAS", "CIERRE_CAJA", "CAJA", guardada.getId(), "Cierre y arqueo de caja. Esperado: S/ " + caja.getMontoEsperado() + " - Contado: S/ " + caja.getMontoContado() + " - Dif: S/ " + caja.getDiferencia(), null);

        return convertirADTO(guardada, true);
    }

    @Transactional(readOnly = true)
    public List<CajaDTO> listarHistorialCajas() {
        List<Caja> lista = cajaRepository.findAllByOrderByFechaAperturaDesc();
        List<CajaDTO> dtos = new ArrayList<>();
        for (Caja c : lista) {
            dtos.add(convertirADTO(c, false));
        }
        return dtos;
    }

    private CajaDTO convertirADTO(Caja c, boolean cargarMovimientos) {
        CajaDTO d = new CajaDTO();
        d.setId(c.getId());
        d.setNombre(c.getNombre());
        d.setFechaApertura(c.getFechaApertura() != null ? c.getFechaApertura().toString() : "");
        d.setFechaCierre(c.getFechaCierre() != null ? c.getFechaCierre().toString() : "");
        d.setMontoInicial(c.getMontoInicial());
        d.setTotalVentasEfectivo(c.getTotalVentasEfectivo());
        d.setTotalVentasDigital(c.getTotalVentasDigital());
        d.setTotalIngresos(c.getTotalIngresos());
        d.setTotalEgresos(c.getTotalEgresos());
        d.setMontoEsperado(c.getMontoEsperado());
        d.setMontoContado(c.getMontoContado());
        d.setDiferencia(c.getDiferencia());
        d.setEstado(c.getEstado());
        d.setObservaciones(c.getObservaciones());
        if (c.getUsuario() != null) {
            d.setUsuarioId(c.getUsuario().getId());
            d.setUsuarioNombre(c.getUsuario().getNombres() + " " + c.getUsuario().getApellidos());
        }
        if (cargarMovimientos) {
            List<MovimientoCaja> movs = movimientoCajaRepository.findByCajaIdOrderByFechaDesc(c.getId());
            List<MovimientoCajaDTO> mDtos = new ArrayList<>();
            for (MovimientoCaja m : movs) {
                MovimientoCajaDTO md = new MovimientoCajaDTO();
                md.setId(m.getId());
                md.setCajaId(c.getId());
                md.setTipo(m.getTipo());
                md.setConcepto(m.getConcepto());
                md.setMonto(m.getMonto());
                md.setFecha(m.getFecha() != null ? m.getFecha().toString() : "");
                if (m.getMetodoPago() != null) {
                    md.setMetodoPagoId(m.getMetodoPago().getId());
                    md.setMetodoPagoNombre(m.getMetodoPago().getNombre());
                }
                mDtos.add(md);
            }
            d.setMovimientos(mDtos);
        }
        return d;
    }
}
