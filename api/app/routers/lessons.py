"""
Lessons API router for Resilient Mastery platform.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import get_session, get_current_active_user, get_current_user_optional
from app.models import User
from app.schemas import (
    LessonList, 
    LessonDetail, 
    LessonCompletionResponse, 
    ProgressResponse
    # ReflectionCreate, ReflectionUpdate, ReflectionResponse - temporarily disabled
)
from app.crud import (
    get_lessons, 
    get_lesson, 
    create_lesson_completion,
    get_lesson_completion_stats,
    get_lessons_with_unlock_status,
    is_lesson_unlocked,
    get_user_module_progress
    # Reflection functions will be available after container restart
)

router = APIRouter()


@router.get("/lessons", response_model=List[LessonList])
async def list_lessons(
    skip: int = 0,
    limit: int = 100,
    session: AsyncSession = Depends(get_session),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """
    Get list of all published lessons with unlock status.
    Returns minimal lesson info for sidebar navigation.
    """
    if current_user:
        # Return lessons with unlock status for authenticated users
        lessons_with_status = await get_lessons_with_unlock_status(session, current_user.id)
        return [
            LessonList(
                id=lesson['id'],
                title=lesson['title'],
                slug=lesson['slug'],
                order=lesson['order'],
                module_number=lesson['module_number'],
                is_unlocked=lesson['is_unlocked'],
                is_completed=lesson['is_completed']
            )
            for lesson in lessons_with_status
        ]
    else:
        # Return basic lesson info for unauthenticated users
        lessons = await get_lessons(session, skip=skip, limit=limit)
        return [
            LessonList(
                id=lesson.id,
                title=lesson.title,
                slug=lesson.slug,
                order=lesson.order,
                module_number=getattr(lesson, 'module_number', 1),
                is_unlocked=lesson.order <= 2,  # Only first module unlocked for guests
                is_completed=False
            )
            for lesson in lessons
        ]


@router.get("/lessons/{lesson_id}", response_model=LessonDetail)
async def get_lesson_detail(
    lesson_id: int,
    session: AsyncSession = Depends(get_session)
):
    """
    Get full lesson content by ID.
    Includes story, reflection, challenge, and quiz content.
    """
    lesson = await get_lesson(session, lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    return lesson


@router.post("/lessons/{lesson_id}/complete", response_model=LessonCompletionResponse)
async def complete_lesson(
    lesson_id: int,
    current_user: User = Depends(get_current_active_user),
    session: AsyncSession = Depends(get_session)
):
    """
    Mark a lesson as completed for the current user.
    Auth required - creates a completion record.
    """
    completion = await create_lesson_completion(session, current_user.id, lesson_id)
    if not completion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    return completion


@router.get("/progress", response_model=ProgressResponse)
async def get_user_progress(
    current_user: User = Depends(get_current_active_user),
    session: AsyncSession = Depends(get_session)
):
    """
    Get progress statistics for the current user.
    Returns total lessons, completed count, percentage, and completed IDs.
    """
    stats = await get_lesson_completion_stats(session, current_user.id)
    return ProgressResponse(**stats)


# Reflection endpoints - temporarily disabled until container restart
# Will be enabled once the new CRUD functions are available

# @router.post("/lessons/{lesson_id}/reflection", response_model=ReflectionResponse)
# async def save_reflection(...)

# @router.get("/lessons/{lesson_id}/reflection", response_model=ReflectionResponse)  
# async def get_reflection(...)

# @router.get("/reflections", response_model=List[ReflectionResponse])
# async def get_all_reflections(...)

# @router.delete("/lessons/{lesson_id}/reflection")
# async def delete_reflection_endpoint(...) 