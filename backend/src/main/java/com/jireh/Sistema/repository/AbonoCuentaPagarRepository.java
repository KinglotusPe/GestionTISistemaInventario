package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.AbonoCuentaPagar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbonoCuentaPagarRepository extends JpaRepository<AbonoCuentaPagar, Long> {
    List<AbonoCuentaPagar> findByCuentaPagarIdOrderByFechaDesc(Long cuentaPagarId);
}
