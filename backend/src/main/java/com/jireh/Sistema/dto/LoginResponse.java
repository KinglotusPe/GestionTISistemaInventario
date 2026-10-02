package com.jireh.Sistema.dto;

import java.util.ArrayList;
import java.util.List;

public class LoginResponse {
    private Long id;
    private String usuario;
    private String nombres;
    private String apellidos;
    private String nombreCompleto;
    private String correo;
    private String telefono;
    private String rol;
    private Long rolId;
    private List<String> permisos = new ArrayList<>();
    private String token;
    private boolean autenticado;
    private String mensaje;

    public LoginResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public Long getRolId() { return rolId; }
    public void setRolId(Long rolId) { this.rolId = rolId; }
    public List<String> getPermisos() { return permisos; }
    public void setPermisos(List<String> permisos) { this.permisos = permisos; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public boolean isAutenticado() { return autenticado; }
    public void setAutenticado(boolean autenticado) { this.autenticado = autenticado; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
}
