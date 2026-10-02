package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Devolucion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DevolucionRepository extends JpaRepository<Devolucion, Long> {
    Optional<Devolucion> findByNumero(String numero);
    List<Devolucion> findAllByOrderByFechaDesc();
    List<Devolucion> findByVentaIdOrderByFechaDesc(Long ventaId);
}
