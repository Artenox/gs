#!/bin/bash

# Delete existing container
docker stop gruppensortierung
docker rm gruppensortierung

# Build the Docker image
docker build -t gruppensortierung:latest .

# Start the Docker Compose services
docker-compose up