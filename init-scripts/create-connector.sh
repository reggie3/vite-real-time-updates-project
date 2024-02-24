#!/bin/bash
set -e

echo "Creating Debezium connector..."

curl -i -X POST \
  -H "Accept:application/json" \
  -H "Content-Type:application/json" \
  --data "@/connector.json" \
  http://debezium:8083/connectors

echo "Debezium connector creation complete."

# creates the debezium connector