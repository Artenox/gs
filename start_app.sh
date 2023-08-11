#!/bin/bash

# Download Github-Repo
git clone https://github.com/Artenox/gs.git

# Build the Docker image
docker build -t gruppensortierung:latest .

# Start the Docker Compose services
docker-compose up