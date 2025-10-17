import { useState, useEffect } from 'react'
import { MessageCircle, CheckCircle, RefreshCcw, Target } from 'lucide-react'

interface LRLResponse {
  statement: string
  userLRL: string
  userQuestion: string
  modelLRL: string
  modelQuestion: string
  completed: boolean
}

const statements = [
  {
    text: "This deadline is impossible.",
    modelLRL: "Sounds like the current date risks quality and morale.",
    modelQuestion: "What would 'good enough this week' look like—one slice we can ship?"
  },
  {
    text: "You changed the spec without telling me.",
    modelLRL: "You're frustrated because the changes blindsided you and affected your work.",
    modelQuestion: "What communication method would help you stay in sync on changes?"
  },
  {
    text: "We can't ship garbage to hit a date.",
    modelLRL: "You're concerned that rushing will damage our reputation and user trust.",
    modelQuestion: "What are the must-have quality checks before we can ship?"
  },
  {
    text: "No one listens when I flag risks.",
    modelLRL: "It seems you feel unheard when raising important concerns about the project.",
    modelQuestion: "How could we structure risk discussions to ensure they're addressed?"
  },
  {
    text: "I studied hard and still bombed the quiz.",
    modelLRL: "You're disappointed because your effort didn't translate to the results you expected.",
    modelQuestion: "What part felt most disconnected from what you studied?"
  }
]

export function LRLDrill() {
  const [responses, setResponses] = useState<LRLResponse[]>(() => {
    const saved = localStorage.getItem('lrl-drill-responses')
    if (saved) {
      return JSON.parse(saved)
    }
    return statements.map(s => ({
      statement: s.text,
      userLRL: '',
      userQuestion: '',
      modelLRL: s.modelLRL,
      modelQuestion: s.modelQuestion,
      completed: false
    }))
  })

  const [showModels, setShowModels] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    localStorage.setItem('lrl-drill-responses', JSON.stringify(responses))
  }, [responses])

  const updateResponse = (index: number, field: 'userLRL' | 'userQuestion', value: string) => {
    const newResponses = [...responses]
    newResponses[index] = {
      ...newResponses[index],
      [field]: value,
      completed: newResponses[index].userLRL.length > 0 && newResponses[index].userQuestion.length > 0
    }
    setResponses(newResponses)
  }

  const getCompletionRate = () => {
    const completed = responses.filter(r => r.completed).length
    return Math.round((completed / responses.length) * 100)
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const reset = () => {
    setResponses(statements.map(s => ({
      statement: s.text,
      userLRL: '',
      userQuestion: '',
      modelLRL: s.modelLRL,
      modelQuestion: s.modelQuestion,
      completed: false
    })))
    setShowModels(false)
    setCurrentIndex(0)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">LRL Drill: Listen → Reflect → Label</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          Practice reflecting content and labeling feelings in 20 words or less.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Instructions:</strong> Read each statement. Write:
        </p>
        <ol className="text-sm text-gray-700 mt-2 ml-4 list-decimal">
          <li>An LRL response (≤20 words) that reflects content + labels feeling/need</li>
          <li>A forward-moving follow-up question</li>
        </ol>
      </div>

      {/* Drill Items */}
      <div className="space-y-6">
        {responses.map((response, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              currentIndex === index ? 'ring-2 ring-blue-400' : ''
            }`}
          >
            {/* Statement */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-gray-700">Statement {index + 1}:</span>
                {response.completed && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-gray-800 font-medium">"{response.statement}"</p>
              </div>
            </div>

            {/* Your LRL Response */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your LRL Response ({getWordCount(response.userLRL)}/20 words)
              </label>
              <textarea
                value={response.userLRL}
                onChange={(e) => updateResponse(index, 'userLRL', e.target.value)}
                placeholder="e.g., 'Sounds like the current date risks quality and morale.'"
                className={`w-full px-3 py-2 border rounded-lg resize-none ${
                  getWordCount(response.userLRL) > 20 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-300'
                }`}
                rows={2}
                onFocus={() => setCurrentIndex(index)}
              />
              {getWordCount(response.userLRL) > 20 && (
                <p className="text-xs text-red-600 mt-1">
                  Keep it under 20 words for maximum impact
                </p>
              )}
            </div>

            {/* Your Follow-up Question */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Follow-up Question
              </label>
              <input
                type="text"
                value={response.userQuestion}
                onChange={(e) => updateResponse(index, 'userQuestion', e.target.value)}
                placeholder="e.g., 'What would good enough this week look like?'"
                className="w-full px-3 py-2 border rounded-lg"
                onFocus={() => setCurrentIndex(index)}
              />
            </div>

            {/* Model Answers (Hidden by default) */}
            {showModels && (
              <div className="bg-green-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm font-medium text-green-700">Model LRL:</span>
                  <p className="text-green-800 mt-1">"{response.modelLRL}"</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-green-700">Model Question:</span>
                  <p className="text-green-800 mt-1">"{response.modelQuestion}"</p>
                </div>
              </div>
            )}

            {/* Self-Check */}
            {response.completed && !showModels && (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-800 mb-2">Self-Check:</p>
                <div className="space-y-1 text-sm text-blue-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Did you reflect their main point?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Did you label a feeling or need?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Is your question forward-moving?
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModels(!showModels)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {showModels ? 'Hide' : 'Show'} Model Answers
        </button>
        
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RefreshCcw className="w-5 h-5" />
          Reset Drill
        </button>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-2">
          💡 LRL Formula
        </p>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• <strong>Content:</strong> "You're [action/position]..."</p>
          <p>• <strong>Feeling:</strong> "...because you're [emotion]..."</p>
          <p>• <strong>Need:</strong> "...about [underlying concern]"</p>
          <p>• <strong>Tentative:</strong> Use "sounds like" or "it seems"</p>
        </div>
      </div>
    </div>
  )
}
