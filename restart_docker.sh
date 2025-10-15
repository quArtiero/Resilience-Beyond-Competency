#!/bin/bash

echo "🔄 Restarting Docker containers..."

# Use the simpler Dockerfile if build issues persist
if [ -f "api/Dockerfile.simple" ]; then
    echo "Using simplified Dockerfile to avoid build issues..."
    mv api/Dockerfile api/Dockerfile.backup
    cp api/Dockerfile.simple api/Dockerfile
fi

# Stop and restart
docker-compose down
docker-compose up -d

# Check status
sleep 5
docker-compose ps

echo ""
echo "✅ Services restarted!"
echo "🌐 Access the app at: http://localhost:5173"
echo "📚 API docs at: http://localhost:8000/docs"
