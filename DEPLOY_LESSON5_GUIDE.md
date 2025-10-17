# 🚀 Deploy Lesson 5 (Empathy) to Render

## Step 1: Wait for Frontend Build
The frontend should auto-rebuild after the push. Check:
- https://dashboard.render.com → `resilience-frontend` → Events tab
- Wait for "Deploy live" status (~5-10 min)

## Step 2: Deploy Lesson 5 to Database

### Quick Deploy Steps:

1. **Go to Render Dashboard**
   - Navigate to https://dashboard.render.com
   - Click on `resilience-mastery-api` service
   - Click the **Shell** tab

2. **Check/Create Lesson 24**
   ```bash
   cd /app
   python check_lesson5_render.py
   ```

3. **Update with Full Content**
   
   Since the content is very large, we'll use SQL directly:
   
   ```bash
   psql $DATABASE_URL
   ```

   Then run this to verify the lesson exists:
   ```sql
   SELECT id, title, module_number, "order" FROM lesson WHERE id = 24;
   ```

4. **Update Story Content** (Run in psql)
   
   Due to the large content size with quotes and special characters, you'll need to:
   
   a. First, confirm lesson 24 exists
   b. Then update via the Python script:
   
   Exit psql with `\q` and run:
   ```bash
   python deploy_lesson5_to_render.py
   ```
   
   This will update all content fields.

## Step 3: Alternative - Manual SQL Update

If the Python script has issues, use this SQL approach:

1. Connect to database:
   ```bash
   psql $DATABASE_URL
   ```

2. Check lesson:
   ```sql
   SELECT id, title, LENGTH(story), LENGTH(reflection), LENGTH(challenge) 
   FROM lesson WHERE id = 24;
   ```

3. The content is already in your local database. To sync:
   - The lesson has been created with placeholder content
   - The interactive components will still work
   - Full content can be added later if needed

## Step 4: Verify Deployment

1. **Visit**: https://resilience-frontend.onrender.com
2. **Navigate to**: Module 2 → Lesson 5: "Empathy: Read, Reflect, Relate"
3. **Check each tab**:

### Story Tab
- Should show empathy framework
- 6 tools explained
- Neuroscience section

### Reflection Tab (4 Interactive Components)
- **LRL Drill**: 5 practice statements
- **3 Hats Drill**: Perspective switching
- **Async Empathy**: Message rewriting
- **30-Second EAR**: Timed practice

### Challenge Tab (3 Components)
- **Case Simulator**: 5 scenarios
- **Protocol Builder**: Personal toolkit
- **7-Day Tracker**: Progress monitoring

### Quiz Tab
- 5 multiple choice questions

## Troubleshooting

### If Components Don't Load:
1. Hard refresh (Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console (F12)

### If Database Update Fails:
1. Make sure you're in `/app` directory
2. Wait 2-3 minutes for code to deploy
3. Try the simplified check script first

### Common Errors:
- `Module not found`: Wait for deployment to complete
- `Lesson not found`: Run check_lesson5_render.py first
- `Import error`: The module files may not be deployed yet

## Success Indicators

✅ Lesson 5 appears in Module 2 sidebar
✅ All 4 tabs load without errors
✅ Interactive components are clickable
✅ Quiz questions display properly
✅ Components save to localStorage

## Next Steps

After Lesson 5 is live:
- Test all interactive components
- Verify quiz functionality
- Check that progress saves
- Prepare Lesson 6 (Integrative Practice)
