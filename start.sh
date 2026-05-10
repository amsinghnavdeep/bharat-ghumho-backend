#!/bin/sh
# Startup script for Railway deployment
# Uses PORT environment variable if set, otherwise defaults to 8000

# Read PORT from environment, default to 8000
if [ -z "$PORT" ]; then
    PORT=8000
fi

echo "Starting application on port $PORT"
uvicorn main:app --host 0.0.0.0 --port "$PORT"