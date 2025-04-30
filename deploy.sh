#!/bin/bash

# Create a deployment directory
mkdir -p deployment

# Copy necessary files and directories
cp -r app deployment/
cp -r bootstrap deployment/
cp -r config deployment/
cp -r database deployment/
cp -r lang deployment/
cp -r public deployment/
cp -r resources deployment/
cp -r routes deployment/
cp -r storage deployment/
cp -r vendor deployment/
cp .env.example deployment/.env
cp artisan deployment/
cp composer.json deployment/
cp composer.lock deployment/
cp package.json deployment/

# Create necessary directories
mkdir -p deployment/storage/app/public
mkdir -p deployment/storage/framework/cache
mkdir -p deployment/storage/framework/sessions
mkdir -p deployment/storage/framework/testing
mkdir -p deployment/storage/framework/views
mkdir -p deployment/storage/logs

# Set proper permissions
chmod -R 755 deployment
chmod -R 777 deployment/storage
chmod -R 777 deployment/bootstrap/cache

echo "Deployment package created in the 'deployment' directory."
