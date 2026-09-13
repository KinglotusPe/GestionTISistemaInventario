package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Inventario;
import com.jireh.Sistema.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> {
    Optional<Inventario> findByProducto(Producto producto);
    Optional<Inventario> findByProductoId(Long productoId);
}
