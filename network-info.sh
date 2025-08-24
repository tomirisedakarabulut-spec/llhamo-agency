#!/bin/bash

# LHAMO Agency - Network Access Information
echo "🔥 LHAMO Agency - Network Access Information"
echo "===========================================" 

# Get local IP address
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')

if [ -z "$LOCAL_IP" ]; then
    # Fallback method for different systems
    LOCAL_IP=$(hostname -I | awk '{print $1}' 2>/dev/null)
fi

if [ -z "$LOCAL_IP" ]; then
    # Another fallback
    LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null)
fi

echo ""
echo "📱 MOBILE ACCESS:"
echo "   http://$LOCAL_IP:3001"
echo ""
echo "💻 DESKTOP ACCESS:"
echo "   http://localhost:3001"
echo "   http://127.0.0.1:3001"
echo ""
echo "🌐 NETWORK ACCESS:"
echo "   Any device on your network can access:"
echo "   http://$LOCAL_IP:3001"
echo ""
echo "📋 INSTRUCTIONS:"
echo "   1. Make sure your device is on the same Wi-Fi network"
echo "   2. Open any browser on your device"
echo "   3. Go to: http://$LOCAL_IP:3001"
echo "   4. Enjoy the brutal LHAMO experience!"
echo ""
echo "🔒 SECURITY NOTE:"
echo "   This is only accessible on your local network"
echo "   Perfect for testing on multiple devices!"
echo ""

# Check if server is running
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Server is LIVE and BRUTAL on PORT 3001!"
elif curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is LIVE and BRUTAL on PORT 3000!"
else
    echo "❌ Server is not running. Run ./quick-start.sh first!"
fi
