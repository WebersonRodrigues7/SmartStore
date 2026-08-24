@echo off
chcp 65001 > nul
title SmartStore - Inicializador do Projeto

set ROOT_DIR=%~dp0

echo ========================================================
echo               INICIALIZADOR SMARTSTORE                  
echo ========================================================
echo.

:: 1. Verificacao do Backend
if not exist "%ROOT_DIR%backend\node_modules" (
    echo [INFO] node_modules do Backend nao encontrado. Instalando dependencias...
    cd /d "%ROOT_DIR%backend"
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERRO] Falha ao instalar dependencias do Backend!
        pause
        exit /b %ERRORLEVEL%
    )
) else (
    echo [OK] Dependencias do Backend ja instaladas.
)

:: 2. Verificacao do Frontend
if not exist "%ROOT_DIR%frontend\node_modules" (
    echo [INFO] node_modules do Frontend nao encontrado. Instalando dependencias...
    cd /d "%ROOT_DIR%frontend"
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERRO] Falha ao instalar dependencias do Frontend!
        pause
        exit /b %ERRORLEVEL%
    )
) else (
    echo [OK] Dependencias do Frontend ja instaladas.
)

echo.
echo ========================================================
echo               INICIANDO OS SERVICOS                     
echo ========================================================
echo.

:: 3. Iniciar Backend em nova janela
echo Iniciando Backend (NestJS)...
start "SmartStore - Backend" cmd /k "cd /d "%ROOT_DIR%backend" && npm run start:dev"

:: 4. Iniciar Frontend em nova janela
echo Iniciando Frontend (Next.js)...
start "SmartStore - Frontend" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

echo.
echo ========================================================
echo   SmartStore iniciado com sucesso em janelas separadas!
echo   - Backend:  http://localhost:3005
echo   - Frontend: http://localhost:3000
echo ========================================================
echo.
timeout /t 5
