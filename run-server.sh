#!/bin/bash

# Change to portfolio directory
cd "$(dirname "$0")"

# Start a static file server
echo "Starting static server..."
echo ""
echo "Your portfolio will be available at: http://localhost:8000"
echo "Admin panel: http://localhost:8000/admin-messages.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
