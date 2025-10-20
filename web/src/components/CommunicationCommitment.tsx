import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Calendar, Target } from 'lucide-react'

interface CommitmentData {
  metrics: {
    acceptanceRate: boolean
    responseTime: boolean
    decisionLatency: boolean
    messageEfficiency: boolean
    actionItems: boolean
    repairAttempts: boolean
  }
  practicePlan: {
    morning: string
    afternoon: string
    evening: string
  }
  personalToolkit: {
    sbiOpener: string
    noOption: string
    repairTemplate: string
  }
}

export function CommunicationCommitment() {
  const [data, setData] = useState<CommitmentData>(() => {
    const saved = localStorage.getItem('communication-commitment')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      metrics: {
        acceptanceRate: false,
        responseTime: false,
        decisionLatency: false,
        messageEfficiency: false,
        actionItems: false,
        repairAttempts: false
      },
      practicePlan: {
        morning: '',
        afternoon: '',
        evening: ''
      },
      personalToolkit: {
        sbiOpener: '',
        noOption: '',
        repairTemplate: ''
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('communication-commitment', JSON.stringify(data))
  }, [data])

  const toggleMetric = (metric: keyof typeof data.metrics) => {
    setData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: !prev.metrics[metric]
      }
    }))
  }

  const updatePracticePlan = (time: keyof typeof data.practicePlan, value: string) => {
    setData(prev => ({
      ...prev,
      practicePlan: {
        ...prev.practicePlan,
        [time]: value
      }
    }))
  }

  const updateToolkit = (tool: keyof typeof data.personalToolkit, value: string) => {
    setData(prev => ({
      ...prev,
      personalToolkit: {
        ...prev.personalToolkit,
        [tool]: value
      }
    }))
  }

  const getSelectedMetricsCount = () => {
    return Object.values(data.metrics).filter(Boolean).length
  }

  const getCompletionRate = () => {
    let filled = 0
    const total = 9
    
    if (getSelectedMetricsCount() >= 2) filled += 2
    if (data.practicePlan.morning) filled++
    if (data.practicePlan.afternoon) filled++
    if (data.practicePlan.evening) filled++
    if (data.personalToolkit.sbiOpener) filled++
    if (data.personalToolkit.noOption) filled++
    if (data.personalToolkit.repairTemplate) filled++
    
    return Math.round((filled / total) * 100)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Integration Check</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Personal Toolkit */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Your Personal Communication Toolkit
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. Your go-to SBI opener:
            </label>
            <input
              type="text"
              value={data.personalToolkit.sbiOpener}
              onChange={(e) => updateToolkit('sbiOpener', e.target.value)}
              placeholder="e.g., 'In [situation], when [behavior], the impact was [outcome]...'"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2. Your default No + Option:
            </label>
            <input
              type="text"
              value={data.personalToolkit.noOption}
              onChange={(e) => updateToolkit('noOption', e.target.value)}
              placeholder="e.g., 'I can't [X], and I can [Y] or [Z]. Which serves the purpose?'"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3. Your repair template:
            </label>
            <input
              type="text"
              value={data.personalToolkit.repairTemplate}
              onChange={(e) => updateToolkit('repairTemplate', e.target.value)}
              placeholder="e.g., 'I [did X], which [caused Y]. My intent was [Z], not [A]...'"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Communication Commitment */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Communication Commitment
        </h4>
        
        <p className="text-gray-700 mb-4">
          Which 2 metrics will you track this week? 
          {getSelectedMetricsCount() === 2 && (
            <span className="ml-2 text-green-600 font-medium">✓ Perfect!</span>
          )}
          {getSelectedMetricsCount() > 2 && (
            <span className="ml-2 text-yellow-600 font-medium">Select only 2</span>
          )}
          {getSelectedMetricsCount() < 2 && (
            <span className="ml-2 text-gray-500 font-medium">({getSelectedMetricsCount()}/2 selected)</span>
          )}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={data.metrics.acceptanceRate}
              onChange={() => toggleMetric('acceptanceRate')}
              className="rounded"
            />
            <span className="text-sm">Acceptance rate of requests (%)</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={data.metrics.responseTime}
              onChange={() => toggleMetric('responseTime')}
              className="rounded"
            />
            <span className="text-sm">Response time to clear asks (hours)</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={data.metrics.decisionLatency}
              onChange={() => toggleMetric('decisionLatency')}
              className="rounded"
            />
            <span className="text-sm">Decision latency (hours to Y/N)</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={data.metrics.messageEfficiency}
              onChange={() => toggleMetric('messageEfficiency')}
              className="rounded"
            />
            <span className="text-sm">Messages ≤5 lines in tense threads</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={data.metrics.actionItems}
              onChange={() => toggleMetric('actionItems')}
              className="rounded"
            />
            <span className="text-sm">Action items with owner/date/metric</span>
          </label>
          
          <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={data.metrics.repairAttempts}
              onChange={() => toggleMetric('repairAttempts')}
              className="rounded"
            />
            <span className="text-sm">Repair attempts and resolution rate</span>
          </label>
        </div>
      </div>

      {/* Practice Plan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Practice Plan
        </h4>
        
        <p className="text-gray-700 mb-4">When will you practice each tool daily?</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[100px]">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="font-medium text-gray-700">Morning:</span>
            </div>
            <input
              type="text"
              value={data.practicePlan.morning}
              onChange={(e) => updatePracticePlan('morning', e.target.value)}
              placeholder="e.g., SBI feedback during standup"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[100px]">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-gray-700">Afternoon:</span>
            </div>
            <input
              type="text"
              value={data.practicePlan.afternoon}
              onChange={(e) => updatePracticePlan('afternoon', e.target.value)}
              placeholder="e.g., No + Option for requests"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[100px]">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-gray-700">Evening:</span>
            </div>
            <input
              type="text"
              value={data.practicePlan.evening}
              onChange={(e) => updatePracticePlan('evening', e.target.value)}
              placeholder="e.g., Decision recaps in email"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {getCompletionRate() === 100 && (
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="font-bold text-green-800 mb-2">
            🎯 Your Communication System is Ready!
          </h4>
          <p className="text-green-700 mb-4">
            You've built a complete communication protocol. Now it's time to practice!
          </p>
          <div className="space-y-2 text-sm text-green-600">
            <p>✓ {getSelectedMetricsCount()} metrics selected for tracking</p>
            <p>✓ Practice schedule defined for all times</p>
            <p>✓ Personal scripts ready to use</p>
          </div>
        </div>
      )}
    </div>
  )
}
