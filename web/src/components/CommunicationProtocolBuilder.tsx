import { useState, useEffect } from 'react'
import { FileText, Download, Copy, CheckCircle } from 'lucide-react'

interface CommunicationProtocol {
  // Core Scripts
  defaultSBI: string
  defaultNoOption: string
  defaultRepair: string
  defaultDecisionRecap: string
  
  // Channel Preferences
  faceToFace: string[]
  written: string[]
  never: string[]
  
  // Response Times
  blockingResponse: string
  normalResponse: string
  praiseResponse: string
  
  // Escalation
  escalationTrigger: string
  escalationFormat: string
  
  // Personal Rules
  rule1: string
  rule2: string
  rule3: string
}

export function CommunicationProtocolBuilder() {
  const [protocol, setProtocol] = useState<CommunicationProtocol>(() => {
    const saved = localStorage.getItem('communication-protocol')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      defaultSBI: '',
      defaultNoOption: '',
      defaultRepair: '',
      defaultDecisionRecap: '',
      faceToFace: [],
      written: [],
      never: [],
      blockingResponse: '',
      normalResponse: '',
      praiseResponse: '',
      escalationTrigger: '',
      escalationFormat: '',
      rule1: '',
      rule2: '',
      rule3: ''
    }
  })

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    localStorage.setItem('communication-protocol', JSON.stringify(protocol))
  }, [protocol])

  const updateProtocol = (field: keyof CommunicationProtocol, value: any) => {
    setProtocol(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleChannelItem = (channel: 'faceToFace' | 'written' | 'never', item: string) => {
    const current = protocol[channel]
    if (current.includes(item)) {
      updateProtocol(channel, current.filter(i => i !== item))
    } else {
      updateProtocol(channel, [...current, item])
    }
  }

  const getCompletionRate = () => {
    let filled = 0
    const total = 14
    
    if (protocol.defaultSBI) filled++
    if (protocol.defaultNoOption) filled++
    if (protocol.defaultRepair) filled++
    if (protocol.defaultDecisionRecap) filled++
    if (protocol.faceToFace.length > 0) filled++
    if (protocol.written.length > 0) filled++
    if (protocol.never.length > 0) filled++
    if (protocol.blockingResponse) filled++
    if (protocol.normalResponse) filled++
    if (protocol.praiseResponse) filled++
    if (protocol.escalationTrigger) filled++
    if (protocol.escalationFormat) filled++
    if (protocol.rule1) filled++
    if (protocol.rule2) filled++
    
    return Math.round((filled / total) * 100)
  }

  const exportProtocol = () => {
    const text = `MY COMMUNICATION PROTOCOL
========================

CORE SCRIPTS
------------
Default SBI: ${protocol.defaultSBI}
Default No + Option: ${protocol.defaultNoOption}
Default Repair: ${protocol.defaultRepair}
Default Decision Recap: ${protocol.defaultDecisionRecap}

CHANNEL PREFERENCES
-------------------
Face-to-Face/Video: ${protocol.faceToFace.join(', ')}
Written (Email/Slack): ${protocol.written.join(', ')}
Never in Writing: ${protocol.never.join(', ')}

RESPONSE TIMES
--------------
Blocking Issues: ${protocol.blockingResponse}
Normal Requests: ${protocol.normalResponse}
Praise/Recognition: ${protocol.praiseResponse}

ESCALATION
----------
Trigger: ${protocol.escalationTrigger}
Format: ${protocol.escalationFormat}

PERSONAL RULES
--------------
1. ${protocol.rule1}
2. ${protocol.rule2}
3. ${protocol.rule3}

Generated: ${new Date().toLocaleDateString()}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'communication-protocol.txt'
    a.click()
  }

  const copyToClipboard = async () => {
    const text = `My Communication Protocol:
• SBI: ${protocol.defaultSBI}
• No+Option: ${protocol.defaultNoOption}
• Repair: ${protocol.defaultRepair}
• Blocking response: ${protocol.blockingResponse}`
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const channelOptions = [
    'Performance feedback',
    'Conflict resolution',
    'Emotional topics',
    'Complex decisions',
    'Quick updates',
    'Praise',
    'Process changes',
    'Criticism',
    'Terminations',
    'Personal matters'
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Your Communication Protocol</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Build your personal communication operating system.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Core Scripts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Core Communication Scripts
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Default SBI Opener
            </label>
            <input
              type="text"
              value={protocol.defaultSBI}
              onChange={(e) => updateProtocol('defaultSBI', e.target.value)}
              placeholder="e.g., In [situation], when [behavior], the impact was..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Default No + Option
            </label>
            <input
              type="text"
              value={protocol.defaultNoOption}
              onChange={(e) => updateProtocol('defaultNoOption', e.target.value)}
              placeholder="e.g., I can't [X], and I can [Y] or [Z]. Which serves the purpose?"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Default Repair Script
            </label>
            <input
              type="text"
              value={protocol.defaultRepair}
              onChange={(e) => updateProtocol('defaultRepair', e.target.value)}
              placeholder="e.g., I [did X], which [caused Y]. My intent was..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Decision Recap Template
            </label>
            <input
              type="text"
              value={protocol.defaultDecisionRecap}
              onChange={(e) => updateProtocol('defaultDecisionRecap', e.target.value)}
              placeholder="e.g., Decided: [owner] → [action] → [date] → [metric]"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Channel Preferences */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4">Channel Preferences</h4>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h5 className="text-sm font-medium text-green-700 mb-2">Face-to-Face/Video</h5>
            <div className="space-y-2">
              {channelOptions.slice(0, 4).map(option => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={protocol.faceToFace.includes(option)}
                    onChange={() => toggleChannelItem('faceToFace', option)}
                    className="rounded"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-blue-700 mb-2">Written (Email/Slack)</h5>
            <div className="space-y-2">
              {channelOptions.slice(4, 7).map(option => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={protocol.written.includes(option)}
                    onChange={() => toggleChannelItem('written', option)}
                    className="rounded"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-red-700 mb-2">Never in Writing</h5>
            <div className="space-y-2">
              {channelOptions.slice(7, 10).map(option => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={protocol.never.includes(option)}
                    onChange={() => toggleChannelItem('never', option)}
                    className="rounded"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Response Times */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4">Response Time Commitments</h4>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">
              Blocking Issues
            </label>
            <input
              type="text"
              value={protocol.blockingResponse}
              onChange={(e) => updateProtocol('blockingResponse', e.target.value)}
              placeholder="e.g., Within 1 hour"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-700 mb-1">
              Normal Requests
            </label>
            <input
              type="text"
              value={protocol.normalResponse}
              onChange={(e) => updateProtocol('normalResponse', e.target.value)}
              placeholder="e.g., Within 4 hours"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Praise/Recognition
            </label>
            <input
              type="text"
              value={protocol.praiseResponse}
              onChange={(e) => updateProtocol('praiseResponse', e.target.value)}
              placeholder="e.g., Same day"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Escalation Plan */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4">Escalation Protocol</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              When to Escalate
            </label>
            <input
              type="text"
              value={protocol.escalationTrigger}
              onChange={(e) => updateProtocol('escalationTrigger', e.target.value)}
              placeholder="e.g., After 2 attempts OR 48 hours without response"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Escalation Format
            </label>
            <input
              type="text"
              value={protocol.escalationFormat}
              onChange={(e) => updateProtocol('escalationFormat', e.target.value)}
              placeholder="e.g., Risk statement + 2 options + deadline for response"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Personal Rules */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4">My 3 Communication Rules</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rule #1
            </label>
            <input
              type="text"
              value={protocol.rule1}
              onChange={(e) => updateProtocol('rule1', e.target.value)}
              placeholder="e.g., Never send emotional emails—draft and wait 2 hours"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rule #2
            </label>
            <input
              type="text"
              value={protocol.rule2}
              onChange={(e) => updateProtocol('rule2', e.target.value)}
              placeholder="e.g., Always include owner + date in action items"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rule #3
            </label>
            <input
              type="text"
              value={protocol.rule3}
              onChange={(e) => updateProtocol('rule3', e.target.value)}
              placeholder="e.g., Praise in public, criticize in private"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={exportProtocol}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download className="w-5 h-5" />
          Export Protocol
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          {copied ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Summary
            </>
          )}
        </button>
      </div>
    </div>
  )
}
