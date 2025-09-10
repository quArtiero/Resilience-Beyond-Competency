"""
CRUD operations for database models.
"""
from datetime import datetime
from typing import List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User, Lesson, LessonCompletion
from app.schemas import UserCreate, LessonCreate, LessonUpdate
from app.deps import get_password_hash


# User CRUD
async def create_user(session: AsyncSession, user_create: UserCreate) -> User:
    """Create a new user."""
    db_user = User(
        email=user_create.email,
        username=user_create.username,
        hashed_password=get_password_hash(user_create.password)
    )
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user


async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
    """Get user by email."""
    statement = select(User).where(User.email == email)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


async def get_user_by_username(session: AsyncSession, username: str) -> Optional[User]:
    """Get user by username."""
    statement = select(User).where(User.username == username)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


# Lesson CRUD
async def get_lessons(session: AsyncSession, skip: int = 0, limit: int = 100, include_unpublished: bool = False) -> List[Lesson]:
    """Get all lessons ordered by order field."""
    statement = select(Lesson).order_by(Lesson.order).offset(skip).limit(limit)
    if not include_unpublished:
        statement = statement.where(Lesson.is_published == True)
    
    result = await session.execute(statement)
    return result.scalars().all()


async def get_lesson(session: AsyncSession, lesson_id: int) -> Optional[Lesson]:
    """Get lesson by ID."""
    statement = select(Lesson).where(Lesson.id == lesson_id)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


async def get_lesson_by_slug(session: AsyncSession, slug: str) -> Optional[Lesson]:
    """Get lesson by slug."""
    statement = select(Lesson).where(Lesson.slug == slug)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


async def create_lesson(session: AsyncSession, lesson_create: LessonCreate) -> Lesson:
    """Create a new lesson."""
    db_lesson = Lesson(**lesson_create.model_dump())
    session.add(db_lesson)
    await session.commit()
    await session.refresh(db_lesson)
    return db_lesson


async def update_lesson(
    session: AsyncSession, 
    lesson_id: int, 
    lesson_update: LessonUpdate
) -> Optional[Lesson]:
    """Update an existing lesson."""
    db_lesson = await get_lesson(session, lesson_id)
    if not db_lesson:
        return None
    
    lesson_data = lesson_update.model_dump(exclude_unset=True)
    for key, value in lesson_data.items():
        setattr(db_lesson, key, value)
    
    db_lesson.updated_at = datetime.utcnow()
    await session.commit()
    await session.refresh(db_lesson)
    return db_lesson


async def delete_lesson(session: AsyncSession, lesson_id: int) -> bool:
    """Delete a lesson."""
    db_lesson = await get_lesson(session, lesson_id)
    if not db_lesson:
        return False
    
    await session.delete(db_lesson)
    await session.commit()
    return True


# Lesson Completion CRUD
async def create_lesson_completion(
    session: AsyncSession, 
    user_id: int, 
    lesson_id: int
) -> Optional[LessonCompletion]:
    """Create a lesson completion record."""
    # Check if already completed
    statement = select(LessonCompletion).where(
        LessonCompletion.user_id == user_id,
        LessonCompletion.lesson_id == lesson_id
    )
    result = await session.execute(statement)
    existing = result.scalar_one_or_none()
    
    if existing:
        return existing  # Already completed
    
    # Verify lesson exists
    lesson = await get_lesson(session, lesson_id)
    if not lesson:
        return None
    
    db_completion = LessonCompletion(user_id=user_id, lesson_id=lesson_id)
    session.add(db_completion)
    await session.commit()
    await session.refresh(db_completion)
    return db_completion


async def get_user_completions(session: AsyncSession, user_id: int) -> List[LessonCompletion]:
    """Get all lesson completions for a user."""
    statement = select(LessonCompletion).where(LessonCompletion.user_id == user_id)
    result = await session.execute(statement)
    return result.scalars().all()


