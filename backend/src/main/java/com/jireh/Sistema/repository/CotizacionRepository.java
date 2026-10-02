package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Cotizacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CotizacionRepository extends JpaRepository<Cotizacion, Long> {
    Optional<Cotizacion> findByNumero(String numero);
    List<Cotizacion> findAllByOrderByFechaDesc();
    List<Cotizacion> findByEstadoOrderByFechaDesc(String estado);
}
