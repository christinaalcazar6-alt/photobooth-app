FROM richarvey/nginx-php-fpm:latest

COPY . /var/www/html

ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR "1"
ENV ERRORS "1"
ENV APP_ENV production

RUN composer install --no-dev --optimize-autoloader

EXPOSE 80