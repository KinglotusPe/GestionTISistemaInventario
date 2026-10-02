package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.ProductoDTO;
import com.jireh.Sistema.dto.ProductoPresentacionDTO;
import com.jireh.Sistema.entity.*;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final MarcaRepository marcaRepository;
    private final UnidadMedidaRepository unidadMedidaRepository;
    private final ProductoPresentacionRepository productoPresentacionRepository;

    public ProductoService(
            ProductoRepository productoRepository,
            InventarioRepository inventarioRepository,
            CategoriaRepository categoriaRepository,
            MarcaRepository marcaRepository,
            UnidadMedidaRepository unidadMedidaRepository,
            ProductoPresentacionRepository productoPresentacionRepository) {
        this.productoRepository = productoRepository;
        this.inventarioRepository = inventarioRepository;
        this.categoriaRepository = categoriaRepository;
        this.marcaRepository = marcaRepository;
        this.unidadMedidaRepository = unidadMedidaRepository;
        this.productoPresentacionRepository = productoPresentacionRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductoDTO> listarTodos() {
        List<Producto> productos = productoRepository.findAll();
        List<ProductoDTO> dtoList = new ArrayList<>();

        for (Producto p : productos) {
            ProductoDTO dto = toDTO(p);
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Transactional(readOnly = true)
    public ProductoDTO buscarPorId(Long id) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        return toDTO(p);
    }

    @Transactional
    public ProductoDTO guardar(ProductoDTO dto) {
        Producto p;
        if (dto.getId() != null && dto.getId() > 0) {
            p = productoRepository.findById(dto.getId()).orElse(null);
        } else {
            p = null;
        }

        List<Categoria> categorias = categoriaRepository.findAll();
        List<Marca> marcas = marcaRepository.findAll();
        List<UnidadMedida> unidades = unidadMedidaRepository.findAll();

        Categoria cat = dto.getCategoriaId() != null
                ? categoriaRepository.findById(dto.getCategoriaId()).orElse(categorias.get(0))
                : categorias.get(0);

        Marca marca = dto.getMarcaId() != null
                ? marcaRepository.findById(dto.getMarcaId()).orElse(marcas.get(0))
                : marcas.get(0);

        UnidadMedida um = dto.getUnidadMedidaId() != null
                ? unidadMedidaRepository.findById(dto.getUnidadMedidaId()).orElse(unidades.get(0))
                : unidades.get(0);

        if (p == null) {
            p = new Producto();
            String codigo = (dto.getCodigo() != null && !dto.getCodigo().isBlank())
                    ? dto.getCodigo()
                    : "PLAS-" + String.format("%03d", productoRepository.count() + 1);
            p.setCodigo(codigo);
            p.setNombre(dto.getNombre() != null ? dto.getNombre() : "Producto Sin Nombre");
            p.setDescripcion(dto.getDescripcion());
            p.setPrecioCompra(dto.getPrecioCompra() != null ? dto.getPrecioCompra() : BigDecimal.ZERO);
            p.setPrecioVenta(dto.getPrecioVenta() != null ? dto.getPrecioVenta() : BigDecimal.ZERO);
            p.setCategoria(cat);
            p.setMarca(marca);
            p.setUnidadMedida(um);
            p.setStockMinimo(dto.getStockMinimo() != null ? dto.getStockMinimo() : 10);
            p.setEstado(true);
            p = productoRepository.save(p);

            Inventario inv = new Inventario();
            inv.setProducto(p);
            inv.setStockActual(dto.getStockActual() != null ? dto.getStockActual() : 0);
            inv.setStockMaximo(dto.getStockMaximo() != null ? dto.getStockMaximo() : 100);
            inv.setUbicacion(dto.getUbicacion() != null ? dto.getUbicacion() : "Almacén Principal");
            inventarioRepository.save(inv);

            // Crear presentación default por unidad
            ProductoPresentacion defaultPres = new ProductoPresentacion();
            defaultPres.setProducto(p);
            defaultPres.setNombrePresentacion(um.getNombre());
            defaultPres.setFactorEquivalencia(BigDecimal.ONE);
            defaultPres.setPrecioCosto(p.getPrecioCompra());
            defaultPres.setPrecioVenta(p.getPrecioVenta());
            defaultPres.setPrecioMayorista(p.getPrecioVenta().multiply(new BigDecimal("0.90")));
            defaultPres.setEsDefault(true);
            defaultPres.setEstado(true);
            productoPresentacionRepository.save(defaultPres);
        } else {
            if (dto.getNombre() != null) p.setNombre(dto.getNombre());
            if (dto.getDescripcion() != null) p.setDescripcion(dto.getDescripcion());
            if (dto.getPrecioCompra() != null) p.setPrecioCompra(dto.getPrecioCompra());
            if (dto.getPrecioVenta() != null) p.setPrecioVenta(dto.getPrecioVenta());
            if (dto.getStockMinimo() != null) p.setStockMinimo(dto.getStockMinimo());
            p.setCategoria(cat);
            p.setMarca(marca);
            p.setUnidadMedida(um);
            p = productoRepository.save(p);

            Optional<Inventario> invOpt = inventarioRepository.findByProductoId(p.getId());
            if (invOpt.isPresent()) {
                Inventario inv = invOpt.get();
                if (dto.getStockActual() != null) inv.setStockActual(dto.getStockActual());
                if (dto.getStockMaximo() != null) inv.setStockMaximo(dto.getStockMaximo());
                if (dto.getUbicacion() != null) inv.setUbicacion(dto.getUbicacion());
                inventarioRepository.save(inv);
            }
        }

        // Si se enviaron presentaciones personalizadas
        if (dto.getPresentaciones() != null && !dto.getPresentaciones().isEmpty()) {
            for (ProductoPresentacionDTO pdto : dto.getPresentaciones()) {
                if (pdto.getId() == null || pdto.getId() <= 0) {
                    ProductoPresentacion np = new ProductoPresentacion();
                    np.setProducto(p);
                    np.setNombrePresentacion(pdto.getNombrePresentacion());
                    np.setFactorEquivalencia(pdto.getFactorEquivalencia() != null ? pdto.getFactorEquivalencia() : BigDecimal.ONE);
                    np.setPrecioCosto(pdto.getPrecioCosto() != null ? pdto.getPrecioCosto() : p.getPrecioCompra());
                    np.setPrecioVenta(pdto.getPrecioVenta() != null ? pdto.getPrecioVenta() : p.getPrecioVenta());
                    np.setPrecioMayorista(pdto.getPrecioMayorista());
                    np.setCodigoBarras(pdto.getCodigoBarras());
                    np.setEsDefault(pdto.getEsDefault() != null ? pdto.getEsDefault() : false);
                    np.setEstado(true);
                    productoPresentacionRepository.save(np);
                }
            }
        }

        return toDTO(p);
    }

    @Transactional
    public void desactivar(Long id) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        p.setEstado(false);
        productoRepository.save(p);
    }

    private ProductoDTO toDTO(Producto p) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setCodigo(p.getCodigo());
        dto.setNombre(p.getNombre());
        dto.setDescripcion(p.getDescripcion());
        dto.setPrecioCompra(p.getPrecioCompra());
        dto.setPrecioVenta(p.getPrecioVenta());
        dto.setStockMinimo(p.getStockMinimo());
        dto.setEstado(p.getEstado());

        if (p.getCategoria() != null) {
            dto.setCategoriaId(p.getCategoria().getId());
            dto.setCategoriaNombre(p.getCategoria().getNombre());
        }
        if (p.getMarca() != null) {
            dto.setMarcaId(p.getMarca().getId());
            dto.setMarcaNombre(p.getMarca().getNombre());
        }
        if (p.getUnidadMedida() != null) {
            dto.setUnidadMedidaId(p.getUnidadMedida().getId());
            dto.setUnidadMedidaNombre(p.getUnidadMedida().getNombre());
        }

        Optional<Inventario> inv = inventarioRepository.findByProductoId(p.getId());
        if (inv.isPresent()) {
            dto.setStockActual(inv.get().getStockActual());
            dto.setStockMaximo(inv.get().getStockMaximo());
            dto.setUbicacion(inv.get().getUbicacion());
        } else {
            dto.setStockActual(0);
            dto.setStockMaximo(100);
            dto.setUbicacion("Almacén Principal");
        }

        List<ProductoPresentacion> presList = productoPresentacionRepository.findByProductoIdAndEstadoTrue(p.getId());
        List<ProductoPresentacionDTO> pDtos = new ArrayList<>();
        for (ProductoPresentacion pres : presList) {
            ProductoPresentacionDTO pd = new ProductoPresentacionDTO();
            pd.setId(pres.getId());
            pd.setProductoId(p.getId());
            pd.setNombrePresentacion(pres.getNombrePresentacion());
            pd.setFactorEquivalencia(pres.getFactorEquivalencia());
            pd.setPrecioCosto(pres.getPrecioCosto());
            pd.setPrecioVenta(pres.getPrecioVenta());
            pd.setPrecioMayorista(pres.getPrecioMayorista());
            pd.setCodigoBarras(pres.getCodigoBarras());
            pd.setEsDefault(pres.getEsDefault());
            pd.setEstado(pres.getEstado());
            pDtos.add(pd);
        }
        dto.setPresentaciones(pDtos);

        return dto;
    }
}
