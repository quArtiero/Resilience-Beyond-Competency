import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLessons, useProgress } from '../hooks/useLessons'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from '../components/AuthModal'

export function Home() {
  const { data: lessons } = useLessons()
  const { data: progress } = useProgress()
  const { user, isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const getNextLesson = () => {
    if (!lessons || !progress) return lessons?.[0]
    
    // Find first incomplete lesson
    for (const lesson of lessons) {
      if (!progress.completed_lesson_ids.includes(lesson.id)) {
        return lesson
      }
    }
    
    // All lessons completed, return last lesson
    return lessons[lessons.length - 1]
  }

  const nextLesson = getNextLesson()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="card mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Resilient Mastery
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Develop emotional intelligence and resilience skills to thrive in high-pressure, 
            fast-changing environments.
          </p>
          
          {isAuthenticated && user ? (
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                Welcome back, {user.username}!
              </h2>
              
              {progress && (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {progress.completed_lessons}
                      </div>
                      <div className="text-sm text-blue-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {progress.total_lessons}
                      </div>
                      <div className="text-sm text-blue-500">Total Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(progress.completion_percentage)}%
                      </div>
                      <div className="text-sm text-blue-500">Progress</div>
                    </div>
                  </div>
                  
                  <div className="progress-bar bg-blue-200">
                    <div 
                      className="progress-bar-fill bg-blue-500"
                      style={{ width: `${progress.completion_percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-primary-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                Get Started Today
              </h2>
              <p className="text-primary-700 mb-4">
                Create an account to track your progress and unlock personalized learning features.
              </p>
              <div className="flex justify-center space-x-3">
                <button 
                  onClick={() => {
                    setAuthMode('register')
                    setIsAuthModalOpen(true)
                  }}
                  className="btn-primary"
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => {
                    setAuthMode('login')
                    setIsAuthModalOpen(true)
                  }}
                  className="btn-secondary"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* Continue Learning Button */}
          {nextLesson && (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="inline-flex items-center btn-accent text-lg px-8 py-3"
            >
              {progress?.completed_lessons === 0 ? 'Start First Lesson' : 'Continue Learning'}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Emotional Intelligence</h3>
          <p className="text-gray-600 text-sm">
            Learn to understand, manage, and leverage your emotions for better decision-making.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Stress Resilience</h3>
          <p className="text-gray-600 text-sm">
            Build practical skills to thrive under pressure and bounce back from setbacks.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Personal Growth</h3>
          <p className="text-gray-600 text-sm">
            Track your progress and develop lasting habits for continued growth and success.
          </p>
        </div>
      </div>

      {/* Lesson Preview */}
      {lessons && lessons.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Overview</h2>
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const isCompleted = progress?.completed_lesson_ids.includes(lesson.id) || false
              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      isCompleted 
                        ? 'bg-accent border-accent text-white' 
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        lesson.order
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
} 