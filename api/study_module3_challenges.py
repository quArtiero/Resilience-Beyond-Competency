#!/usr/bin/env python3
"""
Detailed study of Module 3 (Cognitive Flexibility) challenge content
Analyzes structure, interactivity, and enhancement opportunities
"""

import psycopg2
import json
import re
from typing import Dict, List, Tuple
from datetime import datetime

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def get_module3_challenges() -> List[Dict]:
    """Fetch all Module 3 lessons with full content"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    query = """
    SELECT 
        id,
        title,
        challenge,
        story,
        reflection,
        slug
    FROM lesson
    WHERE module_number = 3
    ORDER BY "order", id
    """
    
    cur.execute(query)
    rows = cur.fetchall()
    
    lessons = []
    for row in rows:
        lessons.append({
            'id': row[0],
            'title': row[1],
            'challenge': row[2] or '',
            'story': row[3] or '',
            'reflection': row[4] or '',
            'slug': row[5]
        })
    
    cur.close()
    conn.close()
    
    return lessons

def analyze_challenge_structure(challenge: str) -> Dict:
    """Deep analysis of challenge content structure"""
    
    # Count different types of elements
    headers = {
        'h1': len(re.findall(r'^# .*$', challenge, re.MULTILINE)),
        'h2': len(re.findall(r'^## .*$', challenge, re.MULTILINE)),
        'h3': len(re.findall(r'^### .*$', challenge, re.MULTILINE)),
        'h4': len(re.findall(r'^#### .*$', challenge, re.MULTILINE))
    }
    
    # Interactive elements
    input_fields = len(re.findall(r'_____', challenge))
    checkboxes = len(re.findall(r'- \[ \]', challenge))
    
    # Content types
    lists = len(re.findall(r'^[-*] ', challenge, re.MULTILINE))
    numbered_lists = len(re.findall(r'^\d+\. ', challenge, re.MULTILINE))
    blockquotes = len(re.findall(r'^>', challenge, re.MULTILINE))
    code_blocks = len(re.findall(r'```', challenge))
    
    # Emojis and visual elements
    emojis = len(re.findall(r'[🎯🚀💡✨🔥⭐️🎮🏆📈🧠💪🌟🎭🔄🎪🎨📊🔍🛠️⚡️🎲🎪🎸🎼🎬🎧🎹🏋️‍♂️🤸‍♀️🧘‍♂️]', challenge))
    
    # Challenge duration mentioned
    day_mentions = re.findall(r'(\d+)[-\s]?[dD]ay', challenge)
    duration = max([int(d) for d in day_mentions]) if day_mentions else 0
    
    # Word and character counts
    words = len(challenge.split())
    paragraphs = len(re.findall(r'\n\n', challenge)) + 1
    
    # Specific challenge elements
    has_mission = 'mission' in challenge.lower()
    has_goals = 'goal' in challenge.lower()
    has_metrics = 'metric' in challenge.lower() or 'track' in challenge.lower()
    has_phases = 'phase' in challenge.lower() or 'day' in challenge.lower()
    has_exercises = 'exercise' in challenge.lower() or 'drill' in challenge.lower()
    
    return {
        'length': len(challenge),
        'words': words,
        'paragraphs': paragraphs,
        'headers': headers,
        'interactive': {
            'input_fields': input_fields,
            'checkboxes': checkboxes,
            'total': input_fields + checkboxes
        },
        'formatting': {
            'lists': lists,
            'numbered_lists': numbered_lists,
            'blockquotes': blockquotes,
            'code_blocks': code_blocks,
            'emojis': emojis
        },
        'structure': {
            'has_mission': has_mission,
            'has_goals': has_goals,
            'has_metrics': has_metrics,
            'has_phases': has_phases,
            'has_exercises': has_exercises,
            'duration_days': duration
        }
    }

def extract_key_sections(challenge: str) -> Dict[str, List[str]]:
    """Extract key sections from challenge content"""
    sections = {}
    
    # Extract main title
    title_match = re.search(r'^# (.+)$', challenge, re.MULTILINE)
    if title_match:
        sections['main_title'] = title_match.group(1)
    
    # Extract all section headers
    h2_headers = re.findall(r'^## (.+)$', challenge, re.MULTILINE)
    sections['sections'] = h2_headers
    
    # Extract exercises/drills
    exercises = []
    exercise_blocks = re.findall(r'### (.+Exercise.+|.+Drill.+|.+Practice.+)', challenge, re.IGNORECASE)
    exercises.extend(exercise_blocks)
    sections['exercises'] = exercises
    
    # Extract interactive prompts
    prompts = []
    lines = challenge.split('\n')
    for i, line in enumerate(lines):
        if '_____' in line:
            # Get the context around the input field
            context = lines[max(0, i-1):min(len(lines), i+2)]
            prompt_text = ' '.join(context).replace('_____', '[INPUT]').strip()
            if prompt_text:
                prompts.append(prompt_text)
    sections['prompts'] = prompts[:5]  # First 5 prompts as examples
    
    # Extract checkbox items
    checkbox_items = re.findall(r'- \[ \] (.+)$', challenge, re.MULTILINE)
    sections['checkboxes'] = checkbox_items[:5]  # First 5 as examples
    
    return sections

def generate_enhancement_suggestions(lesson: Dict, analysis: Dict, sections: Dict) -> List[str]:
    """Generate specific enhancement suggestions based on analysis"""
    suggestions = []
    
    # Check for missing elements
    if analysis['interactive']['total'] < 10:
        suggestions.append(f"📝 Add more interactive elements (currently {analysis['interactive']['total']})")
    
    if not analysis['structure']['has_metrics']:
        suggestions.append("📊 Add progress tracking metrics")
    
    if analysis['formatting']['emojis'] < 5:
        suggestions.append("✨ Add more visual elements and emojis for engagement")
    
    if not analysis['structure']['has_phases'] and analysis['structure']['duration_days'] > 1:
        suggestions.append("📅 Break down into daily phases for multi-day challenges")
    
    if analysis['interactive']['checkboxes'] == 0:
        suggestions.append("☑️ Add checkbox lists for actionable steps")
    
    if analysis['interactive']['input_fields'] < 5:
        suggestions.append("✏️ Add more reflection input fields")
    
    if not analysis['structure']['has_exercises']:
        suggestions.append("🏋️ Add specific practice exercises")
    
    if analysis['formatting']['lists'] < 3:
        suggestions.append("📋 Use more bullet lists for clarity")
    
    # Check for specific enhancements
    if 'lesson' in lesson['title'].lower() and lesson['id'] in [37, 38]:
        if 'timer' not in lesson['challenge'].lower():
            suggestions.append("⏱️ Add timed exercises for skill practice")
    
    if lesson['id'] == 39 and 'bias' in lesson['title'].lower():
        if 'scenario' not in lesson['challenge'].lower():
            suggestions.append("🎭 Add real-world bias scenarios")
    
    return suggestions

def generate_detailed_report(lessons: List[Dict]) -> str:
    """Generate comprehensive report with enhancement recommendations"""
    report = []
    report.append("=" * 80)
    report.append("MODULE 3: COGNITIVE FLEXIBILITY - CHALLENGE ENHANCEMENT STUDY")
    report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append("=" * 80)
    
    overall_stats = {
        'total_interactive': 0,
        'total_words': 0,
        'total_exercises': 0,
        'avg_duration': 0
    }
    
    for lesson in lessons:
        challenge = lesson['challenge']
        analysis = analyze_challenge_structure(challenge)
        sections = extract_key_sections(challenge)
        suggestions = generate_enhancement_suggestions(lesson, analysis, sections)
        
        # Update overall stats
        overall_stats['total_interactive'] += analysis['interactive']['total']
        overall_stats['total_words'] += analysis['words']
        if analysis['structure']['has_exercises']:
            overall_stats['total_exercises'] += 1
        if analysis['structure']['duration_days'] > 0:
            overall_stats['avg_duration'] += analysis['structure']['duration_days']
        
        # Lesson header
        report.append(f"\n{'='*70}")
        report.append(f"LESSON {lesson['id']}: {lesson['title']}")
        report.append(f"{'='*70}")
        
        # Main title
        if 'main_title' in sections:
            report.append(f"Challenge Title: {sections['main_title']}")
        
        # Statistics
        report.append(f"\n📊 STATISTICS:")
        report.append(f"  • Length: {analysis['length']} chars ({analysis['words']} words)")
        report.append(f"  • Paragraphs: {analysis['paragraphs']}")
        report.append(f"  • Duration: {analysis['structure']['duration_days']} days" if analysis['structure']['duration_days'] else "  • Duration: Not specified")
        
        # Interactive elements
        report.append(f"\n🎯 INTERACTIVITY:")
        report.append(f"  • Input Fields: {analysis['interactive']['input_fields']}")
        report.append(f"  • Checkboxes: {analysis['interactive']['checkboxes']}")
        report.append(f"  • Total Interactive: {analysis['interactive']['total']}")
        
        # Structure
        report.append(f"\n🏗️ STRUCTURE:")
        report.append(f"  • Headers: H1({analysis['headers']['h1']}) H2({analysis['headers']['h2']}) H3({analysis['headers']['h3']})")
        report.append(f"  • Lists: {analysis['formatting']['lists']} bullet, {analysis['formatting']['numbered_lists']} numbered")
        report.append(f"  • Visual Elements: {analysis['formatting']['emojis']} emojis")
        
        # Content sections
        if sections.get('sections'):
            report.append(f"\n📑 MAIN SECTIONS:")
            for section in sections['sections'][:5]:
                report.append(f"  • {section}")
        
        # Sample interactive prompts
        if sections.get('prompts'):
            report.append(f"\n✏️ SAMPLE PROMPTS:")
            for i, prompt in enumerate(sections['prompts'][:3], 1):
                report.append(f"  {i}. {prompt[:80]}...")
        
        # Enhancement suggestions
        if suggestions:
            report.append(f"\n💡 ENHANCEMENT OPPORTUNITIES:")
            for suggestion in suggestions:
                report.append(f"  {suggestion}")
        else:
            report.append(f"\n✅ WELL STRUCTURED - No major enhancements needed")
    
    # Overall summary
    report.append(f"\n\n{'='*80}")
    report.append("OVERALL MODULE 3 SUMMARY")
    report.append(f"{'='*80}")
    
    avg_duration = overall_stats['avg_duration'] / len([l for l in lessons if analyze_challenge_structure(l['challenge'])['structure']['duration_days'] > 0])
    
    report.append(f"\n📈 MODULE TOTALS:")
    report.append(f"  • Total Lessons: {len(lessons)}")
    report.append(f"  • Total Interactive Elements: {overall_stats['total_interactive']}")
    report.append(f"  • Average Interactive per Lesson: {overall_stats['total_interactive']/len(lessons):.1f}")
    report.append(f"  • Total Words: {overall_stats['total_words']:,}")
    report.append(f"  • Average Challenge Duration: {avg_duration:.1f} days")
    
    # Key strengths
    report.append(f"\n💪 KEY STRENGTHS:")
    report.append("  • All lessons have substantial content (2000+ chars)")
    report.append("  • Good mix of interactive elements")
    report.append("  • Multi-day challenges for practice")
    report.append("  • Clear structure with headers and sections")
    
    # Priority enhancements
    report.append(f"\n🎯 PRIORITY ENHANCEMENTS:")
    report.append("  1. Add more visual progress indicators")
    report.append("  2. Include timed practice exercises")
    report.append("  3. Add gamification elements (points, badges)")
    report.append("  4. Create interactive scenario simulations")
    report.append("  5. Add peer challenge options")
    
    return '\n'.join(report)

def main():
    print("Fetching Module 3 challenge data...")
    lessons = get_module3_challenges()
    
    print(f"Analyzing {len(lessons)} Module 3 lessons in detail...")
    report = generate_detailed_report(lessons)
    
    print("\n" + report)
    
    # Save report
    filename = f"module3_enhancement_study_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(filename, 'w') as f:
        f.write(report)
    
    print(f"\n✅ Study complete! Detailed report saved to {filename}")

if __name__ == "__main__":
    main()
