package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermisoRepository extends JpaRepository<Permiso, Long> {
    Optional<Permiso> findByCodigo(String codigo);
    List<Permiso> findByModuloOrderByCodigoAsc(String modulo);
}
