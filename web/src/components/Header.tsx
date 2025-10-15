import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useLessons'
import { AuthModal } from './AuthModal'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const { data: progress } = useProgress()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">RM</span>
            </div>
            <h1 className="text-xl font-bold">Resilient Mastery</h1>
          </div>

          {/* Progress Bar (center) */}
          {isAuthenticated && progress && (
            <div className="flex-1 max-w-md mx-8">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Progress</span>
                <div className="flex-1 progress-bar bg-primary-700">
                  <div 
                    className="progress-bar-fill bg-accent"
                    style={{ width: `${progress.completion_percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {progress.completed_lessons}/{progress.total_lessons}
                </span>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            {isAuthenticated && user ? (
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-primary-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{user.username}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-900 font-medium">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setAuthMode('login')
                    setIsAuthModalOpen(true)
                  }}
                  className="px-4 py-2 text-sm font-medium hover:bg-primary-600 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setAuthMode('register')
                    setIsAuthModalOpen(true)
                  }}
                  className="px-4 py-2 text-sm font-medium bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  )
} 