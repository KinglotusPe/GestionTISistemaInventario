package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.CuentaCobrar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CuentaCobrarRepository extends JpaRepository<CuentaCobrar, Long> {
    List<CuentaCobrar> findAllByOrderByFechaEmisionDesc();
    List<CuentaCobrar> findByEstadoNotOrderByFechaEmisionDesc(String estado);
    Optional<CuentaCobrar> findByVentaId(Long ventaId);
}
