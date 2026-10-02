package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Caja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CajaRepository extends JpaRepository<Caja, Long> {
    Optional<Caja> findFirstByEstadoOrderByFechaAperturaDesc(String estado);
    Optional<Caja> findFirstByUsuarioIdAndEstadoOrderByFechaAperturaDesc(Long usuarioId, String estado);
    List<Caja> findAllByOrderByFechaAperturaDesc();
}
