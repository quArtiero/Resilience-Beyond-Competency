#!/usr/bin/env python3
"""Deploy enhanced Lesson 39 content with interactive elements and beautiful design."""

import os
import sys
import json

# Enhanced content for Lesson 39
story_content = """# 🧠 Barriers & Biases: Why Flexibility Fails (and How to Fix It)

## Bridge from Lesson 2

In Lesson 2 we defined cognitive flexibility and the four pillars:
- **Frame Awareness**
- **Set-Shifting**
- **Perspective-Taking**
- **Option Laddering**
- **Sequencing** (as glue)

In this lesson we tackle the friction: stress, emotion, and bias loops that narrow thinking right when you need range.

## The Anatomy of Rigidity

### The Typical Loop Under Pressure

**Trigger → Threat appraisal → Narrowing → Overconfidence or Avoidance → Rigid tactic (repeat)**

- **Trigger:** deadline, uncertainty, criticism, resource loss
- **Threat appraisal:** "I'm losing control / I'll look wrong"
- **Narrowing:** attention tunnels; you cling to the first plan
- **Overconfidence/Avoidance:** double down or disengage
- **Rigid tactic:** insist on the old method; reject alternatives; stall

> 💡 **Key insight:** Flexibility isn't just a thinking skill—it's a state regulation skill. Calm body → clear mind → better options.

## Common Barriers & Biases

All of these shrink your option-space when you need it most:

### 1. Physiology & Load
- **Acute stress / "amygdala hijack":** fight/flight reactions narrow focus
- **Cognitive overload:** too many inputs; working memory saturated
- **Sleep debt & fatigue:** slows set-shifting and impulse control

### 2. Ego & Emotion
- **Ego defensiveness / shame:** "If I'm wrong, I'm lesser"
- **Fear of ambiguity:** craving certainty over accuracy
- **Status threat:** "Changing course makes me look weak"

### 3. Cognitive Biases
- **Confirmation bias:** seek data that agrees with you
- **Anchoring:** over-weight the first number/idea
- **Sunk cost fallacy:** "We've invested too much to change"
- **Status quo bias:** default to the current state
- **Loss aversion:** avoiding small certain losses over larger gains
- **Framing effect:** wording steers choices
- **Availability heuristic:** vivid recent examples dominate judgment

### 4. Social Dynamics
- **Groupthink / conformity / authority bias:** go with the room or the loudest title
- **Reputational risk:** "Suggesting Plan B will make waves"

### 5. Expertise Traps
- **Over-specialization:** "In my field, we always…"
- **Escalation of commitment:** success identity tied to one method

### 6. Environment
- **Time pressure:** urgency favors default scripts
- **Poor information architecture:** signal hidden in noise

## Barrier → Counter-Strategy Map

Use this as your **"bias interrupter" cheat sheet**. Each barrier links to an action that re-opens the option-space and plugs into the four pillars.

| **Barrier** | **What it does** | **Counter-strategy** | **Pillar it restores** |
|------------|-----------------|---------------------|----------------------|
| Acute stress / overload | Tunnels attention | 90-second reset (box/5-5 breathing), name the threat, then name the purpose | Frame Awareness |
| Ego defensiveness | Blocks new info | Steelman the opposing view in 2 sentences | Perspective-Taking |
| Confirmation bias | Cherry-picks data | Consider-the-opposite: list 2 facts that would make you wrong | Frame Awareness |
| Anchoring | Fixates on first value | Re-anchor with 2 independent references | Option Laddering |
| Sunk cost | Glues you to past effort | Pre-commit rule: "Only future costs/benefits count" | Set-Shifting |
| Status quo bias | Freezes change | Default swap: force a temporary new default for 48h | Set-Shifting |
| Loss aversion | Over-weights small losses | Two-sided tally: write explicit "cost of not switching" | Option Laddering |
| Groupthink | Silences dissent | Red team 10-minute critique; anonymous first pass | Perspective-Taking |
| Expertise trap | Overfits method | Beginner lens: explain to a novice; ask for 1 non-domain idea | Perspective-Taking |
| Time pressure | Rushes first plan | Decision triage: "Decide now vs. defer" gate + minimum viable test | Sequencing |

### 🫁 Breathing Tip
Inhale 4–5s, hold 1–2s, exhale 4–5s; repeat 5 cycles. No magic—just shifts arousal so you can think."""

