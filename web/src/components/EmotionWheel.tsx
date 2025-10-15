import { useState } from 'react'

interface EmotionCategory {
  name: string
  color: string
  emotions: {
    primary: string
    secondary: string[]
  }[]
}

const emotionCategories: EmotionCategory[] = [
  {
    name: 'Joy',
    color: 'from-yellow-400 to-orange-400',
    emotions: [
      { primary: 'Happy', secondary: ['Cheerful', 'Content', 'Proud', 'Optimistic'] },
      { primary: 'Excited', secondary: ['Energetic', 'Enthusiastic', 'Eager', 'Playful'] },
      { primary: 'Grateful', secondary: ['Thankful', 'Appreciative', 'Blessed', 'Lucky'] }
    ]
  },
  {
    name: 'Sadness',
    color: 'from-blue-400 to-indigo-400',
    emotions: [
      { primary: 'Sad', secondary: ['Down', 'Blue', 'Melancholy', 'Somber'] },
      { primary: 'Lonely', secondary: ['Isolated', 'Abandoned', 'Forgotten', 'Empty'] },
      { primary: 'Hurt', secondary: ['Wounded', 'Betrayed', 'Disappointed', 'Let down'] }
    ]
  },
  {
    name: 'Fear',
    color: 'from-purple-400 to-pink-400',
    emotions: [
      { primary: 'Scared', secondary: ['Frightened', 'Terrified', 'Panicked', 'Alarmed'] },
      { primary: 'Anxious', secondary: ['Worried', 'Nervous', 'Tense', 'Stressed'] },
      { primary: 'Insecure', secondary: ['Inadequate', 'Inferior', 'Vulnerable', 'Helpless'] }
    ]
  },
  {
    name: 'Anger',
    color: 'from-red-400 to-rose-400',
    emotions: [
      { primary: 'Angry', secondary: ['Mad', 'Furious', 'Enraged', 'Livid'] },
      { primary: 'Frustrated', secondary: ['Irritated', 'Annoyed', 'Aggravated', 'Exasperated'] },
      { primary: 'Critical', secondary: ['Dismissive', 'Judgmental', 'Disapproving', 'Resentful'] }
    ]
  },
  {
    name: 'Surprise',
    color: 'from-teal-400 to-cyan-400',
    emotions: [
      { primary: 'Surprised', secondary: ['Amazed', 'Astonished', 'Shocked', 'Stunned'] },
      { primary: 'Confused', secondary: ['Puzzled', 'Perplexed', 'Bewildered', 'Baffled'] },
      { primary: 'Curious', secondary: ['Intrigued', 'Fascinated', 'Interested', 'Wonder'] }
    ]
  },
  {
    name: 'Disgust',
    color: 'from-green-400 to-emerald-400',
    emotions: [
      { primary: 'Disgusted', secondary: ['Repulsed', 'Revolted', 'Sickened', 'Nauseated'] },
      { primary: 'Disapproving', secondary: ['Contemptuous', 'Scornful', 'Disdainful', 'Loathing'] },
      { primary: 'Uncomfortable', secondary: ['Uneasy', 'Awkward', 'Disturbed', 'Troubled'] }
    ]
  }
]

