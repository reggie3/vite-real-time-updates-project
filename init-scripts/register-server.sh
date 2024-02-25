#!/bin/bash
set -e

echo "Registering PostgreSQL server in pgAdmin..."

# Ensure the necessary environment variables are set
if [ -z "$PGADMIN_DEFAULT_EMAIL" ] || [ -z "$PGADMIN_DEFAULT_PASSWORD" ] || [ -z "$PGADMIN_SERVER_NAME" ] || [ -z "$PGADMIN_SERVER_HOST" ] || [ -z "$PGADMIN_SERVER_PORT" ]; then
  echo "ERROR: Missing required environment variables."
  exit 1
fi

# pgAdmin server registration API endpoint
REGISTER_SERVER_URL="http://localhost:80/servers"

# Prepare server registration payload
REGISTER_PAYLOAD=$(cat <<EOF
{
  "name": "$PGADMIN_SERVER_NAME",
  "host": "$PGADMIN_SERVER_HOST",
  "port": $PGADMIN_SERVER_PORT,
  "username": "$PGADMIN_SERVER_HOST",
  "password": "$PGADMIN_SERVER_HOST"
}
EOF
)

# Register the server using curl
curl -X POST -d "$REGISTER_PAYLOAD" -H "Content-Type: application/json" $REGISTER_SERVER_URL

echo "PostgreSQL server registration complete."
