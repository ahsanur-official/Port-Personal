#!/bin/bash

# Change to portfolio directory
cd "$(dirname "$0")"

# Start PHP built-in server
echo "Starting PHP Server..."
echo ""
echo "Your portfolio will be available at: http://localhost:8000"
echo "Admin panel: http://localhost:8000/admin-messages.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

php -S localhost:8000
