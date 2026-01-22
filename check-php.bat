@echo off
echo ========================================
echo   PHP Installation Check
echo ========================================
echo.

REM Check if PHP is installed
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] PHP is already installed!
    echo.
    php --version
    echo.
    echo You can now run: run-server.bat
    pause
    exit
)

echo [INFO] PHP is not installed on your system.
echo.
echo ========================================
echo   Quick Installation Options:
echo ========================================
echo.
echo Option 1: XAMPP (RECOMMENDED - Easiest)
echo   - Download from: https://www.apachefriends.org/download.html
echo   - Install XAMPP
echo   - PHP will be automatically installed
echo   - After install, add to PATH: C:\xampp\php
echo.
echo Option 2: Standalone PHP
echo   - Download from: https://windows.php.net/download/
echo   - Extract to C:\php
echo   - Add to System PATH: C:\php
echo.
echo ========================================
echo   Alternative: Use Without PHP
echo ========================================
echo.
echo Your portfolio already has email fallback!
echo Just open index.html and submit the form.
echo It will open your email client automatically.
echo.
echo Or deploy to Netlify for free hosting with forms!
echo.
pause

echo.
echo Opening XAMPP download page...
start https://www.apachefriends.org/download.html
