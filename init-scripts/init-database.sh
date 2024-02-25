#!/bin/bash
set -e

echo "Setting up Pgadmin..."

# Ensure the necessary environment variables are set
if [ -z "$POSTGRES_USER" ]; then
  echo "ERROR: Missing required environment variable POSTGRES_USER."
  exit 1
fi

if [ -z "$POSTGRES_PASSWORD" ]; then
  echo "ERROR: Missing required environment variable POSTGRES_PASSWORD."
  exit 1
fi

if [ -z "$DATABASE_NAME" ]; then
  echo "ERROR: Missing required environment variable DATABASE_NAME."
  exit 1
fi

echo "PostgreSQL User: $POSTGRES_USER"
echo "PostgreSQL Password: $POSTGRES_PASSWORD"
echo "PostgreSQL Database: $DATABASE_NAME"

# Perform the necessary PostgreSQL setup commands here
# For example:
# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE_NAME" <<-EOSQL
#   CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';
#   CREATE DATABASE $DATABASE_NAME;
#   GRANT ALL PRIVILEGES ON DATABASE $DATABASE_NAME TO $POSTGRES_USER;
#   ALTER USER $POSTGRES_USER CREATEDB;
# EOSQL

echo "PgAdmin setup complete."
