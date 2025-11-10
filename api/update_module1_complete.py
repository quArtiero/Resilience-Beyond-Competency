#!/usr/bin/env python3
"""
Update Module 1 (Introduction to Resilience) with complete content
Lessons 1 & 2 with full story, reflection, and challenge sections
"""

import psycopg2
from psycopg2.extras import Json

# Render PostgreSQL connection with SSL
DATABASE_URL = 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require'

def update_module1():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Lesson 1: Overview of Resilience & Competency
    lesson1_content = {
        "title": "Overview of Resilience & Competency",
        "story": """# Overview of Resilience & Competency

## Welcome to Your Transformation Journey

Sarah sat at her desk, staring at the email that would change everything. "We're restructuring. Your position has been eliminated." After 15 years of climbing the corporate ladder, she was suddenly falling.

But something unexpected happened in that moment. Instead of panic, Sarah felt... curious. "What if this isn't an ending?" she thought. "What if it's a beginning?"

Six months later, Sarah would look back on this moment as the day she discovered what resilience really means—not just surviving change, but thriving because of it.

## What Is Resilience?

**Resilience is not**:
- Just "toughing it out"
- Pretending everything is fine
- Never feeling stressed or overwhelmed
- A trait you're born with

**Resilience IS**:
- The ability to adapt and grow through challenges
- A set of learnable skills and mindsets
- The capacity to find meaning in difficulty
- Your power to write your own comeback story

## The Resilience Equation

**Resilience = Awareness + Adaptability + Action**

Let's break this down:

### 1. Awareness
Understanding yourself and your situation:
- Recognizing your emotions without being controlled by them
- Seeing challenges as they truly are (not worse, not better)
- Knowing your strengths and growth areas

**Your Awareness Check**: 
Rate yourself (1-10): How well do you understand your typical response to challenges? _____

### 2. Adaptability
Flexibility in thought and approach:
- Seeing multiple perspectives
- Adjusting strategies when needed
- Learning from what doesn't work

**Your Adaptability Check**:
Rate yourself (1-10): How easily do you change course when your first plan fails? _____

### 3. Action
Moving forward despite uncertainty:
- Taking purposeful steps, even small ones
- Building momentum through consistent effort
- Celebrating progress, not just outcomes

**Your Action Check**:
Rate yourself (1-10): How quickly do you move from thinking to doing? _____

## Beyond Resilience: The Competency Connection

Resilience alone isn't enough. You need competency—the skills and knowledge to navigate specific challenges effectively.

**The Power Combination**:
- **Resilience without Competency** = Struggling bravely but inefficiently
- **Competency without Resilience** = Crumbling when things don't go as planned
- **Resilience + Competency** = Unstoppable growth and achievement

## The Four Pillars of Resilient Competency

### Pillar 1: Emotional Intelligence
- Understanding and managing your emotions
- Reading and responding to others effectively
- Building strong, supportive relationships

### Pillar 2: Cognitive Flexibility
- Challenging limiting beliefs
- Reframing setbacks as opportunities
- Thinking creatively under pressure

### Pillar 3: Purposeful Action
- Setting meaningful goals
- Breaking big challenges into manageable steps
- Maintaining momentum through obstacles

### Pillar 4: Continuous Learning
- Extracting lessons from every experience
- Adapting strategies based on feedback
- Growing stronger through each challenge

## Your Current Resilience Profile

Take a moment to assess where you are now:

**In which area do you feel strongest?** _____
**Which area needs the most development?** _____
**What brought you to this course?** _____

## The Science Behind Resilience

Research shows that resilience is like a muscle—it grows stronger with practice:

- **Neuroplasticity**: Your brain can form new neural pathways at any age
- **Post-Traumatic Growth**: Many people report becoming stronger after challenges
- **Learned Optimism**: You can train your brain to see possibilities, not just problems
- **Stress Inoculation**: Controlled challenges build your capacity for bigger ones

## Sarah's Discovery

Three weeks after losing her job, Sarah started a list:

**What I'm Losing**:
- Steady paycheck
- Familiar routine
- Professional identity
- Comfort zone

**What I'm Gaining**:
- Freedom to explore
- Time for neglected passions
- Chance to reinvent myself
- Story worth telling

That shift in perspective changed everything. Within six months, Sarah had:
- Launched a consulting business
- Reconnected with her family
- Discovered strengths she never knew she had
- Helped dozens of others navigate their own transitions

She didn't just bounce back—she bounced forward.

## Your Resilience Commitment

This isn't about becoming invulnerable. It's about becoming adaptable, capable, and confident in your ability to handle whatever comes your way.

**By completing this course, you will**:
- Develop a comprehensive resilience toolkit
- Build competencies that amplify your natural strengths
- Create a personal resilience system
- Join a community of growth-minded individuals
- Transform challenges into catalysts for growth

## The Path Ahead

Over the next modules, you'll develop:

1. **Emotional Intelligence** - Master your inner world
2. **Cognitive Flexibility** - Transform your thinking
3. **Grit & Perseverance** - Build unshakeable determination
4. **Adaptability** - Thrive in uncertainty
5. **Problem-Solving** - Turn obstacles into opportunities
6. **Communication** - Connect and collaborate effectively
7. **Continuous Learning** - Grow without limits

## Your First Challenge

Before moving forward, complete this reflection:

**The biggest challenge I'm facing right now is**: _____

**If I had unshakeable resilience, I would**: _____

**One small step I can take today is**: _____

Remember: Every expert was once a beginner. Every master was once a disaster. Every success story started with someone deciding to begin.

Welcome to your resilience journey. Let's begin.""",
        
        "reflection": """# Reflection: Your Resilience Starting Point

## Part 1: Your Resilience Story So Far

Think about a time when you overcame a significant challenge:

**The situation was**: _____

**I initially felt**: _____

**What helped me get through it**: _____

**What I learned about myself**: _____

**How I'm different because of it**: _____

## Part 2: Your Resilience Patterns

When facing challenges, I typically:

**First reaction** (check all that apply):
- [ ] Feel overwhelmed
- [ ] Jump into action
- [ ] Seek support
- [ ] Withdraw/isolate
- [ ] Analyze everything
- [ ] Deny/minimize
- [ ] Get angry
- [ ] Feel excited
- [ ] Other: _____

**My go-to coping strategies**:
- [ ] Talk to someone
- [ ] Exercise/movement
- [ ] Problem-solve
- [ ] Distract myself
- [ ] Sleep on it
- [ ] Research solutions
- [ ] Pray/meditate
- [ ] Write/journal
- [ ] Other: _____

**What helps me most**: _____

**What holds me back**: _____

## Part 3: Your Resilience Influences

**Who models resilience for you?** _____
**What about them inspires you?** _____

**Your support system includes**:
- [ ] Family members
- [ ] Close friends
- [ ] Colleagues
- [ ] Mentor/coach
- [ ] Community group
- [ ] Online community
- [ ] Professional support
- [ ] Other: _____

**The gap in your support system**: _____

## Part 4: Your Growth Edges

Rate your current confidence level (1-10):

**Handling unexpected changes**: _____
**Dealing with criticism**: _____
**Managing stress**: _____
**Bouncing back from failure**: _____
**Asking for help**: _____
**Maintaining optimism**: _____
**Taking calculated risks**: _____
**Learning from mistakes**: _____

**Lowest score area**: _____
**This impacts my life by**: _____

## Part 5: Your Resilience Vision

**If I were 10x more resilient, I would**: _____

**The person I want to become is someone who**: _____

**My biggest fear about developing resilience is**: _____

**My biggest hope for this journey is**: _____

## Part 6: Your Commitment Declaration

Complete this commitment to yourself:

"I, _____, am ready to develop my resilience because _____. 

I understand that this journey will require _____ from me.

I'm willing to _____ in order to grow.

When things get difficult, I will remember _____."

**Sign your commitment**: _____
**Date**: _____

## Part 7: Your Baseline Metrics

Rate yourself today (1-10) so you can track your growth:

- **Overall life satisfaction**: _____
- **Confidence in facing challenges**: _____
- **Ability to adapt to change**: _____
- **Emotional regulation skills**: _____
- **Problem-solving capability**: _____
- **Relationship quality**: _____
- **Sense of purpose**: _____
- **Energy and motivation**: _____

**Total score**: _____ / 80

Save this score. You'll reassess at the end of the course to measure your transformation.""",
        
        "challenge": """# Challenge: Your 7-Day Resilience Baseline

## Your Mission

For the next 7 days, you'll establish your resilience baseline through daily observations and micro-challenges. This isn't about changing anything yet—it's about becoming aware of your current patterns.

## Daily Tracking

### Day 1: Stress Response Mapping
**Your challenge**: Notice your first stress response of the day

**Morning intention**: "Today I will notice how I react to stress"

**When stress appears, observe**:
- Physical sensations: _____
- Emotional response: _____
- First thought: _____
- Immediate action: _____
- Time to recover: _____

**Evening reflection**:
- [ ] Completed observation
- What surprised me: _____
- Pattern noticed: _____

### Day 2: Adaptability Audit
**Your challenge**: Identify one plan that changes

**When plans change today**:
- Initial reaction: _____
- Time to accept change: _____
- Alternative approach: _____
- Outcome: _____

**Adaptability score today (1-10)**: _____

**Evening reflection**:
- [ ] Noticed a change
- How I adapted: _____
- What I learned: _____

### Day 3: Support System Scan
**Your challenge**: Reach out to one supportive person

**Person contacted**: _____
**Method** (call/text/in-person): _____
**How it felt**: _____
**Their response**: _____

**Evening reflection**:
- [ ] Made contact
- Quality of connection (1-10): _____
- What I appreciated: _____

### Day 4: Emotion Awareness
**Your challenge**: Name your emotions 3 times

**Morning emotion**: _____
**Midday emotion**: _____
**Evening emotion**: _____

**Emotion patterns**:
- Most common feeling: _____
- Trigger identified: _____
- How emotions affected actions: _____

**Evening reflection**:
- [ ] Named 3 emotions
- New awareness: _____

### Day 5: Strength Spotting
**Your challenge**: Use one of your strengths intentionally

**Strength used**: _____
**Situation**: _____
**Result**: _____
**How it felt**: _____

**Evening reflection**:
- [ ] Applied a strength
- Impact on confidence: _____
- Other strengths noticed: _____

### Day 6: Perspective Practice
**Your challenge**: Reframe one negative thought

**Original thought**: _____
**Reframed thought**: _____
**Evidence for reframe**: _____
**Impact on feelings**: _____

**Evening reflection**:
- [ ] Successfully reframed
- Difficulty level (1-10): _____
- What shifted: _____

### Day 7: Integration Insights
**Your challenge**: Complete your baseline assessment

**This week I discovered**:
- My typical stress response is: _____
- My adaptability strength is: _____
- My support system includes: _____
- My emotional patterns show: _____
- My natural strengths are: _____
- My perspective tends to be: _____

**Three key insights**:
1. _____
2. _____
3. _____

## Your Resilience Baseline Report

### Strengths Identified
- [ ] Quick stress recovery
- [ ] Natural adaptability
- [ ] Strong support network
- [ ] Emotional awareness
- [ ] Strength utilization
- [ ] Perspective flexibility
- [ ] Other: _____

### Growth Opportunities
- [ ] Stress management
- [ ] Change adaptation
- [ ] Building connections
- [ ] Emotion regulation
- [ ] Strength development
- [ ] Reframing skills
- [ ] Other: _____

### Patterns Discovered
**I'm most resilient when**: _____
**I struggle most when**: _____
**My default response is**: _____
**I need to develop**: _____

### Your Baseline Scores

Rate yourself after this week of observation (1-10):

- **Stress awareness**: _____
- **Adaptation speed**: _____
- **Support utilization**: _____
- **Emotional intelligence**: _____
- **Strength application**: _____
- **Perspective flexibility**: _____

**Total baseline score**: _____ / 60

### Your Personal Resilience Statement

Based on this week's observations, complete:

"I am someone who _____ when facing challenges.

My natural resilience style involves _____.

I'm ready to build on my strength of _____ and develop my capacity for _____."

## Bonus Challenge: Share Your Journey

- [ ] Share one insight with someone you trust
- [ ] Their response: _____
- [ ] How sharing felt: _____
- [ ] What you learned from sharing: _____

## Next Steps

You now have a clear picture of your resilience starting point. This baseline will help you:
- Track your growth throughout the course
- Focus on areas that need development
- Build on existing strengths
- Create a personalized resilience plan

**Your commitment to growth**: _____

Remember: Awareness is the first step to transformation. You've just taken that step. Welcome to your resilience journey!"""
    }
    
    # Update Lesson 1
    try:
        cur.execute("""
            UPDATE lesson 
            SET title = %s, story = %s, reflection = %s, challenge = %s
            WHERE id = 1
        """, (
            lesson1_content['title'],
            lesson1_content['story'],
            lesson1_content['reflection'],
            lesson1_content['challenge']
        ))
        print("✅ Updated Lesson 1: Overview of Resilience & Competency")
    except Exception as e:
        print(f"❌ Error updating Lesson 1: {e}")
    
    # Lesson 2: Goals of the Course
    lesson2_content = {
        "title": "Goals of the Course",
        "story": """# Goals of the Course

## Your Roadmap to Transformation

Marcus stood before the mirror, barely recognizing himself. Not physically—mentally. Six months ago, he was a different person: reactive, rigid, overwhelmed by every curveball life threw. Now? He had become someone who saw opportunities in obstacles, who bent without breaking, who grew stronger with each challenge.

"What changed?" his colleague asked.

Marcus smiled. "I learned that resilience isn't about being tough. It's about being smart, flexible, and intentional. I didn't just learn to survive—I learned to thrive."

This is your destination. Let's map out how we'll get you there.

## The Ultimate Goal: Integrated Resilience

By the end of this course, you won't just be more resilient—you'll have developed an integrated system of mental, emotional, and behavioral capabilities that work together to help you:

- **Navigate** any challenge with confidence
- **Transform** setbacks into comebacks
- **Build** unshakeable inner strength
- **Create** positive ripple effects in all life areas
- **Inspire** resilience in others

## Your 8 Transformational Goals

### Goal 1: Master Emotional Intelligence
**Where you are now**: Emotions might control you
**Where you'll be**: You'll surf emotions like waves

**Specific outcomes**:
- Identify emotions in under 3 seconds
- Regulate emotional responses in real-time
- Use emotions as data, not drivers
- Build authentic connections
- Navigate conflict with grace

**Your current EQ (1-10)**: _____
**Your target EQ**: _____

### Goal 2: Develop Cognitive Flexibility
**Where you are now**: Stuck in mental patterns
**Where you'll be**: Mental gymnast

**Specific outcomes**:
- Reframe any situation in 3 ways
- Break free from limiting beliefs
- Generate creative solutions on demand
- See opportunities in obstacles
- Think both/and, not either/or

**Your mental flexibility (1-10)**: _____
**Your target flexibility**: _____

### Goal 3: Build Unshakeable Grit
**Where you are now**: Give up when it gets hard
**Where you'll be**: Embrace the difficult

**Specific outcomes**:
- Persist through setbacks
- Maintain motivation during long challenges
- Find meaning in struggle
- Develop mental toughness
- Celebrate effort over outcome

**Your grit level (1-10)**: _____
**Your target grit**: _____

### Goal 4: Cultivate Adaptability
**Where you are now**: Resist change
**Where you'll be**: Dance with change

**Specific outcomes**:
- Pivot strategies quickly
- Thrive in uncertainty
- Learn from every experience
- Update beliefs based on evidence
- Stay effective in any environment

**Your adaptability (1-10)**: _____
**Your target adaptability**: _____

### Goal 5: Enhance Problem-Solving
**Where you are now**: Overwhelmed by problems
**Where you'll be**: Excited by puzzles

**Specific outcomes**:
- Break complex problems into steps
- Generate multiple solutions
- Make decisions with incomplete information
- Learn from failed attempts
- Turn problems into projects

**Your problem-solving (1-10)**: _____
**Your target level**: _____

### Goal 6: Strengthen Communication
**Where you are now**: Misunderstood or disconnected
**Where you'll be**: Clear and connected

**Specific outcomes**:
- Express needs clearly
- Listen for understanding
- Give feedback constructively
- Build trust rapidly
- Influence positively

**Your communication (1-10)**: _____
**Your target level**: _____

### Goal 7: Accelerate Learning
**Where you are now**: Fixed mindset
**Where you'll be**: Growth incarnate

**Specific outcomes**:
- Extract lessons from every experience
- Learn faster from feedback
- Apply knowledge immediately
- Teach what you learn
- Embrace beginner's mind

**Your learning agility (1-10)**: _____
**Your target agility**: _____

### Goal 8: Create Your Resilience System
**Where you are now**: Random responses
**Where you'll be**: Systematic strength

**Specific outcomes**:
- Daily resilience practices
- Personalized toolkit
- Automatic positive responses
- Support network activated
- Continuous improvement loop

**Your system maturity (1-10)**: _____
**Your target maturity**: _____

## The Learning Journey

### Phase 1: Foundation (Modules 1-2)
**Weeks 1-4**: Build awareness and emotional intelligence
- Understand resilience science
- Develop emotional awareness
- Practice basic regulation
- Create initial toolkit

### Phase 2: Expansion (Modules 3-5)
**Weeks 5-8**: Develop cognitive and behavioral flexibility
- Master reframing techniques
- Build persistence practices
- Enhance adaptability
- Strengthen decision-making

### Phase 3: Integration (Modules 6-8)
**Weeks 9-12**: Apply and systemize your capabilities
- Refine communication skills
- Accelerate learning capacity
- Build personal system
- Create lasting change

### Phase 4: Mastery (Final Project)
**Week 13+**: Demonstrate and share your transformation
- Complete capstone project
- Measure transformation
- Share your journey
- Teach others

## Your Personal Success Metrics

Define what success looks like for YOU:

**My #1 reason for taking this course**: _____

**The specific situation I want to handle better**: _____

**The person I want to become**: _____

**Success for me looks like**: _____

**I'll know I've succeeded when**: _____

## The Hidden Goals (What We Won't Tell You But You'll Get Anyway)

Beyond the explicit goals, you'll also develop:

- **Increased confidence** in facing the unknown
- **Deeper self-trust** in your capabilities
- **Authentic presence** that inspires others
- **Inner peace** amid outer chaos
- **Magnetic energy** that attracts opportunities
- **Wisdom** to know when to push and when to flow
- **Courage** to pursue what matters most
- **Joy** in the journey, not just the destination

## Your Learning Commitment

This course requires:
- **Time**: 30-45 minutes per lesson
- **Practice**: Daily application of concepts
- **Honesty**: Real self-assessment
- **Courage**: Trying new approaches
- **Persistence**: Continuing when it's hard
- **Community**: Engaging with others

Are you ready to commit? Check all that apply:
- [ ] I'll dedicate time to learning
- [ ] I'll practice what I learn
- [ ] I'll be honest about my growth
- [ ] I'll try new things
- [ ] I'll persist through challenges
- [ ] I'll share my journey

## The Transformation Equation

**Your Current State + Course Content + Your Commitment = Your Transformation**

We provide the content and guidance. You provide the commitment and practice. Together, we create transformation.

## Marcus's Wisdom

Looking back on his journey, Marcus identified the three keys to his transformation:

1. **"I stopped waiting to feel ready"** - Action creates confidence
2. **"I measured progress, not perfection"** - Small wins compound
3. **"I trusted the process"** - Growth isn't always visible immediately

## Your Course Success Plan

**My ideal study time**: _____
**My practice commitment**: _____ minutes/day
**My accountability partner**: _____
**My reward for completing each module**: _____
**My celebration for course completion**: _____

## What Makes This Course Different

- **Evidence-based**: Every technique backed by research
- **Practical**: Real-world application, not just theory
- **Integrated**: Skills build on each other
- **Personalized**: Adapt everything to your context
- **Sustainable**: Build habits, not just knowledge
- **Community**: Learn with and from others
- **Transformational**: Change how you think, feel, and act

## Your Pre-Course Declaration

Write your intention:

"I'm taking this course because _____. 

I want to become someone who _____. 

I'm willing to _____ to make this transformation real.

When I complete this course, I will _____."

**Signed**: _____
**Date**: _____

## The Promise and The Challenge

**Our Promise**: If you show up, do the work, and apply what you learn, you will become more resilient than you've ever been.

**Your Challenge**: Trust the process, especially when it feels uncomfortable. Growth lives at the edge of your comfort zone.

## Ready to Begin?

You're not just starting a course. You're beginning a transformation. You're joining a community of people who refuse to be victims of circumstance, who choose growth over comfort, who build strength through challenge.

Your future self is waiting. Let's begin the journey.""",
        
        "reflection": """# Reflection: Your Personal Goals and Commitments

## Part 1: Your Why

**The moment I decided I needed more resilience was**: _____

**What was happening**: _____

**How I felt**: _____

**What I realized**: _____

**Why this matters to me**: _____

## Part 2: Your Specific Goals

For each area, define your personal goal:

### Emotional Intelligence Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

### Cognitive Flexibility Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

### Grit & Perseverance Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

### Adaptability Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

### Problem-Solving Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

### Communication Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

### Learning Goal
**Currently I**: _____
**I want to be able to**: _____
**This will help me**: _____
**Success looks like**: _____

## Part 3: Your Success Vision

**In 3 months, I will**: _____

**In 6 months, I will**: _____

**In 1 year, I will**: _____

**The person I'm becoming is someone who**: _____

## Part 4: Your Learning Style

How do you learn best? Check all that apply:
- [ ] Reading concepts
- [ ] Watching examples
- [ ] Doing exercises
- [ ] Discussing with others
- [ ] Teaching others
- [ ] Real-world practice
- [ ] Reflection/journaling
- [ ] Creating projects

**I learn best when**: _____

**I struggle to learn when**: _____

**To maximize my learning, I will**: _____

## Part 5: Potential Obstacles

**What might get in my way**: _____

**My tendency when things get hard**: _____

**Past patterns that might resurface**: _____

**My plan for overcoming obstacles**: _____

**Who I'll turn to for support**: _____

## Part 6: Your Commitment Contract

### Time Commitment
- [ ] I will dedicate _____ minutes per day
- [ ] My ideal study time is: _____
- [ ] I will protect this time by: _____

### Practice Commitment
- [ ] I will practice new skills daily
- [ ] I will apply concepts to real situations
- [ ] I will track my progress
- [ ] I will be patient with myself

### Growth Commitment
- [ ] I will embrace discomfort
- [ ] I will try things that feel hard
- [ ] I will learn from setbacks
- [ ] I will celebrate small wins

### Community Commitment
- [ ] I will engage with the material honestly
- [ ] I will share my experiences
- [ ] I will support others' growth
- [ ] I will ask for help when needed

## Part 7: Your Accountability System

**I will track my progress by**: _____

**I will share my journey with**: _____

**I will review my growth every**: _____

**I will celebrate milestones by**: _____

**If I fall behind, I will**: _____

## Part 8: Your Success Metrics

Define measurable outcomes:

**By Module 2, I will**: _____
**Measurement**: _____

**By Module 4, I will**: _____
**Measurement**: _____

**By Module 6, I will**: _____
**Measurement**: _____

**By course end, I will**: _____
**Measurement**: _____

## Part 9: Your Letter to Future Self

Write to yourself 3 months from now:

"Dear Future Me,

I'm starting this journey because _____.

I hope by the time you read this, you have _____.

I promise to _____ even when _____.

I'm doing this for _____.

Remember that _____.

With hope and determination,
Current Me"

Date: _____

## Part 10: Your First Action

**The very first thing I will do after this lesson**: _____

**One person I'll tell about this course**: _____

**One habit I'll start building today**: _____

**One thing I'll stop doing to make space**: _____

**My mantra for this journey**: _____

Remember: Goals without commitment are just wishes. You've just transformed your wishes into commitments. The journey begins now.""",
        
        "challenge": """# Challenge: Your 7-Day Goal Activation Sprint

## Your Mission

Transform your goals from ideas into action through a 7-day sprint that builds momentum and establishes your learning rhythm.

## Daily Goal Activation Challenges

### Day 1: Vision Boarding
**Morning**: Create your resilience vision

**Your vision board** (describe or sketch):
- Where you are now: _____
- Where you're going: _____
- Who you're becoming: _____
- What you're leaving behind: _____

**Action steps**:
- [ ] Create physical or digital vision board
- [ ] Include 3 images representing your future self
- [ ] Add 3 words describing your transformation
- [ ] Place it where you'll see it daily

**Evening reflection**:
- How clear is my vision? (1-10): _____
- What excites me most: _____
- What I need to clarify: _____

### Day 2: Baseline Documentation
**Morning**: Document your starting point

**Today's snapshot**:
- Energy level (1-10): _____
- Stress level (1-10): _____
- Confidence (1-10): _____
- Optimism (1-10): _____
- Photo/video of current self: [ ] Taken

**Write yourself a note**:
"This is me on Day 2. I feel _____.
I struggle with _____.
I'm ready to _____."

**Evening reflection**:
- [ ] Baseline documented
- What I noticed: _____
- What surprised me: _____

### Day 3: Support System Activation
**Morning**: Build your growth team

**Reach out to 3 people**:
1. Name: _____ Role: _____
   Message sent: [ ] Response: _____

2. Name: _____ Role: _____
   Message sent: [ ] Response: _____

3. Name: _____ Role: _____
   Message sent: [ ] Response: _____

**Evening reflection**:
- Support team assembled: [ ]
- Quality of support (1-10): _____
- Next step with team: _____

### Day 4: Learning Space Creation
**Morning**: Design your growth environment

**Physical space**:
- [ ] Designated study area
- [ ] Materials organized
- [ ] Distractions removed
- [ ] Inspiration added

**Digital space**:
- [ ] Course bookmarked
- [ ] Calendar blocked
- [ ] Notifications adjusted
- [ ] Progress tracker created

**Mental space**:
- [ ] Limiting beliefs identified
- [ ] Growth mindset activated
- [ ] Curiosity engaged
- [ ] Judgment suspended

**Evening reflection**:
- Space ready (1-10): _____
- What helps focus: _____
- What needs adjustment: _____

### Day 5: Practice Run
**Morning**: Test your learning system

**Complete a mini-learning session**:
- Start time: _____
- End time: _____
- Location: _____
- Focus quality (1-10): _____

**Practice one new skill**:
- Skill chosen: _____
- How practiced: _____
- Result: _____
- Difficulty (1-10): _____

**Evening reflection**:
- [ ] System tested
- What worked: _____
- What to adjust: _____

### Day 6: Public Declaration
**Morning**: Make your commitment public

**Share your journey**:
- [ ] Posted on social media
- [ ] Told family/friends
- [ ] Joined course community
- [ ] Found accountability partner

**Your public statement**:
"I'm developing my resilience because _____.
In 3 months I will _____.
Join me or cheer me on!"

**Responses received**: _____

**Evening reflection**:
- How public commitment felt: _____
- Support received: _____
- Accountability created: _____

### Day 7: Launch Celebration
**Morning**: Celebrate beginning

**Celebration actions**:
- [ ] Reviewed week's progress
- [ ] Acknowledged courage to start
- [ ] Rewarded myself with: _____
- [ ] Set next week's intention

**Week 1 Summary**:
- Goals clarified: [ ]
- System created: [ ]
- Support activated: [ ]
- Commitment made: [ ]

**Top 3 insights**:
1. _____
2. _____
3. _____

## Your Week 1 Scorecard

Rate your activation (1-10):

**Goal Clarity**: _____
**System Setup**: _____
**Support Network**: _____
**Commitment Level**: _____
**Excitement**: _____
**Confidence**: _____

**Total Activation Score**: _____ / 60

## Momentum Builders

### Three Wins This Week
1. _____
2. _____
3. _____

### Three Lessons Learned
1. _____
2. _____
3. _____

### Three Actions for Next Week
1. _____
2. _____
3. _____

## Your Course Success Formula

Based on this week, complete your formula:

**My Optimal Learning Time**: _____
**My Best Environment**: _____
**My Key Support Person**: _____
**My Main Motivation**: _____
**My Success Ritual**: _____

## Bonus Challenges Completed

- [ ] Shared vision with 5 people
- [ ] Created accountability check-in schedule
- [ ] Set up reward system for milestones
- [ ] Joined online resilience community
- [ ] Started resilience journal
- [ ] Taught someone one concept
- [ ] Practiced gratitude daily

**Total bonus challenges**: _____ / 7

## Your Week 2 Preview

Next week you'll begin Module 2: Emotional Intelligence

**To prepare**:
- [ ] Review this week's insights
- [ ] Set specific EI goals
- [ ] Clear mental space
- [ ] Gather examples from your life
- [ ] Bring curiosity about emotions

## Final Reflection

**I'm most proud of**: _____

**I'm most excited about**: _____

**My commitment level (1-10)**: _____

**One thing I'll do differently**: _____

**Message to myself for tough days ahead**: _____

## Your Certificate of Beginning

"I, _____, have successfully completed the Goal Activation Sprint.

I have clarified my goals, built my support system, created my learning environment, and made my commitment public.

I am ready to transform."

Date: _____
Signature: _____

Congratulations! You're not just ready to learn about resilience—you're actively building it. The journey has officially begun!"""
    }
    
    # Update Lesson 2
    try:
        cur.execute("""
            UPDATE lesson 
            SET title = %s, story = %s, reflection = %s, challenge = %s
            WHERE id = 2
        """, (
            lesson2_content['title'],
            lesson2_content['story'],
            lesson2_content['reflection'],
            lesson2_content['challenge']
        ))
        print("✅ Updated Lesson 2: Goals of the Course")
        conn.commit()
        print("\n✅ Successfully updated Module 1 with complete content!")
    except Exception as e:
        conn.rollback()
        print(f"❌ Error updating Lesson 2: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    update_module1()
