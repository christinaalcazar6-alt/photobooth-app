#!/bin/sh

# Run Laravel artisan commands
php artisan key:generate --force
php artisan storage:link --force
php artisan config:clear

# Start services
service nginx start
php-fpm