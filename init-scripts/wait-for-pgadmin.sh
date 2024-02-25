#!/bin/bash
set -e

# Function to wait until the pgAdmin container is healthy
wait_for_pgadmin() {
  echo "Waiting for pgAdmin to become healthy..."
  until docker inspect --format='{{.State.Health.Status}}' pgadmin | grep "healthy"; do
    sleep 1
  done
  echo "pgAdmin is healthy. Proceeding with the command execution."
}

# Wait for pgAdmin to become healthy
wait_for_pgadmin

# Execute the provided command
exec "$@"
