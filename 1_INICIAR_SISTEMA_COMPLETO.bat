@echo off
chcp 65001 >nul
title Plastiqueria Jireh - Sistema de Ventas e Inventario
cls

echo ========================================================================
echo     PLASTIQUERIA JIREH - SISTEMA DE VENTAS E INVENTARIO
echo     Curso: Gestion de Proyectos en TI
echo ========================================================================
echo.
echo [1/3] Verificando servicio de Base de Datos MySQL...
net start MySQL80 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo  - Servicio MySQL80 activo.
) else (
    echo  - Advertencia: MySQL80 no pudo iniciarse como servicio (o ya esta corriendo).
)

echo.
echo [2/3] Iniciando Backend Spring Boot (Java 17)...
echo  - Se abrira la consola del servidor en una nueva ventana.
start "Servidor Backend Jireh" cmd /k "cd /d %~dp0backend && .\mvnw.cmd spring-boot:run"

echo.
echo [3/3] Esperando que el servidor inicialice (7 segundos)...
timeout /t 7 /nobreak >nul

echo.
echo Abriendo Sistema en tu navegador predeterminado: http://localhost:8080/
start http://localhost:8080/

echo.
echo ========================================================================
echo  SISTEMA EN EJECUCION
echo  - Frontend Web y API REST: http://localhost:8080/
echo  - Para detener el sistema, simplemente cierra la ventana del servidor.
echo ========================================================================
pause
