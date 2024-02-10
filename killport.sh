#!/bin/bash

# Check if the port number is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <port_number>"
    exit 1
fi

# Get the port number from the command-line argument
PORT_NUMBER=$1

# Check if lsof command is available
if ! command -v lsof &> /dev/null; then
    echo "Error: lsof command not found. Please install lsof."
    exit 1
fi

# Find the process ID (PID) using lsof
PID=$(sudo lsof -t -i :$PORT_NUMBER)

# Check if a process is running on the specified port
if [ -z "$PID" ]; then
    echo "No process found running on port $PORT_NUMBER."
    exit 1
fi

# Kill the process
sudo kill -9 $PID

echo "Process with PID $PID killed on port $PORT_NUMBER."
