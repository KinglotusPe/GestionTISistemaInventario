package com.jireh.Sistema.service;

import com.jireh.Sistema.dto.ClienteDTO;
import com.jireh.Sistema.entity.Cliente;
import com.jireh.Sistema.exception.ResourceNotFoundException;
import com.jireh.Sistema.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional(readOnly = true)
    public List<ClienteDTO> listarTodos() {
        List<Cliente> clientes = clienteRepository.findAll();
        List<ClienteDTO> dtos = new ArrayList<>();
        for (Cliente c : clientes) {
            dtos.add(toDTO(c));
        }
        return dtos;
    }

    @Transactional(readOnly = true)
    public ClienteDTO buscarPorId(Long id) {
        Cliente c = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));
        return toDTO(c);
    }

    @Transactional
    public ClienteDTO guardar(ClienteDTO dto) {
        Cliente c;
        if (dto.getId() != null && dto.getId() > 0) {
            c = clienteRepository.findById(dto.getId()).orElse(new Cliente());
        } else {
            c = new Cliente();
        }

        c.setTipoDocumento(dto.getTipoDocumento() != null ? dto.getTipoDocumento() : "DNI");
        c.setNumeroDocumento(dto.getNumeroDocumento());
        c.setNombres(dto.getNombres());
        c.setApellidos(dto.getApellidos());
        c.setRazonSocial(dto.getRazonSocial());
        c.setTelefono(dto.getTelefono());
        c.setCorreo(dto.getCorreo());
        c.setDireccion(dto.getDireccion());

        Cliente guardado = clienteRepository.save(c);
        return toDTO(guardado);
    }

    private ClienteDTO toDTO(Cliente c) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(c.getId());
        dto.setTipoDocumento(c.getTipoDocumento());
        dto.setNumeroDocumento(c.getNumeroDocumento());
        dto.setNombres(c.getNombres());
        dto.setApellidos(c.getApellidos());
        dto.setRazonSocial(c.getRazonSocial());
        dto.setTelefono(c.getTelefono());
        dto.setCorreo(c.getCorreo());
        dto.setDireccion(c.getDireccion());
        return dto;
    }
}
