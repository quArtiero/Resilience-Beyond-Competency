import { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useLesson, useCompleteLesson, useLessons } from '../hooks/useLessons'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from '../components/AuthModal'
import { InteractiveQuiz, QuizData } from '../components/InteractiveQuiz'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { EnhancedLessonContent } from '../components/EnhancedLessonContent'

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
          <EnhancedLessonContent
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            content={lesson.story}
            type="story"
          />
        )
      case 'reflection':
        return (
          <EnhancedLessonContent
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            content={lesson.reflection}
            type="reflection"
          />
        )
      case 'challenge':
        return (
          <EnhancedLessonContent
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            content={lesson.challenge}
            type="challenge"
          />
        )
      case 'quiz':
        try {
          // Check if quiz exists and is not empty
          if (!lesson.quiz || lesson.quiz.trim() === '') {
            return (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    Quiz Coming Soon
                  </h3>
                  <p className="text-gray-500 mb-6">
                    The quiz for this lesson is being prepared. Check back later or continue with the other tabs to keep learning!
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('story')}
                      className="w-full py-2 px-4 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      Review the Story
                    </button>
                    <button
                      onClick={() => setActiveTab('reflection')}
                      className="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      Complete Your Reflection
                    </button>
                    <button
                      onClick={() => setActiveTab('challenge')}
                      className="w-full py-2 px-4 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Try the Challenge
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          
          const quizData: QuizData = JSON.parse(lesson.quiz)
          
          // Check if parsed quiz is valid
          if (!quizData || !quizData.questions || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
            return (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <svg className="w-24 h-24 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    Quiz Under Construction
                  </h3>
                  <p className="text-gray-500 mb-6">
                    We're updating this quiz to provide you with better questions. In the meantime, test your knowledge with these reflection prompts:
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-blue-900 mb-3">Self-Assessment Questions:</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• What are the 3 key concepts from this lesson?</li>
                      <li>• How would you apply what you learned today?</li>
                      <li>• What questions do you still have?</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
          
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
        } catch (error) {
          console.error('Quiz parsing error:', error)
          return (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center max-w-md">
                <div className="mb-6">
                  <svg className="w-24 h-24 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  Oops! Quiz Unavailable
                </h3>
                <p className="text-gray-500 mb-6">
                  We encountered an issue loading the quiz. Don't worry - you can still complete the lesson! Try refreshing the page or continue with other activities.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mb-3"
                >
                  Refresh Page
                </button>
                <p className="text-sm text-gray-400">
                  If the problem persists, the quiz content may be updating. Check back soon!
                </p>
              </div>
            </div>
          )
        }
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="card mb-6">
        <>
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
        
        {/* Tab Navigation - Hide for Module 1 lessons (introduction/overview only) */}
        {console.log('Lesson module_number:', lesson.module_number, 'Type:', typeof lesson.module_number)}
        {lesson.module_number !== 1 && (
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
        </>
      </div>

      {/* Tab Content */}
      <div className="card min-h-[400px]">
        {lesson.module_number === 1 ? (
          // For Module 1: Show content directly without tabs
          <div>
            <MarkdownRenderer content={lesson.story} />
            
            {/* Add reflection content if it exists for Module 1 */}
            {lesson.reflection && lesson.reflection.trim() && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reflection</h3>
                <MarkdownRenderer content={lesson.reflection} />
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