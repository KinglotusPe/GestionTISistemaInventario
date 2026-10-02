package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.CuentaPagar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CuentaPagarRepository extends JpaRepository<CuentaPagar, Long> {
    List<CuentaPagar> findAllByOrderByFechaEmisionDesc();
    List<CuentaPagar> findByEstadoNotOrderByFechaEmisionDesc(String estado);
    Optional<CuentaPagar> findByCompraId(Long compraId);
}
