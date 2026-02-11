#!/bin/sh
HOST=$(cat /home/config/hostname 2>/dev/null) || HOST="hostname"
echo "HOSTNAME: $HOST"
export HOST
envsubst < /home/config/caddy/Caddyfile.template > /home/config/caddy/Caddyfile
caddy run --config /home/config/caddy/Caddyfile &
mosquitto -c /home/config/mosquitto.conf