import { useState } from 'react'

interface EQDimension {
  name: string
  description: string
  questions: string[]
  score?: number
}

const dimensions: EQDimension[] = [
  {
    name: 'Self-Awareness',
    description: 'Understanding your emotions, strengths, weaknesses, values, and goals',
    questions: [
      'I recognize my emotions as they occur',
      'I understand what triggers my emotional responses',
      'I can accurately assess my strengths and limitations'
    ]
  },
  {
    name: 'Self-Regulation',
    description: 'Managing disruptive emotions and impulses effectively',
    questions: [
      'I can calm myself when feeling anxious or upset',
      'I think before acting on emotional impulses',
      'I adapt well to change and uncertainty'
    ]
  },
  {
    name: 'Motivation',
    description: 'Being driven to achieve for the sake of achievement',
    questions: [
      'I persist despite obstacles and setbacks',
      'I set challenging goals for myself',
      'I maintain optimism even after failures'
    ]
  },
  {
    name: 'Empathy',
    description: 'Understanding and sharing the feelings of others',
    questions: [
      'I can sense how others are feeling',
      'I see things from other people\'s perspectives',
      'I respond appropriately to others\' emotional cues'
    ]
  },
  {
    name: 'Social Skills',
    description: 'Managing relationships and building networks',
    questions: [
      'I communicate clearly and persuasively',
      'I work well in teams and collaborations',
      'I can resolve conflicts constructively'
    ]
  }
]

