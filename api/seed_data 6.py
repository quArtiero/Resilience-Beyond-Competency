"""
Seed script to populate database with sample lessons.
Run this script to add initial lesson content for development.
"""
import asyncio
import json
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine
from app.models import Lesson

# Load environment variables
load_dotenv()


# Sample lesson data - TODO: Replace with actual emotional intelligence content
SAMPLE_LESSONS = [
    {
        "slug": "understanding-emotions",
        "title": "Understanding Your Emotions",
        "story": """
        # The Story of Sarah's Big Presentation
        
        Sarah had been preparing for weeks for her presentation to the company's board of directors. 
        As the day approached, she noticed her heart racing, her palms sweating, and her mind 
        racing with worst-case scenarios. Instead of dismissing these feelings, Sarah decided 
        to pause and understand what her emotions were telling her.
        
        She recognized that her anxiety wasn't just fear—it was also excitement about the 
        opportunity to share her innovative ideas. By acknowledging both the nervousness and 
        the enthusiasm, Sarah was able to channel her emotional energy productively.
        
        During the presentation, when she felt her voice starting to shake, she took a deep 
        breath and reminded herself: "These feelings show that I care deeply about this work." 
        Her authentic passion came through, and the board was impressed not just by her ideas, 
        but by her genuine commitment to the project.
        
        **TODO: Replace with professionally developed emotional intelligence story content**
        """,
        "reflection": """
        # Reflection Questions
        
        Take a moment to think about your own relationship with emotions:
        
        1. **Emotional Awareness**: When did you last experience a strong emotion? What physical 
           sensations did you notice in your body?
        
        2. **Emotional Acceptance**: How do you typically respond when you feel anxious or 
           stressed? Do you try to push the feelings away, or do you acknowledge them?
        
        3. **Emotional Reframing**: Can you think of a time when a "negative" emotion actually 
           provided you with valuable information or motivation?
        
        4. **Emotional Expression**: How comfortable are you with expressing your authentic 
           emotions in professional settings? What holds you back, if anything?
        
        **Journal Prompt**: Write about a recent situation where understanding your emotions 
        could have led to a better outcome. What would you do differently now?
        
        **TODO: Develop deeper, research-based reflection exercises**
        """,
        "challenge": """
        # Your 7-Day Emotional Awareness Challenge
        
        This week, practice becoming more aware of your emotional landscape:
        
        ## Daily Practice (5 minutes):
        - **Morning Check-in**: Before starting your day, ask yourself: "How am I feeling right now?" 
          Notice both emotional and physical sensations.
        - **Midday Pause**: Set a reminder to check in with your emotions during lunch or a break.
        - **Evening Reflection**: Before bed, identify the strongest emotion you felt that day and 
          what triggered it.
        
        ## Weekly Challenges:
        - **Day 1-2**: Simply observe without judgment
        - **Day 3-4**: Name your emotions specifically (frustrated vs. overwhelmed vs. disappointed)
        - **Day 5-6**: Notice the physical sensations that accompany different emotions
        - **Day 7**: Practice expressing one authentic emotion to someone you trust
        
        ## Success Metrics:
        - Increased awareness of emotional patterns
        - Better emotional vocabulary
        - Reduced emotional reactivity
        - Improved decision-making under stress
        
        **TODO: Create structured, measurable challenges with progress tracking**
        """,
        "quiz": json.dumps({
            "questions": [
                {
                    "id": 1,
                    "question": "What is the first step in developing emotional intelligence?",
                    "type": "multiple_choice",
                    "options": [
                        "Controlling your emotions",
                        "Becoming aware of your emotions",
                        "Expressing emotions freely",
                        "Avoiding negative emotions"
                    ],
                    "correct_answer": 1,
                    "explanation": "Emotional awareness is the foundation of emotional intelligence. You can't manage what you don't recognize."
                },
                {
                    "id": 2,
                    "question": "True or False: All emotions, including negative ones, provide valuable information.",
                    "type": "true_false",
                    "correct_answer": True,
                    "explanation": "Even uncomfortable emotions like anxiety, anger, or sadness can signal important needs, boundaries, or values that require attention."
                },
                {
                    "id": 3,
                    "question": "What physical sensations might indicate emotional stress?",
                    "type": "multiple_select",
                    "options": [
                        "Rapid heartbeat",
                        "Tense shoulders",
                        "Shallow breathing",
                        "Stomach butterflies",
                        "All of the above"
                    ],
                    "correct_answers": [0, 1, 2, 3, 4],
                    "explanation": "The body and mind are interconnected. Physical awareness can be a gateway to emotional awareness."
                }
            ],
            "note": "TODO: Develop comprehensive, validated assessment questions"
        }),
        "order": 1
    },
    {
        "slug": "managing-stress-resilience",
        "title": "Building Stress Resilience",
        "story": """
        # Marcus and the Impossible Deadline
        
        Marcus, a software developer, received news that his project deadline had been moved up 
        by two weeks due to a client emergency. His initial reaction was panic—there was simply 
        no way to deliver quality work in that timeframe. His team was already stretched thin, 
        and the scope was complex.
        
        Instead of spiraling into stress paralysis, Marcus implemented his resilience toolkit:
        
        **Step 1: Pause and Breathe**
        He took five deep breaths and reminded himself that stress is normal and manageable.
        
        **Step 2: Reframe the Situation**
        Instead of "This is impossible," he shifted to "This is challenging, and we'll need 
        to be strategic."
        
        **Step 3: Focus on What He Could Control**
        - Prioritized the most critical features
        - Communicated transparently with stakeholders about tradeoffs
        - Organized daily stand-ups to maintain team coordination
        - Broke the work into smaller, manageable chunks
        
        **Step 4: Maintain Perspective**
        He reminded himself that while this project was important, it wasn't life-or-death, 
        and that he had successfully navigated difficult situations before.
        
        The result? Not only did the team deliver on time, but the experience strengthened 
        their collaboration and Marcus's confidence in handling future challenges.
        
        **TODO: Replace with evidence-based resilience training content**
        """,
        "reflection": """
        # Building Your Resilience Foundation
        
        Resilience isn't about being invulnerable—it's about developing the skills to bounce 
        back from challenges and grow stronger through adversity.
        
        ## Self-Assessment Questions:
        
        1. **Stress Response Patterns**: How does your body typically respond to stress? What 
           are your early warning signs?
        
        2. **Coping Strategies**: What methods do you currently use to manage stress? Which 
           ones are helpful vs. harmful?
        
        3. **Perspective Skills**: When facing a challenge, do you tend to catastrophize or 
           maintain perspective? What helps you stay grounded?
        
        4. **Support Systems**: Who are the people in your life who help you stay resilient? 
           How do you tap into their support?
        
        5. **Growth Mindset**: Can you think of a past challenge that ultimately made you 
           stronger or more capable?
        
        ## Resilience Inventory:
        Rate yourself (1-5) on these resilience factors:
        - Emotional regulation under pressure
        - Ability to maintain perspective during setbacks
        - Willingness to ask for help when needed
        - Capacity to learn from difficult experiences
        - Physical practices that support mental resilience
        
        **TODO: Implement validated resilience assessment tools**
        """,
        "challenge": """
        # 14-Day Resilience Building Program
        
        Develop your stress resilience through daily practice and weekly challenges:
        
        ## Week 1: Foundation Building
        **Daily Practice** (10 minutes):
        - **Morning**: 5-minute mindfulness meditation or breathing exercise
        - **Evening**: Write down one challenge from the day and one way you handled it well
        
        **Weekly Challenges**:
        - Day 1-3: Practice the 4-7-8 breathing technique during stressful moments
        - Day 4-5: Identify your stress triggers and early warning signs
        - Day 6-7: Experiment with different stress-relief techniques (exercise, music, nature)
        
        ## Week 2: Advanced Resilience
        **Daily Practice** (15 minutes):
        - **Morning**: Visualization of successfully handling today's challenges
        - **Afternoon**: Practice reframing one negative thought or situation
        - **Evening**: Gratitude journaling - three things that went well
        
        **Weekly Challenges**:
        - Day 8-10: Practice perspective-taking during conflicts or setbacks
        - Day 11-12: Strengthen your support network - reach out to one person each day
        - Day 13-14: Apply the full resilience framework to a current challenge
        
        ## Resilience Framework (to practice):
        1. **PAUSE**: Take a breath before reacting
        2. **ASSESS**: What can and can't I control?
        3. **REFRAME**: How else could I view this situation?
        4. **ACT**: Take one small step forward
        5. **REFLECT**: What did I learn from this experience?
        
        **TODO: Create progressive, measurable resilience training modules**
        """,
        "quiz": json.dumps({
            "questions": [
                {
                    "id": 1,
                    "question": "What is the difference between stress and distress?",
                    "type": "multiple_choice",
                    "options": [
                        "There is no difference",
                        "Stress is positive, distress is negative",
                        "Stress can be motivating, distress is overwhelming",
                        "Stress is mental, distress is physical"
                    ],
                    "correct_answer": 2,
                    "explanation": "Stress can be a positive motivator (eustress), while distress occurs when stress becomes overwhelming and harmful."
                },
                {
                    "id": 2,
                    "question": "Which of these is NOT a healthy stress management technique?",
                    "type": "multiple_choice",
                    "options": [
                        "Deep breathing exercises",
                        "Avoiding all stressful situations",
                        "Regular physical exercise",
                        "Talking to a trusted friend"
                    ],
                    "correct_answer": 1,
                    "explanation": "Avoiding all stress isn't realistic or healthy. Building resilience means learning to manage stress effectively, not eliminating it entirely."
                },
                {
                    "id": 3,
                    "question": "What are the key components of the resilience framework mentioned in the lesson?",
                    "type": "multiple_select",
                    "options": [
                        "Pause",
                        "Assess",
                        "Reframe",
                        "Act",
                        "Reflect"
                    ],
                    "correct_answers": [0, 1, 2, 3, 4],
                    "explanation": "The full framework includes all five components: Pause, Assess, Reframe, Act, and Reflect."
                }
            ],
            "note": "TODO: Develop comprehensive stress resilience assessments"
        }),
        "order": 2
    }
]


async def seed_lessons():
    """Seed the database with sample lessons."""
    async with AsyncSession(engine) as session:
        # Check if lessons already exist
        result = await session.execute(text("SELECT COUNT(*) FROM lesson"))
        existing_count = result.scalar()
        
        if existing_count and existing_count > 0:
            print("Lessons already exist. Skipping seed data.")
            return
        
        print("Seeding database with sample lessons...")
        
        for lesson_data in SAMPLE_LESSONS:
            lesson = Lesson(**lesson_data)
            session.add(lesson)
        
        await session.commit()
        print(f"Successfully seeded {len(SAMPLE_LESSONS)} lessons.")


if __name__ == "__main__":
    asyncio.run(seed_lessons()) 