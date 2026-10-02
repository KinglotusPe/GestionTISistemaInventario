package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.EmpresaConfigDTO;
import com.jireh.Sistema.entity.EmpresaConfig;
import com.jireh.Sistema.repository.EmpresaConfigRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmpresaService {

    private final EmpresaConfigRepository empresaConfigRepository;
    private final AuditoriaService auditoriaService;

    public EmpresaService(EmpresaConfigRepository empresaConfigRepository, AuditoriaService auditoriaService) {
        this.empresaConfigRepository = empresaConfigRepository;
        this.auditoriaService = auditoriaService;
    }

    @Transactional(readOnly = true)
    public EmpresaConfigDTO obtenerConfiguracion() {
        EmpresaConfig c = empresaConfigRepository.findById(1L).orElseGet(() -> {
            EmpresaConfig nuevo = new EmpresaConfig();
            nuevo.setRazonSocial("PLASTIQUERÍA Y DESCARTABLES JIREH E.I.R.L.");
            nuevo.setNombreComercial("PLASTIQUERÍA JIREH");
            nuevo.setRuc("20608945123");
            nuevo.setDireccion("Av. Central 742, Mercado Mayorista, Lima");
            nuevo.setTelefono("01 458-9214 / 987 654 321");
            nuevo.setCorreo("contacto@plastiqueriajireh.pe");
            nuevo.setMonedaSimbolo("S/");
            nuevo.setMonedaNombre("Soles");
            nuevo.setMensajeTicket("¡Gracias por su compra! Distribución mayorista y minorista de plásticos y descartables.");
            return nuevo;
        });

        EmpresaConfigDTO d = new EmpresaConfigDTO();
        d.setId(c.getId());
        d.setRazonSocial(c.getRazonSocial());
        d.setNombreComercial(c.getNombreComercial());
        d.setRuc(c.getRuc());
        d.setDireccion(c.getDireccion());
        d.setTelefono(c.getTelefono());
        d.setCorreo(c.getCorreo());
        d.setMonedaSimbolo(c.getMonedaSimbolo());
        d.setMonedaNombre(c.getMonedaNombre());
        d.setIgvPorcentaje(c.getIgvPorcentaje());
        d.setMensajeTicket(c.getMensajeTicket());
        return d;
    }

    @Transactional
    public EmpresaConfigDTO actualizarConfiguracion(EmpresaConfigDTO dto) {
        EmpresaConfig c = empresaConfigRepository.findById(1L).orElseGet(EmpresaConfig::new);
        if (dto.getRazonSocial() != null) c.setRazonSocial(dto.getRazonSocial().trim());
        if (dto.getNombreComercial() != null) c.setNombreComercial(dto.getNombreComercial().trim());
        if (dto.getRuc() != null) c.setRuc(dto.getRuc().trim());
        if (dto.getDireccion() != null) c.setDireccion(dto.getDireccion().trim());
        if (dto.getTelefono() != null) c.setTelefono(dto.getTelefono().trim());
        if (dto.getCorreo() != null) c.setCorreo(dto.getCorreo().trim());
        if (dto.getMonedaSimbolo() != null) c.setMonedaSimbolo(dto.getMonedaSimbolo().trim());
        if (dto.getMonedaNombre() != null) c.setMonedaNombre(dto.getMonedaNombre().trim());
        if (dto.getIgvPorcentaje() != null) c.setIgvPorcentaje(dto.getIgvPorcentaje());
        if (dto.getMensajeTicket() != null) c.setMensajeTicket(dto.getMensajeTicket().trim());

        EmpresaConfig guardado = empresaConfigRepository.save(c);
        auditoriaService.registrar(null, "ADMIN", "SISTEMA", "CONFIG", "EMPRESA", 1L, "Actualización de datos comerciales de la empresa", null);

        dto.setId(guardado.getId());
        return dto;
    }
}
