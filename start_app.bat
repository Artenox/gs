@echo off

REM Delete existing container
docker stop gruppensortierung
docker rm gruppensortierung

REM Build the Docker image
docker build -t gruppensortierung:latest .

REM Start the Docker Compose services
docker-compose up
