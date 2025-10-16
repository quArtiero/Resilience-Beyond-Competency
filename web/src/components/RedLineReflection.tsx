import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Save, Download } from 'lucide-react'

interface ReflectionData {
  // EQ Skills Assessment
  selfAwareness: number
  selfRegulation: number
  empathy: number
  socialSkills: number
  motivation: number
  
  // Personal Red Lines
  personalRedLines: {
    interrupt: string
    deadlines: string
    micromanage: string
    dismissive: string
    unfair: string
    custom: string
  }
  
  // Emotion Mapping
  emotionMapping: {
    anger: string
    frustration: string
    anxiety: string
    disappointment: string
  }
  
  // Recovery Strategies
  recoveryStrategies: {
    deepBreathing: boolean
    stepAway: boolean
    positiveReframe: boolean
    seekSupport: boolean
    physicalExercise: boolean
    journaling: boolean
  }
  
  // Action Plan
  practiceArea: string
  weeklyGoal: string
  accountabilityPartner: string
}

export function RedLineReflection() {
  const [data, setData] = useState<ReflectionData>(() => {
    const saved = localStorage.getItem('redline-reflection')
    return saved ? JSON.parse(saved) : {
      selfAwareness: 3,
      selfRegulation: 3,
      empathy: 3,
      socialSkills: 3,
      motivation: 3,
      personalRedLines: {
        interrupt: '',
        deadlines: '',
        micromanage: '',
        dismissive: '',
        unfair: '',
        custom: ''
      },
      emotionMapping: {
        anger: '',
        frustration: '',
        anxiety: '',
        disappointment: ''
      },
      recoveryStrategies: {
        deepBreathing: false,
        stepAway: false,
        positiveReframe: false,
        seekSupport: false,
        physicalExercise: false,
        journaling: false
      },
      practiceArea: '',
      weeklyGoal: '',
      accountabilityPartner: ''
    }
  })

  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showSaveNotification, setShowSaveNotification] = useState(false)

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('redline-reflection', JSON.stringify(data))
      setLastSaved(new Date())
      setShowSaveNotification(true)
      setTimeout(() => setShowSaveNotification(false), 2000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  const updateRating = (skill: keyof Pick<ReflectionData, 'selfAwareness' | 'selfRegulation' | 'empathy' | 'socialSkills' | 'motivation'>, value: number) => {
    setData(prev => ({ ...prev, [skill]: value }))
  }

  const updateRedLine = (trigger: keyof ReflectionData['personalRedLines'], value: string) => {
    setData(prev => ({
      ...prev,
      personalRedLines: { ...prev.personalRedLines, [trigger]: value }
    }))
  }

  const updateEmotion = (emotion: keyof ReflectionData['emotionMapping'], value: string) => {
    setData(prev => ({
      ...prev,
      emotionMapping: { ...prev.emotionMapping, [emotion]: value }
    }))
  }

  const toggleStrategy = (strategy: keyof ReflectionData['recoveryStrategies']) => {
    setData(prev => ({
      ...prev,
      recoveryStrategies: { 
        ...prev.recoveryStrategies, 
        [strategy]: !prev.recoveryStrategies[strategy] 
      }
    }))
  }

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `redline-reflection-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const calculateProgress = () => {
    let filled = 0
    let total = 23 // Total number of fields
    
    // Count ratings (5 fields)
    filled += 5 // Already have default values
    
    // Count red lines (6 fields)
    Object.values(data.personalRedLines).forEach(v => {
      if (v.trim()) filled++
    })
    
    // Count emotions (4 fields)
    Object.values(data.emotionMapping).forEach(v => {
      if (v.trim()) filled++
    })
    
    // Count strategies (6 fields)
    Object.values(data.recoveryStrategies).forEach(v => {
      if (v) filled++
    })
    
    // Count action plan (3 fields)
    if (data.practiceArea.trim()) filled++
    if (data.weeklyGoal.trim()) filled++
    if (data.accountabilityPartner.trim()) filled++
    
    return Math.round((filled / total) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Reflection Progress</h3>
          <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        {lastSaved && (
          <p className="text-xs text-gray-500 mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed top-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-sm">Auto-saved</span>
        </div>
      )}

      {/* EQ Skills Assessment */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">📊 Rate Your Current EQ Skills</h3>
        <div className="space-y-4">
          {[
            { key: 'selfAwareness' as const, label: 'Self-Awareness: I notice my emotions as they arise' },
            { key: 'selfRegulation' as const, label: 'Self-Regulation: I can calm myself when stressed' },
            { key: 'empathy' as const, label: 'Empathy: I sense what others are feeling' },
            { key: 'socialSkills' as const, label: 'Social Skills: I navigate conflicts effectively' },
            { key: 'motivation' as const, label: 'Motivation: I stay focused despite setbacks' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => updateRating(key, rating)}
                    className={`
                      w-12 h-12 rounded-lg font-medium transition-all
                      ${data[key] === rating 
                        ? 'bg-blue-600 text-white scale-110' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {rating}
                  </button>
                ))}
                <span className="ml-4 text-sm text-gray-600">
                  {data[key] === 1 && 'Needs development'}
                  {data[key] === 2 && 'Emerging'}
                  {data[key] === 3 && 'Developing'}
                  {data[key] === 4 && 'Proficient'}
                  {data[key] === 5 && 'Advanced'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Red Lines */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">💭 Personal Red Lines</h3>
        <p className="text-sm text-gray-600 mb-4">
          Identify your emotional triggers. What crosses your "red line"?
        </p>
        <div className="space-y-3">
          {[
            { key: 'interrupt' as const, label: 'When people interrupt me, I feel...' },
            { key: 'deadlines' as const, label: 'When deadlines change suddenly, I feel...' },
            { key: 'micromanage' as const, label: 'When someone micromanages me, I feel...' },
            { key: 'dismissive' as const, label: 'When my ideas are dismissed, I feel...' },
            { key: 'unfair' as const, label: 'When I see unfairness, I feel...' },
            { key: 'custom' as const, label: 'My biggest trigger is...' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                value={data.personalRedLines[key]}
                onChange={(e) => updateRedLine(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your response..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Emotion Mapping */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">🗺️ Map Your Emotions</h3>
        <p className="text-sm text-gray-600 mb-4">
          How do these emotions show up physically in your body?
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'anger' as const, label: '😤 Anger', placeholder: 'e.g., jaw clenches, fists tighten' },
            { key: 'frustration' as const, label: '😣 Frustration', placeholder: 'e.g., shoulders tense, breath shortens' },
            { key: 'anxiety' as const, label: '😰 Anxiety', placeholder: 'e.g., stomach tightens, heart races' },
            { key: 'disappointment' as const, label: '😔 Disappointment', placeholder: 'e.g., chest feels heavy, energy drops' }
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <textarea
                value={data.emotionMapping[key]}
                onChange={(e) => updateEmotion(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={placeholder}
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Strategies */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">🛠️ Recovery Strategies</h3>
        <p className="text-sm text-gray-600 mb-4">
          Which strategies will you use when you hit your red line?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'deepBreathing' as const, label: '🫁 Deep breathing (4-7-8 technique)' },
            { key: 'stepAway' as const, label: '🚶 Step away for 5 minutes' },
            { key: 'positiveReframe' as const, label: '🔄 Positive reframing' },
            { key: 'seekSupport' as const, label: '🤝 Seek support from a trusted colleague' },
            { key: 'physicalExercise' as const, label: '💪 Physical exercise or movement' },
            { key: 'journaling' as const, label: '📝 Quick journaling or voice memo' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleStrategy(key)}
              className={`
                flex items-center gap-2 p-3 rounded-lg border transition-all text-left
                ${data.recoveryStrategies[key]
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {data.recoveryStrategies[key] ? (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Your Action Plan</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Which EQ skill will you practice this week?
            </label>
            <select
              value={data.practiceArea}
              onChange={(e) => setData(prev => ({ ...prev, practiceArea: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a skill...</option>
              <option value="self-awareness">Self-Awareness</option>
              <option value="self-regulation">Self-Regulation</option>
              <option value="empathy">Empathy</option>
              <option value="social-skills">Social Skills</option>
              <option value="motivation">Motivation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your specific goal for this week:
            </label>
            <textarea
              value={data.weeklyGoal}
              onChange={(e) => setData(prev => ({ ...prev, weeklyGoal: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Practice the 4-7-8 breathing technique before every meeting"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Who will be your accountability partner?
            </label>
            <input
              type="text"
              value={data.accountabilityPartner}
              onChange={(e) => setData(prev => ({ ...prev, accountabilityPartner: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Name someone who will check in on your progress"
            />
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Reflection
        </button>
      </div>
    </div>
  )
}
