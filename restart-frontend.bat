@echo off
echo ==========================================
echo   Restarting React Frontend Server
echo ==========================================
echo.
echo Stopping any existing React server...
echo.
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Starting React server with updated proxy...
echo.
echo Backend API: http://localhost:8080
echo Frontend App: http://localhost:5002
echo.
npm start
echo.
pause
