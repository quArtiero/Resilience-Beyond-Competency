import { useState, useEffect } from 'react'
import { CheckCircle, Save, Download } from 'lucide-react'

interface ExitReflectionData {
  fastestTool: string
  fastestReason: string
  challengingTrigger: string
  hoursSaved: string
  practiceTomorrow: string
}

export function RegulationExitReflection() {
  const [data, setData] = useState<ExitReflectionData>(() => {
    const saved = localStorage.getItem('regulation-exit-reflection')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      fastestTool: '',
      fastestReason: '',
      challengingTrigger: '',
      hoursSaved: '',
      practiceTomorrow: ''
    }
  })

  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    localStorage.setItem('regulation-exit-reflection', JSON.stringify(data))
  }, [data])

  const getCompletionRate = () => {
    let completed = 0
    const total = 5
    
    if (data.fastestTool) completed++
    if (data.fastestReason) completed++
    if (data.challengingTrigger) completed++
    if (data.hoursSaved) completed++
    if (data.practiceTomorrow) completed++
    
    return Math.round((completed / total) * 100)
  }

  const exportReflection = () => {
    const reflection = `
REGULATION EXIT REFLECTION
=========================
Date: ${new Date().toLocaleDateString()}

1. My fastest regulation tool is ${data.fastestTool || '_____'} because ${data.fastestReason || '_____'}

2. My most challenging trigger to regulate is ${data.challengingTrigger || '_____'}

3. If I master this one skill, it will save me ${data.hoursSaved || '_____'} hours/week

4. Tomorrow I'll practice when ${data.practiceTomorrow || '_____'}

---
Remember: Every regulated moment is a victory. Start with just one today.
`
    
    const blob = new Blob([reflection], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `regulation-reflection-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  const markComplete = () => {
    setIsComplete(true)
    setTimeout(() => setIsComplete(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Exit Reflection</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Capture your key insights before moving on.
        </p>
      </div>

      {/* Reflection Questions */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Question 1 */}
        <div>
          <p className="font-medium text-gray-800 mb-3">
            1. "My fastest regulation tool is _____ because _____"
          </p>
          <div className="space-y-2">
            <input
              type="text"
              value={data.fastestTool}
              onChange={(e) => setData(prev => ({ ...prev, fastestTool: e.target.value }))}
              placeholder="e.g., 90-second reset"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <textarea
              value={data.fastestReason}
              onChange={(e) => setData(prev => ({ ...prev, fastestReason: e.target.value }))}
              placeholder="e.g., it immediately calms my breathing and gives me clarity"
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>
        </div>

        {/* Question 2 */}
        <div>
          <p className="font-medium text-gray-800 mb-3">
            2. "My most challenging trigger to regulate is _____"
          </p>
          <textarea
            value={data.challengingTrigger}
            onChange={(e) => setData(prev => ({ ...prev, challengingTrigger: e.target.value }))}
            placeholder="e.g., criticism in public settings when I feel my competence is questioned"
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          />
        </div>

        {/* Question 3 */}
        <div>
          <p className="font-medium text-gray-800 mb-3">
            3. "If I master this one skill, it will save me _____ hours/week"
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={data.hoursSaved}
              onChange={(e) => setData(prev => ({ ...prev, hoursSaved: e.target.value }))}
              placeholder="e.g., 3-5"
              className="w-24 px-3 py-2 border rounded-lg text-center"
            />
            <span className="text-gray-600">hours/week currently lost to rumination and recovery</span>
          </div>
        </div>

        {/* Question 4 */}
        <div>
          <p className="font-medium text-gray-800 mb-3">
            4. "Tomorrow I'll practice when _____"
          </p>
          <textarea
            value={data.practiceTomorrow}
            onChange={(e) => setData(prev => ({ ...prev, practiceTomorrow: e.target.value }))}
            placeholder="e.g., I check my morning emails and feel the first tension signal"
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          />
        </div>
      </div>

      {/* Summary Box */}
      {getCompletionRate() === 100 && (
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-3">Your Regulation Commitment</h4>
          <div className="space-y-2 text-sm text-green-700">
            <p>✓ <strong>Go-to tool:</strong> {data.fastestTool}</p>
            <p>✓ <strong>Key challenge:</strong> {data.challengingTrigger}</p>
            <p>✓ <strong>Potential savings:</strong> {data.hoursSaved} hours/week</p>
            <p>✓ <strong>Tomorrow's practice:</strong> {data.practiceTomorrow}</p>
          </div>
        </div>
      )}

      {/* Remember Box */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <p className="text-lg text-blue-800 font-medium mb-2">
          💡 Remember
        </p>
        <p className="text-blue-700">
          Every regulated moment is a victory. Start with just one today.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={markComplete}
          disabled={getCompletionRate() < 100}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            getCompletionRate() === 100
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isComplete ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Complete!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Mark Complete
            </>
          )}
        </button>
        
        <button
          onClick={exportReflection}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-5 h-5" />
          Export Reflection
        </button>
      </div>
    </div>
  )
}
