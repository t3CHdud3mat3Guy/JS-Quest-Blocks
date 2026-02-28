@echo off
setlocal

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 goto :fail

echo [2/3] Building Windows executable artifacts...
call npm run pack:win
if errorlevel 1 goto :fail

echo [3/3] Done. Check the dist\ folder for .exe files.
exit /b 0

:fail
echo Build failed. Please check the error messages above.
exit /b 1
