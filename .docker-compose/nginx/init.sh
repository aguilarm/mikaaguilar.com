#! /bin/sh

# Do not generate a key if one exists already.
# Without a volume, the key is regenerated every time the container starts.
if [ -e /etc/nginx/ssl/local.key ]
then
  echo "Existing keypair found, skipping key creation..."
else

# Generate a new key on run rather than baking into the image.
# Allows user to customize the HOSTNAME via env vars.

echo "Creating ssl cert for $VIRTUAL_HOSTNAME..."

openssl req -x509 -newkey rsa:4096 \
    -keyout local.key \
    -out local.crt \
    -days 365 \
    -nodes \
    -subj "/CN=$VIRTUAL_HOSTNAME" > /dev/null 2>&1

mv local.key /etc/nginx/ssl
mv local.crt /etc/nginx/ssl
chmod -R 600 /etc/nginx/ssl

fi

echo "Starting nginx with HTTPS for $VIRTUAL_HOSTNAME..."

nginx -g "daemon off;"
