#!/usr/bin/env python3
"""
Update Module 3 lessons 41-43 content in Render database
"""

import psycopg2
from psycopg2.extras import Json
import os

# Render PostgreSQL connection with SSL
DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://resilient_mastery_db_user:hl2Y9gVaIqLfBGVHsgPUlA8KgRpBmPl5@dpg-crqkjoe8ii6s73bsrrrg-a.oregon-postgres.render.com/resilient_mastery_db?sslmode=require')

def update_lessons():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Lesson 41: Flexibility in Action
    lesson_41 = {
        "story": """# Flexibility in Action

## The Jazz Session

Nina watched the senior engineers debate for the third hour. The system architecture meeting had devolved into a battle of egos, each person defending their approach like a fortress.

"What if we're all right?" Nina said quietly.

The room turned to the junior developer.

"I mean," Nina continued, gaining confidence, "what if we built it modularly? Use Tom's caching strategy for the API, Sarah's event-driven design for real-time features, and Marcus's monolithic approach for the admin panel. Jazz, not symphony."

The room was silent. Then Tom laughed. "The junior just out-architected all of us."

## The Flexibility Field Guide

Cognitive flexibility isn't a concept—it's a practice. Here's how it looks in the wild:

### Flexibility at Work

**Scenario**: Project requirements change mid-sprint
- **Rigid Response**: "This always happens! We need better planning!"
- **Flexible Response**: "Interesting. What new information prompted this change?"
- **Action**: Rapid pivot planning session
- **Result**: Team adapts in 2 hours vs. 2 days of complaints

**Your Work Challenge**: _____
- Rigid response tendency: _____
- Flexible response option: _____
- Next action: _____

**Scenario**: Your idea gets shot down in a meeting
- **Rigid Response**: Defend, argue, withdraw
- **Flexible Response**: "What concerns does my idea raise?"
- **Action**: Iterate based on feedback
- **Result**: Version 2.0 gets approved

**Your Recent Rejection**: _____
- How you responded: _____
- How you could flex: _____
- What you'll try next: _____

### Flexibility in Relationships

**Scenario**: Partner wants to change vacation plans
- **Rigid Response**: "But we already decided!"
- **Flexible Response**: "Tell me what you're excited about"
- **Action**: Explore the new possibility together
- **Result**: Discover an even better option

**Your Relationship Tension**: _____
- Your fixed position: _____
- Their perspective: _____
- The flexible middle: _____

**Scenario**: Friend cancels plans last minute (again)
- **Rigid Response**: "They don't value my time"
- **Flexible Response**: "Something must be going on"
- **Action**: Check in with curiosity, not judgment
- **Result**: Uncover they're struggling with anxiety

**Your Recurring Frustration**: _____
- Your assumption: _____
- Alternative explanation: _____
- Curious question to ask: _____

### Flexibility in Problem-Solving

**The Flexibility Algorithm**:
1. Define the problem broadly
2. Generate 5 wildly different solutions
3. Combine elements from each
4. Test the hybrid
5. Iterate based on results

**Practice Problem**: You need to learn a new skill but have no time
- Solution 1 (Traditional): Take an online course
- Solution 2 (Social): Find someone to teach you
- Solution 3 (Experiential): Jump in and learn by doing
- Solution 4 (Efficient): Learn only what you immediately need
- Solution 5 (Creative): Teach others to force yourself to learn

**Hybrid Solution**: _____

### Flexibility in Communication

**The Flexible Conversation Model**:

Instead of: "You're wrong"
Try: "I see it differently"

Instead of: "That won't work"
Try: "What would need to be true for that to work?"

Instead of: "No"
Try: "Yes, if..."

Instead of: "But..."
Try: "Yes, and..."

**Your Communication Upgrade**:
- Phrase you overuse: _____
- Flexible alternative: _____
- Where to practice: _____

## The Daily Flexibility Workout

### Morning: The Options Generator (3 minutes)
Look at your calendar. For each meeting/task, generate 2 alternatives:
- Meeting → Could be email/video/walking meeting
- Task → Could be delegated/automated/eliminated
- Problem → Could be opportunity/lesson/gift

### Midday: The Perspective Shift (2 minutes)
Whatever is frustrating you right now:
1. Name it: _____
2. Default reaction: _____
3. Opposite reaction: _____
4. Third option: _____
5. Choose consciously: _____

### Evening: The Flexibility Review (3 minutes)
- Where was I rigid today? _____
- What did it cost? _____
- How could I have flexed? _____
- Tomorrow I will: _____

## The Flexibility Paradox

Here's the counterintuitive truth: **The more options you see, the more committed you can be to your choice.**

When you choose from only one option, you're trapped.
When you choose from multiple options, you're empowered.

This is why flexible people are often the most decisive—they've considered alternatives and chosen consciously.

## Real-World Flexibility Scenarios

### Scenario 1: The Meeting From Hell
You're in a meeting that's going nowhere. People are talking in circles.

**Rigid Options**:
- Suffer in silence
- Aggressively take over
- Check out mentally

**Flexible Interventions**:
- "Could we pause and clarify our outcome?"
- "What if we broke into pairs for 5 minutes?"
- "Should we table this and gather more data?"
- "Let's each write our solution silently first"

**Your Move**: _____

### Scenario 2: The Impossible Deadline
Your boss wants something done in half the usual time.

**Rigid Options**:
- Say it's impossible
- Kill yourself trying
- Do a terrible job

**Flexible Approaches**:
- "What's the minimum viable version?"
- "What if we borrowed resources?"
- "Could we deliver in phases?"
- "What's driving this timeline?"

**Your Strategy**: _____

### Scenario 3: The Family Drama
Family member brings up old conflict at dinner.

**Rigid Options**:
- Engage in the same old fight
- Storm out
- Shut down

**Flexible Responses**:
- "That was hard for all of us"
- "How do you wish it had gone?"
- "What do you need from me now?"
- "Should we talk about this privately?"

**Your Choice**: _____

## Nina's Leadership Moment

Six months later, Nina was leading the architecture team. Not because of seniority—she had the least. But because she had something more valuable: the ability to hold multiple perspectives simultaneously.

In her first team meeting as lead, she introduced a new rule: "Every solution needs three versions before we choose. Not to create work, but to ensure we're choosing, not defaulting."

Tom, her former senior, smiled. "You know what you've built here? A jazz ensemble. Everyone gets a solo, but we're all playing the same song."

Nina nodded. "And the song can change. That's the point."

## Your Flexibility Action Plan

### This Week's Practice
Choose one area to flex:
- [ ] Communication style
- [ ] Problem-solving approach
- [ ] Daily routine
- [ ] Relationship dynamic
- [ ] Work method

**Specific Flexibility Goal**: _____

### The Three Experiments
1. **The Opposite Day**: Do one thing opposite to your norm
2. **The Yes Day**: Say yes to three things you'd usually decline
3. **The Options Day**: Generate 3 options for every decision

### Your Flexibility Metrics
Track for one week:
- Rigid responses caught: _____
- Flexible alternatives generated: _____
- New approaches tried: _____
- Unexpected outcomes: _____

## The Flexibility Manifesto

"I am water, not ice.
I flow around obstacles rather than breaking against them.
I take the shape of my container while maintaining my essence.
I can be gentle like rain or powerful like the ocean.
My strength is not in my rigidity but in my adaptability.
Today, I choose to flow."

Remember: **Flexibility is not indecision. It's conscious choice from expanded options.**""",

        "reflection": """# Reflection: Your Flexibility in Motion

## Part 1: Flexibility Self-Assessment

Rate yourself (1-10) in each area:

**Work Flexibility**
- Adapting to change: _____
- Accepting feedback: _____
- Trying new methods: _____
- Changing course: _____
- Average: _____

**Relationship Flexibility**
- Seeing others' perspectives: _____
- Compromising: _____
- Forgiving: _____
- Evolving dynamics: _____
- Average: _____

**Personal Flexibility**
- Changing opinions: _____
- Breaking routines: _____
- Learning new things: _____
- Admitting mistakes: _____
- Average: _____

**Lowest score area**: _____
**This is your growth edge**

## Part 2: Flexibility Blockers

What makes you rigid? Check all that apply:
- [ ] Fear of being wrong
- [ ] Need for control
- [ ] Past success with rigid approach
- [ ] Identity tied to specific way
- [ ] Perfectionism
- [ ] Fear of judgment
- [ ] Overwhelm
- [ ] Lack of energy
- [ ] Other: _____

Your top 3 blockers:
1. _____
2. _____
3. _____

## Part 3: Flexibility Success Stories

Recall three times flexibility served you:

**Success 1**:
- Situation: _____
- How you flexed: _____
- Result: _____
- Why it worked: _____

**Success 2**:
- Situation: _____
- How you flexed: _____
- Result: _____
- Why it worked: _____

**Success 3**:
- Situation: _____
- How you flexed: _____
- Result: _____
- Why it worked: _____

**Pattern**: What conditions support your flexibility? _____

## Part 4: The Rigidity Cost Calculator

Where is rigidity costing you most?

**At Work**:
- Missed opportunities: _____
- Repeated problems: _____
- Relationship strain: _____
- Total cost: _____

**In Relationships**:
- Conflicts unresolved: _____
- Connections missed: _____
- Growth prevented: _____
- Total cost: _____

**Personal Growth**:
- Learning blocked: _____
- Experiences avoided: _____
- Potential untapped: _____
- Total cost: _____

**The highest cost area**: _____
**This is your priority for flexibility**

## Part 5: Your Flexibility Edge

Complete these statements:

I'm most flexible when: _____

I'm most rigid when: _____

People would be surprised to know I'm flexible about: _____

I wish I were more flexible about: _____

The belief that keeps me rigid is: _____

If I were 10% more flexible, I would: _____

## Part 6: The Flexibility Commitment

**This week I will practice flexibility by**:

Monday: _____
Tuesday: _____
Wednesday: _____
Thursday: _____
Friday: _____

**My flexibility accountability partner**: _____

**I will know I'm becoming more flexible when**: _____

**The person who will most benefit from my flexibility**: _____

**My flexibility mantra**: _____""",

        "challenge": """# Challenge: The Flexibility Olympics

## Your Training Ground

For the next 7 days, you'll compete in daily flexibility events, earning points for each successful flex. Goal: 100+ points to reach Flexibility Master status.

## The Events

### Day 1: The Perspective Marathon
**Morning Event**: The Three-Story Building
Take any problem and tell three completely different stories about it:
- The Victim Story: _____
- The Hero Story: _____
- The Teacher Story: _____
Points: 10 for each compelling story

**Afternoon Event**: The Enemy's Gift
Think of someone who frustrates you:
- Their perspective: _____
- Their positive intention: _____
- What they're teaching you: _____
Points: 15 for genuine understanding

**Evening Event**: The Future History
Write about today from 10 years in the future: _____
Points: 10 for perspective shift

**Day 1 Total**: _____ / 45 possible

### Day 2: The Solution Gymnastics
**Morning Event**: The Five-Way Solve
Pick your biggest current problem:
- Solution 1 (Logical): _____
- Solution 2 (Creative): _____
- Solution 3 (Collaborative): _____
- Solution 4 (Radical): _____
- Solution 5 (Do Nothing): _____
Points: 5 for each unique solution

**Afternoon Event**: The Opposite Experiment
Do three things opposite to your normal way:
1. _____ Points: 5
2. _____ Points: 5
3. _____ Points: 5

**Evening Event**: The Hybrid Builder
Combine two unrelated ideas into something new: _____
Points: 10 for innovation

**Day 2 Total**: _____ / 50 possible

### Day 3: The Communication Flex
**Morning Event**: The Language Swap
Replace your default phrases:
- Instead of "but" → used "and": _____ times (2 points each)
- Instead of "no" → used "yes, if": _____ times (3 points each)
- Instead of "you should" → used "what if": _____ times (3 points each)

**Afternoon Event**: The Style Shifter
Communicate in three different styles:
- Like a coach: _____
- Like a poet: _____
- Like a scientist: _____
Points: 5 for each authentic shift

**Evening Event**: The Listen-First Challenge
Have entire conversation without giving advice: _____
Points: 15 for completion

**Day 3 Total**: _____ / variable

### Day 4: The Routine Revolution
**Morning Event**: The Morning Remix
Do morning routine in completely different order: _____
Points: 10 for completion

**Afternoon Event**: The Method Switch
Complete regular task using new method: _____
Points: 10 for innovation

**Evening Event**: The Habit Break
Skip one "essential" habit and notice what happens: _____
Points: 10 for insight

**Day 4 Total**: _____ / 30 possible

### Day 5: The Emotion Agility
**Morning Event**: The Feeling Flip
Transform negative emotions:
- Anger → Curiosity: _____
- Fear → Excitement: _____
- Frustration → Fascination: _____
Points: 10 for each successful flip

**Afternoon Event**: The Response Choice
Catch automatic reactions and choose differently:
- Caught reaction 1: _____ Chose: _____ Points: 5
- Caught reaction 2: _____ Chose: _____ Points: 5
- Caught reaction 3: _____ Chose: _____ Points: 5

**Evening Event**: The Empathy Stretch
Fully understand someone you disagree with: _____
Points: 15 for genuine connection

**Day 5 Total**: _____ / 60 possible

### Day 6: The Decision Decathlon
Make 10 decisions differently than usual:
1. _____ Points: 3
2. _____ Points: 3
3. _____ Points: 3
4. _____ Points: 3
5. _____ Points: 3
6. _____ Points: 3
7. _____ Points: 3
8. _____ Points: 3
9. _____ Points: 3
10. _____ Points: 3

**Bonus**: Make major decision using coin flip: _____
Points: 20 for courage

**Day 6 Total**: _____ / 50 possible

### Day 7: The Integration Championship
**Morning Event**: The Flexibility Story
Write about your week of flexibility:
- Biggest surprise: _____
- Hardest flex: _____
- Most valuable skill: _____
Points: 15 for reflection

**Afternoon Event**: The Teach-Back
Teach someone else a flexibility technique: _____
Points: 15 for knowledge transfer

**Evening Event**: The Future Flex
Design flexibility challenge for next week: _____
Points: 10 for commitment

**Day 7 Total**: _____ / 40 possible

## Scoring Your Performance

**Daily Scores**:
- Day 1: _____ / 45
- Day 2: _____ / 50
- Day 3: _____ / variable
- Day 4: _____ / 30
- Day 5: _____ / 60
- Day 6: _____ / 50
- Day 7: _____ / 40

**Total Score**: _____ points

## Achievement Levels

- **50-75 points**: Flexibility Beginner 🌱
- **76-100 points**: Flexibility Practitioner 🌿
- **101-125 points**: Flexibility Athlete 🌳
- **126-150 points**: Flexibility Master 🎋
- **151+ points**: Flexibility Olympian 🏆

## Bonus Challenges (10 points each)

- [ ] Change strongly held opinion based on evidence
- [ ] Admit you were wrong publicly
- [ ] Ask for help with something you usually do alone
- [ ] Say yes to something scary
- [ ] Combine ideas from two enemies
- [ ] Solve problem using child's approach
- [ ] Spend day in beginner's mind

## Your Flexibility Trophy

At week's end, write your victory speech:

"This week I discovered that I can _____. 

I was surprised that _____. 

I'm most proud of _____. 

Going forward, I commit to _____."

## The Flexibility Pledge

"I competed in the Flexibility Olympics not to win, but to grow. Each event stretched me beyond my comfortable patterns. I discovered that rigidity is a choice, and flexibility is a skill. I earned _____ points, but more importantly, I earned freedom from my own limitations."

Share your results with: _____

Celebrate your flexibility with: _____

Remember: **Every flex makes you stronger. Every stretch makes you freer. Every choice makes you more alive.**"""
    }

    # Lesson 42: Reflection & Integration: Make Flexibility Your Default
    lesson_42 = {
        "story": """# Reflection & Integration: Make Flexibility Your Default

## The Master Class

One year after that delayed flight where Marcus wrote his novel, he received an email. It was from the woman who had sat next to him—Linda.

"Marcus, you probably don't remember me, but you changed my life in an airport. When I missed my daughter's recital, you helped me see it differently. That private recital we planned? It became our tradition. Every month, she performs just for me. No distractions. No other parents. Just us.

But here's the real change: I started seeing everything differently. Traffic jams became podcast time. Setbacks became plot twists. Problems became puzzles. I even started a blog called 'Reframe Your Day.' It has 10,000 subscribers.

You taught me that flexibility isn't about having no preferences. It's about having preferences AND options. Thank you."

Marcus smiled. He did remember Linda. Her transformation had inspired a chapter in his novel about how one conversation can ripple through time.

## The Integration Map

You've learned the tools. You've practiced the moves. Now it's time to wire flexibility into your operating system permanently.

### Phase 1: Recognition (You Are Here)
You can now:
- ✓ Spot rigidity in real-time
- ✓ Identify your trigger patterns
- ✓ See multiple perspectives
- ✓ Generate alternative frames
- ✓ Choose responses consciously

### Phase 2: Application (Next 30 Days)
You will:
- Apply flexibility tools daily
- Catch and correct rigid thinking
- Build new neural pathways
- Create flexibility habits
- Track your progress

### Phase 3: Integration (Days 31-90)
You will:
- Make flexibility automatic
- Inspire flexibility in others
- Navigate complexity with ease
- Turn obstacles into opportunities
- Model cognitive agility

### Phase 4: Mastery (Day 91+)
You will:
- Flex without thinking about it
- Teach flexibility naturally
- Create flexible systems
- Lead through change
- Embody adaptability

## Your Personal Flexibility System

### The Daily Practice
**Morning (2 minutes)**: The Flexibility Prime
- Today I might be rigid about: _____
- Alternative perspective: _____
- My flexibility intention: _____

**Midday (1 minute)**: The Flexibility Check
- Where am I stuck? _____
- What else could be true? _____
- My next flexible move: _____

**Evening (2 minutes)**: The Flexibility Review
- Where did I flex today? _____
- Where did I stay rigid? _____
- Tomorrow's flexibility edge: _____

### The Weekly Rituals

**Monday**: Perspective Monday
- Practice seeing through others' eyes
- Challenge one assumption
- Ask "What am I not seeing?"

**Wednesday**: Reframe Wednesday  
- Take biggest challenge
- Generate 3 new frames
- Choose most empowering

**Friday**: Flexibility Friday
- Try something completely different
- Break one routine
- Say yes to unexpected

**Sunday**: Integration Sunday
- Review week's flexibility wins
- Identify patterns
- Set next week's flexibility goal

## The Flexibility Toolkit (Printable Reference)

### Quick Flexibility Fixes
**When stuck**: "What would the opposite approach be?"
**When frustrated**: "How is this happening FOR me?"
**When conflicted**: "What would both/and look like?"
**When rejected**: "What feedback is hidden here?"
**When delayed**: "What opportunity just opened?"

### The 5-Second Flexibility Check
1. Am I defending or exploring?
2. Am I in either/or or both/and?
3. Am I zoomed in or out appropriately?
4. What would [wise person] do?
5. What matters in 5 years?

### Emergency Flexibility Phrases
- "That's interesting, tell me more..."
- "I hadn't thought of it that way..."
- "What would need to be true for that to work?"
- "Help me understand your thinking..."
- "Yes, and we could also..."

## Building Your Flexibility Tribe

Flexibility is contagious. Build your support system:

**Your Flexibility Partner**: _____
- Weekly check-ins about rigidity caught
- Practice reframing together
- Call each other on fixed thinking

**Your Flexibility Mentor**: _____
- Someone who models flexibility
- Learn their strategies
- Shadow their decision-making

**Your Flexibility Student**: _____
- Someone you'll teach
- Explaining deepens understanding
- Their questions expand your thinking

## The Science of Lasting Change

Research shows habit formation requires:
- **66 days average** for automaticity
- **Daily practice** for neural rewiring
- **Social support** for sustainability
- **Visible tracking** for motivation
- **Identity shift** for permanence

Your flexibility identity statement:
"I am someone who _____"

## Your 90-Day Flexibility Roadmap

### Days 1-30: Foundation
- [ ] Daily flexibility practice (5 min/day)
- [ ] Weekly reframe ritual
- [ ] Track rigidity patterns
- [ ] Practice one tool daily
- [ ] Share journey with partner

### Days 31-60: Expansion
- [ ] Apply flexibility to bigger challenges
- [ ] Teach someone else to reframe
- [ ] Lead through change at work
- [ ] Navigate conflict with flexibility
- [ ] Build flexibility into routines

### Days 61-90: Mastery
- [ ] Flexibility becomes automatic
- [ ] Others notice your adaptability
- [ ] Complex problems feel manageable
- [ ] Change becomes exciting
- [ ] You inspire flexibility in others

## The Measurement Matrix

Track monthly:

**Quantitative Metrics**:
- Rigid thoughts caught per day: _____
- Alternative perspectives generated: _____
- Reframes that shifted outcomes: _____
- Conflicts resolved through flexibility: _____
- New approaches tried: _____

**Qualitative Shifts**:
- Stress level (1-10): _____
- Adaptability (1-10): _____
- Relationship quality (1-10): _____
- Creative problem-solving (1-10): _____
- Overall life satisfaction (1-10): _____

## Marcus's Final Wisdom

At his book launch, Marcus was asked about the secret to his success.

"People think success comes from having the right answer," he said. "But it actually comes from having the right questions. And the most powerful question is: 'What else could this mean?'

That delayed flight? It meant writing time, which meant finishing my novel, which meant standing here today. But it also meant meeting Linda, whose story became my favorite chapter, whose blog now helps thousands reframe their days.

Flexibility isn't about being wishy-washy. It's about being water—powerful enough to carve canyons, gentle enough to nurture growth, adaptable enough to take any shape while maintaining your essence."

## Your Flexibility Legacy

**In 90 days, you will**:
- Think more fluidly
- Adapt more quickly
- Stress less often
- Create more options
- Inspire more people

**In one year, you will**:
- Navigate change effortlessly
- See opportunities everywhere
- Build stronger relationships
- Solve complex problems
- Model resilience

**Your flexibility vision**: _____

## The Daily Question

Every morning for the next 90 days, ask yourself:

"How can I be like water today?"

Remember: **Rigidity breaks. Flexibility bends and bounces back stronger.**""",

        "reflection": """# Integration Reflection: Your Flexibility Future

## Part 1: The Journey So Far

**Before this module**, your flexibility level (1-10): _____

**Now**, your flexibility level (1-10): _____

**Biggest insight about flexibility**: _____

**Most surprising discovery**: _____

**Tool you'll use most**: _____

## Part 2: Your Rigidity Inventory

Areas where you've become more flexible:
- [ ] Work approaches
- [ ] Relationship dynamics  
- [ ] Problem-solving methods
- [ ] Daily routines
- [ ] Beliefs and opinions
- [ ] Self-perception
- [ ] Future planning
- [ ] Conflict resolution

Areas still needing flexibility:
- [ ] Work approaches
- [ ] Relationship dynamics
- [ ] Problem-solving methods
- [ ] Daily routines
- [ ] Beliefs and opinions
- [ ] Self-perception
- [ ] Future planning
- [ ] Conflict resolution

Your #1 flexibility priority: _____

## Part 3: The Integration Plan

**My daily flexibility practice will be**:
- Time: _____
- Place: _____
- Specific action: _____
- Tracking method: _____

**My weekly flexibility ritual will be**:
- Day: _____
- Activity: _____
- Duration: _____
- Accountability: _____

**My monthly flexibility review will include**:
- Metrics tracked: _____
- Patterns analyzed: _____
- Adjustments made: _____
- Celebrations planned: _____

## Part 4: Your Support System

**Flexibility Partner**: _____
- How they'll support: _____
- How you'll support them: _____
- Check-in frequency: _____

**Flexibility Mentor**: _____
- What you'll learn: _____
- How you'll connect: _____

**Flexibility Student**: _____
- What you'll teach: _____
- How this helps you: _____

## Part 5: The Commitment Contract

I, _____, commit to practicing cognitive flexibility for the next 90 days.

**I will**:
- Practice daily flexibility for _____ minutes
- Catch at least _____ rigid thoughts per day
- Generate _____ alternative perspectives weekly
- Try _____ new approaches monthly

**I will track**:
- [ ] Daily flexibility moments
- [ ] Weekly reframes
- [ ] Monthly metrics
- [ ] Quarterly progress

**I will celebrate**:
- Small wins by: _____
- Weekly progress by: _____
- Monthly milestones by: _____
- 90-day achievement by: _____

**When I get rigid, I will**: _____

**When I feel stuck, I will**: _____

**My flexibility mantra**: _____

**Signature**: _____
**Date**: _____

## Part 6: Letter to Future Flexible You

Write to yourself 90 days from now:

Dear Future Me,

By the time you read this, you will have: _____

The biggest change will be: _____

You'll be surprised that: _____

People will notice that you: _____

You'll be most proud of: _____

Remember when you thought: _____

Now you know: _____

Keep flexing,
Present You

## Part 7: Your Flexibility Mission Statement

Complete this statement:

"I choose flexibility because _____. 

When I'm flexible, I _____. 

This matters because _____. 

My flexibility serves _____."

Share this with someone by: _____""",

        "challenge": """# The 90-Day Flexibility Transformation Challenge

## Your Mission

Transform into a flexibility master through 90 days of deliberate practice, turning cognitive flexibility from effort to instinct.

## Phase 1: Foundation (Days 1-30)

### Week 1: Awareness Building
**Daily Practice** (5 min):
- Morning: Identify one area of rigidity
- Midday: Catch one fixed thought
- Evening: Generate one alternative perspective

**Week 1 Milestone**: Log 21 rigid thoughts caught

### Week 2: Tool Mastery
**Daily Practice** (7 min):
- Monday: Zoom Lens practice
- Tuesday: Time Machine practice
- Wednesday: Role Reversal practice
- Thursday: Meaning Maker practice
- Friday: Both/And Bridge practice
- Weekend: Integration

**Week 2 Milestone**: Use each tool successfully 3 times

### Week 3: Real-World Application
**Daily Practice** (10 min):
- Apply flexibility to one real challenge daily
- Document outcome
- Share with accountability partner

**Week 3 Milestone**: 7 successful flexibility pivots

### Week 4: Habit Installation
**Daily Practice** (5 min):
- Morning flexibility prime
- Midday flexibility check
- Evening flexibility review

**Week 4 Milestone**: 7 consecutive days of practice

**Phase 1 Checkpoint**:
- Rigid thoughts caught: _____ (target: 50+)
- Successful reframes: _____ (target: 20+)
- New approaches tried: _____ (target: 10+)

## Phase 2: Expansion (Days 31-60)

### Week 5-6: Relationship Flexibility
**Focus**: Apply flexibility to interpersonal dynamics
- [ ] Practice perspective-taking in conflicts
- [ ] Use "yes, and" in conversations
- [ ] Reframe relationship challenges
- [ ] Build bridges, not walls

**Milestone**: Resolve 3 conflicts through flexibility

### Week 7-8: Professional Flexibility
**Focus**: Bring flexibility to work
- [ ] Propose alternative solutions
- [ ] Adapt to changing requirements gracefully
- [ ] See feedback as data, not judgment
- [ ] Lead through change

**Milestone**: Implement 3 flexible solutions at work

**Phase 2 Checkpoint**:
- Flexibility applied to relationships: _____
- Flexibility applied to work: _____
- Others' feedback about your flexibility: _____

## Phase 3: Mastery (Days 61-90)

### Week 9-10: Teaching Flexibility
**Focus**: Deepen through teaching
- [ ] Teach flexibility to 3 people
- [ ] Lead a flexibility workshop
- [ ] Write about your experience
- [ ] Mentor someone in reframing

**Milestone**: 3 people successfully using your teachings

### Week 11-12: System Building
**Focus**: Create sustainable structures
- [ ] Build flexibility into daily routines
- [ ] Create environmental triggers
- [ ] Establish flexibility rituals
- [ ] Design accountability systems

**Milestone**: 3 flexibility systems operating automatically

### Week 13: Integration Celebration
**Focus**: Consolidate and celebrate
- [ ] Complete final assessment
- [ ] Document transformation
- [ ] Share success story
- [ ] Plan continued growth

**Final Milestone**: Flexibility is now your default

## Daily Tracking Sheet

Print and use daily:

**Date**: _____

**Morning** (2 min):
- Today's rigidity risk: _____
- Flexibility intention: _____

**Midday** (1 min):
- Caught rigid thought: _____
- Reframe applied: _____

**Evening** (2 min):
- Flexibility win: _____
- Tomorrow's edge: _____
- Gratitude for flexibility: _____

**Weekly Score**:
- Days practiced: _____ / 7
- Rigid thoughts caught: _____
- Successful reframes: _____
- New approaches: _____

## The Milestone Map

### 30-Day Milestones
- [ ] 150+ rigid thoughts caught
- [ ] 60+ successful reframes
- [ ] 30+ new approaches tried
- [ ] Daily practice established
- [ ] Flexibility partner engaged

### 60-Day Milestones
- [ ] Flexibility feeling natural
- [ ] Others noticing changes
- [ ] Stress reduced by 30%
- [ ] Conflicts resolving faster
- [ ] Teaching others successfully

### 90-Day Milestones
- [ ] Flexibility is automatic
- [ ] Change feels exciting
- [ ] Problems feel solvable
- [ ] Relationships improved
- [ ] Life satisfaction increased

## Your Flexibility Dashboard

Update weekly:

| Week | Practice Days | Thoughts Caught | Reframes | New Approaches | Stress (1-10) | Satisfaction (1-10) |
|------|--------------|-----------------|----------|----------------|---------------|-------------------|
| 1    | ___ | ___ | ___ | ___ | ___ | ___ |
| 2    | ___ | ___ | ___ | ___ | ___ | ___ |
| 3    | ___ | ___ | ___ | ___ | ___ | ___ |
| 4    | ___ | ___ | ___ | ___ | ___ | ___ |
| ...  | ... | ... | ... | ... | ... | ... |
| 13   | ___ | ___ | ___ | ___ | ___ | ___ |

## The Flexibility Graduate Certificate

Upon completing 90 days, you earn:

**Cognitive Flexibility Certification**
This certifies that _____ has completed 90 days of deliberate flexibility practice, demonstrating:
- Consistent daily practice
- Measurable increase in adaptability
- Successful application across life domains
- Ability to teach others
- Embodiment of cognitive flexibility

**New Identity**: "I am cognitively flexible"

## Beyond 90 Days

Your continued growth path:
- **Days 91-180**: Advanced flexibility challenges
- **Days 181-365**: Flexibility leadership
- **Year 2**: Flexibility innovation
- **Lifetime**: Flexibility mastery

## Your Public Declaration

Post this commitment:

"I'm embarking on a 90-day Cognitive Flexibility Challenge. For the next 90 days, I'll practice seeing multiple perspectives, generating alternatives, and adapting to change with grace. 

My goal: Make flexibility my default mode.

My why: _____

Follow my journey: #90DayFlexChallenge"

Post on: _____ (date)
Platform: _____
Accountability tags: _____

## The Final Question

90 days from now, when flexibility is your superpower, what becomes possible that isn't possible today?

Your answer: _____

Remember: **Every rigid thought you catch is a victory. Every reframe is growth. Every flexible response is freedom.**

*Start tomorrow. Start with curiosity. Start with the belief that there's always another way.*"""
    }

    # Lesson 43: The 7-Day Reframe Challenge (Capstone)
    lesson_43 = {
        "story": """# The 7-Day Reframe Challenge (Capstone)

## Day Zero: The Setup

"I dare you," said Marcus to his writing group, "to go one week seeing everything differently. Every setback, every frustration, every problem—reframe it. Make it serve you."

Linda laughed. "Easy for you to say. You turned a flight delay into a bestseller."

"Exactly," Marcus smiled. "And you turned a missed recital into a monthly tradition that strengthened your relationship with your daughter. We all have this power. The question is: will you use it?"

The group exchanged glances. Seven days. How hard could it be?

## Your 7-Day Reframe Challenge

This is your capstone project—a concentrated week of cognitive flexibility that will cement everything you've learned. By the end, reframing won't be something you do; it'll be who you are.

### The Challenge Rules

1. **Every negative thought gets reframed** (no exceptions)
2. **Document each reframe** (build evidence of change)
3. **Share one reframe daily** (accountability + inspiration)
4. **No complaining without reframing** (catch and shift)
5. **Celebrate flexibility wins** (reinforce the practice)

### Your Pre-Challenge Assessment

Rate yourself now (1-10):
- Default to negative interpretations: _____
- Speed of reframing: _____
- Creative problem-solving: _____
- Stress resilience: _____
- Optimism level: _____
- **Total Score**: _____ / 50

## Day 1: The Perspective Shift

**Morning Mission**: Reframe your biggest current problem
- The problem: _____
- Default frame: _____
- Power question: "How is this happening FOR me?"
- New frame: _____
- Action this enables: _____

**Throughout the Day**:
- [ ] Catch 5 negative thoughts
- [ ] Reframe each one
- [ ] Take 1 action from new perspective

**Evening Reflection**:
- Most powerful reframe: _____
- How it changed your day: _____
- Tomorrow's reframe edge: _____

**Share today**: Post your biggest reframe win

## Day 2: The Zoom Practice

**Morning Mission**: Apply the Zoom Lens to three situations

**Situation 1** (personal):
- Zoomed in (catastrophic): _____
- Zoomed out (big picture): _____
- Optimal zoom level: _____

**Situation 2** (professional):
- Zoomed in (details): _____
- Zoomed out (strategy): _____
- Optimal zoom level: _____

**Situation 3** (relational):
- Zoomed in (this moment): _____
- Zoomed out (full history): _____
- Optimal zoom level: _____

**Throughout the Day**:
- [ ] Notice when you're too zoomed in
- [ ] Practice zooming out for perspective
- [ ] Find optimal zoom for each situation

**Evening Reflection**:
- Where zoom helped most: _____
- Default zoom tendency: _____
- Tomorrow's zoom practice: _____

## Day 3: The Time Traveler

**Morning Mission**: Use time travel for current challenges

**Challenge 1**: _____
- In 10 years this will be: _____
- 10 years ago I would have: _____
- Best temporal perspective: _____

**Challenge 2**: _____
- In 1 year this matters: _____
- 5 years ago perspective: _____
- Wisdom from future self: _____

**Throughout the Day**:
- [ ] Ask "Will this matter in 5 years?" (3 times)
- [ ] Channel future wisdom (2 times)
- [ ] Appreciate growth from past (1 time)

**Evening Reflection**:
- Time travel's biggest gift: _____
- Most helpful time horizon: _____
- Temporal wisdom gained: _____

## Day 4: The Meaning Maker

**Morning Mission**: Transform 3 "problems" into purposes

**Problem 1**: _____
- This is teaching me: _____
- This is preparing me for: _____
- The hidden gift is: _____

**Problem 2**: _____
- The skill I'm developing: _____
- The strength I'm building: _____
- The wisdom I'm gaining: _____

**Problem 3**: _____
- How this serves others: _____
- What this makes possible: _____
- Why I'll be grateful later: _____

**Throughout the Day**:
- [ ] Find meaning in minor annoyances
- [ ] See lessons in mistakes
- [ ] Discover gifts in delays

**Evening Reflection**:
- Most meaningful reframe: _____
- How meaning changed experience: _____
- Tomorrow's meaning focus: _____

## Day 5: The Both/And Bridge

**Morning Mission**: Dissolve 3 either/or dilemmas

**Dilemma 1**: Either _____ OR _____
- Both/and version: _____
- The bridge between: _____
- Action this enables: _____

**Dilemma 2**: Either _____ OR _____
- Both/and version: _____
- The bridge between: _____
- Action this enables: _____

**Dilemma 3**: Either _____ OR _____
- Both/and version: _____
- The bridge between: _____
- Action this enables: _____

**Throughout the Day**:
- [ ] Replace "but" with "and" (10 times)
- [ ] Find third options
- [ ] Build bridges not walls

**Evening Reflection**:
- Best both/and moment: _____
- How it dissolved conflict: _____
- Both/and opportunities tomorrow: _____

## Day 6: The Question Flip

**Morning Mission**: Transform statements into questions

**Limiting belief 1**: _____
- Flipped to question: _____
- Possibilities opened: _____

**Limiting belief 2**: _____
- Flipped to question: _____
- Possibilities opened: _____

**Limiting belief 3**: _____
- Flipped to question: _____
- Possibilities opened: _____

**Power Questions for Today**:
- "What if the opposite were true?"
- "How might this be perfect?"
- "What am I not seeing?"
- "What would [hero] do?"
- "How is this exactly what I need?"

**Throughout the Day**:
- [ ] Question assumptions (5 times)
- [ ] Ask "what if?" (5 times)
- [ ] Wonder instead of worry (5 times)

**Evening Reflection**:
- Most powerful question: _____
- How questions changed thinking: _____
- Questions for tomorrow: _____

## Day 7: The Integration

**Morning Mission**: Combine all tools for ultimate reframe

**Your biggest remaining challenge**: _____

Apply all tools:
1. **Zoom Lens view**: _____
2. **Time Machine perspective**: _____
3. **Role Reversal insight**: _____
4. **Meaning made**: _____
5. **Both/and bridge**: _____
6. **Question flip**: _____

**Ultimate reframe**: _____

**Action plan from new frame**: _____

**Throughout the Day**:
- [ ] Use each tool at least once
- [ ] Stack tools for complex challenges
- [ ] Teach someone to reframe

**Evening Celebration**:
- Week's most transformative reframe: _____
- Tool that worked best: _____
- How you've changed: _____

## Your Post-Challenge Assessment

Rate yourself now (1-10):
- Default to negative interpretations: _____
- Speed of reframing: _____
- Creative problem-solving: _____
- Stress resilience: _____
- Optimism level: _____
- **Total Score**: _____ / 50

**Growth**: _____ points improved!

## The Challenge Debrief

### Quantitative Results
- Total reframes completed: _____
- Negative thoughts caught: _____
- Actions taken from new frames: _____
- Problems solved differently: _____
- Stress moments transformed: _____

### Qualitative Shifts
**Before the challenge, I**:
- Saw problems as: _____
- Responded to setbacks with: _____
- Felt stuck when: _____

**After the challenge, I**:
- See problems as: _____
- Respond to setbacks with: _____
- Feel empowered when: _____

## Your Reframe Trophy

Write your victory speech:

"In 7 days, I reframed _____ negative thoughts into possibilities. 

My biggest reframe was _____, which led to _____.

I learned that _____.

I'm most proud of _____.

Going forward, I commit to _____."

## The Ripple Effect

**Who noticed your changes?**
1. _____
2. _____
3. _____

**What shifted in your**:
- Work: _____
- Relationships: _____
- Self-perception: _____
- Future vision: _____

**Who will you challenge next?** _____

## Marcus's Group Reconvenes

Seven days later, the writing group gathered again.

"So?" Marcus asked. "How many of you completed the challenge?"

Every hand went up.

"And how many of you feel different?"

Every hand stayed up.

Linda spoke first: "I reframed my daughter's teenage rebellion as her finding her voice. Instead of fighting, we started a podcast together about generational differences."

Tom added: "I reframed my writer's block as my standards rising. Started celebrating high standards instead of cursing the block. Wrote more this week than last month."

Sarah smiled: "I reframed my divorce proceedings from 'failure' to 'graduation.' Both of us graduating to relationships that actually fit who we've become."

Marcus nodded. "And that's the secret. Reality doesn't change. Your frame does. And when your frame changes, your experience transforms. And when your experience transforms..."

"Your life transforms," the group said in unison.

## Your Continuing Challenge

The 7 days are complete, but your reframing journey continues:

**Week 2**: Apply reframing to bigger life decisions
**Week 3**: Teach three people to reframe
**Week 4**: Create a reframing ritual or system
**Month 2**: Make reframing automatic
**Month 3**: Become known as the person who sees possibilities

## The Reframer's Pledge

"I have completed the 7-Day Reframe Challenge. I have proven that I can transform any experience through the power of perspective. I am not at the mercy of circumstances; I am the author of my experience. From this day forward, I choose frames that empower, inspire, and elevate. I am a master reframer."

**Signed**: _____
**Date**: _____
**Witness**: _____

## Your Next Challenge

Ready for more? Choose your next cognitive flexibility adventure:
- [ ] 30-Day Flexibility Intensive
- [ ] Teach a Reframing Workshop
- [ ] Write Your Reframe Story
- [ ] Lead a Reframe Challenge Group
- [ ] Create a Flexibility Practice

Remember: **You've proven you can reframe anything. Now the question isn't "Can I?" but "How quickly?" and "How creatively?"**

*The challenge is complete. The practice is forever. Welcome to your flexible future.*""",

        "reflection": """# Capstone Reflection: Your Flexibility Mastery

## The Journey Complete

Take a moment. You've completed the Cognitive Flexibility module. You've learned the science, practiced the tools, and completed the challenge. Now, let's consolidate your transformation.

## Part 1: The Before and After

**Before this module**:

When faced with challenges, I would: _____

My typical response to change was: _____

I saw problems as: _____

My stress response was: _____

My mental flexibility score (1-10): _____

**After this module**:

When faced with challenges, I now: _____

My typical response to change is: _____

I see problems as: _____

My stress response is: _____

My mental flexibility score (1-10): _____

**The biggest shift**: _____

## Part 2: Your Flexibility Toolkit

Rate your mastery (1-5):
- The Zoom Lens: _____
- The Time Machine: _____
- The Role Reversal: _____
- The Meaning Maker: _____
- The Both/And Bridge: _____
- The Question Flip: _____

**Your go-to tool**: _____
**Tool needing more practice**: _____
**Tool you'll teach others**: _____

## Part 3: Real-World Impact

**In Work/Career**:
- Specific improvement: _____
- Opportunity created: _____
- Problem solved: _____

**In Relationships**:
- Connection deepened: _____
- Conflict resolved: _____
- Understanding gained: _____

**In Personal Growth**:
- Belief changed: _____
- Habit broken: _____
- Possibility opened: _____

## Part 4: The Wisdom Gained

Complete these statements:

I used to think flexibility meant _____, now I know it means _____.

The biggest misconception I had was _____.

The most surprising discovery was _____.

If I could tell past-me one thing, it would be _____.

The skill I'm most proud of developing is _____.

## Part 5: Your Flexibility Mission

**My flexibility WHY**:
I practice cognitive flexibility because: _____

**My flexibility WHAT**:
The change I want to create through flexibility: _____

**My flexibility HOW**:
My daily flexibility practice will be: _____

**My flexibility WHO**:
The person I'm becoming through flexibility: _____

## Part 6: Letter to Future Challenges

Write to your next challenge:

"Dear Future Challenge,

I see you coming, and I'm ready. I have tools you can't break: _____.

I have perspectives you can't limit: _____.

I have flexibility you can't rigid: _____.

You're not here to defeat me. You're here to _____.

I will meet you with _____.

And I will transform you into _____.

Signed,
Flexible Me"

## Part 7: Your Flexibility Legacy

**In 1 year**, because of my flexibility:
- I will have: _____
- I will be: _____
- Others will: _____

**In 5 years**, my flexibility will have:
- Created: _____
- Prevented: _____
- Enabled: _____

**The ripple effect**:
My flexibility will impact: _____ (people)
In these ways: _____

## Part 8: The Integration Commitment

I commit to:
- [ ] Daily flexibility practice (5 min)
- [ ] Weekly reframe ritual
- [ ] Monthly flexibility review
- [ ] Teaching others quarterly
- [ ] Annual flexibility challenge

**Accountability partner**: _____
**Review date**: _____
**Celebration planned**: _____

## Part 9: Gratitude and Acknowledgment

**I'm grateful for**:
- The challenge that taught me: _____
- The person who modeled: _____
- The moment I realized: _____

**I acknowledge myself for**:
- Having the courage to: _____
- Persisting when: _____
- Changing even though: _____

## Your Flexibility Graduation

**You've earned the title**: Cognitive Flexibility Practitioner

**You've developed the skills**:
✓ Perspective shifting
✓ Frame transformation
✓ Mental agility
✓ Creative problem-solving
✓ Adaptive thinking

**You've proven you can**:
✓ Change your mind
✓ See multiple truths
✓ Bridge opposites
✓ Find opportunities in obstacles
✓ Thrive in uncertainty

## The Final Question

Now that you know you can reframe anything, what will you reframe next?

Your answer: _____

Congratulations, Flexibility Master. The world needs your adaptability, your perspective, your ability to see what others miss. Go forth and flex.

**Module Complete** 🎯""",

        "challenge": """# The Ultimate Integration Challenge: Living Flexibly

## Your Final Mission

Take everything you've learned and create a 30-day flexibility practice that transforms one specific area of your life.

## Step 1: Choose Your Arena

Select the life area that most needs flexibility:
- [ ] Career transition
- [ ] Relationship pattern
- [ ] Health journey
- [ ] Financial situation
- [ ] Personal growth edge
- [ ] Creative pursuit

**Your chosen arena**: _____

**Current state**: _____

**Desired state**: _____

## Step 2: Design Your Practice

### Week 1: Assessment and Awareness
**Daily Actions**:
- Morning: Identify rigid patterns in chosen arena
- Midday: Practice one flexibility tool
- Evening: Document shifts and insights

**Week 1 Goals**:
- Map all rigid thinking in this area
- Test each tool's effectiveness
- Identify highest-leverage reframes

### Week 2: Application and Experimentation
**Daily Actions**:
- Morning: Set flexibility intention
- Throughout: Apply tools in real-time
- Evening: Track results and iterate

**Week 2 Goals**:
- Implement 3 major reframes
- Break 3 rigid patterns
- Create 3 new possibilities

### Week 3: Integration and Expansion
**Daily Actions**:
- Morning: Reinforce new flexible patterns
- Throughout: Catch and correct rigidity
- Evening: Celebrate flexibility wins

**Week 3 Goals**:
- Make flexibility automatic in arena
- Expand to related areas
- Share transformation with others

### Week 4: Mastery and Teaching
**Daily Actions**:
- Morning: Model flexibility
- Throughout: Guide others in reframing
- Evening: Document lessons learned

**Week 4 Goals**:
- Achieve desired state in arena
- Teach 3 people your method
- Create sustainable system

## Step 3: Track Your Transformation

### Daily Metrics
- Rigid thoughts caught: _____
- Reframes applied: _____
- Actions from new perspective: _____
- Stress level (1-10): _____
- Satisfaction (1-10): _____

### Weekly Reviews
**Week 1 Review**:
- Biggest insight: _____
- Most effective tool: _____
- Next week's focus: _____

**Week 2 Review**:
- Breakthrough moment: _____
- Unexpected discovery: _____
- Adjustment needed: _____

**Week 3 Review**:
- Transformation evidence: _____
- Others' feedback: _____
- Final week intention: _____

**Week 4 Review**:
- Goal achievement: _____
- Lessons learned: _____
- Next 30-day focus: _____

## Step 4: Create Your Flexibility System

Design a sustainable practice:

**Daily Minimum** (2 minutes):
- One flexibility check-in
- One reframe practice
- One gratitude for flexibility

**Weekly Power Hour**:
- Review week's rigidity patterns
- Plan next week's flexibility focus
- Share wins with accountability partner

**Monthly Evolution**:
- Assess flexibility growth
- Choose new arena to transform
- Teach someone your system

## Step 5: Share Your Story

Document your transformation:

**The Challenge I Faced**: _____

**The Rigid Pattern**: _____

**The Flexibility Tools Used**: _____

**The Reframe That Changed Everything**: _____

**The Result Achieved**: _____

**The Lesson Learned**: _____

**Who This Can Help**: _____

Share your story:
- [ ] With accountability partner
- [ ] On social media
- [ ] In community group
- [ ] As blog post
- [ ] In conversation

## Your 30-Day Commitment Contract

I, _____, commit to 30 days of deliberate flexibility practice in _____ (arena).

I will practice daily for _____ minutes.

I will use these tools: _____

I will track: _____

I will share with: _____

My success metric is: _____

My reward will be: _____

If I miss a day, I will: _____

My accountability partner is: _____

**Signature**: _____
**Date**: _____
**Witness**: _____

## Beyond the 30 Days

**Your flexibility future**:

**60 days**: Apply flexibility to second arena
**90 days**: Flexibility becomes identity
**6 months**: Lead flexibility workshop
**1 year**: Write flexibility guide
**Lifetime**: Model cognitive flexibility

## The Flexibility Master's Code

From this day forward:
- I choose curiosity over certainty
- I choose questions over answers
- I choose possibility over problems
- I choose bridges over walls
- I choose growth over comfort
- I choose flexibility over rigidity

## Your Public Declaration

Post this commitment:

"I've completed the Cognitive Flexibility module and I'm embarking on a 30-day practice to transform my _____ through the power of reframing.

My rigid pattern was: _____

My new flexible approach is: _____

Follow my journey: #FlexibilityInAction"

## The Final Challenge Question

When you've mastered flexibility in one arena, proved you can transform any pattern, and inspired others to do the same...

What becomes possible that seemed impossible before?

Your answer: _____

## Course Complete. Practice Begins.

You have all the tools. You know the science. You've completed the challenges. Now comes the real work: living flexibly every day.

Remember:
- **Rigidity is learned. Flexibility is chosen.**
- **Every moment offers multiple perspectives.**
- **Every problem contains an opportunity.**
- **Every frame is a choice.**
- **You are the author of your experience.**

Welcome to your flexible future. The world needs what you've become.

*Now go forth and flex.* 💪🧠✨"""
    }
    
    try:
        # Update lesson 41
        cur.execute("""
            UPDATE lesson 
            SET story = %s, reflection = %s, challenge = %s
            WHERE id = 41
        """, (Json(lesson_41['story']), Json(lesson_41['reflection']), Json(lesson_41['challenge'])))
        print("✅ Updated Lesson 41")
        
        # Update lesson 42  
        cur.execute("""
            UPDATE lesson 
            SET story = %s, reflection = %s, challenge = %s
            WHERE id = 42
        """, (Json(lesson_42['story']), Json(lesson_42['reflection']), Json(lesson_42['challenge'])))
        print("✅ Updated Lesson 42")
        
        # Update lesson 43
        cur.execute("""
            UPDATE lesson 
            SET story = %s, reflection = %s, challenge = %s
            WHERE id = 43
        """, (Json(lesson_43['story']), Json(lesson_43['reflection']), Json(lesson_43['challenge'])))
        print("✅ Updated Lesson 43")
        
        conn.commit()
        print("\n✅ Successfully updated lessons 41-43 in Render database!")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error updating lessons: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    update_lessons()
