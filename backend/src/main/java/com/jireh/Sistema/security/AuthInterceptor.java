package com.jireh.Sistema.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        RequirePermission requirePermission = handlerMethod.getMethodAnnotation(RequirePermission.class);
        if (requirePermission == null) {
            requirePermission = handlerMethod.getBeanType().getAnnotation(RequirePermission.class);
        }

        if (requirePermission == null) {
            return true;
        }

        String requiredPermissionCode = requirePermission.value();
        String userRole = request.getHeader("X-User-Role");
        String permissionsHeader = request.getHeader("X-User-Permissions");

        // SuperAdmin o Administrador por defecto tienen acceso total
        if ("SUPER_ADMIN".equalsIgnoreCase(userRole) || "ADMINISTRADOR".equalsIgnoreCase(userRole)) {
            return true;
        }

        boolean tienePermiso = false;
        if (permissionsHeader != null && !permissionsHeader.isBlank()) {
            List<String> userPerms = Arrays.asList(permissionsHeader.split(","));
            tienePermiso = userPerms.stream().anyMatch(p -> p.trim().equalsIgnoreCase(requiredPermissionCode));
        }

        // Si no se proporcionaron encabezados específicos en desarrollo, permitir acceso para no bloquear navegación básica
        if ((userRole == null || userRole.isBlank()) && (permissionsHeader == null || permissionsHeader.isBlank())) {
            return true;
        }

        if (!tienePermiso) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json;charset=UTF-8");
            String jsonError = "{\"timestamp\":\"" + LocalDateTime.now() + "\",\"status\":403,\"error\":\"FORBIDDEN\",\"message\":\"Acceso denegado: se requiere el privilegio [" + requiredPermissionCode + "]\",\"path\":\"" + request.getRequestURI() + "\"}";
            response.getWriter().write(jsonError);
            return false;
        }

        return true;
    }
}
