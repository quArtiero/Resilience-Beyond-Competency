import { useState, useEffect } from 'react'
import { AlertTriangle, CheckCircle, RefreshCcw } from 'lucide-react'

interface SBIRewrite {
  harsh: string
  situation: string
  behavior: string
  impact: string
  request: string
  completed: boolean
}

const harshStatements = [
  {
    text: "You always dump work on QA late.",
    modelSituation: "In the last three sprints",
    modelBehavior: "code was delivered after 5pm on the final day",
    modelImpact: "which gave QA less than 2 hours to test before standup",
    modelRequest: "deliver code by 3pm on sprint final day; success = 3 on-time deliveries; review in retro"
  },
  {
    text: "Stop changing specs every hour.",
    modelSituation: "In yesterday's planning session",
    modelBehavior: "the requirements changed four times",
    modelImpact: "which caused 3 hours of rework and blocked frontend progress",
    modelRequest: "lock specs by noon; post-noon changes go to next sprint; trial for 2 weeks"
  },
  {
    text: "Your notes are useless.",
    modelSituation: "In the last five meeting summaries",
    modelBehavior: "action items lacked owners and dates",
    modelImpact: "which led to 3 missed deliverables last week",
    modelRequest: "use the format: owner-action-date for all items; target 100% compliance; review Friday"
  },
  {
    text: "You never reply on time.",
    modelSituation: "Over the past week",
    modelBehavior: "responses to blocking questions took 4+ hours",
    modelImpact: "which delayed two feature releases",
    modelRequest: "respond to blocking questions within 1 hour during work hours; track for 1 week"
  },
  {
    text: "This is garbage.",
    modelSituation: "In the v2 prototype delivered Monday",
    modelBehavior: "the error handling was incomplete",
    modelImpact: "which would cause data loss for 20% of users",
    modelRequest: "add try-catch blocks and user alerts by Thursday; success = 0 uncaught errors in QA"
  }
]

export function SBIRewriter() {
  const [rewrites, setRewrites] = useState<SBIRewrite[]>(() => {
    const saved = localStorage.getItem('sbi-rewrites')
    if (saved) {
      return JSON.parse(saved)
    }
    return harshStatements.map(h => ({
      harsh: h.text,
      situation: '',
      behavior: '',
      impact: '',
      request: '',
      completed: false
    }))
  })

  const [showModels, setShowModels] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    localStorage.setItem('sbi-rewrites', JSON.stringify(rewrites))
  }, [rewrites])

  const updateRewrite = (index: number, field: keyof SBIRewrite, value: string) => {
    const newRewrites = [...rewrites]
    newRewrites[index] = {
      ...newRewrites[index],
      [field]: value
    }
    
    // Check if all fields are filled
    const r = newRewrites[index]
    newRewrites[index].completed = !!(r.situation && r.behavior && r.impact && r.request)
    
    setRewrites(newRewrites)
  }

  const getCompletionRate = () => {
    const completed = rewrites.filter(r => r.completed).length
    return Math.round((completed / rewrites.length) * 100)
  }

  const generateFullSBI = (r: SBIRewrite) => {
    if (!r.situation || !r.behavior || !r.impact || !r.request) return ''
    return `${r.situation}, ${r.behavior}, ${r.impact}. Request: ${r.request}.`
  }

  const reset = () => {
    setRewrites(harshStatements.map(h => ({
      harsh: h.text,
      situation: '',
      behavior: '',
      impact: '',
      request: '',
      completed: false
    })))
    setShowModels(false)
    setCurrentIndex(0)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Harsh → Clear-Kind-Direct (SBI)</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Transform spiky feedback into clear, actionable SBI + Request format.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm font-medium text-yellow-800 mb-2">
          🎯 SBI + Request Formula
        </p>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal ml-4">
          <li><strong>Situation:</strong> Factual context (when/where)</li>
          <li><strong>Behavior:</strong> Observable action (what, not why)</li>
          <li><strong>Impact:</strong> Effect on work/team/customer</li>
          <li><strong>Request:</strong> Specific action with owner/date/metric</li>
        </ol>
      </div>

      {/* Rewrite Items */}
      <div className="space-y-6">
        {rewrites.map((rewrite, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              currentIndex === index ? 'ring-2 ring-orange-400' : ''
            }`}
          >
            {/* Harsh Statement */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-gray-700">Harsh Statement {index + 1}:</span>
                {rewrite.completed && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-gray-800 font-medium">"{rewrite.harsh}"</p>
              </div>
            </div>

            {/* SBI Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Situation (when/where)
                </label>
                <input
                  type="text"
                  value={rewrite.situation}
                  onChange={(e) => updateRewrite(index, 'situation', e.target.value)}
                  placeholder="e.g., In yesterday's review meeting"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Behavior (observable action)
                </label>
                <input
                  type="text"
                  value={rewrite.behavior}
                  onChange={(e) => updateRewrite(index, 'behavior', e.target.value)}
                  placeholder="e.g., the handoff was delivered after 6pm"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact (effect on work/team)
                </label>
                <input
                  type="text"
                  value={rewrite.impact}
                  onChange={(e) => updateRewrite(index, 'impact', e.target.value)}
                  placeholder="e.g., which blocked QA from testing"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request (specific with date/metric)
                </label>
                <input
                  type="text"
                  value={rewrite.request}
                  onChange={(e) => updateRewrite(index, 'request', e.target.value)}
                  placeholder="e.g., deliver by 3pm daily; success = 5 on-time; review Friday"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>
            </div>

            {/* Generated SBI */}
            {rewrite.completed && (
              <div className="mt-4 bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-700 mb-2">Your SBI + Request:</p>
                <p className="text-green-800 italic">"{generateFullSBI(rewrite)}"</p>
              </div>
            )}

            {/* Model Answer */}
            {showModels && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-700 mb-2">Model SBI + Request:</p>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>S:</strong> {harshStatements[index].modelSituation}</p>
                  <p><strong>B:</strong> {harshStatements[index].modelBehavior}</p>
                  <p><strong>I:</strong> {harshStatements[index].modelImpact}</p>
                  <p><strong>Request:</strong> {harshStatements[index].modelRequest}</p>
                </div>
              </div>
            )}

            {/* Self-Check */}
            {rewrite.completed && !showModels && (
              <div className="mt-4 bg-yellow-50 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-800 mb-2">Self-Check:</p>
                <div className="space-y-1 text-sm text-yellow-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Situation factual?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Behavior observable?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Impact operational?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Request has date/metric?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Tone neutral?
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
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showModels ? 'Hide' : 'Show'} Model Answers
        </button>
        
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RefreshCcw className="w-5 h-5" />
          Reset Practice
        </button>
      </div>
    </div>
  )
}
