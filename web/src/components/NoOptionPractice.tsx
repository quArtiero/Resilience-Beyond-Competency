import { useState, useEffect } from 'react'
import { Shield, CheckCircle, RefreshCcw, AlertCircle } from 'lucide-react'

interface NoOptionBoundary {
  scenario: string
  cantDo: string
  option1: string
  option2: string
  purposeLink: string
  completed: boolean
}

const scenarios = [
  {
    text: "PM asks for same-day scope addition.",
    modelCant: "add the new feature by EOD",
    modelOption1: "deliver a wireframe mockup by 4pm today",
    modelOption2: "include it fully tested in next week's release",
    modelPurpose: "If the purpose is showing progress to stakeholders"
  },
  {
    text: "Friend wants you to host tonight, you have an exam.",
    modelCant: "host a dinner party tonight",
    modelOption1: "host brunch this weekend after my exam",
    modelOption2: "meet for coffee tomorrow morning for 30 minutes",
    modelPurpose: "If the purpose is catching up"
  },
  {
    text: "Manager requests weekend work; you have childcare.",
    modelCant: "work this weekend due to childcare commitments",
    modelOption1: "complete it by staying 2 hours late Thu/Fri",
    modelOption2: "delegate to Jake with my Monday morning review",
    modelPurpose: "If the purpose is meeting the Monday deadline"
  },
  {
    text: "Teammate wants a 'quick call' at midnight.",
    modelCant: "take calls after 9pm",
    modelOption1: "schedule 15 minutes at 8am tomorrow",
    modelOption2: "handle it async via detailed Slack messages now",
    modelPurpose: "If the purpose is unblocking their work"
  },
  {
    text: "Client wants full redesign in 2 days.",
    modelCant: "redesign the entire system in 2 days",
    modelOption1: "deliver high-fidelity mockups of key screens by Thursday",
    modelOption2: "complete full redesign in 2 weeks with daily progress updates",
    modelPurpose: "If the purpose is showing the new direction"
  }
]

export function NoOptionPractice() {
  const [boundaries, setBoundaries] = useState<NoOptionBoundary[]>(() => {
    const saved = localStorage.getItem('no-option-practice')
    if (saved) {
      return JSON.parse(saved)
    }
    return scenarios.map(s => ({
      scenario: s.text,
      cantDo: '',
      option1: '',
      option2: '',
      purposeLink: '',
      completed: false
    }))
  })

  const [showModels, setShowModels] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    localStorage.setItem('no-option-practice', JSON.stringify(boundaries))
  }, [boundaries])

  const updateBoundary = (index: number, field: keyof NoOptionBoundary, value: string) => {
    const newBoundaries = [...boundaries]
    newBoundaries[index] = {
      ...newBoundaries[index],
      [field]: value
    }
    
    // Check completion
    const b = newBoundaries[index]
    newBoundaries[index].completed = !!(b.cantDo && b.option1 && b.option2 && b.purposeLink)
    
    setBoundaries(newBoundaries)
  }

  const generateFullBoundary = (b: NoOptionBoundary) => {
    if (!b.cantDo || !b.option1 || !b.option2 || !b.purposeLink) return ''
    return `"I can't ${b.cantDo}, and I can ${b.option1} or ${b.option2}. ${b.purposeLink}, which serves best?"`
  }

  const getCompletionRate = () => {
    const completed = boundaries.filter(b => b.completed).length
    return Math.round((completed / boundaries.length) * 100)
  }

  const reset = () => {
    setBoundaries(scenarios.map(s => ({
      scenario: s.text,
      cantDo: '',
      option1: '',
      option2: '',
      purposeLink: '',
      completed: false
    })))
    setShowModels(false)
    setCurrentIndex(0)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">No + Option (Boundaries Without Burnout)</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Set clear boundaries while offering alternatives that serve the shared purpose.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Formula Reminder */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-800">No + Option Formula</span>
        </div>
        <p className="text-purple-700 text-sm italic">
          "I can't [X] by [timeframe], and I can [Y] by [earlier/later] or [Z] by [original]. 
          If the purpose is [goal], which serves best?"
        </p>
      </div>

      {/* Boundary Items */}
      <div className="space-y-6">
        {boundaries.map((boundary, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              currentIndex === index ? 'ring-2 ring-purple-400' : ''
            }`}
          >
            {/* Scenario */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-700">Scenario {index + 1}:</span>
                {boundary.completed && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-gray-800 font-medium">{boundary.scenario}</p>
              </div>
            </div>

            {/* Boundary Builder */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I can't... (what you cannot do)
                </label>
                <input
                  type="text"
                  value={boundary.cantDo}
                  onChange={(e) => updateBoundary(index, 'cantDo', e.target.value)}
                  placeholder="e.g., add the new feature by EOD"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    And I can... (Option 1)
                  </label>
                  <input
                    type="text"
                    value={boundary.option1}
                    onChange={(e) => updateBoundary(index, 'option1', e.target.value)}
                    placeholder="e.g., deliver a mockup by 4pm"
                    className="w-full px-3 py-2 border rounded-lg"
                    onFocus={() => setCurrentIndex(index)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Or I can... (Option 2)
                  </label>
                  <input
                    type="text"
                    value={boundary.option2}
                    onChange={(e) => updateBoundary(index, 'option2', e.target.value)}
                    placeholder="e.g., include it next week"
                    className="w-full px-3 py-2 border rounded-lg"
                    onFocus={() => setCurrentIndex(index)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose connection
                </label>
                <input
                  type="text"
                  value={boundary.purposeLink}
                  onChange={(e) => updateBoundary(index, 'purposeLink', e.target.value)}
                  placeholder="e.g., If the purpose is showing progress"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>
            </div>

            {/* Generated Boundary */}
            {boundary.completed && (
              <div className="mt-4 bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-700 mb-2">Your No + Option:</p>
                <p className="text-green-800 italic">
                  {generateFullBoundary(boundary)}
                </p>
              </div>
            )}

            {/* Model Answer */}
            {showModels && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-700 mb-2">Model No + Option:</p>
                <p className="text-blue-800 text-sm italic">
                  "I can't {scenarios[index].modelCant}, and I can {scenarios[index].modelOption1} or {scenarios[index].modelOption2}. {scenarios[index].modelPurpose}, which serves best?"
                </p>
              </div>
            )}

            {/* Quality Check */}
            {boundary.completed && !showModels && (
              <div className="mt-4 bg-yellow-50 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-800 mb-2">Quality Check:</p>
                <div className="space-y-1 text-sm text-yellow-700">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>Clear "can't" statement?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>Two viable alternatives?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>Tied to shared purpose?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <span>Respectful tone?</span>
                  </div>
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
