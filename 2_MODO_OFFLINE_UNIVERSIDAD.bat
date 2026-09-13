@echo off
chcp 65001 >nul
title Plastiqueria Jireh - Modo Demostracion / Universidad
cls

echo ========================================================================
echo     PLASTIQUERIA JIREH - MODO PORTABLE / UNIVERSIDAD
echo     (No requiere Java, No requiere MySQL, No requiere Permisos Admin)
echo ========================================================================
echo.
echo Abriendo aplicacion web interactiva en tu navegador...
start "" "%~dp0frontend\index.html"

echo.
echo Listo! El sistema se ha abierto en tu navegador con toda la funcionalidad:
echo  - Dashboard con metricas y alertas de stock
echo  - Modulo de Inventario y catalogo de plastiqueria
echo  - Punto de Venta (POS) y emision de comprobantes
echo  - Gestion de clientes y Kardex de movimientos
echo.
pause
