@echo off
REM Change to portfolio directory
cd /d "%~dp0"

REM Start a static file server
echo Starting static server...
echo.
echo Your portfolio will be available at: http://localhost:8000
echo Admin panel: http://localhost:8000/admin-messages.html
echo.
echo Press Ctrl+C to stop the server
echo.

py -3 -m http.server 8000

pause
