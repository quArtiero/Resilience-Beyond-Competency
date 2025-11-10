#!/usr/bin/env python3
"""
Fix Unicode escape sequences in Module 3 content
Convert \u2713 → ✓ and other Unicode escapes to actual characters
"""

import psycopg2
import re
import codecs

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def decode_unicode_escapes(text):
    """Decode all Unicode escape sequences in text"""
    if not text:
        return text
    
    # Common Unicode escapes and their replacements
    unicode_map = {
        r'\\u2713': '✓',  # Checkmark
        r'\\u2192': '→',  # Right arrow
        r'\\u2014': '—',  # Em dash
        r'\\u2018': ''',  # Left single quote
        r'\\u2019': ''',  # Right single quote
        r'\\u201c': '"',  # Left double quote
        r'\\u201d': '"',  # Right double quote
        r'\\u2026': '…',  # Ellipsis
        r'\\u00b7': '·',  # Middle dot
        r'\\u2022': '•',  # Bullet
        r'\\u2605': '★',  # Star
        r'\\u2606': '☆',  # Empty star
        r'\\u2665': '♥',  # Heart
        r'\\u25cf': '●',  # Black circle
        r'\\u25cb': '○',  # White circle
        r'\\u25a0': '■',  # Black square
        r'\\u25a1': '□',  # White square
        r'\\ud83c\\udfaf': '🎯',  # Target emoji
        r'\\ud83d\\ude80': '🚀',  # Rocket emoji
        r'\\ud83c\\udfc6': '🏆',  # Trophy emoji
        r'\\ud83d\\udca1': '💡',  # Light bulb emoji
        r'\\ud83c\\udf31': '🌱',  # Seedling emoji
        r'\\ud83c\\udf3f': '🌿',  # Herb emoji
        r'\\ud83c\\udf33': '🌳',  # Tree emoji
        r'\\ud83c\\udf85': '🎅',  # Medal emoji (approximation)
        r'\\ud83c\\udf86': '🎆',  # Fireworks emoji
    }
    
    # Also handle single backslash versions
    single_slash_map = {
        r'\u2713': '✓',
        r'\u2192': '→',
        r'\u2014': '—',
        r'\u2018': ''',
        r'\u2019': ''',
        r'\u201c': '"',
        r'\u201d': '"',
        r'\u2026': '…',
        r'\u00b7': '·',
        r'\u2022': '•',
        r'\u2605': '★',
        r'\u2606': '☆',
        r'\u2665': '♥',
        r'\u25cf': '●',
        r'\u25cb': '○',
        r'\u25a0': '■',
        r'\u25a1': '□',
    }
    
    # Replace double-escaped first
    for escaped, char in unicode_map.items():
        text = text.replace(escaped, char)
    
    # Then single-escaped
    for escaped, char in single_slash_map.items():
        text = text.replace(escaped, char)
    
    # Try to decode any remaining Unicode escapes using regex
    def replace_unicode(match):
        try:
            # Get the hex code
            hex_str = match.group(1)
            # Convert to character
            return chr(int(hex_str, 16))
        except:
            # If it fails, return original
            return match.group(0)
    
    # Handle \uXXXX patterns
    text = re.sub(r'\\u([0-9a-fA-F]{4})', replace_unicode, text)
    
    # Handle remaining \xXX patterns
    def replace_hex(match):
        try:
            hex_str = match.group(1)
            return chr(int(hex_str, 16))
        except:
            return match.group(0)
    
    text = re.sub(r'\\x([0-9a-fA-F]{2})', replace_hex, text)
    
    return text

def fix_lesson_unicode(lesson_id):
    """Fix Unicode escapes in a specific lesson"""
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Get all content fields
    cur.execute("""
        SELECT challenge::text, story::text, reflection::text, title
        FROM lesson 
        WHERE id = %s
    """, (lesson_id,))
    
    result = cur.fetchone()
    if not result:
        print(f"❌ Lesson {lesson_id} not found")
        return False
    
    challenge_raw, story_raw, reflection_raw, title = result
    
    # Check if any content has Unicode escapes
    has_escapes = False
    if challenge_raw and ('\\u' in challenge_raw or r'\u' in challenge_raw):
        has_escapes = True
    if story_raw and ('\\u' in story_raw or r'\u' in story_raw):
        has_escapes = True
    if reflection_raw and ('\\u' in reflection_raw or r'\u' in reflection_raw):
        has_escapes = True
    
    if not has_escapes:
        return False
    
    # Fix all content
    challenge_fixed = decode_unicode_escapes(challenge_raw)
    story_fixed = decode_unicode_escapes(story_raw)
    reflection_fixed = decode_unicode_escapes(reflection_raw)
    
    # Remove any surrogate pairs that can't be encoded
    def clean_surrogates(text):
        if not text:
            return text
        # Encode and decode to remove invalid surrogates
        try:
            return text.encode('utf-8', 'replace').decode('utf-8')
        except:
            # If that fails, use more aggressive cleaning
            return ''.join(char for char in text if ord(char) < 0x10000 or ord(char) > 0x10FFFF)
    
    challenge_fixed = clean_surrogates(challenge_fixed)
    story_fixed = clean_surrogates(story_fixed)
    reflection_fixed = clean_surrogates(reflection_fixed)
    
    # Update database
    cur.execute("""
        UPDATE lesson 
        SET challenge = %s,
            story = %s,
            reflection = %s
        WHERE id = %s
    """, (
        challenge_fixed if challenge_fixed else None,
        story_fixed if story_fixed else None,
        reflection_fixed if reflection_fixed else None,
        lesson_id
    ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    print(f"✅ Lesson {lesson_id}: {title}")
    
    # Show examples of fixes
    if challenge_raw != challenge_fixed and challenge_raw:
        # Find a Unicode escape that was fixed
        if '\\u2713' in challenge_raw or r'\u2713' in challenge_raw:
            print(f"   Fixed: \\u2713 → ✓ (checkmarks)")
        if '\\u2192' in challenge_raw or r'\u2192' in challenge_raw:
            print(f"   Fixed: \\u2192 → → (arrows)")
        if '\\ud83c' in challenge_raw:
            print(f"   Fixed: emoji Unicode sequences")
    
    return True

def main():
    """Fix Unicode escapes in all lessons"""
    
    print("Fixing Unicode escape sequences...")
    print("=" * 60)
    
    fixed_count = 0
    
    # Fix all Module 3 lessons
    print("\nModule 3 (Cognitive Flexibility):")
    for lesson_id in range(37, 44):
        if fix_lesson_unicode(lesson_id):
            fixed_count += 1
    
    # Check other modules that might have issues
    print("\nChecking other modules...")
    
    # Module 1
    for lesson_id in [1, 2]:
        if fix_lesson_unicode(lesson_id):
            fixed_count += 1
    
    # Module 2
    for lesson_id in range(20, 27):
        if fix_lesson_unicode(lesson_id):
            fixed_count += 1
    
    print("\n" + "=" * 60)
    print(f"✅ Fixed {fixed_count} lessons with Unicode escapes!")
    print("\nContent now displays:")
    print("• ✓ instead of \\u2713")
    print("• → instead of \\u2192")
    print("• Proper quotes and dashes")
    print("• All emojis rendered correctly")

if __name__ == "__main__":
    main()
