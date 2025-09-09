"""
Database models for Resilient Mastery platform.
"""
from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from enum import Enum


class UserRole(str, Enum):
    """User role enumeration."""
    USER = "user"
    ADMIN = "admin"


class User(SQLModel, table=True):
    """User model for authentication and progress tracking."""
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    username: str = Field(unique=True, index=True)
    hashed_password: str
    role: UserRole = Field(default=UserRole.USER)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    lesson_completions: List["LessonCompletion"] = Relationship(back_populates="user")


class Lesson(SQLModel, table=True):
    """Lesson model containing emotional intelligence content."""
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    story: str  # Main story content - TODO: Replace with actual lesson stories
    reflection: str  # Reflection questions - TODO: Replace with thoughtful prompts
    challenge: str  # Practical challenge - TODO: Add real-world application exercises
    quiz: str  # Quiz content as JSON - TODO: Implement proper quiz structure
    order: int = Field(default=0)  # Display order
    module_number: int = Field(default=1)  # Which module this lesson belongs to
    is_published: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    completions: List["LessonCompletion"] = Relationship(back_populates="lesson")


class LessonCompletion(SQLModel, table=True):
    """Track user progress through lessons."""
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    lesson_id: int = Field(foreign_key="lesson.id")
    completed_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: User = Relationship(back_populates="lesson_completions")
    lesson: Lesson = Relationship(back_populates="completions")


class Reflection(SQLModel, table=True):
    """Store user reflections for lessons."""
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    lesson_id: int = Field(foreign_key="lesson.id")
    content: str = Field(description="Rich text content of the reflection")
    word_count: int = Field(default=0, description="Word count for analytics")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: User = Relationship()
    lesson: Lesson = Relationship() 