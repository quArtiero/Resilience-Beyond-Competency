#!/usr/bin/env python3
"""
Standalone script to deploy Lesson 6 to Render production database
Run this directly in the Render API shell
"""

import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Lesson 6 content
LESSON_6_CONTENT = {
    'id': 25,
    'module_number': 2,
    'order': 10,
    'title': 'Social Skills: Clear, Kind, Direct Communication',
    'slug': 'social-skills-clear-kind-direct',
    'is_published': True,
    'story': """## Bridge from Lesson 5

You learned to make others feel accurately understood (LRL/3 Hats/EAR).

Now we turn understanding into movement: **feedback, requests, boundaries, decisions, and repair—delivered clear + kind + direct.**

## The Science of Clear Communication

### Your Brain on Ambiguity

Research from MIT shows that ambiguous communication activates the anterior cingulate cortex—the same region that processes physical pain. Unclear messages literally hurt.

**The Cognitive Load Problem:**
- Working memory holds 7±2 items
- Under stress, this drops to 3-4 items
- Vague communication uses all slots just parsing meaning
- Clear communication leaves room for problem-solving

**The Clarity Dividend:**
Studies show that clear communicators are:
- 40% more likely to be promoted (Harvard Business Review)
- 2x more likely to have requests accepted (Google internal data)
- 3x faster at resolving conflicts (MIT Sloan)

## What "Clear, Kind, Direct" Really Means

### The Trinity Framework

**Clear** = Observable facts + Crisp requests + Single owner + Specific time/metric

**Kind** = Respect the human (tone, brevity, no blame) + Name shared purpose

**Direct** = Say the thing—no hedging, no sarcasm, no "hinting"

### What It's NOT:
- ❌ **Sugarcoating**: Diluting the message until it's meaningless
- ❌ **Long speeches**: Burying the point in context
- ❌ **Vague asks**: "Be better" / "Try harder" / "Soon"
- ❌ **Nice avoidance**: Not saying anything to avoid discomfort

**Your One-Liner:** *"Caring is clarity. Confusion is unkind."*

## The Neuroscience of Directness

### Why We Hedge (And Why to Stop)

The brain's threat detection system makes us hedge:
1. **Fear of rejection** → We soften requests → They become unclear
2. **Fear of conflict** → We hint instead of state → Message gets missed
3. **Fear of judgment** → We over-explain → Key point gets lost

**The Direct Communication Advantage:**
- Reduces cortisol in both speaker and listener
- Activates problem-solving networks faster
- Builds trust through predictability

## The Communication Toolkit (With Research)

### Tool 1: SBI + Request (Stanford's Feedback Model)

**The Formula:**
- **Situation** (fact, where/when) → 
- **Behavior** (what, not why) → 
- **Impact** (on work/team/customer) → 
- **Request** (specific, doable, dated, metric)

**Why SBI Works:**
- Situation grounds in shared reality (reduces defensiveness)
- Behavior stays observable (prevents mind-reading arguments)
- Impact connects to purpose (motivates change)
- Request gives clear next step (enables action)

**Full Example:**
"In yesterday's review (S), the handoff came after 6pm (B), which blocked QA from testing before their standup (I). Request: Run a 24-hr precheck at 3pm for the next 3 days; success = all three on time; review Friday at 10am."

**Common SBI Mistakes:**
- Using "always/never" (triggers defense)
- Explaining motives (creates arguments)
- Vague impacts ("it's bad")
- Open-ended requests ("do better")

### Tool 2: NVC-Lite (Nonviolent Communication, Simplified)

**The OFNR Model:**
- **Observation** (no judgment)
- **Feeling** (1-2 words)
- **Need** (clarity/time/fairness)
- **Request** (specific)

**Keep it ≤25 words total.**

**Example:**
"When specs change same-day (O), I feel rushed (F) and need predictability (N). Request: Lock specs by noon; changes after = next sprint."

**Why Feelings Matter (Neuroscience):**
- Naming emotions reduces amygdala activity by 50%
- Creates psychological safety for the listener
- Prevents emotional contagion in teams

### Tool 3: EAR → Micro-Test (Decision Framework)

Building on Lesson 5's empathy work:

**Empathy** → **Acknowledge** constraint/difference → **Reframe** to purpose + 48-hour test with review

**Example:**
"I see the board needs a win this week (E). I'm constrained by our testing pipeline (A). If the purpose is demonstrating progress, can we ship Feature A only for 48h and measure engagement, then decide on B-D at Friday's review?"

**Why Micro-Tests Win:**
- Lower commitment = lower resistance
- Data beats debate
- Creates learning loops
- Builds "experiment culture"

### Tool 4: No + Option (Boundary with Path Forward)

**The Formula:**
"I can't X by date, and I can do Y by earlier date or Z by original date. Which serves the purpose?"

**Psychology of No + Option:**
- "No" alone triggers loss aversion
- Options restore sense of control
- Purpose connection maintains alignment

**Example:**
"I can't add the animation by Friday, and I can ship with static images Thursday or animated version next Tuesday. If the purpose is user testing, which works?"

### Tool 5: Decision Recap (Lock It Down)

**Template:**
"Decided: owner → action → date → metric. Risks we accept: __. Review: __."

**Why Recaps Matter:**
- 60% of decisions get "re-litigated" without documentation
- Written commitments increase follow-through by 3x
- Prevents "I thought you meant..." conversations

**Example:**
"Decided: Sarah → Ship v1 without auth → Wed 15:00 → Success = 100 beta signups. Risks accepted: Manual user creation. Review: Thu standup."

### Tool 6: Clear Repair (After Conflict)

**The 4-Part Structure:**
1. **Impact**: "I [specific behavior]; that caused [specific impact]"
2. **Intent**: "My intent was [positive goal], not [negative interpretation]"
3. **Repair**: "Going forward, I'll [specific new behavior]"
4. **Request**: "Okay if we try that? / What else do you need?"

**Example:**
"Impact: I interrupted you three times in the meeting; that undercut your expertise in front of the team. Intent: I wanted to keep us on time, not dismiss your ideas. Repair: Next meeting I'll use the hand-raise feature and wait. Request: Does that work, or would you prefer something else?"

**Why Repair Works:**
- Acknowledging impact validates their experience
- Sharing intent prevents villainization
- Specific repair shows commitment
- Request creates collaboration

## Tone Calibration (The 38% of Communication)

### Written Communication:
- **Sentence length**: ≤15 words for key points
- **Present tense**: Creates immediacy
- **Numbers over adjectives**: "3 bugs" not "several issues"
- **Active voice**: "I will" not "It will be"

### Verbal Communication:
- **Pace**: 10% slower when delivering feedback
- **Pitch**: Lower by one note (calming)
- **Pauses**: 2 seconds after key points
- **Volume**: Consistent (no trailing off)

## The Channel-Message Matrix

### When to Use Which Channel:

**Face-to-Face / Video:**
- Performance feedback
- Conflict repair
- Emotional conversations
- Complex decisions

**Written (Email/Slack):**
- Decision recaps
- Simple requests
- Praise
- Process updates

**Never in Writing:**
- Terminations
- Major conflicts
- Emotional processing
- Criticism without prior discussion

## Common Pitfalls (And How to Avoid)

1. **The Compliment Sandwich**
   - Problem: People only hear the negative
   - Solution: Separate praise and feedback conversations

2. **The Hint Drop**
   - Problem: Hoping they'll figure it out
   - Solution: State directly what you need

3. **The Kitchen Sink**
   - Problem: Bringing up everything at once
   - Solution: One issue per conversation

4. **The Mind Reader Expectation**
   - Problem: "They should know"
   - Solution: State expectations explicitly

5. **The Retroactive Standard**
   - Problem: Judging by unstated criteria
   - Solution: Share standards before work begins

## Measurement: Making Communication Visible

Track TWO metrics for 7 days:

**Output Metrics:**
- **Acceptance rate**: % of your requests accepted first ask
- **Response time**: Hours to get clear yes/no
- **Decision latency**: Hours from proposal to decision
- **Message efficiency**: % of messages ≤5 lines
- **Recap completeness**: % with owner/date/metric
- **Repair success**: % of conflicts resolved in one attempt

**Why Measure:**
- What gets measured gets mastered
- Creates feedback loops
- Identifies patterns
- Proves progress

## The Business Case for Clear Communication

**Research Findings:**
- Unclear communication costs companies $62.4M/year (SIS International)
- 70% of errors trace to communication failures (CRICO Strategies)
- Clear communicators earn 10% more over careers (LinkedIn data)
- Teams with clear communication protocols are 25% more productive (McKinsey)

---

*"The single biggest problem in communication is the illusion that it has taken place." - George Bernard Shaw*

*"Be sincere; be brief; be seated." - Franklin D. Roosevelt*

Ready to practice? Let's make every word count.""",
    
    'reflection': """## Your Communication Practice Lab

### 🎯 How This Works

We'll practice the 6 core communication tools from the theory section. Each drill takes 5-10 minutes.

**Your Practice Path:**
1. **Transform harsh feedback** → Clear + Kind + Direct
2. **Convert vague asks** → Specific requests
3. **Set boundaries** → With alternatives
4. **Repair relationships** → After conflict
5. **Master async communication** → Email/Slack templates

---

## Practice 1: Harsh → Clear-Kind-Direct

### 📝 The Context

We all receive (and sometimes give) harsh feedback. The difference between professionals and amateurs? Professionals can transform spiky messages into productive conversations.

**Your Task:** Rewrite 5 common harsh statements using the SBI + Request formula you learned.

**Why This Matters:** 73% of employees say harsh feedback makes them disengage. Clear feedback increases performance by 39% (Gallup).

<sbi-rewriter>

---

## Practice 2: Vague → Specific Requests

### ⏱️ The 90-Second Challenge

Vague requests are productivity killers. They create confusion, delays, and frustration.

**Your Task:** Convert 5 vague asks into specific requests in 90 seconds each. Include owner, action, date, metric, and review.

**Success Looks Like:** "You → Build 6-slide draft → Wed 14:00 → 3 alternatives + 1 recommendation → Review Thu 9:30"

<request-builder>

---

## Practice 3: Boundaries Without Burnout

### 🛡️ The No + Option Formula

Saying "no" feels harsh. Saying "yes" to everything leads to burnout. The solution? No + Option.

**Your Task:** Practice setting boundaries while maintaining relationships. Write No + Option responses for 5 common scenarios.

**Remember:** Always tie your alternatives to the shared purpose.

<no-option-practice>

---

## Practice 4: Repair After Conflict

### 💔→❤️ The Clear Repair Process

Conflict happens. What matters is how quickly and effectively you repair.

**Your Task:** Build repair scripts for 5 common workplace conflicts. Then practice one out loud for 30 seconds.

**The Formula:** Impact → Intent → Repair → Request

<clear-repair-workshop>

---

## Practice 5: Async Excellence

### 📧 Master Email/Slack Communication

Async communication is 60% of modern work. Yet most people never practice it deliberately.

**Your Task:** Build templates for feedback, decisions, escalation, and praise. Then rewrite a real "hot thread" from your work.

**Goal:** Every message ≤5 lines, with clear next steps.

<async-templates>

---

## Integration & Commitment

### 🎯 Lock in Your Learning

Now that you've practiced each tool, it's time to commit to using them in real life.

<communication-commitment>""",
    
    'challenge': """## Your Communication Challenge

### 🚀 From Practice to Performance

You've learned the theory. You've practiced the tools. Now let's apply them to real-world scenarios.

**This Challenge Has 3 Parts:**
1. **Test your skills** with realistic communication cases (15 min)
2. **Build your protocol** - your personal communication OS (10 min)
3. **Track your progress** over the next 7 days (5 min/day)

---

## Part 1: Real-World Cases

### 🎭 Test Your Communication Skills

**The Situation:** You'll face 5 communication challenges that professionals encounter weekly.

**Your Goal:** Choose the best response or write your own. See how your approach compares to optimal solutions.

**What You'll Practice:**
- Giving feedback to peers
- Managing scope creep
- Setting boundaries with stakeholders
- Resolving family/work conflicts
- Leading study groups or teams

<communication-case-simulator>

---

## Part 2: Your Communication OS

### 🛠️ Build Your Operating System

**Why This Matters:** Having default scripts and protocols reduces decision fatigue and increases consistency.

**What You'll Create:**
- Your core communication scripts
- Channel preferences (what goes where)
- Response time commitments
- Escalation protocols
- Your 3 personal communication rules

**Time Investment:** 10 minutes now saves 10 hours of confusion later.

<communication-protocol-builder>

---

## Part 3: The 7-Day Sprint

### 📊 Track and Improve

**The Challenge:** Use your new communication tools for 7 days and track the results.

**What to Track (pick 2):**
- Request acceptance rate
- Response time to your clear asks
- Decision latency
- Message efficiency (≤5 lines)
- Repair success rate

**Daily Time:** 5 minutes to log + reflect

<communication-tracker>

---

## Your Exit Commitment

### ✍️ Lock in Your Next Actions

Before you leave, commit to specific actions you'll take in the next 48 hours.

<communication-exit-commitment>""",
    
    'quiz': '{"questions":[{"id":1,"type":"multiple_choice","text":"Best structure for feedback here is...","options":["Feelings first, long story later","SBI (Situation-Behavior-Impact) + a specific Request","Advice + motivation","Public call-out"],"correct":1,"explanation":"Facts → impact → clear request wins. SBI keeps feedback objective and actionable."},{"id":2,"type":"multiple_choice","text":"A strong request must include...","options":["Polite wording only","Owner, action, date/time, metric, review","Vibes","Emojis"],"correct":1,"explanation":"Specificity drives acceptance. Clear ownership and metrics prevent confusion."},{"id":3,"type":"multiple_choice","text":"Which line is a No + Option?","options":["I can\'t.","I can\'t add B by Friday, and I can ship a clickable mock by Thursday or full B next sprint—what serves the purpose?","Maybe later.","Ask someone else."],"correct":1,"explanation":"Boundary + alternatives tied to purpose. Gives control back to requester."},{"id":4,"type":"multiple_choice","text":"Clear Repair starts with...","options":["Explaining your reasons in detail","Owning specific impact","Asking them to calm down","Changing the subject"],"correct":1,"explanation":"Own impact → intent → repair → request. Validation before explanation."},{"id":5,"type":"multiple_choice","text":"Best closer for decisions in writing:","options":["Let\'s sync.","Decided: owner → action → date → metric. Review: ___.","Okay cool.","Circling back."],"correct":1,"explanation":"Recap cements accountability. Prevents re-litigation of decisions."}]}'
}

