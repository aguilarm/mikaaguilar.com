FROM favish/php-7.2-fpm-drupal-8:1.0

RUN pecl install \
			xdebug \
			&& docker-php-ext-enable \
      xdebug

WORKDIR /var/www
