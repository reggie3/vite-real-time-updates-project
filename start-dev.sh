#!/bin/bash

# Start the server in the background
cd server
bun run dev &

# Store the process ID (PID) of the last background command
server_pid=$!

# Start the web socket server in the background
cd ../ws-server
bun run dev &

# Store the PID of the second background command
ws_server_pid=$!

# Start the UI in the background
cd ../ui
bun run dev &

# Store the PID of the third background command
ui_pid=$!

# Wait for all background processes to finish
wait $server_pid $ws_server_pid $ui_pid