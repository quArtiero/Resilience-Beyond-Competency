import { useState, useEffect, useRef } from 'react'

interface BreathingExerciseProps {
  inhaleTime?: number  // in seconds
  holdTime?: number
  exhaleTime?: number
  cycles?: number
}

export function BreathingExercise({ 
  inhaleTime = 4, 
  holdTime = 2, 
  exhaleTime = 6,
  cycles = 5 
}: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [phase, setPhase] = useState<'ready' | 'countdown' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready')
  const [currentCycle, setCurrentCycle] = useState(0)
  const [phaseTime, setPhaseTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [circleScale, setCircleScale] = useState(1)
  const [breathOpacity, setBreathOpacity] = useState(0.6)
  const [countdown, setCountdown] = useState(0)
  
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const phaseStartRef = useRef<number>(0)
  const pauseStartRef = useRef<number>(0)
  const totalPausedRef = useRef<number>(0)
  const phaseRef = useRef<'ready' | 'countdown' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready')
  const cycleRef = useRef<number>(0)
  const isActiveRef = useRef<boolean>(false)
  const isPausedRef = useRef<boolean>(false)
  const countdownRef = useRef<number>(0)

  // Calculate total exercise time
  const cycleTime = inhaleTime + holdTime + exhaleTime
  const totalExerciseTime = cycleTime * cycles

  const startExercise = () => {
    // Start with countdown
    setIsActive(true)
    setIsPaused(false)
    setPhase('countdown')
    setCountdown(3)
    setCurrentCycle(0)
    setPhaseTime(0)
    setTotalTime(0)
    setCircleScale(0.8) // Start small for dramatic effect
    setBreathOpacity(0.4)
    
    isActiveRef.current = true
    isPausedRef.current = false
    phaseRef.current = 'countdown'
    countdownRef.current = 3
    cycleRef.current = 0
    
    // Start countdown
    animateCountdown()
  }

  const animateCountdown = () => {
    if (countdownRef.current > 0) {
      setCountdown(countdownRef.current)
      
      // Pulse effect for countdown
      setCircleScale(0.8 + (0.1 * (4 - countdownRef.current)))
      
      setTimeout(() => {
        countdownRef.current--
        if (countdownRef.current > 0) {
          animateCountdown()
        } else {
          // Start actual exercise
          startBreathing()
        }
      }, 1000)
    }
  }

  const startBreathing = () => {
    setCountdown(0)
    setCurrentCycle(1)
    setPhase('inhale')
    setPhaseTime(inhaleTime)
    setCircleScale(1.0)  // Start at base size
    setBreathOpacity(0.5) // Start with base opacity
    
    phaseRef.current = 'inhale'
    cycleRef.current = 1
    
    const now = performance.now()
    startTimeRef.current = now
    phaseStartRef.current = now
    totalPausedRef.current = 0
    
    animationRef.current = requestAnimationFrame(animate)
  }

  const animate = (timestamp: number) => {
    if (!startTimeRef.current || !isActiveRef.current || isPausedRef.current) return
    
    const elapsed = (timestamp - startTimeRef.current - totalPausedRef.current) / 1000
    setTotalTime(elapsed)

    const phaseElapsed = (timestamp - phaseStartRef.current - totalPausedRef.current) / 1000
    let phaseDuration = 0
    const currentPhase = phaseRef.current

    if (currentPhase === 'inhale') phaseDuration = inhaleTime
    else if (currentPhase === 'hold') phaseDuration = holdTime
    else if (currentPhase === 'exhale') phaseDuration = exhaleTime
    else return // Complete or ready state

    const timeLeft = Math.max(0, phaseDuration - phaseElapsed)
    setPhaseTime(timeLeft)

    // Real-time smooth animations
    if (currentPhase === 'inhale') {
      const progress = Math.min(1, phaseElapsed / inhaleTime)
      const smoothProgress = easeInOutSine(progress)
      const newScale = 1.0 + (0.6 * smoothProgress)
      const newOpacity = 0.5 + (0.3 * smoothProgress)
      setCircleScale(newScale)
      setBreathOpacity(newOpacity)
    } else if (currentPhase === 'hold') {
      // Gentle floating during hold
      const floatProgress = Math.sin(phaseElapsed * Math.PI * 2) * 0.02
      setCircleScale(1.6 + floatProgress)
      setBreathOpacity(0.8)
    } else if (currentPhase === 'exhale') {
      const progress = Math.min(1, phaseElapsed / exhaleTime)
      const smoothProgress = easeOutSine(progress)
      const newScale = 1.6 - (0.6 * smoothProgress)
      const newOpacity = 0.8 - (0.3 * smoothProgress)
      setCircleScale(newScale)
      setBreathOpacity(newOpacity)
    }

    // Check for phase transition
    if (phaseElapsed >= phaseDuration) {
      transitionToNextPhase(timestamp)
    } else {
      // Always request next frame if active
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  const easeInOutSine = (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2
  }

  const easeOutSine = (t: number): number => {
    return Math.sin((t * Math.PI) / 2)
  }

  const transitionToNextPhase = (timestamp: number) => {
    phaseStartRef.current = timestamp - totalPausedRef.current
    
    if (phaseRef.current === 'inhale') {
      phaseRef.current = 'hold'
      setPhase('hold')
      setPhaseTime(holdTime)
    } else if (phaseRef.current === 'hold') {
      phaseRef.current = 'exhale'
      setPhase('exhale')
      setPhaseTime(exhaleTime)
    } else if (phaseRef.current === 'exhale') {
      if (cycleRef.current < cycles) {
        cycleRef.current = cycleRef.current + 1
        setCurrentCycle(cycleRef.current)
        phaseRef.current = 'inhale'
        setPhase('inhale')
        setPhaseTime(inhaleTime)
      } else {
        // Exercise complete
        phaseRef.current = 'complete'
        isActiveRef.current = false
        setPhase('complete')
        setIsActive(false)
        setCircleScale(1)
        setBreathOpacity(0.6)
        return
      }
    }
    
    if (!isPausedRef.current) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  const pauseExercise = () => {
    if (isPausedRef.current) {
      // Resume
      const pauseDuration = performance.now() - pauseStartRef.current
      totalPausedRef.current += pauseDuration
      isPausedRef.current = false
      setIsPaused(false)
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Pause
      pauseStartRef.current = performance.now()
      isPausedRef.current = true
      setIsPaused(true)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }

  const stopExercise = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    isActiveRef.current = false
    isPausedRef.current = false
    phaseRef.current = 'ready'
    cycleRef.current = 0
    
    setIsActive(false)
    setIsPaused(false)
    setPhase('ready')
    setCurrentCycle(0)
    setPhaseTime(0)
    setTotalTime(0)
    setCircleScale(1)
    setBreathOpacity(0.6)
    
    startTimeRef.current = 0
    phaseStartRef.current = 0
    totalPausedRef.current = 0
  }

  const resetExercise = () => {
    stopExercise()
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const getPhaseText = () => {
    switch (phase) {
      case 'countdown': return countdown > 0 ? `${countdown}` : 'Begin!'
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'complete': return 'Complete! Well done!'
      default: return 'Ready to begin'
    }
  }

  const getPhaseEmoji = () => {
    switch (phase) {
      case 'countdown': return countdown > 0 ? '🔵' : '✨'
      case 'inhale': return '👃'
      case 'hold': return '⏸️'
      case 'exhale': return '💨'
      case 'complete': return '✨'
      default: return '🫁'
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'countdown': return 'from-indigo-400 to-blue-500'
      case 'inhale': return 'from-blue-400 to-cyan-500'
      case 'hold': return 'from-purple-400 to-indigo-500'
      case 'exhale': return 'from-green-400 to-emerald-500'
      case 'complete': return 'from-emerald-400 to-green-500'
      default: return 'from-gray-400 to-slate-500'
    }
  }

  const getProgressPercentage = () => {
    if (!isActive || totalExerciseTime === 0) return 0
    return Math.min(100, (totalTime / totalExerciseTime) * 100)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🫁 {Math.round(totalExerciseTime)}-Second Breathing Reset
        </h3>
        <p className="text-gray-600">
          {inhaleTime}s inhale • {holdTime}s hold • {exhaleTime}s exhale • {cycles} cycles
        </p>
      </div>

      {/* Progress Bar */}
      {isActive && phase !== 'countdown' && (
        <div className="mb-6 px-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Total: {Math.round(totalTime)}s</span>
            <span>{Math.round(totalExerciseTime - totalTime)}s remaining</span>
          </div>
        </div>
      )}

      {/* Phase Progress Indicator */}
      {isActive && phase !== 'countdown' && phase !== 'complete' && (
        <div className="mb-4 px-8">
          <div className="flex items-center justify-between mb-2 text-xs font-medium">
            <span className={phase === 'inhale' ? 'text-blue-600 font-bold' : 'text-gray-400'}>
              Inhale ({inhaleTime}s)
            </span>
            <span className={phase === 'hold' ? 'text-purple-600 font-bold' : 'text-gray-400'}>
              Hold ({holdTime}s)
            </span>
            <span className={phase === 'exhale' ? 'text-green-600 font-bold' : 'text-gray-400'}>
              Exhale ({exhaleTime}s)
            </span>
          </div>
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
            {/* Phase-specific progress bar */}
            <div className="absolute inset-0 flex">
              <div className={`flex-1 ${phase === 'inhale' ? 'bg-blue-100' : 'bg-gray-50'} relative overflow-hidden`}>
                {phase === 'inhale' && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-l-full"
                    style={{ 
                      width: `${((inhaleTime - phaseTime) / inhaleTime) * 100}%`,
                      transition: 'none'
                    }}
                  />
                )}
              </div>
              <div className={`flex-1 ${phase === 'hold' ? 'bg-purple-100' : 'bg-gray-50'} relative overflow-hidden border-x border-gray-200`}>
                {phase === 'hold' && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-purple-500"
                    style={{ 
                      width: `${((holdTime - phaseTime) / holdTime) * 100}%`,
                      transition: 'none'
                    }}
                  />
                )}
              </div>
              <div className={`flex-1 ${phase === 'exhale' ? 'bg-green-100' : 'bg-gray-50'} relative overflow-hidden`}>
                {phase === 'exhale' && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-green-500 rounded-r-full"
                    style={{ 
                      width: `${((exhaleTime - phaseTime) / exhaleTime) * 100}%`,
                      transition: 'none'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Next phase indicator */}
          <div className="mt-2 text-center text-xs text-gray-500">
            {phase === 'inhale' && <span>Next: Hold for {holdTime}s ⏸️</span>}
            {phase === 'hold' && <span>Next: Exhale for {exhaleTime}s 💨</span>}
            {phase === 'exhale' && currentCycle < cycles && <span>Next: Inhale for {inhaleTime}s 👃</span>}
            {phase === 'exhale' && currentCycle >= cycles && <span>Final breath! 🎉</span>}
          </div>
        </div>
      )}

      {/* Visual Breathing Circle */}
      <div className="flex justify-center items-center mb-8 h-72 relative">
        {/* Background rings with pulse effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border-2 border-gray-200 opacity-30 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-gray-200 opacity-20"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border border-gray-100 opacity-10"></div>
        </div>
        
        <div className="relative">
          {/* Animated breathing circle - NO CSS transitions, using RAF */}
          <div 
            className={`w-48 h-48 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center shadow-2xl`}
            style={{
              transform: `scale(${circleScale})`,
              opacity: breathOpacity,
              transition: phase === 'countdown' ? 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
              filter: phase === 'countdown' ? 'blur(0px) brightness(1.2)' : 'blur(0px)',
              boxShadow: phase === 'countdown' && countdown > 0 ? 
                        `0 0 ${50 - countdown * 10}px rgba(99, 102, 241, 0.6)` :
                        phase === 'hold' ? '0 25px 50px rgba(0, 0, 0, 0.12)' :
                        '0 20px 40px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="text-white text-center">
              {phase === 'countdown' ? (
                <>
                  <div className="text-7xl font-bold animate-bounce">
                    {countdown > 0 ? countdown : '🚀'}
                  </div>
                  <div className="text-sm mt-2 opacity-80">
                    {countdown > 0 ? 'Get ready...' : 'Let\'s begin!'}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-2">{getPhaseEmoji()}</div>
                  <div className="text-2xl font-bold">
                    {getPhaseText()}
                  </div>
                  {isActive && phaseTime > 0 && phase !== 'complete' && (
                    <div className="text-lg mt-2 font-mono">
                      {Math.ceil(phaseTime)}s
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Cycle indicator */}
          {isActive && currentCycle > 0 && (
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-md">
                <span className="text-sm font-bold text-gray-700">
                  Cycle {currentCycle} of {cycles}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: cycles }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < currentCycle 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {!isActive && phase !== 'complete' && (
          <button
            onClick={startExercise}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Breathing Exercise
          </button>
        )}
        
        {isActive && phase !== 'countdown' && (
          <>
            <button
              onClick={pauseExercise}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={stopExercise}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Stop
            </button>
          </>
        )}

        {isActive && phase === 'countdown' && (
          <button
            onClick={stopExercise}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Cancel
          </button>
        )}
        
        {phase === 'complete' && (
          <button
            onClick={resetExercise}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white/70 backdrop-blur rounded-lg p-4 text-sm text-gray-700">
        <p className="font-semibold mb-2">🎯 Focus Tips:</p>
        <ul className="space-y-1 ml-4">
          <li>• Watch the circle expand as you inhale through your nose</li>
          <li>• Notice it pause while you hold gently</li>
          <li>• Feel it contract as you exhale slowly through your mouth</li>
          <li>• This activates your vagus nerve, shifting you to a calmer state</li>
        </ul>
      </div>

      {/* Science note */}
      {phase === 'complete' && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-300">
          <p className="text-green-800 text-sm">
            <strong>✨ Excellent work!</strong> You've completed {cycles} breathing cycles. Your parasympathetic nervous system is now activated, 
            improving focus and reducing tunnel vision. Notice how you feel more grounded? Use this tool whenever you spot rigidity signals!
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-green-700">
            <span>❤️ Heart rate likely decreased</span>
            <span>🧠 Prefrontal cortex re-engaged</span>
            <span>😌 Stress hormones reduced</span>
          </div>
        </div>
      )}

      {/* Pause indicator */}
      {isPaused && (
        <div className="fixed top-4 right-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg px-4 py-2 shadow-lg animate-pulse">
          <span className="text-yellow-800 font-semibold">⏸️ Exercise Paused</span>
        </div>
      )}
    </div>
  )
}