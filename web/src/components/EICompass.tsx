import { useState, useEffect } from 'react'
import { Compass, AlertTriangle, Zap, Users, BarChart3, Download } from 'lucide-react'

interface CompassData {
  // Triggers
  topTriggers: string[]
  bodySignals: string[]
  
  // Emotion Labels
  stressedReplacements: string[]
  angryReplacements: string[]
  
  // Values System (from Values Map)
  value1: { value: string; behavior: string; metric: string }
  value2: { value: string; behavior: string; metric: string }
  value3: { value: string; behavior: string; metric: string }
  
  // First-line Tools
  primaryTools: string[]
  ifThenPlan: string
  
  // Social Scripts
  socialScripts: string[]
  
  // Weekly Indicators
  leadingIndicators: string[]
}

export function EICompass() {
  const [data, setData] = useState<CompassData>(() => {
    const saved = localStorage.getItem('ei-compass')
    if (saved) {
      return JSON.parse(saved)
    }
    
    // Try to import values from ValuesMap if available
    const valuesMapData = localStorage.getItem('ei-values-map')
    let valueDefaults = {
      value1: { value: '', behavior: '', metric: '' },
      value2: { value: '', behavior: '', metric: '' },
      value3: { value: '', behavior: '', metric: '' }
    }
    
    if (valuesMapData) {
      const parsed = JSON.parse(valuesMapData)
      if (parsed.valueEntries) {
        parsed.valueEntries.forEach((entry: any, index: number) => {
          if (index === 0) valueDefaults.value1 = entry
          if (index === 1) valueDefaults.value2 = entry
          if (index === 2) valueDefaults.value3 = entry
        })
      }
    }
    
    return {
      topTriggers: [],
      bodySignals: [],
      stressedReplacements: [],
      angryReplacements: [],
      ...valueDefaults,
      primaryTools: [],
      ifThenPlan: '',
      socialScripts: [],
      leadingIndicators: []
    }
  })

  const [showSaved, setShowSaved] = useState(false)
  const [activeSection, setActiveSection] = useState<'triggers' | 'emotions' | 'values' | 'tools' | 'social' | 'metrics'>('triggers')

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('ei-compass', JSON.stringify(data))
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  const triggerOptions = [
    'Interruptions',
    'Changed deadlines',
    'Unclear expectations',
    'Being micromanaged',
    'Technical failures',
    'Criticism',
    'Time pressure',
    'Conflicting priorities'
  ]

  const bodySignalOptions = [
    'Jaw clenches',
    'Shoulders tense',
    'Breath shortens',
    'Chest tightens',
    'Stomach knots',
    'Face flushes',
    'Hands clench',
    'Heart races'
  ]

  const toolOptions = [
    'STOP protocol',
    '90-sec reset',
    'Name → Need → Next',
    '4-7-8 breathing',
    '10-min action',
    'Reframing'
  ]

  const scriptOptions = [
    'LRL (Listen-Reflect-Label)',
    'SBI feedback',
    'EAR (Empathy-Acknowledge-Reframe)',
    'No + Option',
    'AND boundaries'
  ]

  const indicatorOptions = [
    '# STOP uses/day',
    'Stress delta (pre→post)',
    '# SBI delivered',
    'Decision latency (hrs)',
    'Recovery time (min)',
    'Conflict repairs/week'
  ]

  const toggleArrayItem = (field: keyof CompassData, item: string, max: number) => {
    setData(prev => {
      const current = prev[field] as string[]
      if (current.includes(item)) {
        return { ...prev, [field]: current.filter(i => i !== item) }
      } else if (current.length < max) {
        return { ...prev, [field]: [...current, item] }
      }
      return prev
    })
  }

  const updateValue = (valueKey: 'value1' | 'value2' | 'value3', field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], [field]: value }
    }))
  }

  const exportCompass = () => {
    const compassText = `
EI COMPASS - Personal Operating System
Generated: ${new Date().toLocaleDateString()}

=== TRIGGERS I WATCH FOR ===
${data.topTriggers.join(', ') || 'Not set'}

=== BODY SIGNALS ===
${data.bodySignals.join(', ') || 'Not set'}

=== EMOTION PRECISION ===
"Stressed" → ${data.stressedReplacements.join(', ') || 'Not set'}
"Angry" → ${data.angryReplacements.join(', ') || 'Not set'}

=== VALUES → BEHAVIORS → METRICS ===
1. ${data.value1.value}: ${data.value1.behavior} | Metric: ${data.value1.metric}
2. ${data.value2.value}: ${data.value2.behavior} | Metric: ${data.value2.metric}
3. ${data.value3.value}: ${data.value3.behavior} | Metric: ${data.value3.metric}

=== FIRST-LINE TOOLS ===
${data.primaryTools.join(', ') || 'Not set'}
If-Then: ${data.ifThenPlan || 'Not set'}

=== SOCIAL SCRIPTS ===
${data.socialScripts.join(', ') || 'Not set'}

=== WEEKLY INDICATORS ===
${data.leadingIndicators.join(', ') || 'Not set'}
    `.trim()

    const blob = new Blob([compassText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ei-compass-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getCompletionPercentage = () => {
    let completed = 0
    let total = 0
    
    // Check all required fields
    if (data.topTriggers.length > 0) completed++; total++
    if (data.bodySignals.length > 0) completed++; total++
    if (data.stressedReplacements.length > 0) completed++; total++
    if (data.angryReplacements.length > 0) completed++; total++
    if (data.value1.value && data.value1.behavior && data.value1.metric) completed++; total++
    if (data.value2.value && data.value2.behavior && data.value2.metric) completed++; total++
    if (data.value3.value && data.value3.behavior && data.value3.metric) completed++; total++
    if (data.primaryTools.length > 0) completed++; total++
    if (data.ifThenPlan) completed++; total++
    if (data.socialScripts.length > 0) completed++; total++
    if (data.leadingIndicators.length > 0) completed++; total++
    
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <Compass className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Your EI Compass</h2>
        </div>
        <p className="text-gray-600">
          Build your one-page operating guide for emotional intelligence. Keep this visible for quick reference under pressure.
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion</span>
            <span className="text-sm text-gray-600">{getCompletionPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Save Notification */}
      {showSaved && (
        <div className="fixed top-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          ✓ Auto-saved
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'triggers' as const, label: 'Triggers', icon: <AlertTriangle className="w-4 h-4" /> },
          { key: 'emotions' as const, label: 'Emotions', icon: <Zap className="w-4 h-4" /> },
          { key: 'values' as const, label: 'Values', icon: <BarChart3 className="w-4 h-4" /> },
          { key: 'tools' as const, label: 'Tools', icon: <Compass className="w-4 h-4" /> },
          { key: 'social' as const, label: 'Social', icon: <Users className="w-4 h-4" /> },
          { key: 'metrics' as const, label: 'Metrics', icon: <BarChart3 className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`
              flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md text-sm font-medium transition-all
              ${activeSection === tab.key
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Triggers Section */}
      {activeSection === 'triggers' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Triggers & Body Signals</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top 3 Triggers I Watch For:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {triggerOptions.map(trigger => (
                  <button
                    key={trigger}
                    onClick={() => toggleArrayItem('topTriggers', trigger, 3)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
                      ${data.topTriggers.includes(trigger)
                        ? 'bg-red-100 text-red-700 border-2 border-red-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }
                    `}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Signals (pick 2):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {bodySignalOptions.map(signal => (
                  <button
                    key={signal}
                    onClick={() => toggleArrayItem('bodySignals', signal, 2)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
                      ${data.bodySignals.includes(signal)
                        ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }
                    `}
                  >
                    {signal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emotions Section */}
      {activeSection === 'emotions' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Emotion Precision</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Better words than "stressed" (pick 2):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Overloaded', 'Time-pressed', 'Uncertain', 'Scattered'].map(word => (
                  <button
                    key={word}
                    onClick={() => toggleArrayItem('stressedReplacements', word, 2)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
                      ${data.stressedReplacements.includes(word)
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }
                    `}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Better words than "angry" (pick 2):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Dismissed', 'Blocked', 'Disrespected', 'Protective'].map(word => (
                  <button
                    key={word}
                    onClick={() => toggleArrayItem('angryReplacements', word, 2)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
                      ${data.angryReplacements.includes(word)
                        ? 'bg-red-100 text-red-700 border-2 border-red-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }
                    `}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Values Section */}
      {activeSection === 'values' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Values → Behaviors → Metrics</h3>
          
          <div className="space-y-3">
            {[1, 2, 3].map(num => (
              <div key={num} className="border rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={data[`value${num}` as keyof CompassData].value}
                    onChange={(e) => updateValue(`value${num}` as any, 'value', e.target.value)}
                    placeholder={`Value ${num}`}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    value={data[`value${num}` as keyof CompassData].behavior}
                    onChange={(e) => updateValue(`value${num}` as any, 'behavior', e.target.value)}
                    placeholder="Behavior"
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="text"
                    value={data[`value${num}` as keyof CompassData].metric}
                    onChange={(e) => updateValue(`value${num}` as any, 'metric', e.target.value)}
                    placeholder="Metric"
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools Section */}
      {activeSection === 'tools' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">First-Line Tools</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Tools (pick 3):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toolOptions.map(tool => (
                  <button
                    key={tool}
                    onClick={() => toggleArrayItem('primaryTools', tool, 3)}
                    className={`
                      p-2 rounded-lg text-sm transition-all
                      ${data.primaryTools.includes(tool)
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }
                    `}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                My If-Then Plan:
              </label>
              <input
                type="text"
                value={data.ifThenPlan}
                onChange={(e) => setData(prev => ({ ...prev, ifThenPlan: e.target.value }))}
                placeholder="If [trigger], then I will [tiny action]"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Social Section */}
      {activeSection === 'social' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Social Scripts</h3>
          
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scripts I'll Practice (pick 2):
          </label>
          <div className="grid grid-cols-1 gap-2">
            {scriptOptions.map(script => (
              <button
                key={script}
                onClick={() => toggleArrayItem('socialScripts', script, 2)}
                className={`
                  p-3 rounded-lg text-sm text-left transition-all
                  ${data.socialScripts.includes(script)
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                  }
                `}
              >
                {script}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Section */}
      {activeSection === 'metrics' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Leading Indicators</h3>
          
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Metrics to Track (pick 3):
          </label>
          <div className="grid grid-cols-1 gap-2">
            {indicatorOptions.map(indicator => (
              <button
                key={indicator}
                onClick={() => toggleArrayItem('leadingIndicators', indicator, 3)}
                className={`
                  p-3 rounded-lg text-sm text-left transition-all
                  ${data.leadingIndicators.includes(indicator)
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                  }
                `}
              >
                {indicator}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportCompass}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Compass
        </button>
      </div>
    </div>
  )
}
