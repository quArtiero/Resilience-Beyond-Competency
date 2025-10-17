import { useState, useEffect } from 'react'
import { Mail, MessageSquare, CheckCircle, RefreshCcw, ArrowRight } from 'lucide-react'

interface AsyncMessage {
  original: string
  lrlLine: string
  purposeLine: string
  optionLine: string
  inviteLine: string
  lineCount: number
}

const exampleMessages = [
  {
    original: "You missed the handoff again. This is slowing us down. Fix it.",
    modelLRL: "I hear you're frustrated because the handoff slipped twice and QA lost time.",
    modelPurpose: "If our goal is reliable handoffs this week...",
    modelOption: "Propose: 24hr precheck at 3pm daily; if two on-time by Thu, we keep it—review Fri 10am.",
    modelInvite: "What am I missing before we try this?"
  },
  {
    original: "The code review process is a joke. Half the team ignores it.",
    modelLRL: "You're concerned that inconsistent code review is affecting quality and standards.",
    modelPurpose: "If our purpose is consistent quality checks...",
    modelOption: "Try: mandatory 2-reviewer rule for main branch, automated reminders after 4hrs.",
    modelInvite: "Any blockers to testing this for a week?"
  },
  {
    original: "I don't have time for another meeting about this.",
    modelLRL: "Sounds like you're overwhelmed and meetings feel unproductive.",
    modelPurpose: "If the goal is quick alignment without time waste...",
    modelOption: "Alternative: async updates in Slack, 5-min sync only if blocked.",
    modelInvite: "Would this work better for your schedule?"
  }
]

