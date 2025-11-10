#!/usr/bin/env python3
"""
Comprehensive analysis of ALL challenge content across all lessons
"""

import psycopg2
import json
from typing import Dict, List, Optional
from datetime import datetime

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def get_all_lessons_challenges() -> List[Dict]:
    """Fetch all lessons with their challenge content"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    query = """
    SELECT 
        id,
        title,
        module_number,
        challenge,
        LENGTH(COALESCE(challenge, '')) as challenge_length,
        story,
        reflection,
        slug,
        "order"
    FROM lesson
    ORDER BY module_number, "order", id
    """
    
    cur.execute(query)
    rows = cur.fetchall()
    
    # Module names mapping
    module_names = {
        1: "Introduction to Resilience",
        2: "Emotional Intelligence",
        3: "Cognitive Flexibility",
        4: "Social Resilience",
        5: "Stress & Recovery",
        6: "Growth Mindset",
        7: "Integration & Mastery"
    }
    
    lessons = []
    for row in rows:
        module_num = row[2] or 1
        lesson_data = {
            'id': row[0],
            'title': row[1],
            'module_id': module_num,
            'module_title': module_names.get(module_num, f"Module {module_num}"),
            'challenge': row[3],
            'challenge_length': row[4],
            'has_story': bool(row[5] and len(str(row[5])) > 10),
            'has_reflection': bool(row[6] and len(str(row[6])) > 10),
            'slug': row[7],
            'order': row[8]
        }
        lessons.append(lesson_data)
    
    cur.close()
    conn.close()
    
    return lessons

def analyze_challenge_content(challenge: Optional[str]) -> Dict:
    """Analyze the content of a challenge"""
    if not challenge:
        return {
            'status': 'empty',
            'length': 0,
            'has_interactive': False,
            'has_checklist': False,
            'has_inputs': False,
            'preview': 'No content'
        }
    
    challenge_str = str(challenge).strip()
    
    # Check for various states
    if not challenge_str or challenge_str == 'null':
        return {
            'status': 'null',
            'length': 0,
            'has_interactive': False,
            'has_checklist': False,
            'has_inputs': False,
            'preview': 'Null or empty'
        }
    
    if 'No content available' in challenge_str:
        return {
            'status': 'placeholder',
            'length': len(challenge_str),
            'has_interactive': False,
            'has_checklist': False,
            'has_inputs': False,
            'preview': 'Placeholder text'
        }
    
    # Check for interactive elements
    has_checklist = '- [ ]' in challenge_str
    has_inputs = '_____' in challenge_str or 'Type your response' in challenge_str
    
    # Determine status based on length and content
    if len(challenge_str) < 50:
        status = 'minimal'
    elif len(challenge_str) < 500:
        status = 'short'
    elif len(challenge_str) < 2000:
        status = 'medium'
    else:
        status = 'full'
    
    # Get preview (first 100 chars)
    preview = challenge_str[:100] + ('...' if len(challenge_str) > 100 else '')
    
    return {
        'status': status,
        'length': len(challenge_str),
        'has_interactive': has_checklist or has_inputs,
        'has_checklist': has_checklist,
        'has_inputs': has_inputs,
        'preview': preview.replace('\n', ' ')
    }

def generate_report(lessons: List[Dict]) -> str:
    """Generate a comprehensive report"""
    report = []
    report.append("=" * 80)
    report.append("COMPREHENSIVE CHALLENGE CONTENT ANALYSIS")
    report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append("=" * 80)
    report.append("")
    
    # Group by module
    modules = {}
    for lesson in lessons:
        module_id = lesson['module_id']
        if module_id not in modules:
            modules[module_id] = {
                'title': lesson['module_title'],
                'lessons': []
            }
        modules[module_id]['lessons'].append(lesson)
    
    # Statistics
    total_lessons = len(lessons)
    empty_challenges = 0
    placeholder_challenges = 0
    minimal_challenges = 0
    short_challenges = 0
    medium_challenges = 0
    full_challenges = 0
    interactive_challenges = 0
    
    # Detailed analysis by module
    for module_id in sorted(modules.keys()):
        module = modules[module_id]
        report.append(f"\n{'='*60}")
        report.append(f"MODULE {module_id}: {module['title']}")
        report.append(f"{'='*60}")
        
        for lesson in module['lessons']:
            analysis = analyze_challenge_content(lesson['challenge'])
            
            # Update statistics
            if analysis['status'] == 'empty':
                empty_challenges += 1
            elif analysis['status'] == 'null':
                empty_challenges += 1
            elif analysis['status'] == 'placeholder':
                placeholder_challenges += 1
            elif analysis['status'] == 'minimal':
                minimal_challenges += 1
            elif analysis['status'] == 'short':
                short_challenges += 1
            elif analysis['status'] == 'medium':
                medium_challenges += 1
            elif analysis['status'] == 'full':
                full_challenges += 1
            
            if analysis['has_interactive']:
                interactive_challenges += 1
            
            # Format lesson info
            status_emoji = {
                'empty': '❌',
                'null': '❌',
                'placeholder': '⚠️',
                'minimal': '📝',
                'short': '📄',
                'medium': '📋',
                'full': '✅'
            }.get(analysis['status'], '❓')
            
            interactive_markers = []
            if analysis['has_checklist']:
                interactive_markers.append('☑️')
            if analysis['has_inputs']:
                interactive_markers.append('✏️')
            interactive_str = ' '.join(interactive_markers) if interactive_markers else ''
            
            report.append(f"\nLesson {lesson['id']}: {lesson['title']}")
            report.append(f"  Status: {status_emoji} {analysis['status'].upper()} ({analysis['length']} chars) {interactive_str}")
            report.append(f"  Story: {'✅' if lesson['has_story'] else '❌'} | Reflection: {'✅' if lesson['has_reflection'] else '❌'}")
            report.append(f"  Preview: {analysis['preview']}")
    
    # Summary statistics
    report.append(f"\n{'='*80}")
    report.append("SUMMARY STATISTICS")
    report.append(f"{'='*80}")
    report.append(f"\nTotal Lessons: {total_lessons}")
    report.append(f"\nChallenge Content Status:")
    report.append(f"  ❌ Empty/Null: {empty_challenges} ({empty_challenges/total_lessons*100:.1f}%)")
    report.append(f"  ⚠️  Placeholder: {placeholder_challenges} ({placeholder_challenges/total_lessons*100:.1f}%)")
    report.append(f"  📝 Minimal (<50 chars): {minimal_challenges} ({minimal_challenges/total_lessons*100:.1f}%)")
    report.append(f"  📄 Short (50-500 chars): {short_challenges} ({short_challenges/total_lessons*100:.1f}%)")
    report.append(f"  📋 Medium (500-2000 chars): {medium_challenges} ({medium_challenges/total_lessons*100:.1f}%)")
    report.append(f"  ✅ Full (>2000 chars): {full_challenges} ({full_challenges/total_lessons*100:.1f}%)")
    report.append(f"\n  🎯 Interactive (has inputs/checkboxes): {interactive_challenges} ({interactive_challenges/total_lessons*100:.1f}%)")
    
    # Recommendations
    report.append(f"\n{'='*80}")
    report.append("RECOMMENDATIONS")
    report.append(f"{'='*80}")
    
    needs_content = empty_challenges + placeholder_challenges
    if needs_content > 0:
        report.append(f"\n⚡ URGENT: {needs_content} lessons need challenge content created")
        report.append("  Priority lessons (empty/placeholder):")
        for module_id in sorted(modules.keys()):
            module = modules[module_id]
            urgent_lessons = []
            for lesson in module['lessons']:
                analysis = analyze_challenge_content(lesson['challenge'])
                if analysis['status'] in ['empty', 'null', 'placeholder']:
                    urgent_lessons.append(f"L{lesson['id']}")
            if urgent_lessons:
                report.append(f"    Module {module_id}: {', '.join(urgent_lessons)}")
    
    if minimal_challenges > 0:
        report.append(f"\n📝 {minimal_challenges} lessons have minimal challenges that should be expanded")
    
    if interactive_challenges < total_lessons * 0.5:
        report.append(f"\n🎯 Only {interactive_challenges/total_lessons*100:.1f}% of challenges are interactive. Consider adding more engagement!")
    
    return '\n'.join(report)

def save_report(report: str):
    """Save report to file"""
    filename = f"challenge_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(filename, 'w') as f:
        f.write(report)
    print(f"Report saved to {filename}")
    return filename

def main():
    print("Fetching all lesson data...")
    lessons = get_all_lessons_challenges()
    
    print(f"Analyzing {len(lessons)} lessons...")
    report = generate_report(lessons)
    
    print("\n" + report)
    
    filename = save_report(report)
    print(f"\n✅ Analysis complete! Full report saved to {filename}")

if __name__ == "__main__":
    main()
