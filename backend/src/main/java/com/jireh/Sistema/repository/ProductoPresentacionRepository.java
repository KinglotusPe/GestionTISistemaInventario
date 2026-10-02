package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.ProductoPresentacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoPresentacionRepository extends JpaRepository<ProductoPresentacion, Long> {
    List<ProductoPresentacion> findByProductoIdAndEstadoTrue(Long productoId);
    Optional<ProductoPresentacion> findByCodigoBarras(String codigoBarras);
}
