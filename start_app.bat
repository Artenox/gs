@echo off

REM Build the Docker image
start /min docker build -t gruppensortierung:latest .

REM Start the Docker Compose services
start /min docker-compose up
