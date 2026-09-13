@echo off
chcp 65001 >nul
title Importar Base de Datos MySQL - Plastiqueria Jireh
cls

echo ========================================================================
echo     IMPORTAR BASE DE DATOS 'jireh' EN MYSQL LOCAL
echo ========================================================================
echo.

set "MYSQL_EXE="
if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set "MYSQL_EXE=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
) else if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" (
    set "MYSQL_EXE=C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
) else (
    for /f "delims=" %%I in ('where mysql.exe 2^>nul') do set "MYSQL_EXE=%%I"
)

if "%MYSQL_EXE%"=="" (
    echo [ERROR] No se encontro mysql.exe instalado en rutas comunes.
    echo Asegurate de tener MySQL Server instalado o agrega mysql a tu variable PATH.
    pause
    exit /b 1
)

echo Se encontro MySQL en: "%MYSQL_EXE%"
echo.
set /p DB_PASS=Ingresa la contrasena del usuario root de MySQL (Presiona Enter si es 'root'): 
if "%DB_PASS%"=="" set DB_PASS=root

echo.
echo Importando script database\jireh.sql...
"%MYSQL_EXE%" -u root --password=%DB_PASS% < "%~dp0database\jireh.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [EXITO] La base de datos 'jireh' y sus tablas fueron creadas y pobladas correctamente.
) else (
    echo.
    echo [ERROR] No se pudo importar la base de datos. Verifica la contrasena de MySQL.
)

echo.
pause
