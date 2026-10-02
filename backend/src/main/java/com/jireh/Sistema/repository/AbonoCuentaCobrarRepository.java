package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.AbonoCuentaCobrar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AbonoCuentaCobrarRepository extends JpaRepository<AbonoCuentaCobrar, Long> {
    List<AbonoCuentaCobrar> findByCuentaCobrarIdOrderByFechaDesc(Long cuentaCobrarId);
}
