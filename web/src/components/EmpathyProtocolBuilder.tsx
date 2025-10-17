import { useState, useEffect } from 'react'
import { FileText, Download, Save, Target, MessageSquare, Users } from 'lucide-react'

interface EmpathyProtocol {
  defaultLRL: string
  andBoundary: string
  earScript: string
  topTriggers: string[]
  goToQuestions: string[]
  asyncTemplate: {
    line1: string
    line2: string
    line3: string
    line4: string
  }
  nonverbals: string[]
  measurementPlan: {
    metric: string
    target: string
    current: string
  }
}

export function EmpathyProtocolBuilder() {
  const [protocol, setProtocol] = useState<EmpathyProtocol>(() => {
    const saved = localStorage.getItem('empathy-protocol')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      defaultLRL: '',
      andBoundary: '',
      earScript: '',
      topTriggers: ['', '', ''],
      goToQuestions: [
        'What would good enough this week look like?',
        '',
        ''
      ],
      asyncTemplate: {
        line1: '',
        line2: '',
        line3: '',
        line4: 'What am I missing?'
      },
      nonverbals: [],
      measurementPlan: {
        metric: '',
        target: '',
        current: ''
      }
    }
  })

  const metricOptions = [
    'Perceived-understanding scores (0-10)',
    'EAR acceptance rate (%)',
    'De-escalation time (minutes)',
    'Curious questions per interaction',
    'Interruption count',
    'Async message length (lines)'
  ]

  const nonverbalOptions = [
    'Slower speech rate',
    'Softer volume',
    'Open posture',
    'Brief silence after reflecting',
    'Lower pitch',
    'Visible palms',
    'Uncrossed arms',
    'Forward lean'
  ]

  useEffect(() => {
    localStorage.setItem('empathy-protocol', JSON.stringify(protocol))
  }, [protocol])

  const updateTrigger = (index: number, value: string) => {
    const newTriggers = [...protocol.topTriggers]
    newTriggers[index] = value
    setProtocol(prev => ({ ...prev, topTriggers: newTriggers }))
  }

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...protocol.goToQuestions]
    newQuestions[index] = value
    setProtocol(prev => ({ ...prev, goToQuestions: newQuestions }))
  }

  const toggleNonverbal = (nonverbal: string) => {
    const newNonverbals = protocol.nonverbals.includes(nonverbal)
      ? protocol.nonverbals.filter(n => n !== nonverbal)
      : [...protocol.nonverbals, nonverbal]
    setProtocol(prev => ({ ...prev, nonverbals: newNonverbals }))
  }

  const getCompletionRate = () => {
    let completed = 0
    const total = 10
    
    if (protocol.defaultLRL) completed++
    if (protocol.andBoundary) completed++
    if (protocol.earScript) completed++
    if (protocol.topTriggers.filter(t => t).length >= 2) completed++
    if (protocol.goToQuestions.filter(q => q).length >= 2) completed++
    if (protocol.asyncTemplate.line1) completed++
    if (protocol.asyncTemplate.line2) completed++
    if (protocol.nonverbals.length >= 3) completed++
    if (protocol.measurementPlan.metric) completed++
    if (protocol.measurementPlan.target) completed++
    
    return Math.round((completed / total) * 100)
  }

  const exportProtocol = () => {
    const protocolText = `
MY PERSONAL EMPATHY PROTOCOL
=============================
Generated: ${new Date().toLocaleDateString()}

DEFAULT PHRASES
---------------
LRL Opener: ${protocol.defaultLRL || '[Not set]'}
AND-Boundary: ${protocol.andBoundary || '[Not set]'}
EAR Script: ${protocol.earScript || '[Not set]'}

TOP TRIGGERS NEEDING EMPATHY
-----------------------------
1. ${protocol.topTriggers[0] || '[Not set]'}
2. ${protocol.topTriggers[1] || '[Not set]'}
3. ${protocol.topTriggers[2] || '[Not set]'}

GO-TO QUESTIONS
---------------
1. ${protocol.goToQuestions[0]}
2. ${protocol.goToQuestions[1] || '[Not set]'}
3. ${protocol.goToQuestions[2] || '[Not set]'}

ASYNC TEMPLATE
--------------
Line 1: ${protocol.asyncTemplate.line1 || '[LRL line]'}
Line 2: ${protocol.asyncTemplate.line2 || '[Purpose line]'}
Line 3: ${protocol.asyncTemplate.line3 || '[Option line]'}
Line 4: ${protocol.asyncTemplate.line4}

NONVERBAL CHECKLIST
-------------------
${protocol.nonverbals.map(n => `✓ ${n}`).join('\n') || '[None selected]'}

MEASUREMENT PLAN
----------------
Tracking: ${protocol.measurementPlan.metric || '[Not set]'}
Target: ${protocol.measurementPlan.target || '[Not set]'}
Current: ${protocol.measurementPlan.current || '[Not set]'}

NOTES
-----
Remember: Empathy is understanding, not agreement.
Practice daily with real interactions.
Track progress weekly.
`
    
    const blob = new Blob([protocolText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `empathy-protocol-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Build Your Empathy Protocol</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Create your personal toolkit for empathetic communication.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Default Phrases */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-500" />
          Your Go-To Phrases
        </h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default LRL Opener
          </label>
          <input
            type="text"
            value={protocol.defaultLRL}
            onChange={(e) => setProtocol(prev => ({ ...prev, defaultLRL: e.target.value }))}
            placeholder="It sounds like you're [feeling] because [need/concern]..."
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AND-Boundary Template
          </label>
          <input
            type="text"
            value={protocol.andBoundary}
            onChange={(e) => setProtocol(prev => ({ ...prev, andBoundary: e.target.value }))}
            placeholder="I understand [their need], AND [your constraint]. Could we..."
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            EAR Script Template
          </label>
          <textarea
            value={protocol.earScript}
            onChange={(e) => setProtocol(prev => ({ ...prev, earScript: e.target.value }))}
            placeholder="I see [empathy]. I'm constrained by [limit]. If our purpose is [goal], can we try..."
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          />
        </div>
      </div>

      {/* Top Triggers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-500" />
          Top Triggers Needing Empathy
        </h4>
        
        <div className="space-y-3">
          {[0, 1, 2].map(index => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-8 text-center font-bold text-gray-600">
                {index + 1}.
              </span>
              <input
                type="text"
                value={protocol.topTriggers[index]}
                onChange={(e) => updateTrigger(index, e.target.value)}
                placeholder={`e.g., ${
                  ['Criticism in meetings', 'Last-minute changes', 'Being interrupted'][index]
                }`}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Go-To Questions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Your Go-To Curious Questions
        </h4>
        
        <div className="space-y-3">
          {[0, 1, 2].map(index => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-8 text-center font-bold text-gray-600">
                {index + 1}.
              </span>
              <input
                type="text"
                value={protocol.goToQuestions[index]}
                onChange={(e) => updateQuestion(index, e.target.value)}
                placeholder={index === 0 ? "Pre-filled example" : "Your question..."}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Async Template */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Async Empathy Template (Email/Slack)
        </h4>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Line 1 - LRL</label>
            <input
              type="text"
              value={protocol.asyncTemplate.line1}
              onChange={(e) => setProtocol(prev => ({ 
                ...prev, 
                asyncTemplate: { ...prev.asyncTemplate, line1: e.target.value }
              }))}
              placeholder="I hear you're [feeling] because..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Line 2 - Purpose</label>
            <input
              type="text"
              value={protocol.asyncTemplate.line2}
              onChange={(e) => setProtocol(prev => ({ 
                ...prev, 
                asyncTemplate: { ...prev.asyncTemplate, line2: e.target.value }
              }))}
              placeholder="If our goal is..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Line 3 - Option</label>
            <input
              type="text"
              value={protocol.asyncTemplate.line3}
              onChange={(e) => setProtocol(prev => ({ 
                ...prev, 
                asyncTemplate: { ...prev.asyncTemplate, line3: e.target.value }
              }))}
              placeholder="Propose: [action] by [time]"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Line 4 - Invite</label>
            <input
              type="text"
              value={protocol.asyncTemplate.line4}
              onChange={(e) => setProtocol(prev => ({ 
                ...prev, 
                asyncTemplate: { ...prev.asyncTemplate, line4: e.target.value }
              }))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Nonverbal Checklist */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Nonverbal Checklist (Select Your Top 3+)
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {nonverbalOptions.map(option => (
            <label
              key={option}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={protocol.nonverbals.includes(option)}
                onChange={() => toggleNonverbal(option)}
                className="rounded"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Measurement Plan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Measurement Plan (Track Progress)
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What will you track?
            </label>
            <select
              value={protocol.measurementPlan.metric}
              onChange={(e) => setProtocol(prev => ({ 
                ...prev, 
                measurementPlan: { ...prev.measurementPlan, metric: e.target.value }
              }))}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a metric...</option>
              {metricOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Value
              </label>
              <input
                type="text"
                value={protocol.measurementPlan.target}
                onChange={(e) => setProtocol(prev => ({ 
                  ...prev, 
                  measurementPlan: { ...prev.measurementPlan, target: e.target.value }
                }))}
                placeholder="e.g., 8/10 or 80%"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Baseline
              </label>
              <input
                type="text"
                value={protocol.measurementPlan.current}
                onChange={(e) => setProtocol(prev => ({ 
                  ...prev, 
                  measurementPlan: { ...prev.measurementPlan, current: e.target.value }
                }))}
                placeholder="e.g., 5/10 or 50%"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {getCompletionRate() >= 80 && (
        <div className="bg-green-50 rounded-lg shadow-md p-6">
          <h4 className="font-semibold text-green-800 mb-3">
            Your Protocol Summary
          </h4>
          <div className="space-y-2 text-sm text-green-700">
            <p>✓ Core phrases defined</p>
            <p>✓ Triggers identified: {protocol.topTriggers.filter(t => t).length}/3</p>
            <p>✓ Questions ready: {protocol.goToQuestions.filter(q => q).length}/3</p>
            <p>✓ Nonverbals selected: {protocol.nonverbals.length}</p>
            {protocol.measurementPlan.metric && (
              <p>✓ Tracking: {protocol.measurementPlan.metric}</p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            localStorage.setItem('empathy-protocol', JSON.stringify(protocol))
            alert('Protocol saved!')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-5 h-5" />
          Save Protocol
        </button>
        
        <button
          onClick={exportProtocol}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="w-5 h-5" />
          Export Protocol
        </button>
      </div>
    </div>
  )
}
