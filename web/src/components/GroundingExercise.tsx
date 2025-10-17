import { useState } from 'react'
import { Eye, Hand, Ear, Coffee, Wind, CheckCircle, RefreshCw } from 'lucide-react'

interface GroundingSession {
  timestamp: string
  sights: string[]
  touches: string[]
  sounds: string[]
  scents: string[]
  nextAction: string
  effectiveness: number
}

export function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(0)
  const [sights, setSights] = useState(['', '', '', '', ''])
  const [touches, setTouches] = useState(['', '', '', ''])
  const [sounds, setSounds] = useState(['', '', ''])
  const [scents, setScents] = useState(['', ''])
  const [breathTaken, setBreathTaken] = useState(false)
  const [nextAction, setNextAction] = useState('')
  const [effectiveness, setEffectiveness] = useState(5)
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { icon: Eye, title: '5 Things You See', count: 5, color: 'blue' },
    { icon: Hand, title: '4 Things You Feel', count: 4, color: 'purple' },
    { icon: Ear, title: '3 Sounds You Hear', count: 3, color: 'green' },
    { icon: Coffee, title: '2 Scents (or Memories)', count: 2, color: 'orange' },
    { icon: Wind, title: '1 Slow Breath', count: 1, color: 'indigo' }
  ]

  const updateSight = (index: number, value: string) => {
    const updated = [...sights]
    updated[index] = value
    setSights(updated)
  }

  const updateTouch = (index: number, value: string) => {
    const updated = [...touches]
    updated[index] = value
    setTouches(updated)
  }

  const updateSound = (index: number, value: string) => {
    const updated = [...sounds]
    updated[index] = value
    setSounds(updated)
  }

  const updateScent = (index: number, value: string) => {
    const updated = [...scents]
    updated[index] = value
    setScents(updated)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return sights.filter(s => s.trim()).length === 5
      case 1: return touches.filter(t => t.trim()).length === 4
      case 2: return sounds.filter(s => s.trim()).length === 3
      case 3: return scents.filter(s => s.trim()).length === 2
      case 4: return breathTaken
      default: return false
    }
  }

  const completeExercise = () => {
    const session: GroundingSession = {
      timestamp: new Date().toISOString(),
      sights,
      touches,
      sounds,
      scents,
      nextAction,
      effectiveness
    }
    
    const saved = localStorage.getItem('grounding-sessions')
    const sessions = saved ? JSON.parse(saved) : []
    sessions.unshift(session)
    localStorage.setItem('grounding-sessions', JSON.stringify(sessions))
    
    setIsComplete(true)
  }

  const reset = () => {
    setCurrentStep(0)
    setSights(['', '', '', '', ''])
    setTouches(['', '', '', ''])
    setSounds(['', '', ''])
    setScents(['', ''])
    setBreathTaken(false)
    setNextAction('')
    setEffectiveness(5)
    setIsComplete(false)
  }

  const CurrentIcon = steps[currentStep]?.icon || Eye

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Grounding 5-4-3-2-1</h3>
        <p className="text-gray-600">
          Hijack rumination by flooding sensory channels with present-moment data.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium">{currentStep + 1}/5</span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full transition-colors ${
                index < currentStep ? 'bg-green-500' :
                index === currentStep ? 'bg-blue-500' :
                'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Step */}
      {!isComplete ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <CurrentIcon className={`w-12 h-12 mx-auto mb-3 text-${steps[currentStep].color}-500`} />
            <h4 className="text-lg font-semibold text-gray-800">
              {steps[currentStep].title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Name them silently or type below
            </p>
          </div>

          {/* Step 1: Sights */}
          {currentStep === 0 && (
            <div className="space-y-3">
              {sights.map((sight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 text-center font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={sight}
                    onChange={(e) => updateSight(index, e.target.value)}
                    placeholder={`e.g., ${
                      ['laptop screen', 'blue wall', 'coffee mug', 'window', 'plant'][index]
                    }`}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Touches */}
          {currentStep === 1 && (
            <div className="space-y-3">
              {touches.map((touch, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 text-center font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={touch}
                    onChange={(e) => updateTouch(index, e.target.value)}
                    placeholder={`e.g., ${
                      ['chair pressure', 'fabric texture', 'air on skin', 'floor under feet'][index]
                    }`}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Sounds */}
          {currentStep === 2 && (
            <div className="space-y-3">
              {sounds.map((sound, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 text-center font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={sound}
                    onChange={(e) => updateSound(index, e.target.value)}
                    placeholder={`e.g., ${
                      ['HVAC hum', 'distant traffic', 'keyboard clicks'][index]
                    }`}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Scents */}
          {currentStep === 3 && (
            <div className="space-y-3">
              {scents.map((scent, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 text-center font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={scent}
                    onChange={(e) => updateScent(index, e.target.value)}
                    placeholder={`e.g., ${
                      ['coffee aroma', 'memory of ocean'][index]
                    }`}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
              <p className="text-xs text-gray-500 italic mt-2">
                If no scents are present, recall two pleasant scent memories
              </p>
            </div>
          )}

          {/* Step 5: Breath */}
          {currentStep === 4 && (
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8">
                <p className="text-lg mb-4">Take one slow, deep breath</p>
                <p className="text-sm text-gray-600 mb-6">
                  As you exhale, drop your shoulders and soften your jaw
                </p>
                <button
                  onClick={() => setBreathTaken(true)}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    breathTaken
                      ? 'bg-green-500 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {breathTaken ? (
                    <>
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                      Breath Complete
                    </>
                  ) : (
                    'Click After Your Breath'
                  )}
                </button>
              </div>
              
              {breathTaken && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      One ≤10-minute Next Action
                    </label>
                    <input
                      type="text"
                      value={nextAction}
                      onChange={(e) => setNextAction(e.target.value)}
                      placeholder="e.g., Review one page of notes"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              ← Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={completeExercise}
                disabled={!breathTaken}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Complete Grounding
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-green-50 rounded-lg shadow-md p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Grounding Complete!
            </h4>
            <p className="text-gray-600 mb-6">
              You've successfully anchored yourself in the present moment.
            </p>

            <div className="bg-white rounded-lg p-4 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How effective was this? (1-10)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={effectiveness}
                  onChange={(e) => setEffectiveness(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-8 text-center font-bold text-lg">{effectiveness}</span>
              </div>
            </div>

            {nextAction && (
              <div className="bg-white rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Your Next Action:</p>
                <p className="font-medium text-gray-800">{nextAction}</p>
              </div>
            )}

            <button
              onClick={reset}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="w-5 h-5" />
              Practice Again
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">
          💡 Pro Tip
        </p>
        <p className="text-sm text-blue-700">
          Great for panic, public speaking nerves, or pre-meeting anxiety. 
          The more specific your observations, the stronger the grounding effect.
        </p>
      </div>
    </div>
  )
}
