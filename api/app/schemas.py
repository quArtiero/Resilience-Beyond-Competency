"""
Pydantic schemas for API request/response models.
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr
from app.models import UserRole


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str


# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# Lesson schemas
class LessonBase(BaseModel):
    slug: str
    title: str


class LessonCreate(LessonBase):
    story: str
    reflection: str
    challenge: str
    quiz: str
    order: int = 0
    is_published: bool = True


class LessonUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    story: Optional[str] = None
    reflection: Optional[str] = None
    challenge: Optional[str] = None
    quiz: Optional[str] = None
    order: Optional[int] = None
    is_published: Optional[bool] = None


class LessonList(LessonBase):
    """Minimal lesson info for list views."""
    id: int
    order: int
    module_number: Optional[int] = 1
    is_unlocked: Optional[bool] = True
    is_completed: Optional[bool] = False
    
    class Config:
        from_attributes = True


class LessonDetail(LessonBase):
    """Full lesson content for detail views."""
    id: int
    story: str
    reflection: str
    challenge: str
    quiz: str
    order: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Lesson completion schemas
class LessonCompletionCreate(BaseModel):
    lesson_id: int


class LessonCompletionResponse(BaseModel):
    id: int
    lesson_id: int
    completed_at: datetime
    
    class Config:
        from_attributes = True


# Progress schemas
class ProgressResponse(BaseModel):
    total_lessons: int
    completed_lessons: int
    completion_percentage: float
    completed_lesson_ids: List[int]


# Admin schemas
class AdminUserResponse(UserResponse):
    """Extended user info for admin views."""
    completed_lessons_count: Optional[int] = 0
    total_lessons: Optional[int] = 0
    progress_percentage: Optional[float] = 0.0
    current_lesson_id: Optional[int] = None
    current_lesson_title: Optional[str] = None
    last_activity: Optional[datetime] = None
    
    
class AdminDashboardStats(BaseModel):
    """Admin dashboard statistics."""
    total_users: int
    total_lessons: int
    total_completions: int
    active_users: int
    completion_rate: float
    
    
class UserUpdate(BaseModel):
    """Admin user update schema."""
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


# Reflection schemas - temporarily disabled to fix API startup
# class ReflectionCreate(BaseModel):
#     lesson_id: int
#     content: str

# class ReflectionUpdate(BaseModel):
#     content: str

# class ReflectionResponse(BaseModel):
#     id: int
#     lesson_id: int
#     content: str
#     word_count: int
#     created_at: datetime
#     updated_at: datetime
#     
#     class Config:
#         from_attributes = True 