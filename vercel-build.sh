#!/bin/bash

# Install Composer dependencies
composer install --no-dev --optimize-autoloader

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Clear and cache routes, config, and views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Build frontend assets
npm ci
npm run build

# Create storage symlink
php artisan storage:link

echo "Build completed successfully!"