async def get_lesson_completion_stats(session: AsyncSession, user_id: int) -> dict:
    """Get lesson completion statistics for a user."""
    # Get total lessons
    total_statement = select(Lesson).where(Lesson.is_published == True)
    total_result = await session.execute(total_statement)
    total_lessons = len(total_result.scalars().all())
    
    # Get completed lessons
    completed_statement = select(LessonCompletion).where(LessonCompletion.user_id == user_id)
    completed_result = await session.execute(completed_statement)
    completed_lessons = completed_result.scalars().all()
    completed_count = len(completed_lessons)
    
    completion_percentage = (completed_count / total_lessons * 100) if total_lessons > 0 else 0
    completed_lesson_ids = [completion.lesson_id for completion in completed_lessons]
    
    return {
        "total_lessons": total_lessons,
        "completed_lessons": completed_count,
        "completion_percentage": round(completion_percentage, 2),
        "completed_lesson_ids": completed_lesson_ids
    }


# Admin CRUD functions
async def get_users(session: AsyncSession, skip: int = 0, limit: int = 100) -> List[User]:
    """Get all users."""
    statement = select(User).offset(skip).limit(limit)
    result = await session.execute(statement)
    return result.scalars().all()


async def get_users_with_progress(session: AsyncSession, skip: int = 0, limit: int = 100) -> List[dict]:
    """Get all users with their progress information."""
    from sqlalchemy import func, desc
    
    # Get total lessons count
    total_lessons_result = await session.execute(select(func.count(Lesson.id)))
    total_lessons = total_lessons_result.scalar() or 0
    
    # Get users with their completion counts and last activity
    statement = select(
        User,
        func.count(LessonCompletion.id).label('completed_lessons_count'),
        func.max(LessonCompletion.completed_at).label('last_activity')
    ).outerjoin(
        LessonCompletion, User.id == LessonCompletion.user_id
    ).group_by(User.id).offset(skip).limit(limit)
    
    result = await session.execute(statement)
    rows = result.all()
    
    users_with_progress = []
    for row in rows:
        user = row.User
        completed_count = row.completed_lessons_count or 0
        last_activity = row.last_activity
        
        # Calculate progress percentage
        progress_percentage = (completed_count / total_lessons * 100) if total_lessons > 0 else 0.0
        
        # Get current lesson (next incomplete lesson)
        current_lesson = None
        completed_lesson_ids_result = await session.execute(
            select(LessonCompletion.lesson_id).where(LessonCompletion.user_id == user.id)
        )
        completed_lesson_ids = [row[0] for row in completed_lesson_ids_result.all()]
        
        if completed_count < total_lessons:
            next_lesson_result = await session.execute(
                select(Lesson).where(~Lesson.id.in_(completed_lesson_ids)).order_by(Lesson.order).limit(1)
            )
            current_lesson = next_lesson_result.scalar_one_or_none()
        
        user_data = {
            **user.__dict__,
            'completed_lessons_count': completed_count,
            'total_lessons': total_lessons,
            'progress_percentage': round(progress_percentage, 1),
            'current_lesson_id': current_lesson.id if current_lesson else None,
            'current_lesson_title': current_lesson.title if current_lesson else None,
            'last_activity': last_activity
        }
        users_with_progress.append(user_data)
    
    return users_with_progress


async def get_user_by_id(session: AsyncSession, user_id: int) -> Optional[User]:
    """Get user by ID."""
    statement = select(User).where(User.id == user_id)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


async def update_user(session: AsyncSession, user_id: int, user_update) -> Optional[User]:
    """Update an existing user."""
    db_user = await get_user_by_id(session, user_id)
    if not db_user:
        return None
    
    user_data = user_update.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)
    
    await session.commit()
    await session.refresh(db_user)
    return db_user


async def delete_user(session: AsyncSession, user_id: int) -> bool:
    """Delete a user."""
    db_user = await get_user_by_id(session, user_id)
    if not db_user:
        return False
    
    await session.delete(db_user)
    await session.commit()
    return True


async def get_lesson_completions_by_user_id(session: AsyncSession, user_id: int) -> List[LessonCompletion]:
    """Get lesson completions for a specific user."""
    statement = select(LessonCompletion).where(LessonCompletion.user_id == user_id)
    result = await session.execute(statement)
    return result.scalars().all()


