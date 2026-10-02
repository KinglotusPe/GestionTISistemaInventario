package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.EmpresaConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaConfigRepository extends JpaRepository<EmpresaConfig, Long> {
}
