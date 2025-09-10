"""
Authentication API router for Resilient Mastery platform.
"""
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.deps import (
    get_session, 
    authenticate_user, 
    create_access_token,
    get_current_active_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.models import User
from app.schemas import Token, UserLogin, UserCreate, UserResponse
from app.crud import create_user, get_user_by_email, get_user_by_username

router = APIRouter()


@router.post("/auth/register", response_model=UserResponse)
async def register(
    user_create: UserCreate,
    session: AsyncSession = Depends(get_session)
):
    """
    Register a new user account.
    Checks for existing email/username before creating.
    """
    # Check if user already exists
    existing_user = await get_user_by_email(session, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check username
    existing_username = await get_user_by_username(session, user_create.username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create user
    user = await create_user(session, user_create)
    return user


@router.post("/auth/login", response_model=Token)
async def login(
    user_login: UserLogin,
    session: AsyncSession = Depends(get_session)
):
    """
    Login with username and password.
    Returns JWT access token for authenticated requests.
    """
    user = await authenticate_user(session, user_login.username, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/auth/me", response_model=UserResponse)
async def read_users_me(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get current user information.
    Requires valid JWT token.
    """
    return current_user 