reflection_content = """# 🎯 Drills & Practice

## Drill 1: Label → Loosen → Ladder (10–12 minutes)

**Goal:** Catch a bias in the act and pry it open.

### Instructions:

1. **Pick a live decision you're wrestling with**
2. **Label 2–3 barriers present** (from the Common Barriers list)
3. **Loosen with one matching counter-strategy** from the Barrier Map (do it right now: breathe, write the "opposite," swap the default, etc.)
4. **Ladder 3 fresh options** that still serve the purpose
5. **Choose one to test** in the next 24–48 hours; write a 1-line test plan

### Template (paste in notes):

**Decision:** _____

**Purpose:** _____

**Barriers:** _____

**Counter-moves used:** _____

**Option ladder:**
1. _____
2. _____
3. _____

**Quick test I'll run by:** [date/time] _____

## Drill 2: Steelman & Swap (8–10 minutes)

**Goal:** Train Perspective-Taking and reduce ego defensiveness.

### Instructions:

1. **Write your current stance** in 2–3 sentences: _____
2. **Now steelman the strongest opposing case** in 3–5 sentences (fair, evidence-based): _____
3. **Swap:** for 60 seconds, pretend you must present the opposing case to win a prize
4. **Extract 1 insight or risk you missed**; adjust your plan by 5–10%: _____

### Reflection (2 bullets):

- What did the other side reveal that your frame hid? _____
- What small adjustment improves your outcome with minimal cost? _____

## Personal Reflection

### Your Top Rigidity Triggers

Take a moment to identify your personal patterns:

1. **When do you notice yourself becoming most rigid?** _____
2. **What physical sensations accompany your narrowing?** _____
3. **Which biases show up most frequently for you?** _____

### Design Your Personal Counter-Strategy

Based on your patterns, create a personalized response plan:

- **My go-to reset technique:** _____
- **My perspective-expanding question:** _____
- **My option-generating prompt:** _____

## 🎯 Exit Ticket

### Quick Check (2 minutes):
1. **One Thing I Learned**: What's the most important insight from this lesson? _____
2. **One Thing I'll Apply**: What will you do differently tomorrow? _____
3. **One Question I Have**: What would you like to explore further? _____

### Confidence Check:
Rate your understanding (1-5): ⭐⭐⭐⭐⭐

### Next Step:
What's your immediate next action after this lesson? _____"""

challenge_content = """# 🚀 Mini Cases & Early Warning System

## Choose One Mini Case (6–8 minutes)

### Case A — Product Roadmap
Your team keeps a low-value feature because "we already built half of it."

**Likely biases:** sunk cost, status quo

**Counter-moves:** future-only rule; red-team 10 min; default swap (remove unless users demand)

**Your Task:** Write a 3-step plan to test whether it stays or goes.
1. _____
2. _____
3. _____

### Case B — Exam Strategy
You keep rereading notes despite low quiz scores.

**Biases:** anchoring on familiar method, availability (you remember rereading)

**Counter-moves:** re-anchor to retrieval practice data; 1-week AB test (half topics retrieval, half reread)

**Your Task:** Define success metric and cut-line.
- **Success metric:** _____
- **Cut-line (when to switch):** _____

### Case C — Vendor Negotiation
First quote anchors you; every counteroffer feels "lossy."

**Biases:** anchoring, loss aversion

**Counter-moves:** get 2 independent quotes; compute total cost of delay; reframe to long-run value

**Your Task:** Draft a 2-paragraph negotiation script using new anchors.

_____

_____

## Your Rigidity Early-Warning System (5 minutes)

### Signals you're narrowing:
- [ ] You argue louder instead of clearer
- [ ] You repeat "have to / can't" language
- [ ] You hide data that hurts your case
- [ ] Your body is amped (tight jaw, shallow breath)

### Design your interrupter:

**If-Then:** If I notice _____, then I will [reset: breathe ×5, restate purpose, generate 2 options] _____

**Place a cue:** sticky note "What's the purpose?" on monitor or phone lock screen

**Time-box:** 6-minute "consider-the-opposite" block before finalizing

## Exit Ticket (Journal, 2 minutes)

Complete:

1. **"My top rigidity trigger is _____."**
2. **"My If-Then interrupter will be: If I notice _____, then I will _____."**
3. **"One counter-strategy I will deploy this week: _____."**

## Homework (Sets up Lesson 4)

### 1. Bias Interrupter Card
Write a one-liner you'll carry or pin:
> "Purpose → Opposite → Option x3."

### 2. Real-World Test
Run one real test in the next 48 hours using Label → Loosen → Ladder. Post a 3-bullet debrief:
- **Situation:** _____
- **Counter-move used:** _____
- **Result:** _____

### 3. Bring to Lesson 4
One example where a reframing tool changed your decision or reduced stress: _____"""

