# 📸 Lesson Images

This directory contains images for lessons in the Resilience Beyond Competency course.

## 🔧 How to Add Images

### 1. Save your image here:
```
web/src/assets/images/lesson-X-name.jpg
```

### 2. Update the lesson component:
Edit `web/src/pages/Lesson.tsx` and add your image in the `story` case:

```tsx
{lesson.id === YOUR_LESSON_ID && (
  <div className="mt-8 text-center">
    <img 
      src="/src/assets/images/your-image.jpg" 
      alt="Your Image Description" 
      className="mx-auto max-w-full h-auto rounded-lg shadow-md"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
    <p className="text-sm text-gray-500 mt-2 italic">
      Your image caption
    </p>
  </div>
)}
```

## 📋 Current Images

- **lesson-1-intro.jpg** - Welcome lesson image (Lesson ID: 4)

## 💡 Best Practices

- Use **JPG** for photos, **PNG** for graphics with transparency
- Keep file sizes **under 500KB** for fast loading
- Use descriptive filenames: `lesson-1-intro.jpg`
- Add **alt text** for accessibility
- Include **captions** for context
