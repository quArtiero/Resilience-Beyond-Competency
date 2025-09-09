import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useLessons'
import { AuthModal } from '../components/AuthModal'

export function FinalProject() {
  const { isAuthenticated, user } = useAuth()
  const { data: progress } = useProgress()
  const [reflection, setReflection] = useState('')
  const [goals, setGoals] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const canAccessFinalProject = progress && progress.completed_lessons >= (progress.total_lessons * 0.8)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual submission logic
    setSubmitted(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Final Project</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access the final project and submit your emotional intelligence portfolio.
          </p>
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (!canAccessFinalProject) {
    const lessonsNeeded = Math.ceil((progress?.total_lessons || 0) * 0.8)
    const completed = progress?.completed_lessons || 0
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Final Project Locked</h1>
          <p className="text-gray-600 mb-6">
            Complete at least {lessonsNeeded} lessons to unlock the final project. 
            You've completed {completed} of {progress?.total_lessons} lessons.
          </p>
          <div className="progress-bar bg-gray-200 mb-6">
            <div 
              className="progress-bar-fill bg-primary"
              style={{ width: `${((completed / lessonsNeeded) * 100)}%` }}
            />
          </div>
          <a href="/" className="btn-primary">Continue Learning</a>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Congratulations on completing your emotional intelligence portfolio. 
            Your reflection and goals have been saved.
          </p>
          <div className="flex justify-center space-x-3">
            <button 
              onClick={() => setSubmitted(false)}
              className="btn-secondary"
            >
              Edit Submission
            </button>
            <a href="/" className="btn-primary">Return Home</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Final Project: Emotional Intelligence Portfolio</h1>
        <p className="text-gray-600">
          Congratulations on completing the Resilient Mastery course! This final project will help you 
          consolidate your learning and create a personal action plan for continued growth.
        </p>
      </div>

      {/* Instructions */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Instructions</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Personal Reflection</h3>
              <p className="text-sm">
                Reflect on your emotional intelligence journey. What insights have you gained? 
                How have your emotional awareness and management skills evolved throughout the course?
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Future Goals</h3>
              <p className="text-sm">
                Set specific, actionable goals for continuing to develop your emotional intelligence. 
                How will you apply these skills in your personal and professional life?
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Action Plan</h3>
              <p className="text-sm">
                Create a concrete plan with timelines, resources, and accountability measures 
                to ensure continued growth in emotional intelligence and resilience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Reflection</h2>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Share your insights about emotional intelligence, key learnings from the course, and how your perspective has changed..."
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            required
          />
          <p className="text-sm text-gray-500 mt-2">Minimum 200 words recommended</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Future Goals & Action Plan</h2>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Describe your specific goals for continued emotional intelligence development, concrete action steps, timelines, and how you'll measure success..."
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            required
          />
          <p className="text-sm text-gray-500 mt-2">Include specific actions, timelines, and success metrics</p>
        </div>

        <div className="card">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-blue-900 mb-2">Submission Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be honest and authentic in your reflections</li>
              <li>• Set specific, measurable, achievable goals</li>
              <li>• Include concrete action steps and timelines</li>
              <li>• Consider both personal and professional applications</li>
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              By submitting, you're committing to continue your emotional intelligence journey.
            </p>
            <button 
              type="submit"
              className="btn-accent"
              disabled={!reflection.trim() || !goals.trim()}
            >
              Submit Portfolio
            </button>
          </div>
        </div>
      </form>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  )
} 