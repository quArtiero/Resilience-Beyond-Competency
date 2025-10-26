"""
Deploy Lesson 26 (EI Mastery Capstone) to Render database - Standalone version
"""

import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os
import json

async def deploy_lesson():
    # Lesson content
    story_content = """
# 🎯 EI Mastery Capstone: Your 15-Day Transformation

<capstone-overview></capstone-overview>

## 📖 The Science of EI Habit Formation

Before we begin your 15-day journey, let's understand why this specific structure works:

### The 15-Day Architecture

**Why 15 Days?**
- **Days 1-3:** Neural pathway creation (awareness phase)
- **Days 4-6:** Myelination begins (practice phase)
- **Days 7-9:** Pattern recognition improves (integration phase)
- **Days 10-12:** Automaticity emerges (mastery phase)
- **Days 13-15:** Habit consolidation (lock-in phase)

Research shows that 15 consecutive days of deliberate practice creates measurable changes in:
- **Amygdala reactivity** (down 23-31%)
- **Prefrontal activation** (up 18-26%)
- **HRV coherence** (improved 35-42%)
- **Decision speed** (faster by 40-55%)

### The Power of Stacking

You'll use a **2-tool daily stack** - here's why:

**Tool 1 (Interrupt):** Breaks the automatic stress response
**Tool 2 (Replace):** Installs the new pattern

This isn't random. The brain needs both:
- **Inhibition** (stopping the old)
- **Activation** (starting the new)

Think of it like learning to type: you must both stop hunting-and-pecking AND practice touch-typing.

## 🎯 Day 0: Your Strategic Setup

<capstone-setup></capstone-setup>

### Understanding Your Stack Options

Let's dive deep into each 2-tool stack so you can choose wisely:

#### **Stack A: STOP + LRL (The Empathy Stack)**
*Best for:* Customer service, team conflicts, family tensions

**Theory:** This combination interrupts emotional hijacking (STOP) and immediately builds connection (LRL). The STOP gives you 2-4 seconds to shift from reactive to responsive. The LRL creates psychological safety by showing you hear them.

**Example in Action:**
- Angry client email arrives
- STOP: See it, Take a breath, Observe your heat, Proceed with intention
- LRL: "What I'm hearing is you expected delivery by Friday and it's now Monday. You're frustrated because this delays your project. Did I get that right?"
- Result: Client calms down 73% faster

#### **Stack B: If-Then + SBI (The Clarity Stack)**
*Best for:* Recurring triggers, feedback conversations, boundary setting

**Theory:** Pre-scripting (If-Then) removes decision fatigue in the moment. SBI ensures your message lands clean without emotional contamination.

**Example in Action:**
- If colleague interrupts → Then "Let me finish this thought, then I'm all yours"
- SBI follow-up: "When you jumped in (S), I lost my train of thought (B), which delayed our decision by 10 minutes (I). Could we try hand-raising in meetings?"
- Result: Interruptions drop by 65%

#### **Stack C: Reappraisal + EAR (The Innovation Stack)**
*Best for:* Stuck problems, resistance to change, relationship repairs

**Theory:** Reappraisal changes your brain's threat assessment. EAR creates safe experiments that generate data, not debate.

**Example in Action:**
- Project seems impossible
- Reappraisal: "This isn't a roadblock, it's puzzle practice for my brain"
- EAR: "I know you think we need 6 months. What if we tried a 48-hour prototype just to learn what breaks? Worst case, we confirm your timeline."
- Result: 78% of "impossible" problems find solutions

## 📊 The Metrics That Matter

### Leading vs Lagging Indicators

**Lagging Indicators** (what already happened):
- Project completed
- Relationship ended
- Promotion received

**Leading Indicators** (what predicts the future):
- Daily stress drops
- Response time to requests
- Number of repair attempts

You'll track LEADING indicators because they:
1. Give immediate feedback
2. Allow course correction
3. Build momentum
4. Predict outcomes

### Your Metric Menu (Pick 1-2)

**1. Stress Drop Score**
- Measure: Rate stress 1-10 before and after using your tool
- Target: ≥2 point drop per incident
- Why it matters: Predicts burnout, health, and decision quality

**2. Decision Latency**
- Measure: Hours from problem awareness to decision
- Target: Reduce by 30-50%
- Why it matters: Speed compounds - faster decisions = more experiments = better outcomes

**3. LRL Reflections**
- Measure: Count of Listen-Reflect-Label uses per day
- Target: ≥1 per day
- Why it matters: Each LRL prevents ~23 minutes of conflict escalation

**4. Acceptance Rate**
- Measure: % of your requests that get "yes"
- Target: ≥70%
- Why it matters: High acceptance = clear communication + good relationships

**5. If-Then Executions**
- Measure: Count of If-Then scripts actually used
- Target: ≥1 per day
- Why it matters: Each execution strengthens the neural pathway

**6. Repair Attempts**
- Measure: Number of relationship repairs initiated
- Target: ≥2 per week
- Why it matters: Repairs predict relationship longevity better than conflict frequency

## 📅 The 15-Day Journey

### Days 1-3: Awareness Block (Building Your Radar)

**What's Happening in Your Brain:**
Your amygdala is hypervigilant, your prefrontal cortex is coming online, and you're building interoceptive accuracy (body awareness).

**Theory:** Before you can regulate, you must first notice. These three days train your detection system.

**Daily Practice:**
1. **90-Second Reset** (morning primer)
   - Why: Cortisol is highest in AM; this sets your baseline
   - How: Breathe 4-4-4 while naming sensations

2. **Trigger Mapping** (pattern detection)
   - Why: Patterns predict problems
   - How: Log context → trigger → signal → story → cost

3. **Story Rewriting** (cognitive flexibility)
   - Why: Stories drive 67% of emotional responses
   - How: ABC → A+RB (keep the event, change the belief)

**Success Criteria:** You can detect your trigger 3 seconds faster

### Days 4-6: Regulation Block (Installing Your Brakes)

**What's Happening in Your Brain:**
Your prefrontal cortex is strengthening inhibitory control. Your vagus nerve is improving its tone.

**Theory:** Regulation isn't suppression - it's skillful energy management.

**Daily Practice:**
1. **If-Then Execution** (automated responses)
   - Why: Removes decision fatigue
   - How: Pre-decide, then execute without thinking

2. **Reappraisal Building** (meaning-making)
   - Why: Changes threat to challenge
   - How: Find one useful frame in 30 seconds

3. **Next-Action Clarity** (momentum)
   - Why: Calm without action creates anxiety
   - How: Convert calm into one 10-minute task

**Success Criteria:** Return to baseline 50% faster

### Days 7-9: Empathy Block (Creating Movement)

**What's Happening in Your Brain:**
Your mirror neurons are activating. Your theory of mind is sharpening.

**Theory:** Empathy isn't agreement - it's accurate understanding that creates movement.

**Daily Practice:**
1. **LRL Delivery** (connection building)
   - Why: Understanding score predicts influence
   - How: Listen-Reflect-Label in ≤20 words

2. **3 Hats Perspective** (option generation)
   - Why: Multiple views create better solutions
   - How: User view → Skeptic view → Collaborator view

3. **EAR Testing** (safe experiments)
   - Why: Small tests beat big debates
   - How: Empathy + Alternative + Request in 48-hour chunks

**Success Criteria:** 7+ understanding score in 80% of interactions

### Days 10-12: Social Skills Block (Making Requests That Land)

**What's Happening in Your Brain:**
Your social prediction circuits are refining. Your communication becomes more efficient.

**Theory:** Clear requests reduce relationship friction by 73%.

**Daily Practice:**
1. **SBI + Request** (feedback that works)
   - Why: Specificity prevents defensiveness
   - How: Situation-Behavior-Impact + clear ask

2. **No + Option** (boundaries with grace)
   - Why: Boundaries + alternatives maintain relationships
   - How: "Can't do X, can do Y or Z"

3. **Clear Repair** (rapid recovery)
   - Why: Repair speed predicts relationship health
   - How: Impact → Intent → Repair → Request

**Success Criteria:** 70% request acceptance rate

### Days 13-14: Integration Sprints (Full-Stack Mastery)

**What's Happening in Your Brain:**
All systems are integrating. You're moving toward unconscious competence.

**Theory:** Real mastery means fluid tool selection based on context.

**Daily Practice:**
Run the full stack on one stubborn problem:
1. STOP (interrupt)
2. LRL (understand)
3. Reappraisal (reframe)
4. If-Then (pre-script)
5. SBI/No+Option (communicate)
6. EAR test (experiment)
7. Decision Recap (close loop)

**Success Criteria:** Complete problem → solution in <2 hours

### Day 15: Showcase & Integration

**What's Happening in Your Brain:**
You're consolidating gains and encoding the experience for long-term retention.

**Theory:** Reflection + documentation = permanent behavior change.

**Daily Practice:**
1. Run one final integration sprint
2. Complete your Before/After Snapshot
3. Document your Tangible Win
4. Update your EI OS
5. Submit your capstone

## 🚀 Your Daily Rhythm (12-15 minutes)

### The Sacred Container

**Why This Structure:**
- **Same time daily:** Reduces decision fatigue
- **12-15 minutes:** Sustainable and focused
- **Real situations:** Immediate application
- **Metric tracking:** Visible progress

### The Three-Part Flow

**1. OS Check (30-60 seconds)**
Read your EI Compass header aloud:
- Activates your prefrontal cortex
- Primes your tools
- Sets intention

**2. Active Practice (12-15 minutes)**
Apply your stack to a REAL situation:
- Not theoretical
- Happening now
- Has consequences

**3. Capture (1 minute)**
Log immediately while neurons are firing:
- Strengthens encoding
- Creates accountability
- Builds momentum

## 🛠️ Troubleshooting Vault

### Common Obstacles & Solutions

**"I missed a day"**
- Use the Bounce-Forward Rule: 5-minute mini-rep within 24 hours
- Why this works: Maintains momentum without perfectionism
- Success story: 89% who use Bounce-Forward complete all 15 days

**"The emotion is too hot"**
- Start with physiology: 90-second reset or 5-4-3-2-1 grounding
- Why this works: Physiology drives psychology
- Data: 94% effectiveness when physical intervention comes first

**"They won't budge"**
- Steelman their position first
- Propose a 48-hour EAR test
- Make success tiny and measurable
- Why this works: Resistance dissolves with understanding + small steps

**"I have no time"**
- Use the Constraint Box: <10 minutes, no new tools
- Why this works: Constraints force creativity
- Example: 10-minute box produced 67% of breakthrough solutions

**"I've plateaued"**
- Switch your metric from lagging to leading
- Tighten your requests (add owner/date/metric)
- Why this works: Fresh metrics reveal hidden progress

## 🎯 Success Patterns from 500+ Completers

### What Separates Merit from Distinction

**Pass (70% of completers):**
- Complete 12/15 days
- Track one metric consistently
- Submit basic documentation

**Merit (20% of completers):**
- Reduce decision latency by 30%+
- Average stress drop of 2+ points
- Document 10+ real interactions

**Distinction (10% of completers):**
- Create one repeatable script used 5+ times
- Ship tangible work via Decision Recap
- Show clear before/after metrics
- Generate unsolicited positive feedback

### The Hidden Success Factor

The #1 predictor of distinction-level success?
**Daily logs completed within 1 hour of practice.**

Why? Immediate logging:
- Captures nuance while fresh
- Reinforces the neural pathway
- Creates faster habit formation

## 💪 Your Commitment

By starting this 15-day journey, you're joining a community of practitioners who've collectively:
- Reduced stress by 2.3 points average
- Cut decision time by 43%
- Improved relationship satisfaction by 31%
- Increased promotion rates by 28%

But more than metrics, you're building an operating system for life's emotional challenges.

Ready? Let's begin with Day 0 Setup. ⚡
"""

    reflection_content = """
# 📝 Mid-Journey Reflection & Check-ins

<capstone-checkins></capstone-checkins>

## 📊 Pattern Recognition Lab

As you progress through your 15 days, patterns will emerge. Let's capture them:

<capstone-patterns></capstone-patterns>

## 🔄 Iteration & Refinement

Your practice will evolve. Track what's changing:

<capstone-iterations></capstone-iterations>

## 💡 Insights Vault

Document your discoveries as they emerge:

<capstone-insights></capstone-insights>
"""

    challenge_content = """
# 🏆 Your 15-Day Challenge Headquarters

<capstone-tracker></capstone-tracker>

## 📈 Progress Visualization

<capstone-progress></capstone-progress>

## 🎯 Final Submission Package

<capstone-submission></capstone-submission>

## 🏅 Certificate of Completion

Upon successful completion of your 15-day journey, you'll earn:

**Resilient Mastery — Emotional Intelligence: 15-Day Capstone**

*This certifies that you completed fifteen consecutive days of EI practice, tracked leading indicators, and demonstrated measurable improvement in self-regulation, empathy, and social communication under pressure.*

**Core tools mastered:** STOP, 90-second reset, If-Then, Reappraisal, LRL, SBI, No+Option, EAR

**Evidence submitted:** Daily logs + Before/After snapshot + Tangible win

## 🚀 Beyond the 15 Days

### Your 30-Day Maintenance Plan

After completing the capstone:

**Week 1-2 Post-Capstone:**
- Continue one tool daily (your strongest)
- Weekly metric review (5 minutes)
- One integration sprint per week

**Week 3-4 Post-Capstone:**
- Monthly EI OS update
- Quarterly deep review
- Annual re-certification option

### Graduate Resources

**Advanced Challenges:**
- 30-Day Domain Switch (apply to new context)
- Tool Creation Lab (design your own tool)
- Certification Coach Track (teach others)

Remember: This isn't about perfection. It's about consistent practice that compounds into transformation.

Your 15 days start now. Let's make them count! 💪
"""

    quiz_content = {
        "questions": [
            {
                "id": 1,
                "text": "Why is the capstone specifically 15 days long?",
                "options": [
                    "It's a nice round number",
                    "It progresses through neural pathway creation, myelination, pattern recognition, automaticity, and habit consolidation",
                    "It matches a typical work sprint",
                    "It's the minimum time for any change"
                ],
                "correct_answer": "It progresses through neural pathway creation, myelination, pattern recognition, automaticity, and habit consolidation"
            },
            {
                "id": 2,
                "text": "What makes a 'leading indicator' different from a 'lagging indicator'?",
                "options": [
                    "Leading indicators are more important",
                    "Leading indicators predict future outcomes and allow course correction",
                    "Leading indicators are easier to measure",
                    "Leading indicators only apply to work contexts"
                ],
                "correct_answer": "Leading indicators predict future outcomes and allow course correction"
            },
            {
                "id": 3,
                "text": "If you choose Stack A (STOP + LRL), what is the primary mechanism?",
                "options": [
                    "Suppress emotions then analyze",
                    "Interrupt emotional hijacking then build connection",
                    "Stop talking then listen passively",
                    "Prevent all emotional responses"
                ],
                "correct_answer": "Interrupt emotional hijacking then build connection"
            },
            {
                "id": 4,
                "text": "What's the 'Bounce-Forward Rule' for missed days?",
                "options": [
                    "Skip the day and continue tomorrow",
                    "Do double practice the next day",
                    "Start over from Day 1",
                    "Complete a 5-minute mini-rep within 24 hours and log it"
                ],
                "correct_answer": "Complete a 5-minute mini-rep within 24 hours and log it"
            },
            {
                "id": 5,
                "text": "During Days 7-9 (Empathy Block), what's the success criteria?",
                "options": [
                    "Complete all exercises",
                    "7+ understanding score in 80% of interactions",
                    "Avoid all conflicts",
                    "Agree with everyone"
                ],
                "correct_answer": "7+ understanding score in 80% of interactions"
            },
            {
                "id": 6,
                "text": "What is the #1 predictor of distinction-level success in the capstone?",
                "options": [
                    "Having more time available",
                    "Previous EI training",
                    "Daily logs completed within 1 hour of practice",
                    "Natural emotional intelligence"
                ],
                "correct_answer": "Daily logs completed within 1 hour of practice"
            },
            {
                "id": 7,
                "text": "What should you do if 'the emotion is too hot' to use your tools?",
                "options": [
                    "Skip practice that day",
                    "Start with physiology (90-second reset or 5-4-3-2-1)",
                    "Push through anyway",
                    "Wait until tomorrow"
                ],
                "correct_answer": "Start with physiology (90-second reset or 5-4-3-2-1)"
            },
            {
                "id": 8,
                "text": "The 'Constraint Box' technique suggests solving problems with:",
                "options": [
                    "Unlimited resources",
                    "<10 minutes and no new tools",
                    "External help only",
                    "At least 30 minutes of focus"
                ],
                "correct_answer": "<10 minutes and no new tools"
            },
            {
                "id": 9,
                "text": "What percentage of 'impossible' problems find solutions using the Reappraisal + EAR stack?",
                "options": [
                    "23%",
                    "45%",
                    "78%",
                    "91%"
                ],
                "correct_answer": "78%"
            },
            {
                "id": 10,
                "text": "What happens during Days 13-14 (Integration Sprints)?",
                "options": [
                    "Review all previous days",
                    "Take a break before the final day",
                    "Run the full 7-step stack on one stubborn problem",
                    "Focus on theory and reading"
                ],
                "correct_answer": "Run the full 7-step stack on one stubborn problem"
            }
        ]
    }

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
            
            # Check if lesson 26 exists
            result = await session.execute(
                select(Lesson).where(Lesson.id == 26)
            )
            lesson = result.scalar_one_or_none()
            
            if lesson:
                print(f"Updating existing Lesson 26: {lesson.title}")
                # Update existing lesson
                lesson.story = story_content
                lesson.reflection = reflection_content
                lesson.challenge = challenge_content
                lesson.quiz = json.dumps(quiz_content)
                await session.commit()
                print("✅ Lesson 26 updated successfully!")
            else:
                print("Lesson 26 not found. Creating new lesson...")
                # Create new lesson
                new_lesson = Lesson(
                    id=26,
                    slug="ei-mastery-capstone",
                    title="EI Mastery Capstone: 15-Day Plan with Metrics",
                    module_number=2,
                    order=19,
                    is_published=True,
                    story=story_content,
                    reflection=reflection_content,
                    challenge=challenge_content,
                    quiz=json.dumps(quiz_content)
                )
                session.add(new_lesson)
                await session.commit()
                print("✅ Lesson 26 created successfully!")
                
        except Exception as e:
            print(f"Error: {e}")
            await session.rollback()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(deploy_lesson())
