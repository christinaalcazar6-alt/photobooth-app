FROM php:8.3-fpm

# Install system dependencies (kasama ang Node.js at NPM para sa asset compilation)
RUN apt-get update && apt-get install -y \
    nginx \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Clear apt cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . /var/www

# Install Composer dependencies, NPM packages, and build assets
RUN composer install --no-dev --optimize-autoloader \
    && npm install \
    && npm run build

# Setup Nginx configuration
COPY .docker/nginx.conf /etc/nginx/sites-available/default

# Set proper permissions for Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose HTTP port
EXPOSE 80

# Run entrypoint script
ENTRYPOINT ["/entrypoint.sh"]