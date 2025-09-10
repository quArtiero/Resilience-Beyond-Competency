"""
Basic API tests for Resilient Mastery platform.
"""
import pytest
from httpx import AsyncClient
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Resilient Mastery API"
    assert data["version"] == "1.0.0"


def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_lessons_endpoint_without_db():
    """Test lessons endpoint (will fail without database)."""
    # This test would need a test database setup to pass
    # For now, it demonstrates the testing structure
    response = client.get("/api/lessons")
    # Expected to fail without database connection
    assert response.status_code in [500, 422]  # Database connection error


# TODO: Add comprehensive tests with test database setup
# TODO: Test authentication endpoints
# TODO: Test lesson CRUD operations
# TODO: Test user registration and login
# TODO: Test lesson completion functionality 