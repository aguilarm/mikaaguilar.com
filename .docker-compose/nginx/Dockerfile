FROM nginx:1.15-alpine

RUN apk add --no-cache openssl

RUN mkdir -p /etc/nginx/ssl
VOLUME /etc/nginx/ssl

ENV VIRTUAL_HOSTNAME="localhost"

RUN mkdir /scripts
COPY init.sh /scripts/init.sh

ENTRYPOINT ["/scripts/init.sh"]
