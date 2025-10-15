import { useState } from 'react'

interface Signal {
  id: string
  text: string
  category: 'behavioral' | 'verbal' | 'physical' | 'cognitive'
  icon: string
}

const commonSignals: Signal[] = [
  { id: 's1', text: 'You argue louder instead of clearer', category: 'behavioral', icon: '📢' },
  { id: 's2', text: 'You repeat "have to / can\'t" language', category: 'verbal', icon: '🔁' },
  { id: 's3', text: 'You hide data that hurts your case', category: 'behavioral', icon: '🙈' },
  { id: 's4', text: 'Your body is amped (tight jaw, shallow breath)', category: 'physical', icon: '😤' },
  { id: 's5', text: 'You dismiss alternatives without considering them', category: 'cognitive', icon: '❌' },
  { id: 's6', text: 'You feel defensive when questioned', category: 'cognitive', icon: '🛡️' },
  { id: 's7', text: 'Your voice gets faster or higher pitched', category: 'verbal', icon: '⚡' },
  { id: 's8', text: 'You interrupt others more frequently', category: 'behavioral', icon: '✋' },
  { id: 's9', text: 'Tension in shoulders or neck', category: 'physical', icon: '💪' },
  { id: 's10', text: 'You think in absolutes (always/never)', category: 'cognitive', icon: '⚫' }
]

interface InterrupterRule {
  ifSignal: string
  thenAction: string
}

