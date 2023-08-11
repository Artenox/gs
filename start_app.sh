#!/bin/bash

# Build the Docker image
docker build -t gruppensortierung:latest .

# Start the Docker Compose services
docker-compose up