#!/usr/bin/env bash
set -e

echo "==========================================="
echo "  CodeExec Deployment Automation"
echo "==========================================="

echo "1. Building execution sandbox images..."
docker build -t java-engine ./java-engine
docker build -t python-engine ./python-engine

echo "2. Building & launching Frontend and Backend..."
docker compose down || true
docker compose up -d --build

echo "3. Status of deployed containers:"
docker compose ps

echo "==========================================="
echo "  CodeExec is now live!"
echo "==========================================="
