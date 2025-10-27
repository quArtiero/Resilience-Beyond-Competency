"""
Debug Module 3 lessons on Render
"""

import asyncio
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os

async def debug_module3():
    # Get database URL from environment
    DATABASE_URL = os.environ.get('DATABASE_URL', '')
    if DATABASE_URL.startswith('postgresql://'):
        DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')
    
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL not set")
        return
    
    print(f"Connecting to database...")
    
    # Create async engine
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    
    async with AsyncSessionLocal() as session:
        try:
            # Import Lesson model
            from app.models import Lesson
            
            print("\n" + "="*60)
            print("MODULE 3 LESSON DEBUGGING")
            print("="*60)
            
            # Check all Module 3 lessons
            result = await session.execute(
                select(Lesson)
                .where(Lesson.module_number == 3)
                .order_by(Lesson.order)
            )
            lessons = result.scalars().all()
            
            print(f"\nTotal Module 3 lessons found: {len(lessons)}")
            print("-"*60)
            
            expected_lessons = [
                (37, "The Bridge in the Storm", 11),
                (38, "What Is Cognitive Flexibility?", 12),
                (39, "Barriers & Biases: Why Flexibility Fails", 13),
                (40, "Tools for Reframing", 14),
                (41, "Flexibility in Action", 15),
                (42, "Reflection & Integration: Make Flexibility Your Default", 16),
                (43, "The 7-Day Reframe Challenge (Capstone)", 17)
            ]
            
            # Check each expected lesson
            for expected_id, expected_title, expected_order in expected_lessons:
                lesson = next((l for l in lessons if l.id == expected_id), None)
                
                if lesson:
                    print(f"✅ Lesson {expected_id}: {lesson.title[:40]}")
                    print(f"   Order: {lesson.order}, Published: {lesson.is_published}")
                    
                    # Check content presence
                    has_story = len(lesson.story) > 100 if lesson.story else False
                    has_reflection = len(lesson.reflection) > 100 if lesson.reflection else False
                    has_challenge = len(lesson.challenge) > 100 if lesson.challenge else False
                    has_quiz = len(lesson.quiz) > 10 if lesson.quiz else False
                    
                    content_status = []
                    if has_story: content_status.append("Story✓")
                    else: content_status.append("Story✗")
                    
                    if has_reflection: content_status.append("Reflection✓")
                    else: content_status.append("Reflection✗")
                    
                    if has_challenge: content_status.append("Challenge✓")
                    else: content_status.append("Challenge✗")
                    
                    if has_quiz: content_status.append("Quiz✓")
                    else: content_status.append("Quiz✗")
                    
                    print(f"   Content: {' | '.join(content_status)}")
                    
                    # Check for specific interactive component tags
                    if lesson.id == 37:  # Bridge in the Storm
                        if '<rating-scale>' in lesson.story or 'rating-scale' in lesson.story.lower():
                            print(f"   Interactive: Rating scale component found")
                    elif lesson.id == 38:  # What Is Cognitive Flexibility
                        if 'frame-spotting' in lesson.story.lower() or 'alphabet-number' in lesson.story.lower():
                            print(f"   Interactive: Exercise components referenced")
                    elif lesson.id == 39:  # Barriers & Biases
                        if 'breathing-exercise' in lesson.challenge.lower() or 'bias-interrupter' in lesson.story.lower():
                            print(f"   Interactive: Breathing/Bias components referenced")
                    
                else:
                    print(f"❌ MISSING: Lesson {expected_id} - {expected_title}")
            
            # Check for unexpected lessons
            print("\n" + "-"*60)
            print("Checking for unexpected Module 3 lessons...")
            unexpected = [l for l in lessons if l.id not in [e[0] for e in expected_lessons]]
            if unexpected:
                for lesson in unexpected:
                    print(f"⚠️  Unexpected: Lesson {lesson.id} - {lesson.title}")
            else:
                print("✅ No unexpected lessons found")
            
            # Check order sequence
            print("\n" + "-"*60)
            print("Checking lesson order sequence...")
            order_issues = []
            for lesson in lessons:
                expected = next((e for e in expected_lessons if e[0] == lesson.id), None)
                if expected and lesson.order != expected[2]:
                    order_issues.append(f"Lesson {lesson.id} has order {lesson.order}, expected {expected[2]}")
            
            if order_issues:
                print("⚠️  Order issues found:")
                for issue in order_issues:
                    print(f"   - {issue}")
            else:
                print("✅ All lessons have correct order values")
            
            # Summary
            print("\n" + "="*60)
            print("SUMMARY")
            print("="*60)
            
            total_expected = len(expected_lessons)
            total_found = len([e for e in expected_lessons if any(l.id == e[0] for l in lessons)])
            
            if total_found == total_expected:
                print(f"✅ All {total_expected} Module 3 lessons are present")
            else:
                print(f"⚠️  Found {total_found}/{total_expected} expected lessons")
                
            # Check if any lessons need content
            content_issues = []
            for lesson in lessons:
                issues = []
                if not lesson.story or len(lesson.story) < 100:
                    issues.append("story")
                if not lesson.reflection or len(lesson.reflection) < 100:
                    issues.append("reflection")
                if not lesson.challenge or len(lesson.challenge) < 100:
                    issues.append("challenge")
                if not lesson.quiz or len(lesson.quiz) < 10:
                    issues.append("quiz")
                
                if issues:
                    content_issues.append(f"Lesson {lesson.id}: missing {', '.join(issues)}")
            
            if content_issues:
                print("\n⚠️  Content issues:")
                for issue in content_issues:
                    print(f"   - {issue}")
            else:
                print("✅ All lessons have complete content")
                
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(debug_module3())
