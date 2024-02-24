#!/bin/bash
set -e

echo "Creating Conduktor user and database in PostgreSQL..."

# Ensure the necessary environment variables are set
if [ -z "$POSTGRES_USER" ] || [ -z "$CDK_DB" ] || [ -z "$CDK_USER" ] || [ -z "$CDK_PASSWORD" ]; then
  echo "ERROR: Missing required environment variables."
  exit 1
fi

echo "PostgreSQL User: $POSTGRES_USER"
echo "Conduktor Database: $CDK_DB"
echo "Conduktor User: $CDK_USER"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE $CDK_DB;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$CDK_DB" <<-EOSQL
  CREATE USER $CDK_USER WITH PASSWORD '$CDK_PASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE $CDK_DB TO $CDK_USER;
  ALTER USER $CDK_USER CREATEDB;
EOSQL

echo "Conduktor user and database creation complete."
