#!/bin/bash

# BizLevel - Complete Clean Reset Script
# This script performs a complete clean reset of the project

echo "🧹 Starting complete clean reset..."

# 1. Kill all Node processes
echo "1. Killing Node processes..."
sudo pkill -f node || true
sudo pkill -f npm || true
sudo pkill -f pnpm || true

# 2. Remove node_modules with extreme prejudice
echo "2. Force removing node_modules..."
sudo rm -rf node_modules || true
sudo rm -rf .next || true
sudo rm -rf .turbo || true
sudo rm -rf dist || true

# 3. Clear npm/pnpm caches
echo "3. Clearing caches..."
npm cache clean --force || true
pnpm store prune || true

# 4. Remove package-lock files
echo "4. Removing lock files..."
rm -f package-lock.json || true
rm -f pnpm-lock.yaml || true

# 5. Clear temporary directories
echo "5. Clearing temp directories..."
sudo rm -rf /tmp/npm-* || true
sudo rm -rf ~/.npm/_cacache || true

# 6. Fix file permissions
echo "6. Fixing permissions..."
sudo chown -R $(whoami) . || true
sudo chmod -R 755 . || true

# 7. Reinstall with specific package manager
echo "7. Reinstalling dependencies..."
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install --no-frozen-lockfile
elif command -v yarn &> /dev/null; then
    echo "Using yarn..."
    yarn install --ignore-engines
else
    echo "Using npm..."
    npm install --legacy-peer-deps --no-package-lock
fi

echo "✅ Clean reset completed!"
echo "Try running: npm run dev"