export function EmotionWheel() {
  const [selectedCategory, setSelectedCategory] = useState<EmotionCategory | null>(null)
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null)
  const [selectedSecondary, setSelectedSecondary] = useState<string | null>(null)
  const [emotionHistory, setEmotionHistory] = useState<string[]>([])
  const [showReflection, setShowReflection] = useState(false)

  const handleCategorySelect = (category: EmotionCategory) => {
    setSelectedCategory(category)
    setSelectedPrimary(null)
    setSelectedSecondary(null)
  }

  const handlePrimarySelect = (primary: string) => {
    setSelectedPrimary(primary)
    setSelectedSecondary(null)
  }

  const handleSecondarySelect = (secondary: string) => {
    setSelectedSecondary(secondary)
    const fullEmotion = `${selectedCategory?.name} → ${selectedPrimary} → ${secondary}`
    setEmotionHistory([...emotionHistory, fullEmotion])
    setShowReflection(true)
  }

  const resetSelection = () => {
    setSelectedCategory(null)
    setSelectedPrimary(null)
    setSelectedSecondary(null)
    setShowReflection(false)
  }

  const clearHistory = () => {
    setEmotionHistory([])
    resetSelection()
  }

  // Draw the circular wheel
  const drawWheel = () => {
    const centerX = 200
    const centerY = 200
    const innerRadius = 60
    const middleRadius = 120
    const outerRadius = 180
    const angleStep = (Math.PI * 2) / emotionCategories.length

    return (
      <svg viewBox="0 0 400 400" className="w-full max-w-md cursor-pointer">
        {/* Outer ring - Categories */}
        {emotionCategories.map((category, index) => {
          const startAngle = index * angleStep - Math.PI / 2
          const endAngle = (index + 1) * angleStep - Math.PI / 2
          
          const x1 = centerX + outerRadius * Math.cos(startAngle)
          const y1 = centerY + outerRadius * Math.sin(startAngle)
          const x2 = centerX + outerRadius * Math.cos(endAngle)
          const y2 = centerY + outerRadius * Math.sin(endAngle)
          
          const x3 = centerX + middleRadius * Math.cos(startAngle)
          const y3 = centerY + middleRadius * Math.sin(startAngle)
          const x4 = centerX + middleRadius * Math.cos(endAngle)
          const y4 = centerY + middleRadius * Math.sin(endAngle)
          
          const largeArcFlag = angleStep > Math.PI ? 1 : 0
          
          const path = `
            M ${x3} ${y3}
            L ${x1} ${y1}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            L ${x4} ${y4}
            A ${middleRadius} ${middleRadius} 0 ${largeArcFlag} 0 ${x3} ${y3}
          `
          
          const midAngle = (startAngle + endAngle) / 2
          const labelX = centerX + (outerRadius + middleRadius) / 2 * Math.cos(midAngle)
          const labelY = centerY + (outerRadius + middleRadius) / 2 * Math.sin(midAngle)
          
          const isSelected = selectedCategory?.name === category.name
          
          return (
            <g key={index} onClick={() => handleCategorySelect(category)}>
              <path
                d={path}
                fill={isSelected ? '#6366f1' : '#e5e7eb'}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-sm font-bold pointer-events-none ${
                  isSelected ? 'fill-white' : 'fill-gray-700'
                }`}
              >
                {category.name}
              </text>
            </g>
          )
        })}
        
        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          className="text-lg font-bold fill-gray-700"
        >
          Emotion
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          className="text-lg font-bold fill-gray-700"
        >
          Wheel
        </text>
      </svg>
    )
  }

  if (showReflection && selectedSecondary) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🎯 Emotion Identified
        </h2>
        
        <div className={`bg-gradient-to-r ${selectedCategory?.color} text-white rounded-lg p-6 mb-6`}>
          <div className="text-center">
            <div className="text-sm opacity-90">{selectedCategory?.name}</div>
            <div className="text-xl font-bold my-2">{selectedPrimary}</div>
            <div className="text-2xl font-bold">{selectedSecondary}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Reflection Questions:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• What triggered this emotion?</li>
            <li>• Where do you feel it in your body?</li>
            <li>• What does this emotion want you to know?</li>
            <li>• What action (if any) does it call for?</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Emotion History:</h4>
          <div className="flex flex-wrap gap-2">
            {emotionHistory.slice(-5).map((emotion, idx) => (
              <span key={idx} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                {emotion}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetSelection}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Identify Another Emotion
          </button>
          <button
            onClick={clearHistory}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Clear History
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Wheel */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🎨 Emotion Awareness Wheel
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Click on a category to explore specific emotions
        </p>
        <div className="flex justify-center">
          {drawWheel()}
        </div>
      </div>

      {/* Primary Emotions */}
      {selectedCategory && !selectedPrimary && (
        <div className="bg-white rounded-xl p-6 shadow-lg animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Select a Primary {selectedCategory.name} Emotion:
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {selectedCategory.emotions.map((emotion, idx) => (
              <button
                key={idx}
                onClick={() => handlePrimarySelect(emotion.primary)}
                className={`p-4 rounded-lg bg-gradient-to-r ${selectedCategory.color} text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                {emotion.primary}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Secondary Emotions */}
      {selectedPrimary && (
        <div className="bg-white rounded-xl p-6 shadow-lg animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Refine Your Emotion - {selectedPrimary}:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedCategory?.emotions
              .find(e => e.primary === selectedPrimary)
              ?.secondary.map((emotion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSecondarySelect(emotion)}
                  className="p-3 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 font-medium text-gray-700 hover:text-indigo-700 transition-all duration-200"
                >
                  {emotion}
                </button>
              ))}
          </div>
          <button
            onClick={() => setSelectedPrimary(null)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to primary emotions
          </button>
        </div>
      )}

      {/* History */}
      {emotionHistory.length > 0 && !showReflection && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Emotions:</h4>
          <div className="flex flex-wrap gap-2">
            {emotionHistory.slice(-3).map((emotion, idx) => (
              <span key={idx} className="text-sm bg-white px-3 py-1 rounded-full border border-gray-200">
                {emotion}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
