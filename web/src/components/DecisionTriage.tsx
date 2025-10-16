import { useState, useEffect, useRef } from 'react'

interface TriageData {
  purpose: string
  zoomOut: string
  zoomIn: string
  option1: string
  option2: string
  option3: string
  risk1: string
  guardrail1: string
  risk2: string
  guardrail2: string
  chosenOption: string
  firstStep: string
  successMetric: string
}

interface DecisionTriageProps {
  lessonId: number
  onComplete?: (data: TriageData) => void
}

export function DecisionTriage({ lessonId, onComplete }: DecisionTriageProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes in seconds
  const [stepTime, setStepTime] = useState(120) // Current step time
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const steps = [
    { name: 'Clarify Purpose', time: 120, icon: '🎯', color: 'purple' },
    { name: 'Zoom Out/In', time: 180, icon: '🔍', color: 'blue' },
    { name: 'Constraint Box', time: 180, icon: '📦', color: 'green' },
    { name: 'Risk Pass', time: 180, icon: '⚠️', color: 'yellow' },
    { name: 'Commit', time: 240, icon: '✅', color: 'indigo' }
  ]
  
  const localStorageKey = `decisionTriage_${lessonId}`
  const [triageData, setTriageData] = useState<TriageData>(() => {
    const saved = localStorage.getItem(localStorageKey)
    return saved ? JSON.parse(saved) : {
      purpose: '',
      zoomOut: '',
      zoomIn: '',
      option1: '',
      option2: '',
      option3: '',
      risk1: '',
      guardrail1: '',
      risk2: '',
      guardrail2: '',
      chosenOption: '',
      firstStep: '',
      successMetric: ''
    }
  })

  useEffect(() => {
    if (isActive && timeRemaining > 0 && stepTime > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1))
        setStepTime(prev => Math.max(0, prev - 1))
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, timeRemaining, stepTime])

  useEffect(() => {
    if (stepTime === 0 && currentStep < steps.length - 1) {
      handleNextStep()
    }
  }, [stepTime, currentStep])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsActive(true)
    setCurrentStep(0)
    setTimeRemaining(900)
    setStepTime(steps[0].time)
  }

  const handlePause = () => {
    setIsActive(!isActive)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setStepTime(steps[currentStep + 1].time)
      // Auto-save on step transition
      localStorage.setItem(localStorageKey, JSON.stringify(triageData))
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setIsActive(false)
    localStorage.setItem(localStorageKey, JSON.stringify(triageData))
    if (onComplete) {
      onComplete(triageData)
    }
  }

  const handleChange = (field: keyof TriageData, value: string) => {
    setTriageData(prev => ({ ...prev, [field]: value }))
  }

  const getStepProgress = () => {
    const totalTime = steps[currentStep].time
    const elapsed = totalTime - stepTime
    return (elapsed / totalTime) * 100
  }

  return (
    <div className="p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">⚡ Decision Triage</h3>
        <p className="text-gray-600">15-minute crisis resolution protocol</p>
      </div>

      {/* Timer Display */}
      <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-sm font-medium text-gray-600">Total Time</span>
            <p className="text-2xl font-bold text-gray-900">{formatTime(timeRemaining)}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Step Time</span>
            <p className="text-2xl font-bold text-orange-600">{formatTime(stepTime)}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((900 - timeRemaining) / 900) * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!isActive && currentStep === 0 ? (
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all shadow-md"
            >
              Start Triage
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="px-4 py-2 bg-white border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-all"
              >
                {isActive ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
              >
                Next Step →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="mb-6">
        <div className="flex justify-between">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={`flex-1 text-center ${idx <= currentStep ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className={`text-2xl mb-1 ${idx === currentStep ? 'animate-bounce' : ''}`}>
                {step.icon}
              </div>
              <p className="text-xs font-medium text-gray-700">{step.name}</p>
              <p className="text-xs text-gray-500">{step.time / 60}min</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-4">
        {/* Step 1: Clarify Purpose */}
        {currentStep === 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-purple-300">
            <h4 className="font-semibold text-purple-900 mb-3">
              {steps[0].icon} Step 1: Clarify Purpose (2 min)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What decision/result MUST happen in 24-72h? (10 words max)
                </label>
                <textarea
                  value={triageData.purpose}
                  onChange={(e) => handleChange('purpose', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows={2}
                  placeholder="e.g., Ship MVP to validate hypothesis"
                />
              </div>
            </div>
            <div className="mt-3 w-full bg-purple-100 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Zoom Out/In */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-blue-300">
            <h4 className="font-semibold text-blue-900 mb-3">
              {steps[1].icon} Step 2: Zoom Out/In (3 min)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zoom Out: What's the 3-month success metric?
                </label>
                <input
                  type="text"
                  value={triageData.zoomOut}
                  onChange={(e) => handleChange('zoomOut', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1000 active users, 20% conversion"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zoom In: What's "good enough" for this week?
                </label>
                <input
                  type="text"
                  value={triageData.zoomIn}
                  onChange={(e) => handleChange('zoomIn', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Working demo with core feature"
                />
              </div>
            </div>
            <div className="mt-3 w-full bg-blue-100 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Constraint Box */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-green-300">
            <h4 className="font-semibold text-green-900 mb-3">
              {steps[2].icon} Step 3: Constraint Box (3 min)
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Solve with €0 new spend, &lt;2h, no new tools
            </p>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option 1 (Embarrassingly Simple):
                </label>
                <input
                  type="text"
                  value={triageData.option1}
                  onChange={(e) => handleChange('option1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Google Doc + screenshot"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option 2:
                </label>
                <input
                  type="text"
                  value={triageData.option2}
                  onChange={(e) => handleChange('option2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Quick prototype with existing tools"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option 3:
                </label>
                <input
                  type="text"
                  value={triageData.option3}
                  onChange={(e) => handleChange('option3', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Manual process + spreadsheet"
                />
              </div>
            </div>
            <div className="mt-3 w-full bg-green-100 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Risk Pass */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-yellow-300">
            <h4 className="font-semibold text-yellow-900 mb-3">
              {steps[3].icon} Step 4: Risk Pass (3 min)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Failure Mode #1:
                </label>
                <input
                  type="text"
                  value={triageData.risk1}
                  onChange={(e) => handleChange('risk1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., Stakeholder misalignment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardrail #1:
                </label>
                <input
                  type="text"
                  value={triageData.guardrail1}
                  onChange={(e) => handleChange('guardrail1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., Daily 5-min sync"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Top Failure Mode #2:
                </label>
                <input
                  type="text"
                  value={triageData.risk2}
                  onChange={(e) => handleChange('risk2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., Technical complexity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardrail #2:
                </label>
                <input
                  type="text"
                  value={triageData.guardrail2}
                  onChange={(e) => handleChange('guardrail2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., 2-hour timebox, then simplify"
                />
              </div>
            </div>
            <div className="mt-3 w-full bg-yellow-100 rounded-full h-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 5: Commit */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-indigo-300">
            <h4 className="font-semibold text-indigo-900 mb-3">
              {steps[4].icon} Step 5: Commit (4 min)
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pick ONE option:
                </label>
                <select
                  value={triageData.chosenOption}
                  onChange={(e) => handleChange('chosenOption', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select option...</option>
                  <option value="1">Option 1: {triageData.option1}</option>
                  <option value="2">Option 2: {triageData.option2}</option>
                  <option value="3">Option 3: {triageData.option3}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calendar the first step:
                </label>
                <input
                  type="text"
                  value={triageData.firstStep}
                  onChange={(e) => handleChange('firstStep', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Draft outline at 2pm today"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Define binary success metric (yes/no, above/below):
                </label>
                <input
                  type="text"
                  value={triageData.successMetric}
                  onChange={(e) => handleChange('successMetric', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Decision made Y/N by Friday 5pm"
                />
              </div>
            </div>
            <div className="mt-3 w-full bg-indigo-100 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Completion Message */}
        {currentStep === steps.length - 1 && timeRemaining === 0 && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg text-center">
            <p className="text-green-800 font-bold text-lg mb-2">
              🎉 Triage Complete!
            </p>
            <p className="text-green-700">
              Decision made in {formatTime(900 - timeRemaining)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Run Another Triage
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
