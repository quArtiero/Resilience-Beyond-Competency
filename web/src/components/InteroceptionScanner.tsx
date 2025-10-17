import { useState, useEffect, useRef } from 'react'
import { Activity, Brain, Heart, Timer, RefreshCw } from 'lucide-react'

interface ScanResult {
  round: 'A' | 'B'
  sensations: string[]
  emotions: string[]
  timestamp: string
}

export function InteroceptionScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [currentRound, setCurrentRound] = useState<'A' | 'B'>('A')
  const [timeLeft, setTimeLeft] = useState(90)
  const [results, setResults] = useState<ScanResult[]>(() => {
    const saved = localStorage.getItem('interoception-results')
    return saved ? JSON.parse(saved) : []
  })
  
  const [currentSensations, setCurrentSensations] = useState<string[]>([])
  const [currentEmotions, setCurrentEmotions] = useState<string[]>([])
  const [customSensation, setCustomSensation] = useState('')
  const [customEmotion, setCustomEmotion] = useState('')
  
  const intervalRef = useRef<NodeJS.Timeout>()

  const bodyZones = {
    'Head & Face': ['jaw tension', 'face heat', 'head pressure', 'eye strain', 'temple pulse'],
    'Neck & Shoulders': ['neck stiffness', 'shoulder rise', 'throat constriction', 'voice tension'],
    'Chest & Heart': ['chest tightness', 'heart racing', 'breath shallow', 'chest flutter', 'ribs constricted'],
    'Core & Stomach': ['stomach knots', 'gut drop', 'nausea', 'butterflies', 'core tension'],
    'Arms & Hands': ['hands buzzing', 'fists clenched', 'arm tension', 'finger tapping', 'palm sweating'],
    'Back & Posture': ['back stiffness', 'spine curved', 'lower back ache', 'posture collapsed']
  }

  const emotionGranularity = {
    'Stressed': ['overwhelmed', 'time-pressed', 'scattered', 'stretched', 'overloaded'],
    'Angry': ['frustrated', 'irritated', 'defensive', 'indignant', 'resentful'],
    'Anxious': ['worried', 'uneasy', 'on-edge', 'apprehensive', 'uncertain'],
    'Sad': ['disappointed', 'let-down', 'depleted', 'lonely', 'discouraged'],
    'Calm': ['centered', 'grounded', 'steady', 'balanced', 'present'],
    'Energized': ['motivated', 'focused', 'alive', 'inspired', 'engaged']
  }

  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem('interoception-results', JSON.stringify(results))
    }
  }, [results])

  useEffect(() => {
    if (isScanning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isScanning) {
      completeRound()
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isScanning, timeLeft])

  const startScan = () => {
    setIsScanning(true)
    setTimeLeft(90)
    setCurrentSensations([])
    setCurrentEmotions([])
  }

  const toggleSensation = (sensation: string) => {
    setCurrentSensations(prev =>
      prev.includes(sensation)
        ? prev.filter(s => s !== sensation)
        : [...prev, sensation].slice(0, 5) // Max 5 sensations
    )
  }

  const toggleEmotion = (emotion: string) => {
    setCurrentEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion].slice(0, 3) // Max 3 emotions
    )
  }

  const addCustomSensation = () => {
    if (customSensation.trim() && currentSensations.length < 5) {
      setCurrentSensations([...currentSensations, customSensation.trim()])
      setCustomSensation('')
    }
  }

  const addCustomEmotion = () => {
    if (customEmotion.trim() && currentEmotions.length < 3) {
      setCurrentEmotions([...currentEmotions, customEmotion.trim()])
      setCustomEmotion('')
    }
  }

  const completeRound = () => {
    const newResult: ScanResult = {
      round: currentRound,
      sensations: currentSensations,
      emotions: currentEmotions,
      timestamp: new Date().toISOString()
    }
    
    setResults([...results, newResult])
    setIsScanning(false)
    
    if (currentRound === 'A') {
      setCurrentRound('B')
    }
  }

  const reset = () => {
    setCurrentRound('A')
    setResults([])
    setCurrentSensations([])
    setCurrentEmotions([])
    setIsScanning(false)
    setTimeLeft(90)
  }

  const getProgress = () => {
    if (currentRound === 'A' && results.length === 0) return 0
    if (currentRound === 'B' && results.length === 1) return 50
    if (results.length >= 2) return 100
    return 25
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Interoception Scanner</h2>
          </div>
          <div className="text-sm text-gray-600">
            Progress: {getProgress()}%
          </div>
        </div>
        <p className="text-gray-600">
          Build awareness of your body's signals. Two 90-second rounds to feel, name, and understand your internal state.
        </p>
      </div>

      {/* Current Round */}
      {!isScanning && results.length < 2 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Round {currentRound}: {currentRound === 'A' ? 'Feel First' : 'Breath + Label'}
          </h3>
          
          {currentRound === 'A' ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Close your eyes and scan your body from head to toe. Notice sensations without judgment.
                Focus on jaw, shoulders, chest, gut, and hands.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Instructions:</strong> Press start, close your eyes, and scan for 90 seconds.
                  When done, log 3 sensations and 2 emotions.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Take 5 slow breaths first, then re-scan. Notice what shifted after breathing and labeling.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <strong>Instructions:</strong> 5 deep breaths → scan again → update your labels.
                  What changed? What stayed the same?
                </p>
              </div>
            </div>
          )}
          
          <button
            onClick={startScan}
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start {currentRound === 'A' ? 'Initial' : 'Follow-up'} Scan
          </button>
        </div>
      )}

      {/* Active Scanning */}
      {isScanning && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Timer className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{timeLeft}s</h3>
            <p className="text-gray-600 mt-2">
              {timeLeft > 60 ? 'Close your eyes and scan...' :
               timeLeft > 30 ? 'Notice sensations without judgment...' :
               'Prepare to log what you noticed...'}
            </p>
          </div>

          {/* Body Sensations */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Body Sensations ({currentSensations.length}/5)
            </h4>
            <div className="space-y-3">
              {Object.entries(bodyZones).map(([zone, sensations]) => (
                <div key={zone} className="border rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">{zone}</p>
                  <div className="flex flex-wrap gap-2">
                    {sensations.map(sensation => (
                      <button
                        key={sensation}
                        onClick={() => toggleSensation(sensation)}
                        disabled={currentSensations.length >= 5 && !currentSensations.includes(sensation)}
                        className={`
                          px-3 py-1 rounded-full text-xs transition-all
                          ${currentSensations.includes(sensation)
                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                          } border hover:scale-105
                          ${currentSensations.length >= 5 && !currentSensations.includes(sensation)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''}
                        `}
                      >
                        {sensation}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={customSensation}
                onChange={(e) => setCustomSensation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSensation()}
                placeholder="Add custom sensation..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                disabled={currentSensations.length >= 5}
              />
              <button
                onClick={addCustomSensation}
                disabled={!customSensation.trim() || currentSensations.length >= 5}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>

          {/* Emotions */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Emotional Labels ({currentEmotions.length}/3)
            </h4>
            <div className="space-y-3">
              {Object.entries(emotionGranularity).map(([category, emotions]) => (
                <div key={category} className="border rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {emotions.map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => toggleEmotion(emotion)}
                        disabled={currentEmotions.length >= 3 && !currentEmotions.includes(emotion)}
                        className={`
                          px-3 py-1 rounded-full text-xs transition-all
                          ${currentEmotions.includes(emotion)
                            ? 'bg-purple-100 text-purple-700 border-purple-300'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                          } border hover:scale-105
                          ${currentEmotions.length >= 3 && !currentEmotions.includes(emotion)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''}
                        `}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={customEmotion}
                onChange={(e) => setCustomEmotion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomEmotion()}
                placeholder="Add custom emotion..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                disabled={currentEmotions.length >= 3}
              />
              <button
                onClick={addCustomEmotion}
                disabled={!customEmotion.trim() || currentEmotions.length >= 3}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>

          {timeLeft <= 10 && (
            <button
              onClick={completeRound}
              className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Complete Round {currentRound}
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Your Scan Results</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  Round {result.round}: {result.round === 'A' ? 'Initial Scan' : 'After Breathing'}
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Sensations:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.sensations.map((s, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Emotions:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.emotions.map((e, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-sm">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {results.length === 2 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Reflection:</strong> What changed between rounds? Did breathing and labeling shift your state?
                This awareness is your foundation for emotional regulation.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Reset */}
      {results.length === 2 && (
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Start New Session
          </button>
        </div>
      )}
    </div>
  )
}