quiz_content = {
    "questions": [
        {
            "type": "multiple_choice",
            "question": "Which pair is correctly matched?",
            "options": [
                "Anchoring → 'Consider the opposite'",
                "Sunk cost → 'Future-only rule'",
                "Groupthink → 'Speed up the meeting'",
                "Loss aversion → 'Ignore costs'"
            ],
            "correct": 1,
            "feedback": "For sunk cost, focus decisions on future costs/benefits, not past effort."
        },
        {
            "type": "multiple_choice",
            "question": "Best first move when you notice threat arousal (tight chest, tunnel vision)?",
            "options": [
                "Decide faster",
                "Gather more tabs",
                "90-second reset, then restate purpose",
                "Ask for consensus"
            ],
            "correct": 2,
            "feedback": "State regulation precedes quality thinking."
        },
        {
            "type": "multiple_choice",
            "question": "What does a 'default swap' do?",
            "options": [
                "Changes the goal",
                "Temporarily forces a new method to overcome status quo",
                "Eliminates uncertainty",
                "Avoids accountability"
            ],
            "correct": 1,
            "feedback": "It breaks auto-pilot; you can revert if evidence says so."
        },
        {
            "type": "multiple_choice",
            "question": "Which is NOT a flexibility blocker?",
            "options": [
                "Groupthink",
                "Steelmanning",
                "Loss aversion",
                "Anchoring"
            ],
            "correct": 1,
            "feedback": "Steelmanning expands perspective; the others shrink it."
        },
        {
            "type": "multiple_choice",
            "question": "You're anchored to the first price you heard. What helps most?",
            "options": [
                "Repeating the first price to remember it",
                "Asking the same vendor to justify it",
                "Getting two independent reference points and a value-based frame",
                "Waiting until the price feels right"
            ],
            "correct": 2,
            "feedback": "New anchors + value framing dilute the first anchor's pull."
        }
    ]
}

# Update database
def update_lesson():
    import psycopg2
    from psycopg2.extras import Json
    
    try:
        conn = psycopg2.connect(
            host="db",
            database="resilient_mastery",
            user="postgres",
            password="postgres"
        )
        cur = conn.cursor()
        
        # Update lesson content
        cur.execute("""
            UPDATE lesson 
            SET 
                story = %s,
                reflection = %s,
                challenge = %s,
                quiz = %s,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = 39
        """, (story_content, reflection_content, challenge_content, Json(quiz_content)))
        
        conn.commit()
        print("✅ Successfully updated Lesson 39 with enhanced content!")
        
        # Verify the update
        cur.execute("SELECT title FROM lesson WHERE id = 39")
        result = cur.fetchone()
        if result:
            print(f"📚 Lesson title: {result[0]}")
        
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"❌ Error updating lesson: {e}")
        sys.exit(1)

if __name__ == "__main__":
    update_lesson()
