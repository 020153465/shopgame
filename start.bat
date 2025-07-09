@echo off
echo Starting ShopGame E-commerce Platform...
echo.
echo This will start:
echo - MySQL Database (port 3306)
echo - Spring Boot Backend (port 8080)
echo - Angular Frontend (port 4200)
echo.
echo Please wait while Docker builds and starts all services...
echo.

docker-compose up --build

echo.
echo Application started successfully!
echo.
echo Access the application at:
echo - Frontend: http://localhost:4200
echo - Backend API: http://localhost:8080
echo.
echo Default credentials:
echo - Admin: admin / password
echo - User: user / password
echo.
pause 