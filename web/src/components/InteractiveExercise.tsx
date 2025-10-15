import { useState } from 'react'

interface FrameSpottingExercise {
  id: number
  statement: string
  exampleMethod?: string
  examplePurpose?: string
  exampleAlternatives?: string[]
}

interface FrameSpottingProps {
  exercises: FrameSpottingExercise[]
  onComplete?: (responses: any[]) => void
}

export function FrameSpottingDrill({ exercises, onComplete }: FrameSpottingProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<any[]>([])
  const [currentResponse, setCurrentResponse] = useState({
    method: '',
    purpose: '',
    alternative1: '',
    alternative2: ''
  })
  const [showExample, setShowExample] = useState(false)

  const currentExercise = exercises[currentIndex]
  const isLastExercise = currentIndex === exercises.length - 1

  const handleNext = () => {
    const newResponses = [...responses, { ...currentResponse, statement: currentExercise.statement }]
    setResponses(newResponses)
    
    if (isLastExercise) {
      onComplete?.(newResponses)
    } else {
      setCurrentIndex(currentIndex + 1)
      setCurrentResponse({ method: '', purpose: '', alternative1: '', alternative2: '' })
      setShowExample(false)
    }
  }

  const canProceed = currentResponse.method && currentResponse.purpose && 
                     currentResponse.alternative1 && currentResponse.alternative2

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Frame-Spotting Exercise</h3>
          <span className="text-sm bg-white px-3 py-1 rounded-full text-gray-600">
            {currentIndex + 1} of {exercises.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <p className="text-lg font-medium text-gray-800 mb-4">
          "{currentExercise.statement}"
        </p>
        
        {currentIndex === 0 && (
          <button
            onClick={() => setShowExample(!showExample)}
            className="text-sm text-primary hover:text-primary/80 underline mb-4"
          >
            {showExample ? 'Hide Example' : 'Show Example'}
          </button>
        )}
        
        {showExample && currentExercise.exampleMethod && (
          <div className="p-4 bg-gray-50 rounded-lg mb-4 text-sm">
            <p><span className="font-semibold">Method:</span> {currentExercise.exampleMethod}</p>
            <p><span className="font-semibold">Purpose:</span> {currentExercise.examplePurpose}</p>
            <p><span className="font-semibold">Alternatives:</span></p>
            <ul className="ml-4 list-disc">
              {currentExercise.exampleAlternatives?.map((alt, i) => (
                <li key={i}>{alt}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1. What's the assumed method?
          </label>
          <input
            type="text"
            value={currentResponse.method}
            onChange={(e) => setCurrentResponse({ ...currentResponse, method: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="The method/approach being used..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. What's the true purpose?
          </label>
          <input
            type="text"
            value={currentResponse.purpose}
            onChange={(e) => setCurrentResponse({ ...currentResponse, purpose: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="The underlying goal..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            3. Two alternative methods that preserve the purpose:
          </label>
          <input
            type="text"
            value={currentResponse.alternative1}
            onChange={(e) => setCurrentResponse({ ...currentResponse, alternative1: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary mb-2"
            placeholder="Alternative 1..."
          />
          <input
            type="text"
            value={currentResponse.alternative2}
            onChange={(e) => setCurrentResponse({ ...currentResponse, alternative2: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Alternative 2..."
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`btn-primary ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLastExercise ? 'Complete Exercise' : 'Next Statement →'}
        </button>
      </div>
    </div>
  )
}

export function AlphabetNumberSwitch() {
  const [isRunning, setIsRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  const correctSequence = 'A-1-B-2-C-3-D-4-E-5-F-6-G-7-H-8-I-9-J-10-K-11-L-12-M-13'

  const startExercise = () => {
    setIsRunning(true)
    setTimeElapsed(0)
    setUserInput('')
    setShowResults(false)
    
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    setTimerInterval(interval)
  }

  const stopExercise = () => {
    setIsRunning(false)
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    checkResults()
  }

  const checkResults = () => {
    setShowResults(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateAccuracy = () => {
    const userParts = userInput.trim().split('-')
    const correctParts = correctSequence.split('-')
    let matches = 0
    
    for (let i = 0; i < Math.min(userParts.length, correctParts.length); i++) {
      if (userParts[i] === correctParts[i]) matches++
    }
    
    return Math.round((matches / correctParts.length) * 100)
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Alphabet-Number Switch Drill</h3>
      
      {!isRunning && !showResults && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-6">
            Write the sequence: A-1-B-2-C-3... up to M-13 as fast as you can!
          </p>
          <button onClick={startExercise} className="btn-primary">
            Start Exercise
          </button>
        </div>
      )}

      {isRunning && (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{formatTime(timeElapsed)}</p>
            <p className="text-sm text-gray-500">Time Elapsed</p>
          </div>

          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono"
            placeholder="Type: A-1-B-2-C-3-D-4..."
            autoFocus
          />

          <div className="flex justify-center space-x-4">
            <button onClick={stopExercise} className="btn-accent">
              Finish
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Your Results:</h4>
            <div className="space-y-2">
              <p><span className="font-medium">Time:</span> {formatTime(timeElapsed)}</p>
              <p><span className="font-medium">Accuracy:</span> {calculateAccuracy()}%</p>
              <p><span className="font-medium">Your sequence:</span></p>
              <p className="font-mono text-sm bg-gray-50 p-2 rounded">{userInput || '(empty)'}</p>
            </div>
          </div>

          <div className="text-center">
            <button onClick={startExercise} className="btn-primary">
              Try Again
            </button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            💡 Tip: If you stumbled, pause, breathe, and resume slowly. The feel of switching is effortful at first—then it smooths.
          </div>
        </div>
      )}
    </div>
  )
}

export function FiveUsesChallenge() {
  const [selectedObject, setSelectedObject] = useState('')
  const [uses, setUses] = useState(['', '', '', '', ''])
  const [timer, setTimer] = useState(180) // 3 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const objects = ['Paperclip', 'Rubber band', 'Receipt', 'Post-it note', 'Coffee cup', 'Shoelace']

  const startChallenge = () => {
    if (!selectedObject) return
    setIsRunning(true)
    setShowResults(false)
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          finishChallenge()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const finishChallenge = () => {
    setIsRunning(false)
    setShowResults(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const filledUses = uses.filter(use => use.trim() !== '').length

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
      <h3 className="text-lg font-bold text-gray-800 mb-4">5 Uses Challenge</h3>

      {!isRunning && !showResults && (
        <div className="space-y-4">
          <p className="text-gray-600">
            Choose an object and list 5 creative uses beyond the obvious!
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            {objects.map(obj => (
              <button
                key={obj}
                onClick={() => setSelectedObject(obj)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedObject === obj 
                    ? 'border-primary bg-primary/10 text-primary font-medium' 
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                {obj}
              </button>
            ))}
          </div>

          <div className="text-center pt-4">
            <button 
              onClick={startChallenge}
              disabled={!selectedObject}
              className={`btn-primary ${!selectedObject ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Start 3-Minute Challenge
            </button>
          </div>
        </div>
      )}

      {isRunning && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Object: {selectedObject}</h4>
            <span className={`text-2xl font-bold ${timer < 30 ? 'text-red-500' : 'text-primary'}`}>
              {formatTime(timer)}
            </span>
          </div>

          <div className="space-y-2">
            {uses.map((use, index) => (
              <input
                key={index}
                type="text"
                value={use}
                onChange={(e) => {
                  const newUses = [...uses]
                  newUses[index] = e.target.value
                  setUses(newUses)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder={`Use #${index + 1}...`}
              />
            ))}
          </div>

          <button onClick={finishChallenge} className="btn-accent w-full">
            Finish Early
          </button>
        </div>
      )}

      {showResults && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Your Creative Uses for {selectedObject}:</h4>
            <ul className="space-y-2">
              {uses.map((use, index) => use.trim() && (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{use}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t">
              <p className="font-medium">Score: {filledUses}/5 uses</p>
              <p className="text-sm text-gray-600 mt-1">
                {filledUses >= 5 ? '🎉 Excellent creativity!' : 
                 filledUses >= 3 ? '👍 Good start! Try for more next time.' : 
                 '💡 Keep practicing to boost your creative thinking!'}
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              setUses(['', '', '', '', ''])
              setTimer(180)
              setSelectedObject('')
              setShowResults(false)
            }} 
            className="btn-primary w-full"
          >
            Try Another Object
          </button>
        </div>
      )}
    </div>
  )
}
