#!/bin/bash

# LHAMO Stable Startup Script
# This script ensures the site runs without Fast Refresh or JSX errors

echo "🚀 Starting LHAMO Agency in stable mode..."

# Kill any existing processes
pkill -f "next" 2>/dev/null
sleep 2

# Clean cache
echo "🧹 Cleaning cache..."
rm -rf .next 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null
npm cache clean --force 2>/dev/null

# Build in production mode
echo "🔨 Building in production mode..."
NODE_ENV=production npm run build

# Start in production mode
echo "🌟 Starting production server..."
NODE_ENV=production npm run start
