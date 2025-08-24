#!/bin/bash

# Servisleri durdurma script'i

PROJECT_DIR="/Users/unicorn/Lhamo"
LOG_DIR="$PROJECT_DIR/logs"

echo "🛑 Lhamo Agency servisleri durduruluyor..."

# PID dosyalarından process'leri durdur
if [ -f "$LOG_DIR/dev.pid" ]; then
    DEV_PID=$(cat "$LOG_DIR/dev.pid")
    kill -TERM $DEV_PID 2>/dev/null || true
    echo "✅ Dev sunucu durduruldu (PID: $DEV_PID)"
    rm -f "$LOG_DIR/dev.pid"
fi

if [ -f "$LOG_DIR/tunnel.pid" ]; then
    TUNNEL_PID=$(cat "$LOG_DIR/tunnel.pid")
    kill -TERM $TUNNEL_PID 2>/dev/null || true
    echo "✅ Tunnel durduruldu (PID: $TUNNEL_PID)"
    rm -f "$LOG_DIR/tunnel.pid"
fi

# Kalan process'leri zorla durdur
pkill -f "next dev" 2>/dev/null || true
pkill -f "cloudflared" 2>/dev/null || true

echo "🎉 Tüm servisler durduruldu!"
