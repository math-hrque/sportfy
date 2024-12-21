#!/bin/bash
set -e

build_images() {
  echo "🔨🚧 Starting the Docker images build process..."

  echo "🚀💻 Building Backend image..."
  docker build -t backend:latest ./Backend
  echo "✅📦 Backend image built successfully!"

  echo "🚧📱 Building the Mobile image..."
  docker build -t mobile:latest ./Mobile
  echo "✅📲 Mobile image built successfully!"

  echo "🎉🚀 All images have been built successfully!"
}

start_containers() {
  echo "🔧⚙️ Starting services with Docker Compose..."
  docker-compose up -d
  echo "✅🎯 All services are up and running! Check logs using 'docker-compose logs'."
}

build_images
start_containers
