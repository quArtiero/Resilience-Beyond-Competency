import React, { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useLesson, useCompleteLesson, useLessons } from '../hooks/useLessons'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from '../components/AuthModal'
import { InteractiveQuiz, QuizData } from '../components/InteractiveQuiz'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { ReflectionEditor } from '../components/ReflectionEditor'

type TabType = 'story' | 'reflection' | 'challenge' | 'quiz'

export function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: lesson, isLoading, error } = useLesson(id ? parseInt(id) : 0)
  const { data: lessons } = useLessons()
  const { mutate: completeLesson, isPending: isCompleting } = useCompleteLesson()
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('story')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!id || isNaN(parseInt(id))) {
    return <Navigate to="/" replace />
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist.</p>
          <a href="/" className="btn-primary">Return Home</a>
        </div>
      </div>
    )
  }

  const currentLessonIndex = lessons?.findIndex(l => l.id === lesson?.id) ?? -1
  const hasPrevious = currentLessonIndex > 0
  const hasNext = currentLessonIndex < (lessons?.length ?? 0) - 1
  const previousLesson = hasPrevious ? lessons?.[currentLessonIndex - 1] : null
  const nextLesson = hasNext ? lessons?.[currentLessonIndex + 1] : null

  const handleCompleteLesson = () => {
    console.log('🔄 Mark Complete button clicked!')
    console.log('📊 Auth status:', isAuthenticated)
    console.log('📝 Lesson ID:', lesson.id)
    
    if (isAuthenticated) {
      console.log('✅ User authenticated, completing lesson...')
      completeLesson(lesson.id)
    } else {
      console.log('❌ User not authenticated, opening auth modal')
      setIsAuthModalOpen(true)
    }
  }

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setQuizCompleted(true)
    // Auto-complete lesson if quiz score is above 70%
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 70 && isAuthenticated) {
      completeLesson(lesson.id)
    }
  }

  const navigateToLesson = (lessonId: number) => {
    navigate(`/lessons/${lessonId}`)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <div>
            <MarkdownRenderer content={lesson.story} />
            {/* Add lesson image if it exists */}
            {lesson.id === 4 && (
              <div className="mt-8 text-center">
                <img 
                  src="/src/assets/images/lesson-1-intro.jpg" 
                  alt="Mastering Resilience Competency" 
                  className="mx-auto max-w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    // Hide image if it doesn't exist
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <p className="text-sm text-gray-500 mt-2 italic">
                  Welcome to your resilience journey
                </p>
              </div>
            )}
          </div>
        )
      case 'reflection':
        return (
          <div className="space-y-6">
            {/* Show original reflection content if it exists */}
            {lesson.reflection && lesson.reflection.trim() && (
              <div className="mb-6">
                <MarkdownRenderer content={lesson.reflection} />
              </div>
            )}
            
            {/* Interactive Reflection Editor */}
            <ReflectionEditor
              lessonId={lesson.id}
              lessonTitle={lesson.title}
              reflectionPrompt={lesson.reflection || "Take a moment to reflect on what you've learned in this lesson. How can you apply these insights to your daily life?"}
              onSave={(content) => {
                console.log('Reflection saved for lesson', lesson.id, ':', content)
                // Future: Could save to backend API here
              }}
            />
          </div>
        )
      case 'challenge':
        return <MarkdownRenderer content={lesson.challenge} />
      case 'quiz':
        try {
          const quizData: QuizData = JSON.parse(lesson.quiz)
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Knowledge Check</h3>
                {quizCompleted && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Completed ✓
                  </span>
                )}
              </div>
              <InteractiveQuiz 
                quizData={quizData} 
                onComplete={handleQuizComplete}
              />
            </div>
          )
        } catch {
          return <div className="text-gray-500">Quiz content is not available</div>
        }
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          </div>
          <button
            onClick={handleCompleteLesson}
            disabled={isCompleting}
            className={`btn-accent ${isCompleting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isCompleting ? 'Marking Complete...' : 'Mark Complete'}
          </button>
        </div>
        
        {/* Tab Navigation - Hide for Module 1 lessons (IDs 4 and 2) and module intro lessons (ID 1) */}
        {!(lesson.id === 4 || lesson.id === 2 || lesson.id === 1) && (
          <nav className="flex space-x-1 border-b border-gray-200">
            {[
              { 
                id: 'story', 
                label: 'Story', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              { 
                id: 'reflection', 
                label: 'Reflection', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              { 
                id: 'challenge', 
                label: 'Challenge', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              { 
                id: 'quiz', 
                label: 'Quiz', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`tab-button ${
                  activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Tab Content */}
      <div className="card min-h-[400px]">
        {(lesson.id === 4 || lesson.id === 2 || lesson.id === 1) ? (
          // For Module 1: Show content directly without tabs
          <div>
            <MarkdownRenderer content={lesson.story} />
            {/* Add lesson image if it exists */}
            {lesson.id === 4 && (
              <div className="mt-8 text-center">
                <img 
                  src="/src/assets/images/lesson-1-intro.jpg" 
                  alt="Mastering Resilience Competency" 
                  className="mx-auto max-w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    // Hide image if it doesn't exist
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <p className="text-sm text-gray-500 mt-2 italic">
                  Welcome to your resilience journey
                </p>
              </div>
            )}
          </div>
        ) : (
          // For other modules: Show tab content
          renderTabContent()
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => previousLesson && navigateToLesson(previousLesson.id)}
          disabled={!hasPrevious}
          className={`btn-secondary ${!hasPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          ← {previousLesson ? `${previousLesson.title}` : 'Previous Lesson'}
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Lesson {lesson.order} of {lessons?.length || 0}
          </p>
        </div>
        
        <button
          onClick={() => nextLesson && navigateToLesson(nextLesson.id)}
          disabled={!hasNext}
          className={`btn-primary ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {nextLesson ? `${nextLesson.title}` : 'Next Lesson'} →
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  )
} 