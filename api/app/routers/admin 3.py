"""
Admin API router for Resilient Mastery platform.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.deps import get_session, get_current_active_user
from app.models import User, Lesson, LessonCompletion, UserRole
from app.schemas import (
    AdminUserResponse, 
    AdminDashboardStats, 
    UserUpdate,
    LessonCreate,
    LessonUpdate,
    LessonDetail
)
from app.crud import get_lessons, get_users_with_progress

router = APIRouter()


def require_admin(current_user: User = Depends(get_current_active_user)):
    """Dependency to require admin role."""
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


@router.get("/admin/dashboard", response_model=AdminDashboardStats)
async def get_admin_dashboard(
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Get dashboard statistics for admin."""
    
    # Get total users
    total_users_result = await session.execute(select(func.count(User.id)))
    total_users = total_users_result.scalar()
    
    # Get active users
    active_users_result = await session.execute(
        select(func.count(User.id)).where(User.is_active == True)
    )
    active_users = active_users_result.scalar()
    
    # Get total lessons
    total_lessons_result = await session.execute(select(func.count(Lesson.id)))
    total_lessons = total_lessons_result.scalar()
    
    # Get total completions
    total_completions_result = await session.execute(select(func.count(LessonCompletion.id)))
    total_completions = total_completions_result.scalar()
    
    # Calculate completion rate
    completion_rate = 0.0
    if total_users > 0 and total_lessons > 0:
        completion_rate = (total_completions / (total_users * total_lessons)) * 100
    
    return AdminDashboardStats(
        total_users=total_users,
        total_lessons=total_lessons,
        total_completions=total_completions,
        active_users=active_users,
        completion_rate=completion_rate
    )


@router.get("/admin/users", response_model=List[AdminUserResponse])
async def get_all_users(
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin),
    skip: int = 0,
    limit: int = 100
):
    """Get all users with detailed progress information."""
    
    # Get users with progress data
    users_data = await get_users_with_progress(session, skip, limit)
    
    users = []
    for user_dict in users_data:
        # Clean the dict for AdminUserResponse
        clean_dict = {k: v for k, v in user_dict.items() if not k.startswith('_')}
        users.append(AdminUserResponse(**clean_dict))
    
    return users


@router.get("/admin/users/{user_id}", response_model=AdminUserResponse)
async def get_user_by_id_admin(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Get specific user details."""
    
    # Get user with completion count
    query = select(
        User,
        func.count(LessonCompletion.id).label('completed_lessons_count')
    ).outerjoin(
        LessonCompletion, User.id == LessonCompletion.user_id
    ).where(User.id == user_id).group_by(User.id)
    
    result = await session.execute(query)
    user_data = result.first()
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user, completion_count = user_data
    
    return AdminUserResponse(
        id=user.id,
        email=user.email,
        username=user.username,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at,
        completed_lessons_count=completion_count or 0
    )


@router.put("/admin/users/{user_id}", response_model=AdminUserResponse)
async def update_user_admin(
    user_id: int,
    user_update: UserUpdate,
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Update user details (admin only)."""
    
    # Get the user
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update user fields
    update_data = user_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    session.add(user)
    await session.commit()
    await session.refresh(user)
    
    # Get completion count
    completion_result = await session.execute(
        select(func.count(LessonCompletion.id)).where(LessonCompletion.user_id == user.id)
    )
    completion_count = completion_result.scalar()
    
    return AdminUserResponse(
        id=user.id,
        email=user.email,
        username=user.username,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at,
        completed_lessons_count=completion_count or 0
    )


@router.delete("/admin/users/{user_id}")
async def delete_user_admin(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Delete user (admin only)."""
    
    # Don't allow admin to delete themselves
    if user_id == admin_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    # Get the user
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    await session.delete(user)
    await session.commit()
    
    return {"message": "User deleted successfully"}


@router.get("/admin/lessons", response_model=List[LessonDetail])
async def get_all_lessons_admin(
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Get all lessons for admin management."""
    return await get_lessons(session, include_unpublished=True)


@router.post("/admin/lessons", response_model=LessonDetail)
async def create_lesson_admin(
    lesson_create: LessonCreate,
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Create new lesson (admin only)."""
    
    from app.crud import create_lesson
    
    lesson = await create_lesson(session, lesson_create)
    return lesson


@router.put("/admin/lessons/{lesson_id}", response_model=LessonDetail)
async def update_lesson_admin(
    lesson_id: int,
    lesson_update: LessonUpdate,
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Update lesson (admin only)."""
    
    # Get the lesson
    result = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
    lesson = result.scalar_one_or_none()
    
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    
    # Update lesson fields
    update_data = lesson_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(lesson, field, value)
    
    session.add(lesson)
    await session.commit()
    await session.refresh(lesson)
    
    return lesson


@router.delete("/admin/lessons/{lesson_id}")
async def delete_lesson_admin(
    lesson_id: int,
    session: AsyncSession = Depends(get_session),
    admin_user: User = Depends(require_admin)
):
    """Delete lesson (admin only)."""
    
    # Get the lesson
    result = await session.execute(select(Lesson).where(Lesson.id == lesson_id))
    lesson = result.scalar_one_or_none()
    
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    
    await session.delete(lesson)
    await session.commit()
    
    return {"message": "Lesson deleted successfully"}