export function EQAssessment() {
  const [currentDimension, setCurrentDimension] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const totalQuestions = dimensions.reduce((acc, dim) => acc + dim.questions.length, 0)
  const answeredQuestions = Object.keys(responses).length

  const handleResponse = (score: number) => {
    const key = `${currentDimension}-${currentQuestion}`
    setResponses({ ...responses, [key]: score })

    // Move to next question
    if (currentQuestion < dimensions[currentDimension].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1)
      setCurrentQuestion(0)
    } else {
      // Assessment complete
      calculateScores()
    }
  }

  const calculateScores = () => {
    const scores: Record<string, number> = {}
    
    dimensions.forEach((dim, dimIndex) => {
      let dimScore = 0
      dim.questions.forEach((_, qIndex) => {
        const response = responses[`${dimIndex}-${qIndex}`] || 0
        dimScore += response
      })
      scores[dim.name] = Math.round((dimScore / (dim.questions.length * 5)) * 100)
    })
    
    setDimensionScores(scores)
    setIsComplete(true)
  }

  const getOverallEQ = () => {
    const scores = Object.values(dimensionScores)
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  }

  const getEQLevel = (score: number) => {
    if (score >= 80) return { level: 'Exceptional', color: 'text-green-600' }
    if (score >= 60) return { level: 'Strong', color: 'text-blue-600' }
    if (score >= 40) return { level: 'Developing', color: 'text-yellow-600' }
    return { level: 'Emerging', color: 'text-orange-600' }
  }

  const restartAssessment = () => {
    setCurrentDimension(0)
    setCurrentQuestion(0)
    setResponses({})
    setDimensionScores({})
    setIsComplete(false)
    setShowIntro(true)
  }

  // Spider Chart Drawing
  const drawSpiderChart = () => {
    const centerX = 150
    const centerY = 150
    const radius = 120
    const angleStep = (Math.PI * 2) / dimensions.length

    // Create points for the spider chart
    const points = dimensions.map((dim, index) => {
      const score = dimensionScores[dim.name] || 0
      const angle = angleStep * index - Math.PI / 2
      const r = (radius * score) / 100
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
        labelX: centerX + (radius + 20) * Math.cos(angle),
        labelY: centerY + (radius + 20) * Math.sin(angle),
        name: dim.name,
        score
      }
    })

    // Create path for the filled area
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z'

    return (
      <svg viewBox="0 0 300 300" className="w-full max-w-md">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map(percent => (
          <circle
            key={percent}
            cx={centerX}
            cy={centerY}
            r={(radius * percent) / 100}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {dimensions.map((_, index) => {
          const angle = angleStep * index - Math.PI / 2
          const x2 = centerX + radius * Math.cos(angle)
          const y2 = centerY + radius * Math.sin(angle)
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x2}
              y2={y2}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          )
        })}
        
        {/* Filled area */}
        <path
          d={pathData}
          fill="rgba(99, 102, 241, 0.3)"
          stroke="rgb(99, 102, 241)"
          strokeWidth="2"
        />
        
        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="rgb(99, 102, 241)"
            stroke="white"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {points.map((p, i) => (
          <g key={i}>
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              className="text-xs font-semibold fill-gray-700"
              dy={p.labelY < centerY ? -5 : 15}
            >
              {p.name}
            </text>
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              className="text-xs fill-gray-500"
              dy={p.labelY < centerY ? 10 : 30}
            >
              {p.score}%
            </text>
          </g>
        ))}
      </svg>
    )
  }

  if (showIntro) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🧠 Emotional Intelligence Assessment
        </h2>
        <p className="text-gray-600 mb-6">
          This assessment measures five key dimensions of emotional intelligence. 
          Answer honestly based on how you typically think, feel, and act.
        </p>
        
        <div className="space-y-4 mb-6">
          {dimensions.map((dim, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
              <h3 className="font-semibold text-gray-800">{dim.name}</h3>
              <p className="text-sm text-gray-600">{dim.description}</p>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => setShowIntro(false)}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Start Assessment
        </button>
      </div>
    )
  }

  if (isComplete) {
    const overallScore = getOverallEQ()
    const eqLevel = getEQLevel(overallScore)

    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📊 Your EQ Profile
        </h2>
        
        {/* Overall Score */}
        <div className="bg-white rounded-xl p-6 mb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Overall Emotional Intelligence</h3>
          <div className="text-5xl font-bold text-indigo-600 mb-2">{overallScore}%</div>
          <div className={`text-lg font-semibold ${eqLevel.color}`}>
            {eqLevel.level}
          </div>
        </div>

        {/* Spider Chart */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Dimension Breakdown</h3>
          <div className="flex justify-center">
            {drawSpiderChart()}
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Detailed Analysis</h3>
          <div className="space-y-3">
            {dimensions.map(dim => {
              const score = dimensionScores[dim.name]
              const level = getEQLevel(score)
              return (
                <div key={dim.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-800">{dim.name}</div>
                    <div className="text-sm text-gray-600">{dim.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{score}%</div>
                    <div className={`text-sm font-semibold ${level.color}`}>{level.level}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={restartAssessment}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Retake Assessment
          </button>
          <button
            onClick={() => {
              const results = `EQ Assessment Results\n` +
                `Overall Score: ${overallScore}% (${eqLevel.level})\n\n` +
                dimensions.map(d => `${d.name}: ${dimensionScores[d.name]}%`).join('\n')
              navigator.clipboard.writeText(results)
            }}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Copy Results
          </button>
        </div>
      </div>
    )
  }

  // Assessment in progress
  const currentDim = dimensions[currentDimension]
  const currentQ = currentDim.questions[currentQuestion]
  const progress = (answeredQuestions / totalQuestions) * 100

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-xl">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {answeredQuestions + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Dimension */}
      <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-indigo-500">
        <h3 className="font-semibold text-gray-800">{currentDim.name}</h3>
        <p className="text-sm text-gray-600">{currentDim.description}</p>
      </div>

      {/* Current Question */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <p className="text-lg font-medium text-gray-800 mb-6">{currentQ}</p>
        
        <div className="space-y-3">
          {[
            { value: 1, label: 'Never' },
            { value: 2, label: 'Rarely' },
            { value: 3, label: 'Sometimes' },
            { value: 4, label: 'Often' },
            { value: 5, label: 'Always' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleResponse(option.value)}
              className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-between group"
            >
              <span className="font-medium text-gray-700 group-hover:text-indigo-700">
                {option.label}
              </span>
              <span className="text-2xl font-bold text-gray-400 group-hover:text-indigo-600">
                {option.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
