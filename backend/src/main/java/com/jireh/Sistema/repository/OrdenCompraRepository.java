package com.jireh.Sistema.repository;

import com.jireh.Sistema.entity.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenCompraRepository extends JpaRepository<OrdenCompra, Long> {
    Optional<OrdenCompra> findByNumero(String numero);
    List<OrdenCompra> findAllByOrderByFechaDesc();
    List<OrdenCompra> findByEstadoOrderByFechaDesc(String estado);
}
