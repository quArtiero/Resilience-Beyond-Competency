"""
Script to fix missing reflection and challenge content in lessons
"""
import sqlite3
import json
from datetime import datetime

def fix_lesson_content():
    # Connect to database
    conn = sqlite3.connect('resilient_mastery.db')
    cursor = conn.cursor()
    
    print("🔧 FIXING LESSON CONTENT")
    print("=" * 80)
    
    # Define reflection and challenge content for each lesson
    lesson_content_fixes = {
        1: {  # What is Resilience Really?
            "reflection": """
# Reflection Questions

Take a moment to reflect on your understanding of resilience:

## Personal Assessment
1. **Your Current Understanding**: How has your definition of resilience changed after reading this lesson?
2. **Personal Experience**: Think of a time when you demonstrated resilience. What helped you through that situation?
3. **Growth Areas**: Which of the 5 key components of resilience (Emotional Regulation, Cognitive Flexibility, Social Connection, Meaning-Making, Self-Efficacy) do you feel is your strongest? Which needs the most work?

## Journal Prompt
Write about a challenging situation you're currently facing. How can you apply the concept of "bouncing forward" rather than just "bouncing back"?
""",
            "challenge": """
# 7-Day Resilience Awareness Challenge

## Your Mission
This week, practice observing and documenting your resilience in action.

### Daily Tasks:
**Day 1-2**: Notice and record moments when you face small challenges. How do you naturally respond?

**Day 3-4**: Identify which resilience component you're using (Emotional Regulation, Cognitive Flexibility, etc.)

**Day 5-6**: Practice intentionally using a different resilience component than your default

**Day 7**: Reflect on your patterns and create a personal resilience statement

### Success Metrics:
- Complete daily observations
- Identify at least 3 resilience patterns
- Use at least 2 different resilience components intentionally
- Create your personal resilience statement
"""
        },
        2: {  # Assessing Your Resilience Baseline
            "reflection": """
# Self-Assessment Reflection

## Rating Your Resilience Pillars
On a scale of 1-10, rate yourself on each pillar:

1. **Emotional Awareness & Regulation**: ___/10
2. **Cognitive Flexibility**: ___/10
3. **Social Connection & Support**: ___/10
4. **Meaning & Purpose**: ___/10
5. **Self-Efficacy & Agency**: ___/10

## Reflection Questions
- Which pillar surprised you with its rating?
- What life experiences have strengthened your highest-rated pillar?
- What specific situations challenge your lowest-rated pillar?

## Action Planning
Choose your lowest-rated pillar. Write 3 specific actions you could take this month to strengthen it.
""",
            "challenge": """
# Resilience Baseline Challenge

## Week 1: Assessment Phase
Complete a daily resilience check-in using the 5 Pillars framework.

### Morning Question:
"Which pillar will I likely need most today?"

### Evening Review:
- Which pillar did I actually use most?
- Rate my effectiveness (1-10)
- What could I do differently tomorrow?

## Week 2: Strengthening Phase
Focus on your weakest pillar:
- Monday-Tuesday: Research and learn strategies
- Wednesday-Thursday: Practice in low-stakes situations
- Friday-Saturday: Apply in real challenges
- Sunday: Reflect and adjust

### Success Indicators:
- Completed 14 daily check-ins
- Tried at least 3 new strategies
- Noticed improvement in weak area
"""
        },
        3: {  # Understanding Your Emotional Landscape
            "reflection": """
# Emotional Awareness Reflection

## Emotional Inventory
List the emotions you experienced today:
- Morning: ________________
- Afternoon: ______________
- Evening: ________________

## Deeper Exploration
1. **Emotion Triggers**: What specific events or thoughts triggered your strongest emotion today?
2. **Physical Sensations**: Where did you feel each emotion in your body?
3. **Emotion Duration**: How long did each emotion last? What helped it shift?

## Pattern Recognition
- What emotions do you experience most frequently?
- Which emotions do you try to avoid?
- How do your emotions affect your decision-making?

## Growth Question
If you could become more comfortable with one "difficult" emotion, which would it be and why?
""",
            "challenge": """
# Emotional Intelligence Development Challenge

## Week 1: Awareness Building
**Daily Practice (5 minutes, 3x per day)**
- Set phone reminders for morning, noon, and evening
- When alert sounds, pause and identify:
  - Current emotion (be specific)
  - Intensity level (1-10)
  - Body sensations
  - Triggering thought or event

## Week 2: Emotional Vocabulary
**Expand Your Emotional Language**
- Learn 2 new emotion words daily
- Use emotion wheel or chart
- Practice using specific terms (frustrated vs angry, disappointed vs sad)
- Journal using new vocabulary

## Success Metrics:
- Complete 90% of check-ins
- Identify at least 20 distinct emotions
- Notice patterns in emotional triggers
- Increase emotional vocabulary by 15+ words
"""
        },
        4: {  # Emotion Regulation Strategies
            "reflection": """
# Regulation Strategies Reflection

## Your Current Toolkit
List the strategies you currently use to manage difficult emotions:
1. ________________________________
2. ________________________________
3. ________________________________

## Effectiveness Assessment
For each strategy above, rate:
- How often you use it (Daily/Weekly/Rarely)
- How effective it is (1-10)
- Any negative side effects

## New Learning
From today's lesson, which regulation strategies are you most interested in trying?
- Why do these appeal to you?
- What situations would they be most helpful in?

## Implementation Planning
Choose ONE new strategy to practice this week:
- Strategy: _____________________
- When I'll use it: ______________
- Success will look like: ________
""",
            "challenge": """
# Emotion Regulation Mastery Challenge

## Phase 1: Learn the Techniques (Days 1-3)
Master these core regulation strategies:

### 1. Box Breathing Technique
- Practice 3x daily for 5 minutes
- Use when feeling stressed or overwhelmed

### 2. Cognitive Reframing
- Each evening, reframe one negative thought
- Write original thought → reframed version

### 3. Progressive Muscle Relaxation
- Practice before bed each night
- Notice tension patterns

## Phase 2: Real-World Application (Days 4-7)
- Use box breathing in one stressful situation daily
- Practice reframing in real-time during challenges
- Apply PMR when noticing physical tension

## Tracking Success:
- Log each technique use
- Rate effectiveness (1-10)
- Note improvements in emotional recovery time
- Document one "win" story
"""
        },
        5: {  # Breaking Mental Patterns
            "reflection": """
# Mental Pattern Analysis

## Identifying Your Patterns
Think about a recurring challenge in your life.

1. **The Pattern**: Describe the situation that keeps repeating
2. **Your Typical Response**: How do you usually think/act?
3. **The Result**: What outcome does this create?

## Pattern Origins
- When did this pattern first develop?
- What purpose did it serve originally?
- Is it still serving you now?

## Breaking Through
- What would happen if you responded completely differently?
- What fear keeps you in this pattern?
- What's one small change you could make?

## Commitment
Write one specific commitment to interrupt this pattern this week:
"When ________ happens, instead of ________, I will ________."
""",
            "challenge": """
# Pattern Breaker Challenge

## Week 1: Pattern Detection
Document your mental patterns:

### Daily Log:
- Morning: Identify one assumption you're making
- Afternoon: Catch one automatic thought
- Evening: Notice one mental loop

### Pattern Categories to Watch:
- All-or-nothing thinking
- Catastrophizing
- Mind reading
- Should statements
- Personalization

## Week 2: Pattern Interruption
Choose your most limiting pattern:

### Interruption Techniques:
**Monday-Tuesday**: Use the "Stop Sign" technique
- Visualize a stop sign when pattern starts
- Take 3 deep breaths
- Choose different response

**Wednesday-Thursday**: Question the pattern
- Is this thought 100% true?
- What evidence supports/contradicts it?
- What would I tell a friend?

**Friday-Sunday**: Replace the pattern
- Create new response
- Practice even when not triggered
- Celebrate small wins

## Success Metrics:
- Catch pattern at least 1x daily
- Successfully interrupt 50% of occurrences
- Develop 1 new response pattern
"""
        },
        6: {  # Reframing Challenges
            "reflection": """
# Reframing Practice

## Current Challenge
Describe a current challenge you're facing:
_____________________________________________

## Multiple Perspectives
Reframe this challenge from different angles:

1. **Growth Perspective**: "This challenge is teaching me..."
2. **Opportunity Perspective**: "This situation allows me to..."
3. **Strength Perspective**: "This will help me develop..."
4. **Future Perspective**: "In 5 years, I'll see this as..."
5. **Gratitude Perspective**: "I'm grateful this challenge shows me..."

## Most Powerful Reframe
Which perspective shift feels most helpful? Why?

## Integration
How can you remind yourself of this reframe when facing the challenge?
""",
            "challenge": """
# Master Reframing Challenge

## Daily Reframing Practice (21 Days)

### Morning Ritual (5 min):
- Identify today's biggest challenge
- Write 3 different reframes
- Choose most empowering one
- Set phone reminder with reframe

### Evening Review (10 min):
- What challenged you today?
- How did you initially frame it?
- Practice reframing it now
- Rate the power of your reframe (1-10)

## Weekly Themes:
**Week 1**: Problem → Opportunity
- Every problem becomes a chance to grow

**Week 2**: Weakness → Strength in Development
- Every weakness is a strength waiting to emerge

**Week 3**: Setback → Setup for Comeback
- Every setback prepares you for something better

## Advanced Challenge:
Help someone else reframe their challenge
- Listen to their perspective
- Offer 2-3 alternative frames
- Support their chosen reframe

## Success Indicators:
- Complete 90% of daily practices
- Average reframe power rating > 7
- Help at least 3 others reframe
- Notice increased optimism
"""
        },
        7: {  # The Psychology of Persistence
            "reflection": """
# Persistence Self-Assessment

## Your Persistence Story
Think of your greatest persistence achievement:
1. What was the goal?
2. How long did it take?
3. What kept you going?
4. What did you learn about yourself?

## Current Persistence Challenges
What are you struggling to persist with now?
- Goal: ________________________
- Obstacles: ___________________
- What's different from your success story?

## Motivation Analysis
Rate each motivator's power for you (1-10):
- External rewards: ___
- Internal satisfaction: ___
- Purpose/meaning: ___
- Progress visibility: ___
- Social accountability: ___

## Building Your Persistence
Based on your analysis, what 2 changes could strengthen your persistence?
""",
            "challenge": """
# 30-Day Persistence Project

## Choose Your Persistence Goal
Select something you've struggled to maintain:
- Exercise routine
- Learning new skill
- Creative practice
- Habit formation

## The Framework:

### Week 1: Foundation (Days 1-7)
- Start ridiculously small (2 minutes daily)
- Focus only on showing up
- Track with simple checkbox
- No performance pressure

### Week 2: Consistency (Days 8-14)
- Maintain daily practice
- Increase by 1 minute
- Add one accountability partner
- Celebrate 7-day streak

### Week 3: Expansion (Days 15-21)
- Increase to 5 minutes
- Add quality focus
- Share progress publicly
- Document insights

### Week 4: Integration (Days 22-30)
- Reach 10 minutes daily
- Link to existing routine
- Plan next 30 days
- Reflect on transformation

## Daily Persistence Boosters:
- Morning affirmation
- Progress photo/note
- Evening gratitude for showing up

## Success Metrics:
- 85% completion rate
- Established routine
- Increased confidence
- Clear next steps
"""
        },
        8: {  # Overcoming Setbacks
            "reflection": """
# Setback Recovery Reflection

## Recent Setback Analysis
Describe a recent setback:
________________________________

## The Recovery Process
1. **Initial Response**: How did you first react?
2. **Emotional Journey**: What emotions did you experience?
3. **Turning Point**: When did you start to recover?
4. **Lessons Learned**: What did this teach you?

## Recovery Resources
What helped you bounce back?
- People: _____________________
- Activities: _________________
- Mindsets: ___________________
- Tools: ______________________

## Future Preparation
If this setback happened again:
- What would you do differently?
- What would you keep the same?
- Who would you reach out to first?

## Growth Recognition
How are you stronger because of this setback?
""",
            "challenge": """
# Setback Resilience Training

## Part 1: Build Your Recovery Toolkit
Create your personalized setback recovery plan:

### Immediate Response Protocol (First 24 hours):
1. Acknowledge the setback without judgment
2. Allow yourself to feel (set timer for feeling time)
3. Reach out to support person
4. Do one self-care activity
5. Write down facts vs. stories

### 48-72 Hour Actions:
- Analyze what happened objectively
- Identify what was in/out of your control
- Extract 3 lessons learned
- Create one small forward action
- Celebrate taking that action

## Part 2: Controlled Challenge
Choose a small, low-risk challenge where setback is likely:
- Try new skill with steep learning curve
- Set ambitious short-term goal
- Take on stretch project

### When Setback Occurs:
- Use your protocol immediately
- Document the experience
- Rate protocol effectiveness
- Adjust as needed

## Part 3: Setback Reframe Collection
Create a collection of powerful reframes:
- "Setbacks are setups for comebacks"
- "Every 'no' gets me closer to 'yes'"
- "Failure is data, not destiny"
- Add 5 of your own

## Success Metrics:
- Protocol used within 24 hours
- Recovery time decreased by 25%
- Maintained forward momentum
- Increased comfort with risk
"""
        },
        9: {  # Embracing Uncertainty
            "reflection": """
# Uncertainty Tolerance Assessment

## Your Relationship with Uncertainty
Rate your comfort level (1-10) with:
- Not knowing outcomes: ___
- Changing plans: ___
- Ambiguous situations: ___
- Open-ended problems: ___
- Multiple possibilities: ___

## Uncertainty Triggers
What types of uncertainty stress you most?
- Career/financial: ___
- Relationships: ___
- Health: ___
- Future planning: ___
- Daily decisions: ___

## Coping Strategies
How do you currently handle uncertainty?
- Positive strategies: ___________
- Negative strategies: __________

## Reframing Uncertainty
Complete these statements:
- "Uncertainty means I have the opportunity to..."
- "When I don't know what will happen, I can..."
- "The gift of uncertainty is..."

## Growth Edge
What's one area where embracing uncertainty could benefit you?
""",
            "challenge": """
# Uncertainty Comfort Expansion

## Week 1: Small Uncertainties
Practice with low-stakes uncertainty:

### Daily Experiments:
- Take a different route to familiar place
- Try food you've never had
- Start conversation with stranger
- Say "yes" to unexpected invitation
- Leave 30 minutes unplanned

### Evening Reflection:
- What did uncertainty feel like?
- What surprised you?
- What did you gain?

## Week 2: Medium Uncertainties
Increase the stakes:

### Challenges:
- Start project without complete plan
- Delegate important task
- Share vulnerable thought/feeling
- Try new approach to old problem
- Make decision with 80% information

### Tracking:
- Initial anxiety level (1-10)
- Actual outcome vs. feared outcome
- Learning gained
- Confidence boost

## Week 3: Uncertainty Mastery
### Daily Practice:
- Morning: Set intention to welcome uncertainty
- Afternoon: Seek out one uncertain situation
- Evening: Celebrate navigating uncertainty

### Uncertainty Mantras:
- "I can handle whatever comes"
- "Uncertainty brings possibility"
- "I trust my ability to adapt"

## Success Metrics:
- Completed 15+ uncertainty experiments
- Reduced anxiety response by 30%
- Increased spontaneity
- Discovered 3+ unexpected benefits
"""
        },
        10: {  # Adaptive Leadership
            "reflection": """
# Leadership Adaptability Assessment

## Your Leadership Style
In what situations do you naturally lead?
_________________________________________

## Adaptation Moments
Recall a time you had to adapt your leadership approach:
1. **Situation**: What required adaptation?
2. **Original Approach**: What wasn't working?
3. **Adaptation**: How did you adjust?
4. **Result**: What was the outcome?

## Leadership Flexibility
Rate your comfort (1-10) with different leadership styles:
- Directive/Commanding: ___
- Coaching/Mentoring: ___
- Collaborative/Democratic: ___
- Delegating/Empowering: ___
- Visionary/Inspiring: ___

## Growth Areas
- Which style do you underuse?
- What situations call for this style?
- What prevents you from using it?

## Adaptive Leadership Goal
Write one specific way you'll practice adaptive leadership this week:
""",
            "challenge": """
# Adaptive Leadership Challenge

## 30-Day Leadership Flexibility Training

### Week 1: Style Awareness
Each day, practice a different leadership style:
- Monday: Directive (clear instructions)
- Tuesday: Coaching (ask questions)
- Wednesday: Collaborative (seek input)
- Thursday: Delegating (trust others)
- Friday: Visionary (inspire with why)

Document:
- Situation used
- Comfort level (1-10)
- Others' response
- Effectiveness

### Week 2: Situational Practice
Match style to situation:
- Crisis → Directive
- Learning opportunity → Coaching
- Complex problem → Collaborative
- Routine task → Delegating
- Change initiative → Visionary

### Week 3: Rapid Switching
Practice changing styles within single day:
- Morning meeting: Style A
- Afternoon project: Style B
- Evening interaction: Style C

### Week 4: Integration
- Identify your expanded range
- Get feedback from 3 people
- Create personal style guide
- Plan continued development

## Daily Reflection Questions:
1. What style did I default to?
2. What style was actually needed?
3. How well did I adapt?
4. What did I learn?

## Success Indicators:
- Used all 5 styles multiple times
- Increased comfort with 2+ styles
- Received positive feedback
- Handled 3+ complex situations adaptively
"""
        },
        11: {  # Integrating Your Learning
            "reflection": """
# Integration Reflection

## Journey Review
Looking back at your resilience journey:

### Key Insights
List your top 3 insights from this course:
1. ________________________________
2. ________________________________
3. ________________________________

### Personal Transformations
How have you changed?
- **Before the course, I...**
- **Now, I...**

### Applied Learning
Which concepts have you already applied?
- Concept: _______ → Result: _______
- Concept: _______ → Result: _______

### Surprising Discoveries
What surprised you most about:
- Yourself: ____________________
- Resilience: __________________
- The journey: _________________

## Future Vision
How will you continue growing your resilience?
- Daily practices: ______________
- Weekly rituals: _______________
- Monthly check-ins: ____________

## Wisdom to Share
What would you tell someone starting their resilience journey?
""",
            "challenge": """
# Integration Mastery Challenge

## Create Your Resilience Manifesto

### Week 1: Synthesis
Review all previous lessons:
- Day 1-2: Review modules 1-2
- Day 3-4: Review modules 3-4
- Day 5-6: Review modules 5-6
- Day 7: Identify connecting themes

### Week 2: Creation
Build your personal manifesto:

**Components to Include:**
1. Your definition of resilience
2. Your top 5 resilience principles
3. Your resilience strengths
4. Your growth commitments
5. Your support system
6. Your daily practices
7. Your crisis protocol
8. Your celebration rituals
9. Your accountability measures
10. Your resilience vision

### Week 3: Implementation
Live your manifesto:
- Post it somewhere visible
- Share with accountability partner
- Practice daily alignment check
- Journal observations
- Adjust as needed

### Week 4: Teaching
Share your learning:
- Teach one concept to someone
- Write about your journey
- Create resource for others
- Mentor someone beginning their journey

## Deliverables:
- Written manifesto (1-2 pages)
- Daily practice checklist
- Crisis response protocol
- 90-day action plan
- One teaching/sharing output

## Success Metrics:
- Completed manifesto
- 21 days of practice
- Taught 1+ person
- Increased confidence score
"""
        },
        12: {  # Your Personal Action Plan
            "reflection": """
# Action Plan Development

## Vision Setting
**My Resilient Future Self (1 year from now):**
Describe who you'll be:
_________________________________________

## Goal Prioritization
List 3 specific resilience goals:
1. **Goal**: __________ **By When**: _____
2. **Goal**: __________ **By When**: _____
3. **Goal**: __________ **By When**: _____

## Resource Assessment
What resources do you have?
- **Internal** (skills, strengths, knowledge):
- **External** (people, tools, programs):

## Obstacle Anticipation
What might get in your way?
- Obstacle 1: _____ → Solution: _____
- Obstacle 2: _____ → Solution: _____

## Accountability Structure
How will you stay on track?
- Daily: ________________________
- Weekly: _______________________
- Monthly: ______________________

## Success Metrics
How will you measure progress?
- Quantitative: _________________
- Qualitative: __________________

## Commitment Statement
"I commit to..."
""",
            "challenge": """
# 90-Day Resilience Transformation

## Your Comprehensive Action Plan

### Month 1: Foundation (Days 1-30)
**Focus**: Establish core practices

**Week 1-2**: Daily Habits
- Morning: 5-min resilience check-in
- Evening: Gratitude + reflection
- Track in journal

**Week 3-4**: Weekly Rituals
- Monday: Week planning with resilience lens
- Friday: Week review and celebration
- Sunday: Self-care and preparation

### Month 2: Expansion (Days 31-60)
**Focus**: Deepen and challenge

**Week 5-6**: Stretch Challenges
- Take on one fear-facing activity
- Practice adaptive responses
- Document learning

**Week 7-8**: Relationship Building
- Strengthen support network
- Practice vulnerable sharing
- Offer support to others

### Month 3: Mastery (Days 61-90)
**Focus**: Integrate and sustain

**Week 9-10**: Advanced Application
- Apply resilience to biggest challenge
- Teach someone else
- Create personal case study

**Week 11-12**: Future Planning
- Assess transformation
- Plan next 90 days
- Create maintenance system

## Daily Non-Negotiables:
1. Morning intention setting
2. Resilience practice (varies)
3. Evening reflection
4. Gratitude notation

## Weekly Requirements:
1. Challenge yourself once
2. Connect with support person
3. Review and adjust plan
4. Celebrate progress

## Monthly Milestones:
- Month 1: Habits established
- Month 2: Comfort zone expanded
- Month 3: Transformation visible

## Success Celebration:
Plan your 90-day celebration:
- What will you do?
- Who will you share with?
- How will you honor your growth?
"""
        }
    }
    
    print("\nUpdating lesson content...")
    updated = 0
    
    for lesson_id, content in lesson_content_fixes.items():
        try:
            cursor.execute("""
                UPDATE lesson 
                SET reflection = ?, 
                    challenge = ?,
                    updated_at = ?
                WHERE id = ?
            """, (
                content["reflection"],
                content["challenge"],
                datetime.now().isoformat(),
                lesson_id
            ))
            updated += 1
            print(f"  ✅ Updated Lesson {lesson_id}")
        except Exception as e:
            print(f"  ❌ Error updating Lesson {lesson_id}: {e}")
    
    conn.commit()
    print(f"\n✅ Successfully updated {updated} lessons with reflection and challenge content!")
    
    # Verify the updates
    cursor.execute("""
        SELECT id, title, 
               LENGTH(reflection) as ref_len,
               LENGTH(challenge) as chal_len
        FROM lesson 
        ORDER BY "order"
    """)
    
    print("\n📊 Verification:")
    for row in cursor.fetchall():
        id, title, ref_len, chal_len = row
        status = "✅" if ref_len > 0 and chal_len > 0 else "❌"
        print(f"  {status} Lesson {id}: Reflection={ref_len:,} chars, Challenge={chal_len:,} chars")
    
    conn.close()
    print("\n🎉 All lessons now have complete content!")

if __name__ == "__main__":
    fix_lesson_content()
