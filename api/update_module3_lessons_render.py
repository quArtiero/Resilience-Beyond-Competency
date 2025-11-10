#!/usr/bin/env python3
"""
Update Module 3 lessons (39-43) content in Render database
"""

import psycopg2
from psycopg2.extras import Json
import os

# Render PostgreSQL connection with SSL
DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require')

def update_lessons():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Lesson 39: Barriers & Biases: Why Flexibility Fails
    lesson_39 = {
        "story": """# Barriers & Biases: Why Flexibility Fails

## The Invisible Chains

Sarah stared at the email, her jaw clenched. "Of course Mark would suggest that approach. He always thinks his way is the only way."

Her colleague Ben raised an eyebrow. "Actually, I think he might have a point about—"

"No," Sarah cut him off. "I've been doing this for 15 years. I know what works."

Later that day, Sarah's project hit another roadblock—the third this week. As she stayed late again, fixing problems that seemed oddly familiar, a thought whispered at the edges of her consciousness: *What if I'm the one stuck?*

## The Architecture of Rigidity

Our brains are prediction machines, constantly creating shortcuts to help us navigate complexity. These shortcuts—our cognitive biases—usually serve us well. But sometimes they become prison bars we can't even see.

**The Big Five Flexibility Killers:**

**1. Confirmation Bias: The Echo Chamber Effect**
We seek information that confirms what we already believe and ignore what doesn't.
- *Example*: Reading only news sources that align with your views
- *Cost*: Missing critical information that could change your approach
- *The Tell*: You feel vindicated more often than surprised

**2. Sunk Cost Fallacy: The Quicksand Trap**
The more we invest in something, the harder it becomes to let go—even when it's clearly not working.
- *Example*: Staying in a failing project because you've already spent months on it
- *Cost*: Throwing good time after bad
- *The Tell*: "But I've already put so much into this..."

**3. Functional Fixedness: The Hammer Problem**
When all you have is a hammer, everything looks like a nail. We get stuck seeing tools and solutions in only one way.
- *Example*: Always using meetings to solve problems, even when an email would suffice
- *Cost*: Inefficiency and missed innovative solutions
- *The Tell*: "This is how we've always done it"

**4. Availability Heuristic: The Recent Memory Trap**
We overweight recent or memorable events when making decisions.
- *Example*: Avoiding all risks after one failure
- *Cost*: Overcorrection and missed opportunities
- *The Tell*: One bad experience dictates all future decisions

**5. Attribution Errors: The Blame Game**
We attribute our failures to circumstances but others' failures to their character.
- *Example*: "I was late because of traffic; they were late because they're disorganized"
- *Cost*: Damaged relationships and missed learning
- *The Tell*: Different standards for self vs. others

## The Flexibility Assessment

Rate yourself honestly (1-5 scale):

**Cognitive Flexibility Indicators:**
- I can argue both sides of an issue convincingly: _____
- I change my mind when presented with better evidence: _____
- I seek out perspectives that challenge my views: _____
- I can find multiple solutions to problems: _____
- I adapt quickly when plans change: _____

**Rigidity Warning Signs:**
- I get frustrated when people don't see things my way: _____
- I have strong opinions about the "right" way to do things: _____
- I avoid situations where I might be wrong: _____
- I replay arguments in my head, perfecting my points: _____
- I feel personally attacked when my ideas are questioned: _____

*Score interpretation:*
- Flexibility score < 15: Significant growth opportunity
- Rigidity score > 15: Time for pattern interruption

## The Biology of Bias

Your brain's resistance to flexibility isn't a character flaw—it's biology. Understanding the science helps you hack the system:

**The Neural Rut Problem**
Every time you think a thought or perform an action, you strengthen that neural pathway. After enough repetition, your brain defaults to these paths automatically—like water flowing down a well-worn channel.

**The Amygdala Hijack**
When your ideas are challenged, your amygdala (threat detection center) activates before your prefrontal cortex (rational thinking center) can evaluate the information. You literally feel attacked before you can think clearly.

**The Cognitive Load Factor**
Flexibility requires more mental energy than rigidity. When we're tired, stressed, or overwhelmed, we default to our most practiced patterns—even when we know they're not optimal.

## Breaking Free: The Flexibility Workout

**Exercise 1: The Belief Flip** (2 minutes)
1. Write down something you strongly believe: _____
2. Now argue against it convincingly: _____
3. Find one valid point in the opposition: _____

**Exercise 2: The Three Whys** (3 minutes)
Think of a problem you're facing:
1. Why might my current approach not be working? _____
2. Why might the opposite approach work better? _____
3. Why might a completely different frame be needed? _____

**Exercise 3: The Perspective Carousel** (5 minutes)
For any decision you're facing, view it through three lenses:
- **The Critic**: What could go wrong? _____
- **The Optimist**: What could go right? _____
- **The Realist**: What will probably happen? _____

## The Paradox of Expertise

Here's the uncomfortable truth: **The more expert you become, the more vulnerable you are to rigidity.**

Expertise creates:
- **Pattern recognition** that speeds decisions but limits options
- **Confidence** that reduces questioning
- **Investment** in specific approaches
- **Identity** tied to what you know

The antidote? **Beginner's Mind**—approaching familiar situations as if encountering them for the first time.

## Sarah's Breakthrough

Three weeks after that late night, Sarah tried something different. When Mark suggested his approach in the next meeting, instead of dismissing it, she said, "Help me understand your thinking."

What followed surprised her. Mark's idea wasn't perfect, but it contained a insight she'd missed. By combining his fresh perspective with her experience, they created a solution neither could have reached alone.

The project that had been stalled for weeks suddenly jumped forward.

That night, Sarah didn't stay late. As she packed up, she thought about all the times her "15 years of experience" had been one year repeated 15 times. The thought didn't sting like she expected. Instead, it felt like freedom.

## Your Flexibility Practice

This week, catch yourself in one bias per day:
- **Monday**: Notice confirmation bias - seek one opposing view
- **Tuesday**: Spot sunk cost thinking - let go of something not working
- **Wednesday**: Break functional fixedness - use a tool differently
- **Thursday**: Question availability bias - look beyond recent events
- **Friday**: Catch attribution errors - apply same standards to all

Remember: **Flexibility isn't about having no opinions. It's about holding them lightly enough to evolve.**""",

        "reflection": """# Reflection: Your Rigidity Map

## Part 1: Bias Inventory

Which cognitive bias shows up most in your life?

**In your work:**
- Most common bias: _____
- How it manifests: _____
- What it costs you: _____

**In your relationships:**
- Most common bias: _____
- How it manifests: _____
- What it costs you: _____

**In your self-development:**
- Most common bias: _____
- How it manifests: _____
- What it costs you: _____

## Part 2: The Expertise Trap

Where has your expertise become a liability?

**Areas where you're "expert":**
1. _____
2. _____
3. _____

For each area, identify:
- One assumption you never question: _____
- One approach you always use: _____
- One perspective you dismiss: _____

## Part 3: Your Flexibility Edge

**When are you MOST flexible?**
- Circumstances: _____
- People involved: _____
- Your state of mind: _____

**When are you LEAST flexible?**
- Circumstances: _____
- People involved: _____
- Your state of mind: _____

**Pattern recognition:** What determines whether you're open or closed? _____

## Part 4: The Cost Calculator

**What has rigidity cost you?**
- Missed opportunities: _____
- Damaged relationships: _____
- Repeated mistakes: _____
- Wasted time/energy: _____

**What could flexibility give you?**
- New possibilities: _____
- Stronger connections: _____
- Fresh solutions: _____
- Energy savings: _____

## Part 5: Your Bias Interruption Plan

Choose your top 3 biases to address:

**Bias 1:** _____
- Early warning sign: _____
- Interruption strategy: _____
- Accountability measure: _____

**Bias 2:** _____
- Early warning sign: _____
- Interruption strategy: _____
- Accountability measure: _____

**Bias 3:** _____
- Early warning sign: _____
- Interruption strategy: _____
- Accountability measure: _____

## Commitment

This week, I will catch myself in _____ (number) biases and practice _____ (specific flexibility technique) instead.

My flexibility mantra: _____""",

        "challenge": """# Challenge: The 5-Day Bias Detox

## Your Mission

For the next 5 days, you'll identify and interrupt one cognitive bias per day, replacing rigidity with flexibility in real-time.

## Daily Challenges

### Day 1 (Monday): Confirmation Bias Buster

**Morning Setup:**
- [ ] Choose one strong opinion you hold
- [ ] Find 3 credible sources that disagree
- [ ] Read them with genuine curiosity

**During the Day:**
- [ ] Catch yourself seeking confirming evidence
- [ ] Ask: "What would prove me wrong?"
- [ ] Find one valid point in opposition

**Evening Review:**
- What did you discover? _____
- How did it feel to be wrong? _____
- What will you reconsider? _____

### Day 2 (Tuesday): Sunk Cost Liberation

**Morning Setup:**
- [ ] List 3 things you're holding onto
- [ ] Calculate the true cost of continuing
- [ ] Identify what you could do instead

**During the Day:**
- [ ] Let go of one thing not working
- [ ] Stop mid-task if it's not productive
- [ ] Redirect energy to something better

**Evening Review:**
- What did you release? _____
- How much energy did you save? _____
- What opened up? _____

### Day 3 (Wednesday): Functional Fixedness Breaker

**Morning Setup:**
- [ ] Pick 3 routine tasks
- [ ] Brainstorm alternative approaches
- [ ] Commit to trying one new way

**During the Day:**
- [ ] Use a familiar tool differently
- [ ] Solve a problem with an unusual resource
- [ ] Combine two unrelated ideas

**Evening Review:**
- What new approach worked? _____
- What surprised you? _____
- What will you keep? _____

### Day 4 (Thursday): Availability Heuristic Reset

**Morning Setup:**
- [ ] Identify your most recent failure
- [ ] List 10 other relevant experiences
- [ ] Reweight the recent vs. historical

**During the Day:**
- [ ] Make one decision based on data, not memory
- [ ] Question catastrophic thinking
- [ ] Look for base rates, not anecdotes

**Evening Review:**
- Where was recency bias affecting you? _____
- What pattern did you break? _____
- What decision improved? _____

### Day 5 (Friday): Attribution Error Repair

**Morning Setup:**
- [ ] Think of someone who frustrated you recently
- [ ] List 3 situational factors affecting them
- [ ] Apply the same compassion to yourself

**During the Day:**
- [ ] Give others benefit of the doubt
- [ ] Own your mistakes without excuses
- [ ] Apply one standard to all

**Evening Review:**
- Whose story did you reconsider? _____
- What relationship improved? _____
- Where were you unfair to yourself? _____

## The Integration Challenge

### Weekend Synthesis

**Saturday: The Bias Museum**
Create a "museum" of your biases:
- [ ] Name each bias like an exhibit
- [ ] Write its "history" in your life
- [ ] Create its "retirement plaque"

**Sunday: The Flexibility Field Test**
- [ ] Enter a situation where you're usually rigid
- [ ] Apply all 5 bias interruptions
- [ ] Document what happens

## Tracking Your Progress

Rate each day (1-10):
- **Awareness**: How quickly did you catch biases?
- **Interruption**: How effectively did you stop them?
- **Flexibility**: How well did you pivot?
- **Learning**: What new insights emerged?

## The Flexibility Scorecard

**Before the Challenge:**
- Biases caught per day: _____
- Time to recognize rigidity: _____
- Flexibility response rate: _____

**After the Challenge:**
- Biases caught per day: _____
- Time to recognize rigidity: _____
- Flexibility response rate: _____

## Your Bias-Breaking Toolkit

**The Pattern Interrupt Questions:**
1. "What am I not seeing?"
2. "How could I be wrong?"
3. "What would [person I respect] do?"
4. "What's the opposite approach?"
5. "What evidence would change my mind?"

**The Flexibility Phrases:**
- "Help me understand..."
- "I might be wrong, but..."
- "What if we tried..."
- "I used to think X, now I think Y"
- "You've changed my mind about..."

## Bonus Challenge: The Perspective Partner

Find someone who thinks differently than you:
- [ ] Share your biggest bias
- [ ] Ask them to call you out
- [ ] Return the favor for them
- [ ] Check in daily this week

## Your Commitment

I commit to interrupting _____ biases this week.

My accountability partner: _____

My reward for completing all 5 days: _____

The person who will benefit most from my increased flexibility: _____

Remember: **Every bias you break is a door you open. Every rigid thought you soften is a possibility you create.**

*Start tomorrow. Start with curiosity. Start with the question: "What if I'm wrong?"*"""
    }

    # Lesson 40: Tools for Reframing
    lesson_40 = {
        "story": """# Tools for Reframing

## The Frame Shop

Marcus sat in the airport, flight delayed for the third time. Around him, fellow passengers fumed, complained, made angry phone calls. But Marcus was smiling, typing intently on his laptop.

"How are you so calm?" asked the agitated woman next to him.

Marcus looked up. "Oh, I'm not calm. I'm excited. I just got three unexpected hours to work on my novel. I haven't had uninterrupted writing time in months."

The woman blinked. "But... we're stuck."

"Are we stuck, or are we gifted time?" Marcus asked. "Same delay, different frame."

## The Power of the Frame

Reality is neutral. A delay is just time. A setback is just a change. A conflict is just a difference. It's the frame we put around these events that creates our experience.

**What is a frame?**
A frame is the mental structure we use to interpret situations. It determines:
- What we notice (and what we ignore)
- How we feel about what happens
- What actions seem possible
- What outcomes we expect

Change the frame, change everything.

## The Master Reframing Toolkit

### Tool #1: The Zoom Lens
**Zoom Out**: See the bigger picture
**Zoom In**: Focus on specific details

**Example**: Lost your job
- Zoomed in: "I'm a failure"
- Zoomed out: "Career transitions happen every 4-5 years on average"
- Reframe: "I'm joining millions navigating career evolution"

**Practice**: Current challenge: _____
- Zoomed in view: _____
- Zoomed out view: _____
- New perspective: _____

### Tool #2: The Time Machine
**Fast Forward**: How will this matter in 5 years?
**Rewind**: What would past-you think of this?

**Example**: Embarrassing presentation mistake
- In 5 years: "That thing I barely remember"
- 5 years ago: "Future me is actually presenting!"
- Reframe: "A milestone in my growth journey"

**Practice**: Current worry: _____
- In 5 years: _____
- 5 years ago perspective: _____
- New frame: _____

### Tool #3: The Role Reversal
Step into different shoes to see new angles.

**Example**: Team conflict over project direction
- As the CEO: "Which approach drives company goals?"
- As the customer: "Which solution solves my problem?"
- As a competitor: "I hope they waste time arguing"
- Reframe: "We have multiple viable options—a good problem"

**Practice**: Current conflict: _____
- As your boss: _____
- As your client: _____
- As your mentor: _____
- New understanding: _____

### Tool #4: The Meaning Maker
Transform problems into purposes.

**The Formula**: "This is happening FOR me because..."

**Example**: Chronic health issue
- Old frame: "Why is this happening TO me?"
- New frame: "This is happening FOR me because..."
  - It's teaching me resilience
  - It's connecting me with others who struggle
  - It's forcing me to prioritize what matters
- Result: Victim → Student

**Practice**: Your struggle: _____
- This is happening FOR me because: _____
- The lesson is: _____
- The gift is: _____

### Tool #5: The Both/And Bridge
Replace "either/or" with "both/and."

**Example**: Work-life balance
- Either/or: "I can either succeed at work OR be a good parent"
- Both/and: "I can both build my career AND be present for my family"
- Bridge: "Success at work means modeling ambition for my kids"

**Practice**: Your either/or dilemma: _____
- Both/and possibility: _____
- The bridge between them: _____

### Tool #6: The Question Flip
Transform statements into curious questions.

**Example**: "This will never work"
- Flip: "What would need to be true for this to work?"
- Opens: Possibility thinking and problem-solving

**Power Questions**:
- "This is impossible" → "How might this be possible?"
- "They don't understand" → "What am I not understanding about them?"
- "I can't do this" → "What support would I need to do this?"
- "This is a disaster" → "What opportunity hides in this chaos?"

**Practice**: Your limiting statement: _____
- Flipped to question: _____
- New possibilities: _____

## The Reframe Generator

When stuck, run through this sequence:

1. **Facts Only**: What happened, without interpretation?
2. **Current Frame**: What story am I telling?
3. **Emotional Check**: How does this frame make me feel?
4. **Alternative Frames**: What else could be true?
5. **Most Useful Frame**: Which interpretation serves me best?
6. **Action Path**: What does this frame make possible?

## The Science of Successful Reframing

Research shows effective reframes share three qualities:

**1. Plausibility**: It could actually be true
- Bad reframe: "Getting fired is the best thing ever!"
- Good reframe: "This forces me to pursue what I really want"

**2. Actionability**: It suggests next steps
- Bad reframe: "Everything happens for a reason"
- Good reframe: "This challenge is building specific skills I need"

**3. Empowerment**: It restores agency
- Bad reframe: "Others have it worse"
- Good reframe: "I have more resources than I realized"

## Marcus's Master Class

As the delay stretched to four hours, Marcus noticed the angry woman was now crying. He gently offered her a tissue.

"My daughter's recital..." she whispered. "I'm going to miss it."

Marcus thought for a moment. "That's heartbreaking. And... what if your daughter remembers not that you missed it, but how you handled missing it? What if you model for her that sometimes life disrupts our plans, but love finds a way?"

The woman looked up. "What do you mean?"

"Could you FaceTime during the recital? Send her a video message she can keep forever? Plan a special private recital just for you when you get home?"

The woman's tears slowed. She pulled out her phone, not to complain, but to create. "My own private recital," she murmured, a small smile forming.

## Your Daily Reframing Practice

**Morning Frame Setting** (2 minutes):
- Today's probable challenge: _____
- Default frame: _____
- Chosen frame: _____
- This frame enables: _____

**Midday Frame Check** (1 minute):
- What frame am I operating in? _____
- Is it serving me? _____
- Better frame available? _____

**Evening Frame Review** (3 minutes):
- Today's biggest challenge: _____
- Frame I used: _____
- Frame I wish I'd used: _____
- Tomorrow I will remember: _____

## The Frame Master's Creed

"I don't control what happens to me. I control the frame I put around it. Every frame is a choice. Every choice is power. Today, I choose frames that empower, enable, and elevate. I am not at the mercy of circumstances. I am the artist of my experience."

Remember: **You can't always choose what happens, but you can always choose what it means.**""",

        "reflection": """# Reflection: Your Framing Patterns

## Part 1: Frame Audit

**Your Default Frames**

In challenges, you typically frame them as:
- [ ] Tests to pass
- [ ] Problems to solve
- [ ] Punishments to endure
- [ ] Opportunities to grow
- [ ] Random events
- [ ] Lessons to learn
- [ ] Other: _____

In conflicts, you typically see:
- [ ] Winners and losers
- [ ] Misunderstandings to clear
- [ ] Battles to win
- [ ] Perspectives to understand
- [ ] Power struggles
- [ ] Collaboration opportunities
- [ ] Other: _____

In setbacks, you usually think:
- [ ] "Why me?"
- [ ] "What's next?"
- [ ] "This always happens"
- [ ] "What's the lesson?"
- [ ] "It's not fair"
- [ ] "How interesting"
- [ ] Other: _____

## Part 2: Frame Impact Analysis

**Your Most Limiting Frame**:
- Situation where you use it: _____
- The frame itself: _____
- How it limits you: _____
- What it costs: _____

**Your Most Empowering Frame**:
- Situation where you use it: _____
- The frame itself: _____
- How it helps you: _____
- What it creates: _____

## Part 3: Reframing Opportunities

List three situations you could reframe:

**Situation 1**: _____
- Current frame: _____
- Alternate frame 1: _____
- Alternate frame 2: _____
- Most useful frame: _____

**Situation 2**: _____
- Current frame: _____
- Alternate frame 1: _____
- Alternate frame 2: _____
- Most useful frame: _____

**Situation 3**: _____
- Current frame: _____
- Alternate frame 1: _____
- Alternate frame 2: _____
- Most useful frame: _____

## Part 4: The Reframe That Changed Everything

Think of a time when changing your perspective changed your life:
- The situation: _____
- Original frame: _____
- New frame: _____
- What shifted: _____
- The outcome: _____

What made this reframe so powerful? _____

## Part 5: Your Reframing Edge

**You're BEST at reframing when**:
- Emotional state: _____
- Type of situation: _____
- Time of day: _____
- People involved: _____

**You STRUGGLE to reframe when**:
- Emotional state: _____
- Type of situation: _____
- Time of day: _____
- People involved: _____

## Part 6: Building Your Reframe Reflex

**Which tool resonates most?**
- [ ] The Zoom Lens
- [ ] The Time Machine
- [ ] The Role Reversal
- [ ] The Meaning Maker
- [ ] The Both/And Bridge
- [ ] The Question Flip

**Your implementation plan**:
- I will practice _____ (tool) 
- In situation: _____
- Daily at: _____ (time)
- Success looks like: _____

## Your Reframing Commitment

This week, I will catch and reframe _____ limiting perspectives.

My accountability partner: _____

My reframing mantra: _____""",

        "challenge": """# Challenge: The 7-Day Reframe Revolution

## Your Mission

Transform one major life area by systematically reframing it over 7 days. Watch how changing your perspective changes your reality.

## Choose Your Revolution Area

Pick the area that most needs transformation:
- [ ] Career/Work
- [ ] Relationships
- [ ] Health/Body
- [ ] Money/Resources
- [ ] Personal Growth
- [ ] Family Dynamics

Your chosen area: _____

## The 7-Day Journey

### Day 1: The Current Frame Forensics

**Morning Investigation**:
Document your current frame about this area:
- The story you tell yourself: _____
- The story you tell others: _____
- The emotions this creates: _____
- The actions this drives: _____

**During the Day**:
- [ ] Notice when this frame activates
- [ ] Track what triggers it
- [ ] Record its impact on decisions

**Evening Analysis**:
- How many times did this frame appear? _____
- What did it cost you today? _____
- What did it prevent? _____

### Day 2: The Zoom Lens Experiment

**Morning**:
- Zoom out to 30,000 feet view: _____
- Zoom in to microscopic detail: _____
- Find the optimal zoom level: _____

**Application**:
- [ ] Use wide view in one conversation
- [ ] Use detailed view in one decision
- [ ] Find balance in one conflict

**Evening Insight**: 
What did changing focal length reveal? _____

### Day 3: The Time Travel Day

**Morning Journey**:
- How will this matter in 10 years? _____
- How would 10-year-ago you see this? _____
- What would 90-year-old you say? _____

**Real-Time Practice**:
- [ ] Make one decision from 10-year perspective
- [ ] Appreciate one thing past-you couldn't
- [ ] Act on wisdom from future-you

**Evening Wisdom**: 
What did time travel teach you? _____

### Day 4: The Perspective Party

**Morning Guest List**:
Whose perspective will you channel?
1. Someone you admire: _____
2. Someone very different: _____
3. Someone who overcame this: _____

**Perspective Practice**:
- [ ] Morning decision as person #1
- [ ] Afternoon challenge as person #2
- [ ] Evening reflection as person #3

**Integration**: 
Which perspective served you best? _____

### Day 5: The Meaning Maker Marathon

**Morning Formula**:
"This [challenge] is happening FOR me because..."
- Learning: _____
- Growth: _____
- Preparation: _____

**All-Day Application**:
- [ ] Find gift in morning frustration
- [ ] Find lesson in afternoon obstacle
- [ ] Find purpose in evening difficulty

**Evening Harvest**: 
What meanings transformed your day? _____

### Day 6: The Both/And Bridge Building

**Morning Architecture**:
Transform either/or to both/and:
- Old: Either _____ OR _____
- New: Both _____ AND _____
- Bridge: _____

**Bridge Crossing**:
- [ ] Take one both/and action
- [ ] Communicate one both/and decision
- [ ] Resolve one both/and conflict

**Evening Structure**: 
What became possible with both/and? _____

### Day 7: The Integration Installation

**Morning Synthesis**:
- Most powerful reframe from the week: _____
- The frame you're permanently adopting: _____
- Your new story about this area: _____

**Living the New Frame**:
- [ ] Tell someone your new perspective
- [ ] Make one decision from new frame
- [ ] Take one action previously impossible

**Evening Celebration**:
- Old frame (Day 1): _____
- New frame (Day 7): _____
- What's now possible: _____

## Daily Reframe Tracker

Rate each day (1-10):

| Day | Awareness | Flexibility | Empowerment | Action |
|-----|-----------|------------|-------------|---------|
| 1   | _____ | _____ | _____ | _____ |
| 2   | _____ | _____ | _____ | _____ |
| 3   | _____ | _____ | _____ | _____ |
| 4   | _____ | _____ | _____ | _____ |
| 5   | _____ | _____ | _____ | _____ |
| 6   | _____ | _____ | _____ | _____ |
| 7   | _____ | _____ | _____ | _____ |

## Your Reframe Revolution Results

**Measurable Changes**:
- Stress level: Before _____ After _____
- Action taken: Before _____ After _____
- Possibility seen: Before _____ After _____
- Energy level: Before _____ After _____

**Qualitative Shifts**:
- How you feel about this area: _____
- What you now believe possible: _____
- Actions you're ready to take: _____

## The 30-Day Extension

To lock in your new frame:

**Week 2**: Apply new frame to related areas
**Week 3**: Teach someone else to reframe
**Week 4**: Handle setback with master reframe

## Your Public Declaration

Write your reframe revolution statement:

"I used to believe _____, which caused _____. 

Now I choose to believe _____, which enables _____.

This reframe gives me power to _____."

Share this with: _____
By this date: _____

## The Reframe Ripple

Who else could benefit from your new perspective?
- Person 1: _____ needs reframe about: _____
- Person 2: _____ needs reframe about: _____
- Person 3: _____ needs reframe about: _____

Your commitment to share: _____

Remember: **Every reframe is a choice. Every choice is a vote for who you're becoming. Vote wisely. Vote often. Vote for possibility.**"""
    }

    # Continue with lessons 41-43...
    # (I'll continue in the next part due to length)
    
    try:
        # Update lesson 39
        cur.execute("""
            UPDATE lesson 
            SET story = %s, reflection = %s, challenge = %s
            WHERE id = 39
        """, (Json(lesson_39['story']), Json(lesson_39['reflection']), Json(lesson_39['challenge'])))
        print("✅ Updated Lesson 39")
        
        # Update lesson 40
        cur.execute("""
            UPDATE lesson 
            SET story = %s, reflection = %s, challenge = %s
            WHERE id = 40
        """, (Json(lesson_40['story']), Json(lesson_40['reflection']), Json(lesson_40['challenge'])))
        print("✅ Updated Lesson 40")
        
        conn.commit()
        print("\n✅ Successfully updated lessons 39-40 in Render database!")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error updating lessons: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    update_lessons()