export function EarlyWarningSystem() {
  const [selectedSignals, setSelectedSignals] = useState<string[]>([])
  const [customSignal, setCustomSignal] = useState('')
  const [ifThenRules, setIfThenRules] = useState<InterrupterRule[]>([
    { ifSignal: '', thenAction: '' }
  ])
  const [cueLocation, setCueLocation] = useState('')
  const [timeBoxMinutes, setTimeBoxMinutes] = useState(6)
  const [systemComplete, setSystemComplete] = useState(false)

  const toggleSignal = (signalId: string) => {
    setSelectedSignals(prev =>
      prev.includes(signalId)
        ? prev.filter(id => id !== signalId)
        : [...prev, signalId]
    )
  }

  const addCustomSignal = () => {
    if (customSignal.trim()) {
      const newSignal = `custom_${Date.now()}`
      setSelectedSignals([...selectedSignals, newSignal])
      setCustomSignal('')
    }
  }

  const updateIfThenRule = (index: number, field: 'ifSignal' | 'thenAction', value: string) => {
    const newRules = [...ifThenRules]
    newRules[index] = { ...newRules[index], [field]: value }
    setIfThenRules(newRules)
  }

  const addIfThenRule = () => {
    setIfThenRules([...ifThenRules, { ifSignal: '', thenAction: '' }])
  }

  const removeIfThenRule = (index: number) => {
    setIfThenRules(ifThenRules.filter((_, i) => i !== index))
  }

  const completeSystem = () => {
    const hasSignals = selectedSignals.length > 0
    const hasValidRule = ifThenRules.some(rule => rule.ifSignal && rule.thenAction)
    const hasCue = cueLocation.trim() !== ''
    
    if (hasSignals && hasValidRule && hasCue) {
      setSystemComplete(true)
    }
  }

  const resetSystem = () => {
    setSelectedSignals([])
    setCustomSignal('')
    setIfThenRules([{ ifSignal: '', thenAction: '' }])
    setCueLocation('')
    setTimeBoxMinutes(6)
    setSystemComplete(false)
  }

  const getProgress = () => {
    let steps = 0
    if (selectedSignals.length > 0) steps += 25
    if (ifThenRules.some(rule => rule.ifSignal && rule.thenAction)) steps += 25
    if (cueLocation) steps += 25
    if (timeBoxMinutes) steps += 25
    return steps
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      behavioral: 'from-blue-400 to-blue-600',
      verbal: 'from-green-400 to-green-600',
      physical: 'from-orange-400 to-orange-600',
      cognitive: 'from-purple-400 to-purple-600'
    }
    return colors[category] || 'from-gray-400 to-gray-600'
  }

  if (systemComplete) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          🎯 Your Personal Early Warning System is Ready!
        </h2>
        
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Selected Signals */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Your Rigidity Signals:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSignals.map(id => {
                const signal = commonSignals.find(s => s.id === id)
                return signal ? (
                  <span key={id} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {signal.icon} {signal.text}
                  </span>
                ) : (
                  <span key={id} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    ⚡ {id.replace('custom_', 'Custom: ')}
                  </span>
                )
              })}
            </div>
          </div>

          {/* If-Then Rules */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Your Interrupter Rules:</h3>
            <div className="space-y-2">
              {ifThenRules.filter(rule => rule.ifSignal && rule.thenAction).map((rule, idx) => (
                <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
                  <span className="font-semibold text-blue-800">If</span> {rule.ifSignal},{' '}
                  <span className="font-semibold text-purple-800">then</span> {rule.thenAction}
                </div>
              ))}
            </div>
          </div>

          {/* Cue Location */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-2">Visual Cue Location:</h3>
            <p className="text-gray-700">{cueLocation}</p>
          </div>

          {/* Time Box */}
          <div className="bg-indigo-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 mb-2">Consider-the-Opposite Time:</h3>
            <p className="text-gray-700">{timeBoxMinutes} minutes before finalizing decisions</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={resetSystem}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create New System
          </button>
          <button
            onClick={() => {
              const systemText = `
EARLY WARNING SYSTEM
Signals: ${selectedSignals.join(', ')}
Rules: ${ifThenRules.filter(r => r.ifSignal).map(r => `If ${r.ifSignal}, then ${r.thenAction}`).join('; ')}
Cue: ${cueLocation}
Time-box: ${timeBoxMinutes} minutes
              `.trim()
              navigator.clipboard.writeText(systemText)
            }}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">System Setup Progress</span>
          <span className="text-sm text-gray-600">{getProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {/* Step 1: Identify Signals */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
          Identify Your Rigidity Signals
        </h3>
        
        <p className="text-gray-600 mb-4">Select the warning signs that apply to you when you're becoming rigid:</p>
        
        {/* Signal Categories */}
        {['behavioral', 'verbal', 'physical', 'cognitive'].map(category => (
          <div key={category} className="mb-4">
            <h4 className={`font-semibold text-sm uppercase tracking-wide mb-2 bg-gradient-to-r ${getCategoryColor(category)} bg-clip-text text-transparent`}>
              {category} Signals
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {commonSignals.filter(s => s.category === category).map(signal => (
                <label
                  key={signal.id}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedSignals.includes(signal.id)
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSignals.includes(signal.id)}
                    onChange={() => toggleSignal(signal.id)}
                    className="mr-3"
                  />
                  <span className="text-lg mr-2">{signal.icon}</span>
                  <span className="text-sm">{signal.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Signal */}
        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Add Your Own Signal:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customSignal}
              onChange={(e) => setCustomSignal(e.target.value)}
              placeholder="Describe your personal warning sign..."
              className="flex-1 p-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none"
            />
            <button
              onClick={addCustomSignal}
              disabled={!customSignal.trim()}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                customSignal.trim()
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Step 2: Design If-Then Rules */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
          Design Your If-Then Interrupters
        </h3>
        
        <p className="text-gray-600 mb-4">Create automatic responses to your rigidity signals:</p>
        
        <div className="space-y-3">
          {ifThenRules.map((rule, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600">If I notice</span>
                    <input
                      type="text"
                      value={rule.ifSignal}
                      onChange={(e) => updateIfThenRule(index, 'ifSignal', e.target.value)}
                      placeholder="e.g., tight jaw"
                      className="flex-1 p-2 border-b-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-purple-600">then I will</span>
                    <input
                      type="text"
                      value={rule.thenAction}
                      onChange={(e) => updateIfThenRule(index, 'thenAction', e.target.value)}
                      placeholder="e.g., breathe 5 times, restate purpose, generate 2 options"
                      className="flex-1 p-2 border-b-2 border-gray-200 focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>
                {ifThenRules.length > 1 && (
                  <button
                    onClick={() => removeIfThenRule(index)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addIfThenRule}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          + Add Another Rule
        </button>
      </div>

      {/* Step 3: Place Visual Cue */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
          Place Your Visual Cue
        </h3>
        
        <p className="text-gray-600 mb-4">Where will you place your reminder "What's the purpose?"</p>
        
        <input
          type="text"
          value={cueLocation}
          onChange={(e) => setCueLocation(e.target.value)}
          placeholder="e.g., Sticky note on monitor, phone lock screen, laptop lid..."
          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none"
        />
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {['Monitor', 'Phone screen', 'Notebook', 'Laptop lid'].map(location => (
            <button
              key={location}
              onClick={() => setCueLocation(location)}
              className="p-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Step 4: Time-Box */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
          Set Your "Consider-the-Opposite" Time
        </h3>
        
        <p className="text-gray-600 mb-4">How many minutes will you spend considering alternatives before finalizing decisions?</p>
        
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="3"
            max="15"
            value={timeBoxMinutes}
            onChange={(e) => setTimeBoxMinutes(Number(e.target.value))}
            className="flex-1"
          />
          <div className="w-20 text-center">
            <span className="text-3xl font-bold text-purple-600">{timeBoxMinutes}</span>
            <span className="text-sm text-gray-600 block">minutes</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-around">
          {[3, 6, 10, 15].map(minutes => (
            <button
              key={minutes}
              onClick={() => setTimeBoxMinutes(minutes)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                timeBoxMinutes === minutes
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              {minutes} min
            </button>
          ))}
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={completeSystem}
        disabled={getProgress() < 100}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
          getProgress() === 100
            ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {getProgress() === 100 ? '🚨 Activate Early Warning System' : `Complete All Steps (${getProgress()}% done)`}
      </button>
    </div>
  )
}
