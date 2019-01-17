FROM favish/php-7.2-fpm-drupal-8:1.0

# Install and configure composer+deps
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN php -r "readfile('https://getcomposer.org/installer');" | php && mv composer.phar /usr/local/bin/composer
ENV PATH="/var/www/vendor/bin:${PATH}"

WORKDIR /var/www
