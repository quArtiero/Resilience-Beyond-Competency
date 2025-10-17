import { useState, useEffect } from 'react'
import { Heart, Target, TrendingUp, Save } from 'lucide-react'

interface ValueEntry {
  value: string
  behavior: string
  metric: string
}

interface ValuesData {
  topValues: string[]
  valueEntries: ValueEntry[]
  approachGoal: string
}

const VALUE_OPTIONS = [
  'Honesty',
  'Learning', 
  'Reliability',
  'Service',
  'Courage',
  'Creativity',
  'Excellence',
  'Health',
  'Family',
  'Autonomy',
  'Curiosity',
  'Impact',
  'Community',
  'Fairness',
  'Growth'
]

export function ValuesMap() {
  const [data, setData] = useState<ValuesData>(() => {
    const saved = localStorage.getItem('ei-values-map')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      topValues: [],
      valueEntries: [
        { value: '', behavior: '', metric: '' },
        { value: '', behavior: '', metric: '' },
        { value: '', behavior: '', metric: '' }
      ],
      approachGoal: ''
    }
  })

  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('ei-values-map', JSON.stringify(data))
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  const toggleValue = (value: string) => {
    setData(prev => {
      const newValues = prev.topValues.includes(value)
        ? prev.topValues.filter(v => v !== value)
        : prev.topValues.length < 3
          ? [...prev.topValues, value]
          : prev.topValues
      
      // Auto-populate value entries
      const newEntries = [...prev.valueEntries]
      newValues.forEach((val, index) => {
        if (newEntries[index]) {
          newEntries[index].value = val
        }
      })
      
      return {
        ...prev,
        topValues: newValues,
        valueEntries: newEntries
      }
    })
  }

  const updateEntry = (index: number, field: keyof ValueEntry, value: string) => {
    setData(prev => ({
      ...prev,
      valueEntries: prev.valueEntries.map((entry, i) => 
        i === index ? { ...entry, [field]: value } : entry
      )
    }))
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const total = 13 // 3 values + 9 fields + 1 goal
    
    completed += data.topValues.length
    data.valueEntries.forEach(entry => {
      if (entry.value) completed++
      if (entry.behavior) completed++
      if (entry.metric) completed++
    })
    if (data.approachGoal) completed++
    
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Values Mapping Progress</h3>
          <span className="text-sm text-gray-600">{getCompletionPercentage()}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
      </div>

      {/* Save Notification */}
      {showSaved && (
        <div className="fixed top-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Save className="w-4 h-4" />
          <span className="text-sm">Auto-saved</span>
        </div>
      )}

      {/* Step 1: Select Top Values */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-pink-600" />
          <h3 className="text-lg font-semibold">Step 1: Your Top 3 Values</h3>
          <span className="ml-auto text-sm text-gray-600">
            {data.topValues.length}/3 selected
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Select the 3 values that matter most to you when making decisions under pressure.
        </p>

        <div className="grid grid-cols-3 gap-2">
          {VALUE_OPTIONS.map(value => (
            <button
              key={value}
              onClick={() => toggleValue(value)}
              disabled={!data.topValues.includes(value) && data.topValues.length >= 3}
              className={`
                p-3 rounded-lg text-sm font-medium transition-all
                ${data.topValues.includes(value)
                  ? 'bg-pink-100 text-pink-700 border-2 border-pink-500'
                  : data.topValues.length >= 3
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }
              `}
            >
              {value}
            </button>
          ))}
        </div>

        {data.topValues.length === 3 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ Great! Now map each value to specific behaviors and metrics below.
            </p>
          </div>
        )}
      </div>

      {/* Step 2: Map Values to Behaviors */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Step 2: Values → Behaviors → Metrics</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          For each value, define a specific behavior under pressure and how you'll measure it.
        </p>

        <div className="space-y-4">
          {data.valueEntries.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Value {index + 1}
                  </label>
                  <input
                    type="text"
                    value={entry.value}
                    onChange={(e) => updateEntry(index, 'value', e.target.value)}
                    placeholder={data.topValues[index] || "Select above"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    readOnly={!!data.topValues[index]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Behavior under pressure
                  </label>
                  <input
                    type="text"
                    value={entry.behavior}
                    onChange={(e) => updateEntry(index, 'behavior', e.target.value)}
                    placeholder="e.g., Send status by 5pm MWF"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Micro-metric (daily/weekly)
                  </label>
                  <input
                    type="text"
                    value={entry.metric}
                    onChange={(e) => updateEntry(index, 'metric', e.target.value)}
                    placeholder="e.g., # updates (target 3/3)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Approach Goal Rewrite */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Step 3: Create an Approach Goal</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Transform an avoidance goal ("don't fail X") into an approach goal ("achieve Y by Z").
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your approach goal (be specific with target, time, and method):
            </label>
            <textarea
              value={data.approachGoal}
              onChange={(e) => setData(prev => ({ ...prev, approachGoal: e.target.value }))}
              placeholder="Example: Achieve ≥80% on practice test by Friday 6pm using 3× 25-min retrieval blocks"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {getCompletionPercentage() === 100 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            ✨ Your Values System is Complete!
          </h3>
          <div className="space-y-2 text-sm text-green-700">
            <p><strong>Core Values:</strong> {data.topValues.join(', ')}</p>
            <p><strong>Tracked Behaviors:</strong> {data.valueEntries.filter(e => e.behavior).length}/3 defined</p>
            <p><strong>Measurable Metrics:</strong> {data.valueEntries.filter(e => e.metric).length}/3 set</p>
            <p><strong>Approach Goal:</strong> {data.approachGoal ? '✓ Created' : 'Pending'}</p>
          </div>
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `values-map-${new Date().toISOString().split('T')[0]}.json`
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Export Values Map
          </button>
        </div>
      )}
    </div>
  )
}
