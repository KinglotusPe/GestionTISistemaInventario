package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
    List<Auditoria> findTop100ByOrderByFechaHoraDesc();
    List<Auditoria> findByModuloOrderByFechaHoraDesc(String modulo);
}
