import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLessons, useProgress } from '../hooks/useLessons'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from './AuthModal'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const location = useLocation()
  const { data: lessons, isLoading } = useLessons()
  const { data: progress } = useProgress()
  const { isAuthenticated, user } = useAuth()

  const isLessonCompleted = (lessonId: number) => {
    return progress?.completed_lesson_ids.includes(lessonId) || false
  }

  const isCurrentLesson = (lessonId: number) => {
    return location.pathname === `/lessons/${lessonId}`
  }

  return (
    <aside className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {!isCollapsed && <span className="ml-2 font-medium">Lessons</span>}
        </button>
      </div>

      <nav className="px-4 pb-4">
        {/* Home Link */}
        <Link
          to="/"
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors mb-1 ${
            location.pathname === '/' 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {!isCollapsed && <span>Home</span>}
        </Link>

        {/* Dashboard Link - only show for authenticated users */}
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors mb-2 ${
              location.pathname === '/dashboard' 
                ? 'bg-accent text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        )}

        {/* Admin Dashboard Link - only show for admin users */}
        {isAuthenticated && user?.role === 'admin' && (
          <Link
            to="/admin"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors mb-2 ${
              location.pathname === '/admin' 
                ? 'bg-red-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!isCollapsed && <span>Admin Panel</span>}
          </Link>
        )}

        {/* Lessons */}
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {(() => {
              // Group lessons by module
              const lessonsByModule = lessons?.reduce((acc, lesson) => {
                const module = lesson.module_number || 1
                if (!acc[module]) acc[module] = []
                acc[module].push(lesson)
                return acc
              }, {} as Record<number, typeof lessons>)
              
              const moduleNames = {
                1: 'Introduction to Resilience',
                2: 'Emotional Intelligence',
                3: 'Cognitive Flexibility', 
                4: 'Grit and Perseverance',
                5: 'Adaptability and Agility',
                6: 'Final Reflections'
              }
              
              return Object.entries(lessonsByModule || {})
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([moduleNum, moduleLessons]) => (
                  <div key={moduleNum} className="mb-4">
                    {!isCollapsed && (
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Module {moduleNum}: {moduleNames[Number(moduleNum) as keyof typeof moduleNames]}
                      </div>
                    )}
                    {moduleLessons?.map((lesson) => {
                      const isLocked = lesson.is_unlocked === false
                      const isCompleted = lesson.is_completed === true
                      
                      return (
                        <Link
                          key={lesson.id}
                          to={isLocked ? '#' : `/lessons/${lesson.id}`}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors mb-1 ${
                            isLocked 
                              ? 'text-gray-400 cursor-not-allowed opacity-60'
                              : isCurrentLesson(lesson.id)
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={(e) => {
                            if (isLocked) {
                              e.preventDefault()
                            }
                          }}
                        >
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isLocked
                    ? 'border-gray-300 bg-gray-100'
                    : isCompleted
                    ? 'bg-accent border-accent'
                    : isCurrentLesson(lesson.id)
                    ? 'border-white'
                    : 'border-gray-300'
                }`}>
                  {isLocked && (
                    <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {!isLocked && isCompleted && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lesson.title}</p>
                  </div>
                        )}
                      </Link>
                      )
                    })}
                  </div>
                ))
            })()}
          </div>
        )}

        {/* Final Project Link */}
        {!isCollapsed && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              to="/final-project"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/final-project'
                  ? 'bg-accent text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Final Project</span>
            </Link>
          </div>
        )}

        {/* Auth reminder for guests */}
        {!isAuthenticated && !isCollapsed && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Track Your Progress</p>
            <p className="text-xs text-blue-600 mb-3">Sign in to save your lesson progress and unlock personalized features.</p>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full btn-primary text-xs py-1.5"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </aside>
  )
} 