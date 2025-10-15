import { useState } from 'react'

interface SMARTGoal {
  specific: string
  measurable: string
  achievable: string
  relevant: string
  timeBound: string
}

interface GoalValidation {
  specific: boolean
  measurable: boolean
  achievable: boolean
  relevant: boolean
  timeBound: boolean
}

const goalCategories = [
  'Personal Development',
  'Career Growth',
  'Health & Fitness',
  'Relationships',
  'Financial',
  'Learning & Skills',
  'Creative Projects',
  'Community & Service'
]

const timeFrames = [
  '1 week',
  '2 weeks',
  '1 month',
  '3 months',
  '6 months',
  '1 year'
]

export function SMARTGoalsBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [category, setCategory] = useState('')
  const [roughGoal, setRoughGoal] = useState('')
  const [smartGoal, setSmartGoal] = useState<SMARTGoal>({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  })
  const [validation, setValidation] = useState<GoalValidation>({
    specific: false,
    measurable: false,
    achievable: false,
    relevant: false,
    timeBound: false
  })
  const [savedGoals, setSavedGoals] = useState<Array<{category: string, goal: SMARTGoal, date: string}>>([])
  const [showSummary, setShowSummary] = useState(false)

  const validateField = (field: keyof SMARTGoal, value: string) => {
    const validations: Record<keyof SMARTGoal, (val: string) => boolean> = {
      specific: (val) => val.length > 20 && (val.includes('will') || val.includes('want to')),
      measurable: (val) => val.length > 10 && /\d/.test(val),
      achievable: (val) => val.length > 15 && (val.includes('can') || val.includes('able') || val.includes('resource')),
      relevant: (val) => val.length > 20 && (val.includes('because') || val.includes('important') || val.includes('help')),
      timeBound: (val) => val.length > 5 && (/\d/.test(val) || timeFrames.some(tf => val.includes(tf)))
    }
    
    setValidation({
      ...validation,
      [field]: validations[field](value)
    })
  }

  const handleFieldChange = (field: keyof SMARTGoal, value: string) => {
    setSmartGoal({
      ...smartGoal,
      [field]: value
    })
    validateField(field, value)
  }

  const isGoalComplete = () => {
    return Object.values(validation).every(v => v === true)
  }

  const generateSummary = () => {
    return `I will ${smartGoal.specific}. I'll know I've succeeded when ${smartGoal.measurable}. This is achievable because ${smartGoal.achievable}. This goal is important because ${smartGoal.relevant}. I will complete this by ${smartGoal.timeBound}.`
  }

  const saveGoal = () => {
    const newGoal = {
      category,
      goal: { ...smartGoal },
      date: new Date().toLocaleDateString()
    }
    setSavedGoals([...savedGoals, newGoal])
    setShowSummary(true)
  }

  const resetBuilder = () => {
    setCurrentStep(0)
    setCategory('')
    setRoughGoal('')
    setSmartGoal({
      specific: '',
      measurable: '',
      achievable: '',
      relevant: '',
      timeBound: ''
    })
    setValidation({
      specific: false,
      measurable: false,
      achievable: false,
      relevant: false,
      timeBound: false
    })
    setShowSummary(false)
  }

  const getFieldIcon = (isValid: boolean) => {
    return isValid ? '✅' : '⭕'
  }

  const getProgressPercentage = () => {
    const validCount = Object.values(validation).filter(v => v).length
    return (validCount / 5) * 100
  }

  // Step 0: Category Selection
  if (currentStep === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🎯 SMART Goals Builder
        </h2>
        <p className="text-gray-600 mb-6">
          Transform your aspirations into achievable, measurable goals using the SMART framework.
        </p>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Step 1: Choose a Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {goalCategories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat)
                  setCurrentStep(1)
                }}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-all duration-200"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {savedGoals.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Goals ({savedGoals.length})</h4>
            <div className="space-y-2">
              {savedGoals.slice(-3).map((goal, idx) => (
                <div key={idx} className="text-sm bg-white p-2 rounded border border-gray-200">
                  <span className="font-medium">{goal.category}:</span> {goal.goal.specific.substring(0, 50)}...
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Step 1: Rough Goal
  if (currentStep === 1) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-xl">
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Category: {category}</span>
            <button onClick={() => setCurrentStep(0)} className="text-blue-600 hover:text-blue-800">
              Change category
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Step 2: What's Your Goal? (Rough Version)
        </h3>
        <p className="text-gray-600 mb-6">
          Don't worry about perfect wording yet. Just tell us what you want to achieve.
        </p>

        <textarea
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
          rows={4}
          placeholder="e.g., 'I want to get better at public speaking' or 'I want to lose weight and feel healthier'"
          value={roughGoal}
          onChange={(e) => setRoughGoal(e.target.value)}
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setCurrentStep(0)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            disabled={roughGoal.length < 10}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              roughGoal.length >= 10 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Make it SMART →
          </button>
        </div>
      </div>
    )
  }

  // Step 2: SMART Refinement
  if (currentStep === 2 && !showSummary) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Step 3: Make Your Goal SMART
          </h3>
          <p className="text-gray-600">Original goal: "{roughGoal}"</p>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Specific */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">
                {getFieldIcon(validation.specific)} Specific
              </h4>
              <span className="text-sm text-gray-600">What exactly will you accomplish?</span>
            </div>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
              rows={2}
              placeholder="Be precise: What will you do? Who is involved? Where will it happen?"
              value={smartGoal.specific}
              onChange={(e) => handleFieldChange('specific', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              Example: "I will deliver a 10-minute presentation to my team"
            </p>
          </div>

          {/* Measurable */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">
                {getFieldIcon(validation.measurable)} Measurable
              </h4>
              <span className="text-sm text-gray-600">How will you track progress?</span>
            </div>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
              rows={2}
              placeholder="Include numbers, amounts, or specific milestones"
              value={smartGoal.measurable}
              onChange={(e) => handleFieldChange('measurable', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              Example: "I will practice 3 times per week for 30 minutes each"
            </p>
          </div>

          {/* Achievable */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">
                {getFieldIcon(validation.achievable)} Achievable
              </h4>
              <span className="text-sm text-gray-600">Is this realistic for you?</span>
            </div>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
              rows={2}
              placeholder="What resources, skills, or support do you have?"
              value={smartGoal.achievable}
              onChange={(e) => handleFieldChange('achievable', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              Example: "I can use the conference room and have presentation templates"
            </p>
          </div>

          {/* Relevant */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">
                {getFieldIcon(validation.relevant)} Relevant
              </h4>
              <span className="text-sm text-gray-600">Why does this matter?</span>
            </div>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
              rows={2}
              placeholder="How does this align with your bigger goals or values?"
              value={smartGoal.relevant}
              onChange={(e) => handleFieldChange('relevant', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">
              Example: "This is important because it will help me advance in my career"
            </p>
          </div>

          {/* Time-Bound */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">
                {getFieldIcon(validation.timeBound)} Time-Bound
              </h4>
              <span className="text-sm text-gray-600">When will you complete this?</span>
            </div>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
              placeholder="Set a specific deadline"
              value={smartGoal.timeBound}
              onChange={(e) => handleFieldChange('timeBound', e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              {timeFrames.map(tf => (
                <button
                  key={tf}
                  onClick={() => handleFieldChange('timeBound', tf)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={saveGoal}
            disabled={!isGoalComplete()}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              isGoalComplete() 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Create SMART Goal →
          </button>
        </div>
      </div>
    )
  }

  // Summary View
  if (showSummary) {
    const summary = generateSummary()
    
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          🎉 SMART Goal Created!
        </h2>
        <p className="text-center text-gray-600 mb-6">Category: {category}</p>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Your SMART Goal:</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-green-800 font-semibold mb-2">✅ Specific</div>
            <p className="text-sm text-green-700">{smartGoal.specific}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-blue-800 font-semibold mb-2">📊 Measurable</div>
            <p className="text-sm text-blue-700">{smartGoal.measurable}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-purple-800 font-semibold mb-2">💪 Achievable</div>
            <p className="text-sm text-purple-700">{smartGoal.achievable}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="text-orange-800 font-semibold mb-2">🎯 Relevant</div>
            <p className="text-sm text-orange-700">{smartGoal.relevant}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200 md:col-span-2">
            <div className="text-red-800 font-semibold mb-2">⏰ Time-Bound</div>
            <p className="text-sm text-red-700">{smartGoal.timeBound}</p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-300">
          <h4 className="font-semibold text-yellow-800 mb-2">📝 Next Steps:</h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>• Write this goal somewhere visible</li>
            <li>• Break it into weekly milestones</li>
            <li>• Share it with an accountability partner</li>
            <li>• Set reminders to track progress</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(summary)
            }}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            📋 Copy Goal
          </button>
          <button
            onClick={resetBuilder}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Another Goal
          </button>
        </div>
      </div>
    )
  }

  return null
}
