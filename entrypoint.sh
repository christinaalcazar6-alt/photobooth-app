#!/bin/sh

# Create storage and database files if they don't exist
mkdir -p /var/www/storage/logs
touch /var/www/storage/logs/laravel.log
mkdir -p /var/www/database
touch /var/www/database/database.sqlite

# Fix permissions so PHP/Nginx can write
chmod -R 777 /var/www/storage /var/www/bootstrap/cache /var/www/database

# Run artisan setup
php artisan key:generate --force
php artisan storage:link --force
php artisan config:clear
php artisan migrate --force

# Start services
service nginx start
php-fpm