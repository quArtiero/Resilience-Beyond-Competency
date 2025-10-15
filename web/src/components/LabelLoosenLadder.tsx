import { useState } from 'react'

interface LadderOption {
  id: number
  text: string
}

export function LabelLoosenLadder() {
  const [decision, setDecision] = useState('')
  const [purpose, setPurpose] = useState('')
  const [barriers, setBarriers] = useState<string[]>([])
  const [counterMoves, setCounterMoves] = useState('')
  const [options, setOptions] = useState<LadderOption[]>([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' }
  ])
  const [testPlan, setTestPlan] = useState('')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const commonBarriers = [
    "Acute stress / overload",
    "Ego defensiveness", 
    "Confirmation bias",
    "Anchoring",
    "Sunk cost fallacy",
    "Status quo bias",
    "Loss aversion",
    "Groupthink",
    "Expertise trap",
    "Time pressure"
  ]

  const handleBarrierToggle = (barrier: string) => {
    setBarriers(prev =>
      prev.includes(barrier)
        ? prev.filter(b => b !== barrier)
        : [...prev, barrier]
    )
  }

  const handleOptionChange = (id: number, text: string) => {
    setOptions(prev =>
      prev.map(opt => opt.id === id ? { ...opt, text } : opt)
    )
  }

  const handleComplete = () => {
    if (decision && purpose && barriers.length > 0 && counterMoves && 
        options.some(o => o.text) && selectedOption && testPlan) {
      setIsComplete(true)
    }
  }

  const resetDrill = () => {
    setDecision('')
    setPurpose('')
    setBarriers([])
    setCounterMoves('')
    setOptions([
      { id: 1, text: '' },
      { id: 2, text: '' },
      { id: 3, text: '' }
    ])
    setTestPlan('')
    setSelectedOption(null)
    setIsComplete(false)
  }

  const getProgress = () => {
    let steps = 0
    if (decision) steps++
    if (purpose) steps++
    if (barriers.length > 0) steps++
    if (counterMoves) steps++
    if (options.some(o => o.text)) steps++
    if (selectedOption) steps++
    if (testPlan) steps++
    return (steps / 7) * 100
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{Math.round(getProgress())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {!isComplete ? (
        <>
          {/* Step 1: Decision */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Label Your Decision
            </h3>
            <textarea
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="What decision are you wrestling with? Be specific..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Step 2: Purpose */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Clarify Your Purpose
            </h3>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="What outcome are you really trying to achieve?"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
            />
          </div>

          {/* Step 3: Label Barriers */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Label 2-3 Barriers Present
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {commonBarriers.map((barrier) => (
                <label 
                  key={barrier}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    barriers.includes(barrier)
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={barriers.includes(barrier)}
                    onChange={() => handleBarrierToggle(barrier)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">{barrier}</span>
                </label>
              ))}
            </div>
            {barriers.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-300">
                <p className="text-sm text-yellow-800">
                  <strong>Selected:</strong> {barriers.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Step 4: Loosen with Counter-Strategy */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Loosen with Counter-Strategies
            </h3>
            <textarea
              value={counterMoves}
              onChange={(e) => setCounterMoves(e.target.value)}
              placeholder="What counter-moves did you apply? (e.g., took 5 deep breaths, listed opposing evidence...)"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Step 5: Ladder Options */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">5</span>
              Ladder 3 Fresh Options
            </h3>
            <div className="space-y-3">
              {options.map((option) => (
                <div key={option.id} className="flex items-center gap-3">
                  <span className="font-bold text-gray-700">Option {option.id}:</span>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    placeholder="Describe an alternative approach..."
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none"
                  />
                  <button
                    onClick={() => setSelectedOption(option.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      selectedOption === option.id
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step 6: Test Plan */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">6</span>
              Create Your Test Plan
            </h3>
            <input
              type="text"
              value={testPlan}
              onChange={(e) => setTestPlan(e.target.value)}
              placeholder="How will you test your selected option in the next 24-48 hours?"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-400 focus:outline-none"
            />
          </div>

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            disabled={getProgress() < 100}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
              getProgress() === 100
                ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {getProgress() === 100 ? '🎉 Complete Drill' : `Complete All Steps (${Math.round(getProgress())}% done)`}
          </button>
        </>
      ) : (
        /* Completion Summary */
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            🎉 Excellent Work!
          </h2>
          
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">Decision:</h4>
              <p className="text-gray-600">{decision}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Purpose:</h4>
              <p className="text-gray-600">{purpose}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Barriers Identified:</h4>
              <p className="text-gray-600">{barriers.join(', ')}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Counter-Moves Applied:</h4>
              <p className="text-gray-600">{counterMoves}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Selected Option:</h4>
              <p className="text-gray-600 font-medium">
                Option {selectedOption}: {options.find(o => o.id === selectedOption)?.text}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Test Plan:</h4>
              <p className="text-gray-600">{testPlan}</p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              onClick={resetDrill}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Another Decision
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(
                `Decision: ${decision}\nPurpose: ${purpose}\nBarriers: ${barriers.join(', ')}\nCounter-moves: ${counterMoves}\nSelected: Option ${selectedOption}\nTest Plan: ${testPlan}`
              )}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
