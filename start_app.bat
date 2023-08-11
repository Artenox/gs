@echo off

REM Download Github-Repos
start /min git clone https://github.com/Artenox/gs.git

REM Build the Docker image
start /min docker build -t gruppensortierung:latest .

REM Start the Docker Compose services
start /min docker-compose up
