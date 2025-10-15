import { useState, useEffect, useRef } from 'react'

// Component 1: Interactive Reframing Sprint Timer
export function ReframingSprintTimer() {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(120) // Start with 2 min for first phase
  const [responses, setResponses] = useState({
    bridge: '',
    purpose: '',
    whatElse: ['', '', ''],
    userHat: '',
    skepticHat: '',
    builderHat: '',
    constraintBox: '',
    chosenOption: '',
    successMetric: '',
    firstStep: ''
  })
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const phases = [
    { name: 'Bridge → Purpose', duration: 120, fields: ['bridge', 'purpose'] },
    { name: 'Tool #1: What Else?', duration: 180, fields: ['whatElse'] },
    { name: 'Tool #2: 3 Perspectives', duration: 180, fields: ['userHat', 'skepticHat', 'builderHat'] },
    { name: 'Tool #3: Constraint Box', duration: 120, fields: ['constraintBox'] },
    { name: 'Pick & Plan', duration: 120, fields: ['chosenOption', 'successMetric', 'firstStep'] }
  ]
  
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && currentPhase < phases.length - 1) {
      // Auto-advance to next phase
      handleNextPhase()
    } else if (timeRemaining === 0 && currentPhase === phases.length - 1) {
      // Sprint complete
      setIsActive(false)
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, timeRemaining, currentPhase])
  
  const handleNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1)
      setTimeRemaining(phases[currentPhase + 1].duration)
    } else {
      setIsActive(false)
    }
  }
  
  const startSprint = () => {
    setIsActive(true)
    setCurrentPhase(0)
    setTimeRemaining(phases[0].duration)
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleInputChange = (field: string, value: string | string[], index?: number) => {
    if (field === 'whatElse' && Array.isArray(responses.whatElse) && index !== undefined) {
      const newWhatElse = [...responses.whatElse]
      newWhatElse[index] = value as string
      setResponses({ ...responses, whatElse: newWhatElse })
    } else {
      setResponses({ ...responses, [field]: value })
    }
  }
  
  const getPhaseColor = () => {
    const colors = ['from-blue-500 to-indigo-500', 'from-green-500 to-emerald-500', 
                   'from-purple-500 to-pink-500', 'from-yellow-500 to-orange-500', 
                   'from-red-500 to-rose-500']
    return colors[currentPhase] || colors[0]
  }
  
  if (!isActive && currentPhase === 0) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🏃 12-Minute Reframing Sprint
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Transform your stuck problem into multiple options in just 12 minutes.
        </p>
        
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Sprint Phases:</h3>
          <div className="space-y-2">
            {phases.map((phase, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">{phase.name}</span>
                <span className="text-sm text-gray-600">{phase.duration / 60} min</span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={startSprint}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Start Sprint Timer
        </button>
      </div>
    )
  }
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-xl">
      {/* Timer Display */}
      <div className={`bg-gradient-to-r ${getPhaseColor()} text-white rounded-lg p-6 mb-6`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Phase {currentPhase + 1}: {phases[currentPhase].name}</h3>
          </div>
          <div className="text-4xl font-bold">{formatTime(timeRemaining)}</div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((phases[currentPhase].duration - timeRemaining) / phases[currentPhase].duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Phase Content */}
      <div className="bg-white rounded-lg p-6">
        {currentPhase === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bridge (method) that broke:
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                placeholder="e.g., Team meeting cancelled"
                value={responses.bridge}
                onChange={(e) => handleInputChange('bridge', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Purpose (true outcome):
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                placeholder="e.g., Get team consensus on direction"
                value={responses.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
              />
            </div>
          </div>
        )}
        
        {currentPhase === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-3">Generate 3 options (include one cheap & fast):</p>
            {responses.whatElse.map((option, idx) => (
              <input
                key={idx}
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
                placeholder={idx === 1 ? "Option (cheap & fast)" : `Option ${idx + 1}`}
                value={option}
                onChange={(e) => handleInputChange('whatElse', e.target.value, idx)}
              />
            ))}
          </div>
        )}
        
        {currentPhase === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                👤 User Hat (end user perspective):
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                placeholder="What matters most to the user?"
                value={responses.userHat}
                onChange={(e) => handleInputChange('userHat', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Skeptic Hat (what could go wrong):
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                placeholder="Main risk and mitigation"
                value={responses.skepticHat}
                onChange={(e) => handleInputChange('skepticHat', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔨 Builder Hat (simplest MVP):
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                placeholder="What can we build today?"
                value={responses.builderHat}
                onChange={(e) => handleInputChange('builderHat', e.target.value)}
              />
            </div>
          </div>
        )}
        
        {currentPhase === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-3">
              Solve with €0 new spend, &lt;2 hours, no new tools:
            </p>
            <textarea
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none"
              rows={3}
              placeholder="Your constraint-based solution..."
              value={responses.constraintBox}
              onChange={(e) => handleInputChange('constraintBox', e.target.value)}
            />
          </div>
        )}
        
        {currentPhase === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Chosen Option to Test:
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none"
                placeholder="Which option will you test?"
                value={responses.chosenOption}
                onChange={(e) => handleInputChange('chosenOption', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Success Metric:
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none"
                placeholder="How will you measure success?"
                value={responses.successMetric}
                onChange={(e) => handleInputChange('successMetric', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Step (calendar it):
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none"
                placeholder="What will you do first?"
                value={responses.firstStep}
                onChange={(e) => handleInputChange('firstStep', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setIsActive(false)}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Pause Sprint
        </button>
        <button
          onClick={handleNextPhase}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {currentPhase === phases.length - 1 ? 'Complete Sprint' : 'Next Phase →'}
        </button>
      </div>
      
      {/* Summary (shown after completion) */}
      {!isActive && currentPhase === phases.length - 1 && (
        <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800 mb-3">Sprint Complete! 🎉</h3>
          <div className="text-sm text-green-700 space-y-1">
            <p><strong>Problem:</strong> {responses.bridge}</p>
            <p><strong>Purpose:</strong> {responses.purpose}</p>
            <p><strong>Chosen Option:</strong> {responses.chosenOption}</p>
            <p><strong>Next Step:</strong> {responses.firstStep}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Component 2: Interactive Tools Explorer
export function ReframingToolsExplorer() {
  const [selectedTool, setSelectedTool] = useState(0)
  const [practiceMode, setPracticeMode] = useState(false)
  
  const tools = [
    {
      name: 'The "What Else?" Rule',
      icon: '🔄',
      description: 'Generate alternatives when stuck',
      script: 'If the purpose is [X], then besides [blocked], we could try: 1) ... 2) ... 3) ...',
      example: 'Purpose: Learn Spanish | Blocked: Evening class | What else?: Morning app, lunch partner, weekend videos',
      exercise: 'Think of something you\'re stuck on. Generate 3 alternatives in 60 seconds.'
    },
    {
      name: 'Reverse Thinking',
      icon: '🔮',
      description: 'Find failure paths to build guardrails',
      script: 'If we wanted this to fail: A) ... B) ... C) ... Therefore we will: 1) Guard... 2) Remove... 3) Monitor...',
      example: 'Launch fail: No QA, ignore feedback | Guardrails: Beta test, feedback hotline',
      exercise: 'Pick a project. List 3 ways it could fail. Create 1 guardrail for each.'
    },
    {
      name: 'Perspective Switching',
      icon: '🎭',
      description: 'See through 3 different lenses',
      script: 'User: "I care about..." | Skeptic: "Risk is..." | Builder: "MVP is..."',
      example: 'User: 2-click feature | Skeptic: Server costs | Builder: 100-user pilot',
      exercise: 'Take your current challenge. Write one sentence from each perspective.'
    },
    {
      name: 'Zoom Out / Zoom In',
      icon: '🔭',
      description: 'Change time horizon and scope',
      script: 'Zoom Out: "In 10 weeks, success is..." | Zoom In: "Next 24h step is..."',
      example: 'Out: Complete thesis draft | In: Write 500 words on methodology',
      exercise: 'Take an overwhelming task. Zoom out to 3 months, zoom in to tomorrow.'
    },
    {
      name: 'SCAMPER Lite',
      icon: '🎨',
      description: 'Modify creatively with a checklist',
      script: 'Substitute? | Eliminate? | Rearrange?',
      example: 'Conference: Substitute virtual | Eliminate workshops | Rearrange to Day 1 only',
      exercise: 'Take an expensive solution. Apply 3 SCAMPER modifications.'
    },
    {
      name: 'Constraint Box',
      icon: '📦',
      description: 'Force creativity with limits',
      script: 'Solve with: €0, <2 hours, no new tools. Options: 1) ... 2) ... 3) ...',
      example: 'Feedback: €0 = email survey | +Time = phone calls | +Budget = gift cards',
      exercise: 'Solve your problem with zero budget and 2 hours. List 3 ways.'
    }
  ]
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🧰 Reframing Tools Explorer
      </h2>
      
      {/* Tool Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {tools.map((tool, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTool(idx)}
            className={`p-4 rounded-lg transition-all duration-200 ${
              selectedTool === idx 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200'
            }`}
          >
            <div className="text-2xl mb-1">{tool.icon}</div>
            <div className="text-sm font-medium">{tool.name}</div>
          </button>
        ))}
      </div>
      
      {/* Tool Details */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {tools[selectedTool].icon} {tools[selectedTool].name}
        </h3>
        <p className="text-gray-600 mb-4">{tools[selectedTool].description}</p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-900 mb-2">The Script:</h4>
          <p className="font-mono text-sm text-blue-700">{tools[selectedTool].script}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-green-900 mb-2">Example:</h4>
          <p className="text-sm text-green-700">{tools[selectedTool].example}</p>
        </div>
        
        <button
          onClick={() => setPracticeMode(!practiceMode)}
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          {practiceMode ? 'Hide Practice' : 'Try It Now'}
        </button>
        
        {practiceMode && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">Quick Practice:</h4>
            <p className="text-sm text-yellow-700 mb-3">{tools[selectedTool].exercise}</p>
            <textarea
              className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-400 focus:outline-none"
              rows={3}
              placeholder="Your response..."
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Component 3: Options Ladder Builder
export function OptionsLadderBuilder() {
  const [problem, setProblem] = useState('')
  const [purpose, setPurpose] = useState('')
  const [options, setOptions] = useState(['', '', ''])
  const [evaluation, setEvaluation] = useState(['', '', ''])
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }
  
  const handleEvaluationChange = (index: number, value: string) => {
    const newEval = [...evaluation]
    newEval[index] = value
    setEvaluation(newEval)
  }
  
  const addOption = () => {
    setOptions([...options, ''])
    setEvaluation([...evaluation, ''])
  }
  
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🪜 Options Ladder Builder
      </h2>
      
      {/* Problem & Purpose */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What's blocked?
            </label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none"
              placeholder="Describe your stuck situation..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What's your true purpose?
            </label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none"
              placeholder="The outcome that really matters..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Options Ladder */}
      <div className="space-y-4">
        {options.map((option, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Option {idx + 1}</span>
              {idx === 1 && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Cheap & Fast
                </span>
              )}
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-200 rounded mb-2"
              placeholder="Describe this option..."
              value={option}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-200 rounded text-sm"
              placeholder="Time/Cost/Risk assessment..."
              value={evaluation[idx]}
              onChange={(e) => handleEvaluationChange(idx, e.target.value)}
            />
          </div>
        ))}
        
        <button
          onClick={addOption}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          + Add Another Option
        </button>
      </div>
      
      {/* Summary */}
      {options.filter(o => o).length >= 2 && (
        <div className="mt-6 p-4 bg-orange-100 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-2">Your Options Ladder:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-orange-800">
            {options.filter(o => o).map((opt, idx) => (
              <li key={idx}>{opt}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