async def deploy_lesson6():
    """Deploy Lesson 6 to Render production database"""
    
    # Create engine
    engine = create_async_engine(DATABASE_URL, echo=True)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        try:
            # First check if lesson exists
            result = await session.execute(
                text("SELECT id, title FROM lesson WHERE id = 25")
            )
            existing = result.fetchone()
            
            if existing:
                print(f"Lesson 25 already exists: {existing[1]}")
                print("Updating content...")
                
                # Update existing lesson
                await session.execute(
                    text("""
                        UPDATE lesson 
                        SET title = :title,
                            slug = :slug,
                            story = :story,
                            reflection = :reflection,
                            challenge = :challenge,
                            quiz = :quiz,
                            module_number = :module_number,
                            "order" = :order,
                            is_published = :is_published,
                            updated_at = NOW()
                        WHERE id = :id
                    """),
                    LESSON_6_CONTENT
                )
                print("Lesson 25 updated successfully!")
            else:
                print("Creating new Lesson 25...")
                
                # Create new lesson
                await session.execute(
                    text("""
                        INSERT INTO lesson (
                            id, module_number, "order", title, slug,
                            story, reflection, challenge, quiz,
                            is_published, created_at, updated_at
                        ) VALUES (
                            :id, :module_number, :order, :title, :slug,
                            :story, :reflection, :challenge, :quiz,
                            :is_published, NOW(), NOW()
                        )
                    """),
                    LESSON_6_CONTENT
                )
                print("Lesson 25 created successfully!")
            
            await session.commit()
            
            # Verify the update
            result = await session.execute(
                text("""
                    SELECT id, module_number, title, 
                           LENGTH(story) as story_len, 
                           LENGTH(reflection) as reflection_len,
                           LENGTH(challenge) as challenge_len
                    FROM lesson 
                    WHERE id = 25
                """)
            )
            lesson = result.fetchone()
            if lesson:
                print(f"\n✅ Verified: Lesson {lesson[0]} - {lesson[2]}")
                print(f"   Module: {lesson[1]}")
                print(f"   Story: {lesson[3]} chars")
                print(f"   Reflection: {lesson[4]} chars")
                print(f"   Challenge: {lesson[5]} chars")
            
        except Exception as e:
            print(f"Error: {e}")
            await session.rollback()
            raise
        finally:
            await engine.dispose()

# Run the deployment
asyncio.run(deploy_lesson6())
