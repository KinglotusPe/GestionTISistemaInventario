package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    Optional<Compra> findByNumero(String numero);
    List<Compra> findAllByOrderByFechaDesc();
    List<Compra> findByProveedorIdOrderByFechaDesc(Long proveedorId);
}
