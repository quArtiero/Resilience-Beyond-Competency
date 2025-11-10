# 📚 Instructions to Update Module 3 Lessons on Render

## Current Status

✅ **Frontend Updates Deployed**:
- BasicStyledContent component created with beautiful purple gradient theme
- All Module 3 lessons (37-43) using consistent styling
- Interactive elements (inputs, checkboxes) fully functional with animations
- Deployed to GitHub and Render

❗ **Backend Content Needs Update**:
- Lessons 39-43 need full interactive content in Render database
- Connection from local machine to Render DB has SSL issues

## Option 1: Update via Render Dashboard Console

1. **Log into Render Dashboard**: https://dashboard.render.com
2. Navigate to your PostgreSQL database service
3. Click on "Shell" tab 
4. Run these commands:

```bash
# First, install psycopg2 if needed
pip install psycopg2-binary

# Then run the update scripts
python3 <<'EOF'
import psycopg2
from psycopg2.extras import Json

# Use internal Render connection (no SSL issues)
conn = psycopg2.connect(database="resilient_mastery_db", user="resilient_mastery_db_user")
cur = conn.cursor()

# Update Lesson 39 with a test
test_content = {
    "story": "# Barriers & Biases: Why Flexibility Fails\n\n## The Invisible Chains\n\nContent here...",
    "reflection": "# Reflection Content\n\nReflection here...",
    "challenge": "# Challenge Content\n\nChallenge here..."
}

cur.execute("""
    UPDATE lesson 
    SET story = %s, reflection = %s, challenge = %s
    WHERE id = 39
""", (Json(test_content['story']), Json(test_content['reflection']), Json(test_content['challenge'])))

conn.commit()
print("✅ Updated Lesson 39")
cur.close()
conn.close()
EOF
```

## Option 2: Use Render's SQL Editor

1. Go to Render Dashboard → Your Database → Query
2. You can run SQL commands directly there
3. However, due to the complex JSON content, Python script is preferred

## Option 3: Update Locally and Migrate

1. **Update local database** (already has lessons):
```bash
# Run inside docker container
docker-compose exec api python3 /app/api/update_module3_lessons_render.py
```

2. **Export the data**:
```bash
docker-compose exec db pg_dump -U postgres resilient_mastery \
  --table=lesson --data-only \
  --where="id IN (39,40,41,42,43)" > module3_lessons.sql
```

3. **Import to Render**:
- Upload the SQL file to Render
- Run in Render SQL console

## Option 4: Direct Connection with Fixed SSL

Create a new script with proper SSL configuration:

```python
import psycopg2
import ssl

# Create SSL context
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# Connection with SSL
DATABASE_URL = "postgresql://resilient_mastery_db_user:hl2Y9gVaIqLfBGVHsgPUlA8KgRpBmPl5@dpg-crqkjoe8ii6s73bsrrrg-a.oregon-postgres.render.com/resilient_mastery_db"

conn = psycopg2.connect(DATABASE_URL, sslmode='require')
```

## Recommended Approach

Given the SSL issues, **Option 1** (Render Dashboard Console) is the most straightforward:

1. The content scripts (`update_module3_lessons_render.py` and `update_module3_lessons_41_43_render.py`) are ready
2. Copy the content from these scripts
3. Paste and run in Render Shell console
4. Verify updates on the live site

## Verification

After updating, verify at: https://resilient-mastery.onrender.com
- Check lessons 39-43
- Ensure all tabs (Story, Reflection, Challenge) have content
- Test interactive elements
