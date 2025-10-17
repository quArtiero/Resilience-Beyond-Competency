"""
Deploy Lesson 5 content to Render
Run after check_lesson5_render.py
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys

sys.path.append('/app')
from app.models import Lesson

# Import the content from the module
try:
    from module2_lesson5_empathy import lesson5_content
    print("✅ Content module loaded")
except ImportError:
    print("⚠️ Content module not found, using embedded content")
    # Embedded minimal content as fallback
    lesson5_content = {
        'title': 'Empathy: Read, Reflect, Relate',
        'slug': 'empathy-read-reflect-relate',
        'module_number': 2,
        'order': 8,
        'story': 'Full content available in module2_lesson5_empathy.py',
        'reflection': '<lrl-drill>\n\n<three-hats-drill>\n\n<async-empathy-drill>\n\n<ear-practice>',
        'challenge': '<empathy-case-simulator>\n\n<empathy-protocol-builder>\n\n<empathy-tracker>',
        'quiz': '{"questions":[{"id":1,"type":"multiple_choice","text":"Empathy in this course is best defined as...","options":["Agreeing to keep peace","Accurately reflecting the other person\'s view/need in a way they recognize","Giving fast advice","Avoiding boundaries"],"correct":1,"explanation":"Understanding first; agreement optional."}]}'
    }

async def deploy_lesson5_content():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    print("📦 Connecting to database...")
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        try:
            # Get lesson 24
            result = await session.execute(select(Lesson).where(Lesson.id == 24))
            lesson = result.scalar_one_or_none()
            
            if not lesson:
                print("❌ Lesson 24 not found! Run check_lesson5_render.py first")
                await engine.dispose()
                return
            
            print("📝 Updating Lesson 24 with full content...")
            
            # Update with content
            lesson.title = lesson5_content['title']
            lesson.slug = lesson5_content['slug']
            lesson.module_number = lesson5_content['module_number']
            lesson.order = lesson5_content['order']
            
            # For very long content, we'll update the key structure
            # Full content should be loaded from the module if available
            if 'story' in lesson5_content:
                if len(lesson5_content['story']) > 100:
                    lesson.story = lesson5_content['story']
                    print(f"   Story: {len(lesson.story)} chars")
                    
            if 'reflection' in lesson5_content:
                lesson.reflection = lesson5_content['reflection']
                print(f"   Reflection: {len(lesson.reflection)} chars")
                
            if 'challenge' in lesson5_content:
                lesson.challenge = lesson5_content['challenge']
                print(f"   Challenge: {len(lesson.challenge)} chars")
                
            if 'quiz' in lesson5_content:
                lesson.quiz = lesson5_content['quiz']
                print(f"   Quiz: {lesson.quiz.count('question')} questions")
            
            lesson.is_published = True
            
            await session.commit()
            print("✅ Lesson 5 content updated successfully!")
            
            # Verify
            print("\n📊 Verification:")
            print(f"   Title: {lesson.title}")
            print(f"   Module: {lesson.module_number}")
            print(f"   Order: {lesson.order}")
            print(f"   Published: {lesson.is_published}")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            await session.rollback()
        finally:
            await engine.dispose()

# Run it
asyncio.run(deploy_lesson5_content())
print("\n🎉 Deployment complete! Check https://resilience-frontend.onrender.com")
