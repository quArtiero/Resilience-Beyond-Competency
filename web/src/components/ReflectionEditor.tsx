import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MarkdownRenderer } from './MarkdownRenderer'

interface ReflectionEditorProps {
  lessonId: number
  lessonTitle: string
  reflectionPrompt: string
  onSave?: (content: string) => void
}

export function ReflectionEditor({ lessonId, lessonTitle, reflectionPrompt, onSave }: ReflectionEditorProps) {
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load saved reflection from localStorage on mount
  useEffect(() => {
    const savedReflection = localStorage.getItem(`reflection_${lessonId}`)
    if (savedReflection) {
      try {
        const parsed = JSON.parse(savedReflection)
        setContent(parsed.content || '')
        setLastSaved(parsed.savedAt ? new Date(parsed.savedAt) : null)
      } catch (error) {
        console.error('Error loading saved reflection:', error)
      }
    }
  }, [lessonId])

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && content.trim()) {
      const autoSaveTimer = setTimeout(() => {
        handleSave(true) // Auto-save
      }, 2000) // Auto-save after 2 seconds of no typing

      return () => clearTimeout(autoSaveTimer)
    }
  }, [content, hasUnsavedChanges])

  const handleContentChange = (value: string) => {
    setContent(value)
    setHasUnsavedChanges(true)
  }

  const handleSave = async (isAutoSave = false) => {
    if (!content.trim()) return

    setIsSaving(true)
    
    try {
      // Save to localStorage
      const reflectionData = {
        content,
        savedAt: new Date().toISOString(),
        lessonId,
        lessonTitle
      }
      
      localStorage.setItem(`reflection_${lessonId}`, JSON.stringify(reflectionData))
      
      // Call parent save handler if provided
      if (onSave) {
        await onSave(content)
      }
      
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      
      // Show success message for manual saves
      if (!isAutoSave) {
        // Could integrate with notification system here
        console.log('Reflection saved successfully!')
      }
      
    } catch (error) {
      console.error('Error saving reflection:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your reflection? This cannot be undone.')) {
      setContent('')
      setHasUnsavedChanges(false)
      localStorage.removeItem(`reflection_${lessonId}`)
      setLastSaved(null)
    }
  }

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  }

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'blockquote', 'code-block',
    'link', 'color', 'background', 'align'
  ]

  const getWordCount = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    const text = div.textContent || div.innerText || ''
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const wordCount = getWordCount(content)

  return (
    <div className="space-y-6">
      {/* Reflection Prompt */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💭 Reflection Prompt</h3>
        <div className="reflection-prompt prose prose-sm max-w-none">
          <MarkdownRenderer content={reflectionPrompt} />
        </div>
      </div>

      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Your Reflection</h3>
          <p className="text-sm text-gray-600">
            Take time to thoughtfully reflect on this lesson. Your responses are private and saved locally.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            {wordCount} words
          </div>
          {lastSaved && (
            <div className="text-xs text-gray-400">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          {hasUnsavedChanges && (
            <div className="text-xs text-orange-600">
              Unsaved changes
            </div>
          )}
        </div>
      </div>

      {/* Quill Editor */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          placeholder="Start writing your reflection here... What insights did you gain? How will you apply what you learned?"
          style={{
            minHeight: '300px'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button
            onClick={() => handleSave(false)}
            disabled={isSaving || !hasUnsavedChanges}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isSaving || !hasUnsavedChanges
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Reflection'}
          </button>
          
          <button
            onClick={handleClear}
            disabled={!content.trim()}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !content.trim()
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Clear
          </button>
        </div>

        <div className="text-sm text-gray-500">
          💡 Your reflections are automatically saved as you type
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">💭 Reflection Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Be honest and authentic in your responses</li>
          <li>• Connect the lesson content to your personal experiences</li>
          <li>• Consider specific examples from your life or work</li>
          <li>• Think about how you'll apply these insights moving forward</li>
          <li>• Don't worry about perfect writing - focus on meaningful self-reflection</li>
        </ul>
      </div>
    </div>
  )
}
