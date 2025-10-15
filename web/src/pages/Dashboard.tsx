import { Link } from 'react-router-dom'
import { useLessons, useProgress } from '../hooks/useLessons'
import { useAuth } from '../hooks/useAuth'

export function Dashboard() {
  const { data: lessons } = useLessons()
  const { data: progress } = useProgress()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your progress dashboard.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    )
  }

  const getNextLesson = () => {
    if (!lessons || !progress) return lessons?.[0]
    
    // Find first incomplete lesson
    for (const lesson of lessons) {
      if (!progress.completed_lesson_ids.includes(lesson.id)) {
        return lesson
      }
    }
    
    // All lessons completed
    return null
  }

  const nextLesson = getNextLesson()
  const completionRate = progress ? Math.round(progress.completion_percentage) : 0
  
  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600'
    if (rate >= 60) return 'text-blue-600'
    if (rate >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressBgColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500'
    if (rate >= 60) return 'bg-blue-500'
    if (rate >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.username}!
            </h1>
            <p className="text-gray-600 mt-1">
              Continue your emotional intelligence journey
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getProgressColor(completionRate)}`}>
              {completionRate}%
            </div>
            <p className="text-sm text-gray-500">Complete</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {progress?.completed_lessons || 0}
          </h3>
          <p className="text-gray-600">Lessons Completed</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {(progress?.total_lessons || 0) - (progress?.completed_lessons || 0)}
          </h3>
          <p className="text-gray-600">Lessons Remaining</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {progress?.total_lessons || 0}
          </h3>
          <p className="text-gray-600">Total Lessons</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Progress */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress Overview</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${getProgressBgColor(completionRate)}`}
                style={{ width: `${completionRate}%` }}
              />
            </div>

            {nextLesson ? (
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-900 mb-2">Continue Learning</h3>
                <p className="text-sm text-primary-700 mb-3">
                  Up next: {nextLesson.title}
                </p>
                <Link
                  to={`/lessons/${nextLesson.id}`}
                  className="btn-primary text-sm"
                >
                  Continue Lesson →
                </Link>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">🎉 Congratulations!</h3>
                <p className="text-sm text-green-700 mb-3">
                  You've completed all available lessons!
                </p>
                <Link
                  to="/final-project"
                  className="btn-accent text-sm"
                >
                  Start Final Project →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Lesson Progress</h2>
          
          <div className="space-y-3">
            {lessons?.map((lesson) => {
              const isCompleted = progress?.completed_lesson_ids.includes(lesson.id) || false
              const isCurrent = lesson.id === nextLesson?.id
              
              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isCurrent 
                      ? 'border-primary-300 bg-primary-50 hover:bg-primary-100' 
                      : isCompleted
                      ? 'border-green-200 bg-green-50 hover:bg-green-100'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isCurrent
                        ? 'border-primary-500 text-primary-600'
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
                      <h3 className={`font-medium ${
                        isCurrent ? 'text-primary-900' : isCompleted ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        {lesson.title}
                      </h3>
                      <p className={`text-xs ${
                        isCurrent ? 'text-primary-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        Lesson {lesson.order}
                        {isCurrent && ' • Current'}
                        {isCompleted && ' • Complete'}
                      </p>
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
      </div>

      {/* Achievement Badges */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Getting Started Badge */}
          <div className={`text-center p-4 rounded-lg border-2 ${
            (progress?.completed_lessons || 0) >= 1 
              ? 'border-yellow-300 bg-yellow-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`text-3xl mb-2 ${
              (progress?.completed_lessons || 0) >= 1 ? '' : 'grayscale opacity-50'
            }`}>
              🎯
            </div>
            <h4 className="font-medium text-sm">Getting Started</h4>
            <p className="text-xs text-gray-600">Complete your first lesson</p>
          </div>

          {/* Halfway There Badge */}
          <div className={`text-center p-4 rounded-lg border-2 ${
            completionRate >= 50 
              ? 'border-blue-300 bg-blue-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`text-3xl mb-2 ${
              completionRate >= 50 ? '' : 'grayscale opacity-50'
            }`}>
              🚀
            </div>
            <h4 className="font-medium text-sm">Halfway There</h4>
            <p className="text-xs text-gray-600">Complete 50% of lessons</p>
          </div>

          {/* Almost Done Badge */}
          <div className={`text-center p-4 rounded-lg border-2 ${
            completionRate >= 80 
              ? 'border-purple-300 bg-purple-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`text-3xl mb-2 ${
              completionRate >= 80 ? '' : 'grayscale opacity-50'
            }`}>
              ⭐
            </div>
            <h4 className="font-medium text-sm">Almost Done</h4>
            <p className="text-xs text-gray-600">Complete 80% of lessons</p>
          </div>

          {/* Master Badge */}
          <div className={`text-center p-4 rounded-lg border-2 ${
            completionRate >= 100 
              ? 'border-green-300 bg-green-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className={`text-3xl mb-2 ${
              completionRate >= 100 ? '' : 'grayscale opacity-50'
            }`}>
              🏆
            </div>
            <h4 className="font-medium text-sm">Master</h4>
            <p className="text-xs text-gray-600">Complete all lessons</p>
          </div>
        </div>
      </div>
    </div>
  )
}