async def get_total_lesson_completions(session: AsyncSession) -> int:
    """Get total number of lesson completions across all users."""
    from sqlalchemy import func
    statement = select(func.count(LessonCompletion.id))
    result = await session.execute(statement)
    return result.scalar() or 0


# Module progression functions
async def get_user_module_progress(session: AsyncSession, user_id: int) -> dict:
    """Get user's progress across all modules."""
    from sqlalchemy import func
    
    # Get all modules and their lesson counts
    modules_result = await session.execute(
        select(
            Lesson.module_number,
            func.count(Lesson.id).label('total_lessons')
        ).group_by(Lesson.module_number).order_by(Lesson.module_number)
    )
    modules_data = modules_result.all()
    
    # Get user's completed lessons per module
    completions_result = await session.execute(
        select(
            Lesson.module_number,
            func.count(LessonCompletion.id).label('completed_lessons')
        ).join(
            LessonCompletion, Lesson.id == LessonCompletion.lesson_id
        ).where(
            LessonCompletion.user_id == user_id
        ).group_by(Lesson.module_number)
    )
    completions_data = {row.module_number: row.completed_lessons for row in completions_result.all()}
    
    # Build module progress
    module_progress = {}
    for module_data in modules_data:
        module_num = module_data.module_number
        total_lessons = module_data.total_lessons
        completed_lessons = completions_data.get(module_num, 0)
        
        # Module is unlocked if it's module 1 or if previous module is completed
        is_unlocked = module_num == 1
        if module_num > 1:
            prev_module = module_num - 1
            if prev_module in module_progress:
                prev_completed = module_progress[prev_module]['completed_lessons']
                prev_total = module_progress[prev_module]['total_lessons']
                is_unlocked = prev_completed >= prev_total
        
        module_progress[module_num] = {
            'module_number': module_num,
            'total_lessons': total_lessons,
            'completed_lessons': completed_lessons,
            'is_unlocked': is_unlocked,
            'is_completed': completed_lessons >= total_lessons,
            'progress_percentage': round((completed_lessons / total_lessons * 100) if total_lessons > 0 else 0, 1)
        }
    
    return module_progress


async def is_lesson_unlocked(session: AsyncSession, user_id: int, lesson_id: int) -> bool:
    """Check if a specific lesson is unlocked for a user."""
    # Get the lesson's module
    lesson_result = await session.execute(
        select(Lesson.module_number).where(Lesson.id == lesson_id)
    )
    lesson = lesson_result.scalar_one_or_none()
    if not lesson:
        return False
    
    module_number = lesson
    
    # Module 1 is always unlocked
    if module_number == 1:
        return True
    
    # Check if previous module is completed
    module_progress = await get_user_module_progress(session, user_id)
    prev_module = module_number - 1
    
    if prev_module in module_progress:
        return module_progress[prev_module]['is_completed']
    
    return False


async def get_lessons_with_unlock_status(session: AsyncSession, user_id: int) -> List[dict]:
    """Get all lessons with their unlock status for a user."""
    # Get all lessons
    lessons = await get_lessons(session)
    
    # Get user's module progress
    module_progress = await get_user_module_progress(session, user_id)
    
    # Get user's completed lessons
    completed_result = await session.execute(
        select(LessonCompletion.lesson_id).where(LessonCompletion.user_id == user_id)
    )
    completed_lesson_ids = {row[0] for row in completed_result.all()}
    
    # Add unlock status to each lesson
    lessons_with_status = []
    for lesson in lessons:
        module_info = module_progress.get(lesson.module_number, {})
        lesson_dict = {
            'id': lesson.id,
            'title': lesson.title,
            'slug': lesson.slug,
            'order': lesson.order,
            'module_number': lesson.module_number,
            'is_unlocked': module_info.get('is_unlocked', False),
            'is_completed': lesson.id in completed_lesson_ids,
            'module_progress': module_info
        }
        lessons_with_status.append(lesson_dict)
    
    return lessons_with_status 