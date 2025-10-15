import { useState } from 'react'

interface RatingScaleProps {
  question: string
  minLabel?: string
  maxLabel?: string
  onChange?: (value: number) => void
  initialValue?: number
}

export function InteractiveRatingScale({ 
  question, 
  minLabel = "Rarely", 
  maxLabel = "Almost Always",
  onChange,
  initialValue = 0
}: RatingScaleProps) {
  const [value, setValue] = useState(initialValue)
  const [hover, setHover] = useState(0)

  const handleSelect = (rating: number) => {
    setValue(rating)
    onChange?.(rating)
  }

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
      <p className="text-gray-700 font-medium mb-4">{question}</p>
      
      <div className="flex items-center justify-center space-x-3">
        <span className="text-sm text-gray-500 w-20 text-right">{minLabel}</span>
        
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleSelect(rating)}
              onMouseEnter={() => setHover(rating)}
              onMouseLeave={() => setHover(0)}
              className={`
                w-12 h-12 rounded-full font-semibold transition-all duration-200 transform
                ${value === rating 
                  ? 'bg-primary text-white scale-110 shadow-lg' 
                  : hover >= rating
                  ? 'bg-primary/20 text-primary scale-105'
                  : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-primary/50'
                }
              `}
            >
              {rating}
            </button>
          ))}
        </div>
        
        <span className="text-sm text-gray-500 w-20">{maxLabel}</span>
      </div>
      
      {value > 0 && (
        <div className="mt-3 text-center">
          <span className="text-sm px-3 py-1 bg-white rounded-full text-primary font-medium">
            You selected: {value}/5
          </span>
        </div>
      )}
    </div>
  )
}

interface RatingSetProps {
  title: string
  questions: Array<{
    id: string
    text: string
  }>
  onComplete?: (scores: Record<string, number>) => void
}

export function InteractiveRatingSet({ title, questions, onComplete }: RatingSetProps) {
  const [scores, setScores] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  
  const handleRating = (id: string, value: number) => {
    const newScores = { ...scores, [id]: value }
    setScores(newScores)
    
    // Check if all questions are answered
    if (Object.keys(newScores).length === questions.length) {
      onComplete?.(newScores)
    }
  }

  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0)
  const maxScore = questions.length * 5
  const percentage = Math.round((totalScore / maxScore) * 100)
  const allAnswered = Object.keys(scores).length === questions.length

  const getScoreInterpretation = () => {
    const avgScore = totalScore / questions.length
    if (avgScore <= 2.3) return { level: "Rigid by default", message: "Great growth opportunity ahead!", color: "text-orange-600" }
    if (avgScore <= 3.4) return { level: "Mixed flexibility", message: "Powerful returns from technique practice", color: "text-yellow-600" }
    return { level: "Strong flexibility", message: "Focus on speed, empathy, and consistency", color: "text-green-600" }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {allAnswered && !showResults && (
          <button 
            onClick={() => setShowResults(true)}
            className="btn-primary text-sm"
          >
            View Results
          </button>
        )}
      </div>
      
      {questions.map((q, index) => (
        <InteractiveRatingScale
          key={q.id}
          question={`${index + 1}. ${q.text}`}
          onChange={(value) => handleRating(q.id, value)}
          initialValue={scores[q.id] || 0}
        />
      ))}
      
      {showResults && allAnswered && (
        <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Your Results</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Score:</span>
              <span className="text-2xl font-bold text-primary">{totalScore}/{maxScore}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <div className="text-center">
              <p className={`text-xl font-bold ${getScoreInterpretation().color}`}>
                {getScoreInterpretation().level}
              </p>
              <p className="text-gray-600 mt-1">
                {getScoreInterpretation().message}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-200 text-sm text-gray-600 text-center">
              💡 Record this score: {totalScore} - We'll revisit in Lesson 7
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
