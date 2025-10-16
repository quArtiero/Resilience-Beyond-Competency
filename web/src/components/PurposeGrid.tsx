import { useState, useEffect } from 'react'

interface PurposeGridData {
  outcome: string
  timeBox: string
  qualityBar: string
  constraints: string
  option1: string
  option2: string
  option3: string
  choice: string
  firstStep: string
  metric: string
}

interface PurposeGridProps {
  lessonId: number
  onComplete?: (data: PurposeGridData) => void
}

export function PurposeGrid({ lessonId, onComplete }: PurposeGridProps) {
  const localStorageKey = `purposeGrid_${lessonId}`
  
  const [gridData, setGridData] = useState<PurposeGridData>(() => {
    const saved = localStorage.getItem(localStorageKey)
    return saved ? JSON.parse(saved) : {
      outcome: '',
      timeBox: '24-72h',
      qualityBar: '',
      constraints: '€0 / <2h / no new tools',
      option1: '',
      option2: '',
      option3: '',
      choice: '',
      firstStep: '',
      metric: ''
    }
  })
  
  const [isSaved, setIsSaved] = useState(false)
  const [completeness, setCompleteness] = useState(0)

  useEffect(() => {
    const fields = Object.values(gridData).filter(val => val && val.trim() !== '')
    setCompleteness(Math.round((fields.length / 10) * 100))
  }, [gridData])

  const handleChange = (field: keyof PurposeGridData, value: string) => {
    setGridData(prev => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(gridData))
    setIsSaved(true)
    if (onComplete && completeness === 100) {
      onComplete(gridData)
    }
  }

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0]
    const content = `PURPOSE GRID - ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━
Outcome needed: ${gridData.outcome}
Time box: ${gridData.timeBox}
Quality bar: ${gridData.qualityBar}
Constraints: ${gridData.constraints}

Option Ladder:
1) ${gridData.option1}
2) ${gridData.option2}
3) ${gridData.option3}

Decision:
Choice: ${gridData.choice}
First Step: ${gridData.firstStep}
Success Metric: ${gridData.metric}
━━━━━━━━━━━━━━━━━━━━━━━━`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `purpose-grid-${timestamp}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const templates = [
    { name: 'Work Crisis', outcome: 'Ship deliverable', timeBox: '24h', qualityBar: 'Stakeholder can make decision' },
    { name: 'Team Conflict', outcome: 'Align on next step', timeBox: '48h', qualityBar: 'Both parties agree to test' },
    { name: 'Personal Routine', outcome: 'Maintain habit', timeBox: '7 days', qualityBar: '5/7 days completed' }
  ]

  const applyTemplate = (template: typeof templates[0]) => {
    setGridData(prev => ({
      ...prev,
      outcome: template.outcome,
      timeBox: template.timeBox,
      qualityBar: template.qualityBar
    }))
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">📋 Purpose Grid</h3>
        <p className="text-gray-600">Your 2-minute decision accelerator</p>
        
        <div className="mt-4 bg-white/80 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completeness</span>
            <span className="text-sm font-bold text-indigo-600">{completeness}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Templates:</p>
        <div className="flex gap-2 flex-wrap">
          {templates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => applyTemplate(template)}
              className="px-3 py-1 text-sm bg-white border border-purple-300 rounded-full hover:bg-purple-50 transition-colors"
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Purpose & Time */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">🎯 Purpose & Constraints</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outcome I need (purpose):
              </label>
              <input
                type="text"
                value={gridData.outcome}
                onChange={(e) => handleChange('outcome', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="What MUST happen? (10 words max)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time box:
                </label>
                <select
                  value={gridData.timeBox}
                  onChange={(e) => handleChange('timeBox', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="24h">Next 24 hours</option>
                  <option value="48h">Next 48 hours</option>
                  <option value="72h">Next 72 hours</option>
                  <option value="24-72h">24-72 hours</option>
                  <option value="7 days">7 days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Constraints:
                </label>
                <input
                  type="text"
                  value={gridData.constraints}
                  onChange={(e) => handleChange('constraints', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., €0 / <2h / no new tools"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality bar ("good enough if..."):
              </label>
              <input
                type="text"
                value={gridData.qualityBar}
                onChange={(e) => handleChange('qualityBar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Decision can be made, 70% confidence"
              />
            </div>
          </div>
        </div>

        {/* Option Ladder */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
          <h4 className="font-semibold text-green-900 mb-3">🪜 Option Ladder</h4>
          <p className="text-sm text-gray-600 mb-3">Force 3 options (one must be "embarrassingly simple")</p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option 1 (Quick & Dirty):
              </label>
              <input
                type="text"
                value={gridData.option1}
                onChange={(e) => handleChange('option1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="The embarrassingly simple version"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option 2 (Middle Ground):
              </label>
              <input
                type="text"
                value={gridData.option2}
                onChange={(e) => handleChange('option2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Reasonable compromise"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option 3 (Ideal-ish):
              </label>
              <input
                type="text"
                value={gridData.option3}
                onChange={(e) => handleChange('option3', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Best you can do with constraints"
              />
            </div>
          </div>
        </div>

        {/* Pick & Plan */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">✅ Pick & Plan</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I choose:
              </label>
              <select
                value={gridData.choice}
                onChange={(e) => handleChange('choice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option...</option>
                <option value="option1">Option 1: {gridData.option1 || 'Quick & Dirty'}</option>
                <option value="option2">Option 2: {gridData.option2 || 'Middle Ground'}</option>
                <option value="option3">Option 3: {gridData.option3 || 'Ideal-ish'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First step (calendar it):
              </label>
              <input
                type="text"
                value={gridData.firstStep}
                onChange={(e) => handleChange('firstStep', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Draft outline in 30 min at 2pm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Success metric:
              </label>
              <input
                type="text"
                value={gridData.metric}
                onChange={(e) => handleChange('metric', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Decision made Y/N, Confidence ≥70%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
        >
          {isSaved ? '✓ Saved!' : 'Save Grid'}
        </button>
        <button
          onClick={handleExport}
          className="px-6 py-2 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all"
        >
          Export as Text
        </button>
      </div>

      {isSaved && (
        <p className="text-center text-sm text-green-600 mt-3">
          Your Purpose Grid is saved locally
        </p>
      )}
      
      {completeness === 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-center">
          <p className="text-green-800 font-medium">
            🎉 Grid complete! Now execute your first step!
          </p>
        </div>
      )}
    </div>
  )
}
