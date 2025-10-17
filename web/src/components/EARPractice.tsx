import { useState, useEffect, useRef } from 'react'
import { Mic, Play, Pause, RotateCcw, Clock, CheckCircle } from 'lucide-react'

interface EARSession {
  timestamp: string
  situation: string
  script: string
  wordCount: number
  duration: number
  rating: number
}

export function EARPractice() {
  const [currentScript, setCurrentScript] = useState('')
  const [situation, setSituation] = useState('')
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [sessions, setSessions] = useState<EARSession[]>(() => {
    const saved = localStorage.getItem('ear-practice-sessions')
    return saved ? JSON.parse(saved) : []
  })
  const [showTemplate, setShowTemplate] = useState(true)
  const [selfRating, setSelfRating] = useState(3)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTimerActive, timeRemaining])

  const startTimer = () => {
    setTimeRemaining(30)
    setIsTimerActive(true)
  }

  const stopTimer = () => {
    setIsTimerActive(false)
  }

  const resetPractice = () => {
    setCurrentScript('')
    setSituation('')
    setTimeRemaining(30)
    setIsTimerActive(false)
    setSelfRating(3)
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const saveSession = () => {
    if (!situation || !currentScript) return
    
    const newSession: EARSession = {
      timestamp: new Date().toISOString(),
      situation: situation,
      script: currentScript,
      wordCount: getWordCount(currentScript),
      duration: 30 - timeRemaining,
      rating: selfRating
    }
    
    const newSessions = [newSession, ...sessions].slice(0, 10) // Keep last 10
    setSessions(newSessions)
    localStorage.setItem('ear-practice-sessions', JSON.stringify(newSessions))
    
    resetPractice()
  }

  const getAverageWordCount = () => {
    if (sessions.length === 0) return 0
    const total = sessions.reduce((sum, s) => sum + s.wordCount, 0)
    return Math.round(total / sessions.length)
  }

  const getAverageRating = () => {
    if (sessions.length === 0) return 0
    const total = sessions.reduce((sum, s) => sum + s.rating, 0)
    return (total / sessions.length).toFixed(1)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">30-Second EAR Practice</h3>
        <p className="text-gray-600">
          Deliver a complete EAR script in 30 seconds or less (aim for &lt;35 words).
        </p>
      </div>

      {/* Template Reminder */}
      {showTemplate && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-blue-800">EAR Template:</p>
            <button
              onClick={() => setShowTemplate(false)}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Hide
            </button>
          </div>
          <p className="text-sm text-blue-700">
            "I see <span className="font-medium">[empathy]</span>. 
            I'm aware of / constrained by <span className="font-medium">[acknowledge]</span>. 
            If our purpose is <span className="font-medium">[goal]</span>, 
            can we try <span className="font-medium">[solution]</span> 
            for <span className="font-medium">[timeframe]</span> 
            and review <span className="font-medium">[checkpoint]</span>?"
          </p>
        </div>
      )}

      {/* Practice Area */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Situation Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe Your Live Tension (1 line)
          </label>
          <input
            type="text"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="e.g., Team wants to delay launch but stakeholders expect Friday"
            className="w-full px-3 py-2 border rounded-lg"
            disabled={isTimerActive}
          />
        </div>

        {/* Timer Display */}
        <div className="mb-6 text-center">
          <div className={`text-6xl font-bold ${
            timeRemaining <= 10 ? 'text-red-600' :
            timeRemaining <= 20 ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {timeRemaining}
          </div>
          <p className="text-sm text-gray-600 mt-2">seconds remaining</p>
        </div>

        {/* Timer Controls */}
        <div className="flex gap-3 justify-center mb-6">
          {!isTimerActive ? (
            <button
              onClick={startTimer}
              disabled={!situation}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                situation
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Play className="w-5 h-5" />
              Start Timer
            </button>
          ) : (
            <>
              <button
                onClick={stopTimer}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Pause className="w-5 h-5" />
                Stop
              </button>
            </>
          )}
          
          <button
            onClick={resetPractice}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Script Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your EAR Script ({getWordCount(currentScript)}/35 words)
          </label>
          <textarea
            value={currentScript}
            onChange={(e) => setCurrentScript(e.target.value)}
            placeholder="Type or speak your EAR statement here..."
            className={`w-full px-3 py-2 border rounded-lg ${
              getWordCount(currentScript) > 35
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300'
            }`}
            rows={3}
          />
          {getWordCount(currentScript) > 35 && (
            <p className="text-xs text-red-600 mt-1">
              Aim for 35 words or less for maximum impact
            </p>
          )}
        </div>

        {/* Self Rating */}
        {currentScript && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Self-Rating (1-5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setSelfRating(rating)}
                  className={`w-10 h-10 rounded-full border-2 transition-colors ${
                    selfRating >= rating
                      ? 'bg-yellow-400 border-yellow-500'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        {currentScript && situation && (
          <button
            onClick={saveSession}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save This Session
          </button>
        )}
      </div>

      {/* Practice Tips */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm font-medium text-yellow-800 mb-2">
          💡 Practice Tips
        </p>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Record yourself (optional) to review tone and pace</li>
          <li>• Speak slower than feels natural</li>
          <li>• Pause briefly between E-A-R sections</li>
          <li>• End with specific timeframe and review point</li>
          <li>• Practice the same situation 3x for fluency</li>
        </ul>
      </div>

      {/* Session History */}
      {sessions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Recent Sessions</h4>
            <div className="text-sm text-gray-600">
              Avg: {getAverageWordCount()} words | {getAverageRating()} ⭐
            </div>
          </div>
          
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session, index) => (
              <div key={index} className="bg-white rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {session.situation}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(session.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${
                          i < session.rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {session.wordCount} words | {session.duration}s
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-600 italic">"{session.script}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