export function AsyncEmpathyDrill() {
  const [messages, setMessages] = useState<AsyncMessage[]>(() => {
    const saved = localStorage.getItem('async-empathy-messages')
    if (saved) {
      return JSON.parse(saved)
    }
    return exampleMessages.map(ex => ({
      original: ex.original,
      lrlLine: '',
      purposeLine: '',
      optionLine: '',
      inviteLine: '',
      lineCount: 0
    }))
  })

  const [customMessage, setCustomMessage] = useState('')
  const [showModels, setShowModels] = useState(false)
  const [activeTab, setActiveTab] = useState<'examples' | 'custom'>('examples')

  useEffect(() => {
    localStorage.setItem('async-empathy-messages', JSON.stringify(messages))
  }, [messages])

  const updateMessage = (index: number, field: keyof AsyncMessage, value: string) => {
    const newMessages = [...messages]
    newMessages[index] = {
      ...newMessages[index],
      [field]: value
    }
    
    // Update line count
    const lines = [
      newMessages[index].lrlLine,
      newMessages[index].purposeLine,
      newMessages[index].optionLine,
      newMessages[index].inviteLine
    ].filter(line => line.trim().length > 0)
    
    newMessages[index].lineCount = lines.length
    setMessages(newMessages)
  }

  const getCompletionRate = () => {
    const totalFields = messages.length * 4
    const filledFields = messages.reduce((sum, msg) => {
      let filled = 0
      if (msg.lrlLine) filled++
      if (msg.purposeLine) filled++
      if (msg.optionLine) filled++
      if (msg.inviteLine) filled++
      return sum + filled
    }, 0)
    
    return Math.round((filledFields / totalFields) * 100)
  }

  const generateFullMessage = (msg: AsyncMessage) => {
    const lines = []
    if (msg.lrlLine) lines.push(msg.lrlLine)
    if (msg.purposeLine) lines.push(msg.purposeLine)
    if (msg.optionLine) lines.push(msg.optionLine)
    if (msg.inviteLine) lines.push(msg.inviteLine)
    return lines.join('\n')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const reset = () => {
    setMessages(exampleMessages.map(ex => ({
      original: ex.original,
      lrlLine: '',
      purposeLine: '',
      optionLine: '',
      inviteLine: '',
      lineCount: 0
    })))
    setShowModels(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Async Empathy Rewriter</h3>
          <span className="text-sm text-gray-600">
            {activeTab === 'examples' ? `${getCompletionRate()}% Complete` : 'Custom Mode'}
          </span>
        </div>
        <p className="text-gray-600">
          Transform tense messages into empathetic, solution-focused responses.
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'examples'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Practice Examples
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'custom'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Your Own Message
        </button>
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                {/* Original Message */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-700">Original Message:</span>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-gray-800">"{msg.original}"</p>
                  </div>
                </div>

                {/* Rewrite Template */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 1 - LRL (Listen-Reflect-Label)
                    </label>
                    <input
                      type="text"
                      value={msg.lrlLine}
                      onChange={(e) => updateMessage(index, 'lrlLine', e.target.value)}
                      placeholder="I hear you're frustrated because..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 2 - Purpose
                    </label>
                    <input
                      type="text"
                      value={msg.purposeLine}
                      onChange={(e) => updateMessage(index, 'purposeLine', e.target.value)}
                      placeholder="If our goal is..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 3 - Option + Review
                    </label>
                    <input
                      type="text"
                      value={msg.optionLine}
                      onChange={(e) => updateMessage(index, 'optionLine', e.target.value)}
                      placeholder="Propose: [specific action] by [time]; review [when]"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Line 4 - Invite Input
                    </label>
                    <input
                      type="text"
                      value={msg.inviteLine}
                      onChange={(e) => updateMessage(index, 'inviteLine', e.target.value)}
                      placeholder="What am I missing?"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                {/* Line Count */}
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-sm ${
                    msg.lineCount > 5 ? 'text-red-600 font-medium' : 'text-green-600'
                  }`}>
                    {msg.lineCount} lines {msg.lineCount > 5 && '(aim for ≤5)'}
                  </span>
                  
                  {msg.lineCount > 0 && (
                    <button
                      onClick={() => copyToClipboard(generateFullMessage(msg))}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Copy Response
                    </button>
                  )}
                </div>

                {/* Model Answer */}
                {showModels && (
                  <div className="mt-4 bg-green-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-700 mb-2">Model Response:</p>
                    <div className="space-y-1 text-sm text-green-800">
                      <p><strong>LRL:</strong> {exampleMessages[index].modelLRL}</p>
                      <p><strong>Purpose:</strong> {exampleMessages[index].modelPurpose}</p>
                      <p><strong>Option:</strong> {exampleMessages[index].modelOption}</p>
                      <p><strong>Invite:</strong> {exampleMessages[index].modelInvite}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setShowModels(!showModels)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {showModels ? 'Hide' : 'Show'} Model Answers
            </button>
            
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <RefreshCcw className="w-5 h-5" />
              Reset Examples
            </button>
          </div>
        </>
      )}

      {/* Custom Message Tab */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Your Tense Message
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Paste the message you need to respond to..."
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          {customMessage && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-3">Your Rewrite:</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Line 1 - Acknowledge their concern
                    </label>
                    <input
                      type="text"
                      placeholder="I hear you're [feeling] because [situation]..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Line 2 - State shared purpose
                    </label>
                    <input
                      type="text"
                      placeholder="If our goal is [shared objective]..."
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Line 3 - Propose specific next step
                    </label>
                    <input
                      type="text"
                      placeholder="Propose: [action] by [time]; review [when]"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Line 4 - Invite their input
                    </label>
                    <input
                      type="text"
                      placeholder="What would work better? / What am I missing?"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  💡 Remember the Formula:
                </p>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal ml-4">
                  <li>Reflect their concern (shows you heard)</li>
                  <li>Connect to shared goal (alignment)</li>
                  <li>Propose concrete action (forward movement)</li>
                  <li>Invite collaboration (partnership)</li>
                </ol>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm font-medium text-yellow-800 mb-2">
          🎯 Async Empathy Best Practices
        </p>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Keep it under 5 lines (respect their time)</li>
          <li>• Start with understanding, not solutions</li>
          <li>• Use bullets for multiple points</li>
          <li>• End with a question (invites dialogue)</li>
          <li>• Specific timelines &gt; vague promises</li>
        </ul>
      </div>
    </div>
  )
}
