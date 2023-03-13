FROM php:8.0.1-apache-buster

RUN apt-get update -y \
  && apt-get upgrade -y \
  && apt-get update -y \
  && apt-get install tzdata curl -y
RUN ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && dpkg-reconfigure -f noninteractive tzdata

RUN docker-php-ext-install pdo pdo_mysql bcmath opcache

VOLUME [ "/var/www/html" ]
WORKDIR /var/www/html


