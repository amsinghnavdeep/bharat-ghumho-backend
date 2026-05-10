#!/bin/bash
set -e

echo "=== Installing Python dependencies ==="
pip install --upgrade pip
pip install -r requirements.txt

echo "=== Building Angular frontend ==="
cd frontend
npm install
npm run build

echo "=== Build complete ==="