import { useState, useEffect } from 'react'
import { CheckCircle, Save } from 'lucide-react'

interface IntegrationData {
  mostNatural: string
  personalStack: string[]
  testSituation: string
  commitment: string
  trackingMetrics: {
    timeToBaseline: boolean
    stressReduction: boolean
    ifThenExecution: boolean
  }
}

export function RegulationIntegrationCheck() {
  const [data, setData] = useState<IntegrationData>(() => {
    const saved = localStorage.getItem('regulation-integration-check')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      mostNatural: '',
      personalStack: ['', '', ''],
      testSituation: '',
      commitment: '',
      trackingMetrics: {
        timeToBaseline: false,
        stressReduction: false,
        ifThenExecution: false
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('regulation-integration-check', JSON.stringify(data))
  }, [data])

  const updateStack = (index: number, value: string) => {
    const newStack = [...data.personalStack]
    newStack[index] = value
    setData(prev => ({ ...prev, personalStack: newStack }))
  }

  const toggleMetric = (metric: keyof typeof data.trackingMetrics) => {
    setData(prev => ({
      ...prev,
      trackingMetrics: {
        ...prev.trackingMetrics,
        [metric]: !prev.trackingMetrics[metric]
      }
    }))
  }

  const getCompletionRate = () => {
    let completed = 0
    let total = 7 // Total fields to complete
    
    if (data.mostNatural) completed++
    if (data.personalStack[0]) completed++
    if (data.personalStack[1]) completed++
    if (data.personalStack[2]) completed++
    if (data.testSituation) completed++
    if (data.commitment) completed++
    if (Object.values(data.trackingMetrics).some(v => v)) completed++
    
    return Math.round((completed / total) * 100)
  }

  const tools = [
    '90-Second Reset',
    'Grounding 5-4-3-2-1',
    'Cognitive Reappraisal',
    'If-Then Plans',
    'State Switch',
    'Breathing Focus',
    'Defusion'
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Integration Check</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          After practicing all three drills, reflect on what works best for you.
        </p>
      </div>

      {/* Which Tool Felt Most Natural */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Which tool felt most natural?
        </h4>
        <div className="space-y-2">
          {['90-Second Reset', 'Grounding 5-4-3-2-1', 'Cognitive Reappraisal'].map(tool => (
            <label key={tool} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="mostNatural"
                value={tool}
                checked={data.mostNatural === tool}
                onChange={(e) => setData(prev => ({ ...prev, mostNatural: e.target.value }))}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{tool}</span>
              {data.mostNatural === tool && (
                <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Personal Stack */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Your personal stack (order them 1-2-3)
        </h4>
        <div className="space-y-3">
          {[0, 1, 2].map(index => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-8 text-center font-bold text-gray-600">
                {index + 1}.
              </span>
              <select
                value={data.personalStack[index]}
                onChange={(e) => updateStack(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg"
              >
                <option value="">Select a tool...</option>
                {tools.map(tool => (
                  <option 
                    key={tool} 
                    value={tool}
                    disabled={data.personalStack.includes(tool) && data.personalStack[index] !== tool}
                  >
                    {tool}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Test Situation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          One situation where you'll test this week
        </h4>
        <textarea
          value={data.testSituation}
          onChange={(e) => setData(prev => ({ ...prev, testSituation: e.target.value }))}
          placeholder="e.g., Monday morning team meeting when project updates are discussed"
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Tracking Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Track Your Progress
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Over the next week, measure:
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={data.trackingMetrics.timeToBaseline}
              onChange={() => toggleMetric('timeToBaseline')}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <div>
              <span className="font-medium text-gray-700">
                Time from trigger to baseline
              </span>
              <span className="text-sm text-gray-500 ml-2">
                (aim: &lt;5 minutes)
              </span>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={data.trackingMetrics.stressReduction}
              onChange={() => toggleMetric('stressReduction')}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <div>
              <span className="font-medium text-gray-700">
                Stress level pre/post reset
              </span>
              <span className="text-sm text-gray-500 ml-2">
                (aim: 2-point drop)
              </span>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={data.trackingMetrics.ifThenExecution}
              onChange={() => toggleMetric('ifThenExecution')}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <div>
              <span className="font-medium text-gray-700">
                If-Then execution rate
              </span>
              <span className="text-sm text-gray-500 ml-2">
                (aim: 80%)
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Commitment Statement */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Your Commitment
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          Complete this statement:
        </p>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900 mb-3">
            "When I notice [body signal], I will [specific tool] within [seconds], 
            then take [specific action]."
          </p>
          <textarea
            value={data.commitment}
            onChange={(e) => setData(prev => ({ ...prev, commitment: e.target.value }))}
            placeholder="e.g., When I notice my jaw clenching, I will do a 90-second reset within 10 seconds, then write one clarifying question before responding."
            className="w-full px-3 py-2 bg-white border rounded-lg"
            rows={3}
          />
        </div>
      </div>

      {/* Compound Effect Reminder */}
      <div className="bg-green-50 rounded-lg p-6">
        <h4 className="font-medium text-green-800 mb-3">The Compound Effect</h4>
        <ul className="space-y-2 text-sm text-green-700">
          <li>• One reset per day = 365 recovered moments per year</li>
          <li>• One reappraisal per trigger = 50% less rumination</li>
          <li>• One If-Then executed = 65% higher goal achievement</li>
        </ul>
        <p className="text-xs text-green-600 mt-3">
          Record at least 3 regulation moments this week.
        </p>
      </div>

      {/* Save Indicator */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Save className="w-4 h-4" />
          <span>Auto-saving to browser</span>
        </div>
      </div>
    </div>
  )
}
