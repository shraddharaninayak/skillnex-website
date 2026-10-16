#!/usr/bin/env bash
# ==============================================================================
# SkillNex VPS Setup Script (Ubuntu/Debian)
# Run as root or with sudo on your Hostinger VPS:
# bash deploy/setup-vps.sh
# ==============================================================================

set -e

echo "🚀 [1/6] Updating system packages..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx

echo "📦 [2/6] Installing Node.js 20 LTS & PM2..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
sudo npm install -g pm2

echo "🌐 [3/6] Setting up project directory at /var/www/skillnex..."
sudo mkdir -p /var/www/skillnex
sudo chown -R $USER:$USER /var/www/skillnex

if [ ! -d "/var/www/skillnex/.git" ]; then
    echo "Cloning repository..."
    git clone https://github.com/shraddharaninayak/skillnex-website.git /var/www/skillnex
fi

cd /var/www/skillnex

echo "📦 [4/6] Installing dependencies and building frontend..."
npm install
npm run build

echo "⚙️ [5/6] Setting up PM2 process for backend API..."
pm2 stop skillnex-api 2>/dev/null || true
pm2 start server.js --name skillnex-api
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME || true

echo "🌐 [6/6] Configuring Nginx..."
sudo cp deploy/skillnex.nginx.conf /etc/nginx/sites-available/skillnex
sudo ln -sf /etc/nginx/sites-available/skillnex /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "🛡️ Configuring Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "=============================================================================="
echo "🎉 Setup complete! SkillNex is running and served via Nginx."
echo "⚠️ Don't forget to create /var/www/skillnex/.env with your MONGODB_URI & PORT=5000"
echo "=============================================================================="
