@echo off
chcp 65001 > nul
title SmartStore - Instalador de Dependencias

set ROOT_DIR=%~dp0

echo ========================================================
echo          INSTALADOR DE DEPENDENCIAS - SMARTSTORE         
echo ========================================================
echo.

echo [1/2] Instalando dependencias do Backend...
cd /d "%ROOT_DIR%backend"
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao instalar dependencias do Backend!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Instalando dependencias do Frontend...
cd /d "%ROOT_DIR%frontend"
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao instalar dependencias do Frontend!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   Todas as dependencias foram instaladas com sucesso!
echo ========================================================
echo.
pause
