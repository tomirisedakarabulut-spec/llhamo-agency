#!/bin/bash

# LHAMO Agency Deployment Script
echo "🔥 LHAMO Agency - Brutal Deployment Starting..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Stop any running processes
print_status "Stopping existing processes..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "next start" 2>/dev/null || true

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Run linting
print_status "Running linter..."
npm run lint

# Build the application
print_status "Building production application..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Build successful! 🚀"
    
    # Start production server
    print_status "Starting production server..."
    npm start &
    
    # Get the PID
    SERVER_PID=$!
    echo $SERVER_PID > server.pid
    
    print_status "Production server started with PID: $SERVER_PID"
    print_status "Server running at: http://localhost:3000"
    print_status "Network access at: http://$(hostname -I | awk '{print $1}'):3000"
    
    # Wait a moment for server to start
    sleep 3
    
    # Check if server is responding
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_status "🎉 LHAMO Agency is LIVE and BRUTAL!"
        print_status "💀 Site is accessible from any device on your network!"
        echo ""
        echo "📱 Mobile access: http://$(hostname -I | awk '{print $1}'):3000"
        echo "💻 Desktop access: http://localhost:3000"
        echo ""
        print_status "To stop the server: kill $SERVER_PID or npm run services:stop"
    else
        print_error "Server started but not responding. Check logs."
    fi
    
else
    print_error "Build failed! Check the errors above."
    exit 1
fi
