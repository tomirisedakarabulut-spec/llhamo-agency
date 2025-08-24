#!/bin/bash

# Kalıcı servis başlatma script'i
# Dev sunucu ve tunnel'ı otomatik yeniden başlatma ile çalıştırır

PROJECT_DIR="/Users/unicorn/Lhamo"
DEV_PORT=3003
LOG_DIR="$PROJECT_DIR/logs"

# Log klasörü oluştur
mkdir -p "$LOG_DIR"

# Mevcut processları durdur
pkill -f "next dev" 2>/dev/null || true
pkill -f "cloudflared" 2>/dev/null || true
sleep 2

echo "🚀 Lhamo Agency servisleri başlatılıyor..."

# Dev sunucuyu başlat (otomatik yeniden başlatma ile)
while true; do
    echo "$(date): Dev sunucu başlatılıyor..." >> "$LOG_DIR/dev.log"
    cd "$PROJECT_DIR"
    npm run dev -- --port $DEV_PORT --hostname 0.0.0.0 >> "$LOG_DIR/dev.log" 2>&1
    echo "$(date): Dev sunucu kapandı, 5 saniye sonra yeniden başlatılacak..." >> "$LOG_DIR/dev.log"
    sleep 5
done &

DEV_PID=$!
echo "✅ Dev sunucu başlatıldı (PID: $DEV_PID)"

# Dev sunucunun hazır olmasını bekle
sleep 8

# Tunnel başlat (otomatik yeniden başlatma ile)
while true; do
    echo "$(date): Tunnel başlatılıyor..." >> "$LOG_DIR/tunnel.log"
    npx -y cloudflared tunnel --url http://localhost:$DEV_PORT >> "$LOG_DIR/tunnel.log" 2>&1
    echo "$(date): Tunnel kapandı, 5 saniye sonra yeniden başlatılacak..." >> "$LOG_DIR/tunnel.log"
    sleep 5
done &

TUNNEL_PID=$!
echo "✅ Tunnel başlatıldı (PID: $TUNNEL_PID)"

# PID'leri kaydet
echo "$DEV_PID" > "$LOG_DIR/dev.pid"
echo "$TUNNEL_PID" > "$LOG_DIR/tunnel.pid"

echo "🎉 Tüm servisler başlatıldı!"
echo "📝 Loglar: $LOG_DIR/"
echo "🔗 Yerel: http://localhost:$DEV_PORT"
echo "🌐 Global: Tunnel log'unda URL'yi kontrol edin"

# Tunnel URL'sini bekle ve göster
sleep 10
echo "🔍 Tunnel URL'si aranıyor..."
tail -f "$LOG_DIR/tunnel.log" | grep -m1 "https://.*\.trycloudflare\.com" | sed 's/.*\(https:\/\/[^[:space:]]*\.trycloudflare\.com\).*/🌐 Global URL: \1/'
