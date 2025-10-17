import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface ResetSession {
  timestamp: string
  preStress: number
  postStress: number
  emotionLabel: string
  purpose: string
  nextAction: string
}

export function RegulationResetTimer() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(90)
  const [phase, setPhase] = useState<'ready' | 'breathing' | 'labeling' | 'purpose' | 'action' | 'complete'>('ready')
  const [currentBreath, setCurrentBreath] = useState(0)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  
  // Session data
  const [preStress, setPreStress] = useState(5)
  const [postStress, setPostStress] = useState(5)
  const [emotionLabel, setEmotionLabel] = useState('')
  const [purpose, setPurpose] = useState('')
  const [nextAction, setNextAction] = useState('')
  const [sessions, setSessions] = useState<ResetSession[]>(() => {
    const saved = localStorage.getItem('regulation-reset-sessions')
    return saved ? JSON.parse(saved) : []
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const phaseTimeouts = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (isActive && !isPaused && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            completeReset()
            return 0
          }
          return time - 1
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
  }, [isActive, isPaused, timeRemaining])

  useEffect(() => {
    // Guide through phases
    if (isActive && !isPaused) {
      phaseTimeouts.current.forEach(t => clearTimeout(t))
      phaseTimeouts.current = []

      if (phase === 'breathing') {
        // 5 breath cycles, ~30 seconds total
        let breathCount = 0
        const breathCycle = () => {
          if (breathCount < 5 && isActive) {
            setCurrentBreath(breathCount + 1)
            setBreathPhase('inhale')
            
            phaseTimeouts.current.push(setTimeout(() => setBreathPhase('hold'), 4000))
            phaseTimeouts.current.push(setTimeout(() => setBreathPhase('exhale'), 5000))
            phaseTimeouts.current.push(setTimeout(() => {
              breathCount++
              if (breathCount < 5) {
                breathCycle()
              } else {
                setPhase('labeling')
              }
            }, 9000))
          }
        }
        breathCycle()
      } else if (phase === 'labeling') {
        phaseTimeouts.current.push(setTimeout(() => setPhase('purpose'), 20000))
      } else if (phase === 'purpose') {
        phaseTimeouts.current.push(setTimeout(() => setPhase('action'), 20000))
      } else if (phase === 'action') {
        phaseTimeouts.current.push(setTimeout(() => setPhase('complete'), 20000))
      }
    }

    return () => {
      phaseTimeouts.current.forEach(t => clearTimeout(t))
    }
  }, [phase, isActive, isPaused])

  const startReset = () => {
    setIsActive(true)
    setIsPaused(false)
    setTimeRemaining(90)
    setPhase('breathing')
    setCurrentBreath(0)
  }

  const pauseReset = () => {
    setIsPaused(!isPaused)
  }

  const stopReset = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeRemaining(90)
    setPhase('ready')
    setCurrentBreath(0)
    phaseTimeouts.current.forEach(t => clearTimeout(t))
  }

  const completeReset = () => {
    setIsActive(false)
    setPhase('complete')
    
    const session: ResetSession = {
      timestamp: new Date().toISOString(),
      preStress,
      postStress,
      emotionLabel,
      purpose,
      nextAction
    }
    
    const updatedSessions = [session, ...sessions]
    setSessions(updatedSessions)
    localStorage.setItem('regulation-reset-sessions', JSON.stringify(updatedSessions))
  }

  const getPhaseInstructions = () => {
    switch (phase) {
      case 'ready':
        return 'Sit upright, feet grounded, unclench your jaw. Ready to begin your 90-second reset?'
      case 'breathing':
        return `Breath ${currentBreath}/5: ${breathPhase === 'inhale' ? 'Inhale 4s' : breathPhase === 'hold' ? 'Hold 1s' : 'Exhale 4s'}`
      case 'labeling':
        return 'Label your emotions precisely (2 words)'
      case 'purpose':
        return 'State your purpose for the next 30 minutes'
      case 'action':
        return 'Define one ≤10-minute next action'
      case 'complete':
        return '✅ Reset complete! How do you feel?'
      default:
        return ''
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStressDelta = () => {
    const delta = preStress - postStress
    if (delta > 0) return `−${delta}`
    if (delta < 0) return `+${Math.abs(delta)}`
    return '0'
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">90-Second Reset Protocol</h3>
        <p className="text-gray-600">
          Your neurochemical cascade completes in 90 seconds. Let's use that window wisely.
        </p>
      </div>

      {/* Pre-Reset Assessment */}
      {!isActive && phase === 'ready' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Before We Begin</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Stress Level (1-10)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preStress}
                  onChange={(e) => setPreStress(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-8 text-center font-bold text-lg">{preStress}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timer Display */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-800 mb-4">
            {formatTime(timeRemaining)}
          </div>
          
          <div className="text-lg text-gray-600 mb-6 min-h-[60px]">
            {getPhaseInstructions()}
          </div>

          {/* Breathing Visual */}
          {phase === 'breathing' && (
            <div className="mb-6">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(num => (
                  <div
                    key={num}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                      num <= currentBreath 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    breathPhase === 'inhale' ? 'bg-blue-400' :
                    breathPhase === 'hold' ? 'bg-purple-400' :
                    'bg-green-400'
                  }`}
                  style={{
                    width: breathPhase === 'inhale' ? '40%' :
                           breathPhase === 'hold' ? '70%' :
                           '100%'
                  }}
                />
              </div>
            </div>
          )}

          {/* Input Fields for Each Phase */}
          {phase === 'labeling' && (
            <div className="mb-6">
              <input
                type="text"
                value={emotionLabel}
                onChange={(e) => setEmotionLabel(e.target.value)}
                placeholder="e.g., frustrated, overwhelmed"
                className="w-full px-4 py-2 border rounded-lg text-center"
                maxLength={30}
              />
            </div>
          )}

          {phase === 'purpose' && (
            <div className="mb-6">
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Complete project review calmly"
                className="w-full px-4 py-2 border rounded-lg text-center"
                maxLength={60}
              />
            </div>
          )}

          {phase === 'action' && (
            <div className="mb-6">
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="e.g., Draft 4-bullet summary email"
                className="w-full px-4 py-2 border rounded-lg text-center"
                maxLength={60}
              />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center gap-3">
            {!isActive ? (
              <button
                onClick={startReset}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Start Reset
              </button>
            ) : (
              <>
                <button
                  onClick={pauseReset}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={stopReset}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Post-Reset Assessment */}
      {phase === 'complete' && (
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-4">Reset Complete!</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post-Reset Stress Level (1-10)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={postStress}
                  onChange={(e) => setPostStress(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-8 text-center font-bold text-lg">{postStress}</span>
              </div>
            </div>
            
            <div className="bg-white rounded p-4">
              <p className="text-sm text-gray-600 mb-2">Stress Change:</p>
              <p className={`text-2xl font-bold ${
                preStress > postStress ? 'text-green-600' :
                preStress < postStress ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {getStressDelta()} points
              </p>
            </div>

            <div className="bg-white rounded p-4 space-y-2">
              <p className="text-sm text-gray-600">Your Reset Summary:</p>
              <p><strong>Emotion:</strong> {emotionLabel || 'Not specified'}</p>
              <p><strong>Purpose:</strong> {purpose || 'Not specified'}</p>
              <p><strong>Next Action:</strong> {nextAction || 'Not specified'}</p>
            </div>

            <button
              onClick={() => {
                setPhase('ready')
                setTimeRemaining(90)
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Practice Another Reset
            </button>
          </div>
        </div>
      )}

      {/* Session History */}
      {sessions.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Recent Sessions</h4>
          <div className="space-y-2">
            {sessions.slice(0, 3).map((session, index) => (
              <div key={index} className="bg-white rounded p-3 text-sm">
                <div className="flex justify-between">
                  <span>{new Date(session.timestamp).toLocaleDateString()}</span>
                  <span className={`font-bold ${
                    session.preStress > session.postStress ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {session.preStress} → {session.postStress}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{session.emotionLabel}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
