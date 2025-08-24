#!/bin/bash

# LHAMO Agency - Quick Start Script
echo "🔥 LHAMO Agency - Quick Brutal Start"
echo "=================================="

# Check if server is already running
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Server is already running on PORT 3001!"
    echo ""
    ./network-info.sh
    exit 0
elif curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is already running on PORT 3000!"
    echo ""
    ./network-info.sh
    exit 0
fi

echo "🚀 Starting LHAMO development server..."

# Clean start
pkill -f "next" > /dev/null 2>&1
rm -rf .next > /dev/null 2>&1

# Start development server on port 3001
npm run dev -- --port 3001 &

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server started successfully
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo ""
    echo "🎉 LHAMO Agency is LIVE and BRUTAL on PORT 3001!"
    echo ""
    ./network-info.sh
else
    echo "❌ Failed to start server. Check for errors above."
    exit 1
fi
