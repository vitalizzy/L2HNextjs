@echo off
REM Script para hacer push después de crear el repositorio en GitHub

echo.
echo ====================================
echo Preparando para hacer push a GitHub
echo ====================================
echo.

REM Verificar estado
git status
echo.

REM Confirmar que el repositorio fue creado
echo.
set /p confirm="¿Confirmás que creaste el repositorio 'community-nextjs' en GitHub (s/n)? "
if /i not "%confirm%"=="s" (
    echo Abortado. Crea el repositorio primero en https://github.com/new
    exit /b 1
)

REM Hacer push
echo.
echo Haciendo push a origin/main...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ PUSH EXITOSO!
    echo El código está ahora en: https://github.com/vitalizzy/community-nextjs
) else (
    echo.
    echo ❌ Error en el push
    echo Verifica que:
    echo 1. Creaste el repositorio en GitHub
    echo 2. Tienes permisos
    echo 3. Tus credenciales son correctas
)

pause
