import { useState, useEffect } from 'react'
import { Mail, MessageSquare, Copy, CheckCircle, FileText } from 'lucide-react'

interface AsyncTemplate {
  type: 'feedback' | 'decision' | 'escalation' | 'praise'
  title: string
  content: string
  completed: boolean
}

interface HotThread {
  original: string
  rewritten: string
}

const templateGuides = {
  feedback: {
    title: 'Feedback (SBI + Request)',
    structure: [
      'Situation/Behavior/Impact (1-2 lines)',
      'Request (owner, action, date, metric)',
      'Review time (calendar link)',
      'Invite: "Anything I\'m missing?"'
    ],
    example: `Hi Sarah,

In yesterday's sprint review, the demo wasn't ready, which meant we couldn't get stakeholder feedback.

Request: You prepare demos by 3pm on review days, starting this Thursday. Success = 3 consecutive ready demos. Let's check in at Friday's retro.

Review scheduled: [calendar link]

Anything I'm missing on constraints here?

Best,
Alex`
  },
  decision: {
    title: 'Decision Recap',
    structure: [
      'Decided: owner → action → date → metric',
      'Risks accepted: __',
      'Dependencies: __',
      'Review: __ (calendar)'
    ],
    example: `Team,

Decided: Sarah → Ship v1 without auth → Wed 15:00 → Success = 100 beta signups

Risks accepted: Manual user creation for first week
Dependencies: Marketing has landing page ready
Review: Thursday standup (calendar linked)

Thanks,
Alex`
  },
  escalation: {
    title: 'Escalation (No Blame)',
    structure: [
      'We\'re at risk on [thing] due to [fact]',
      'Impact if unaddressed: __',
      'Two options: A) __ by __; B) __ by __',
      'Preference: __ because __',
      'Reply Y for A / Z for B by [time]'
    ],
    example: `Hi Jordan,

We're at risk on the Q4 launch due to a 3-day API vendor delay.

Impact if unaddressed: Miss Black Friday window ($2M revenue)

Two options:
A) Ship with mock data by Nov 20
B) Delay to Dec 1 with full integration

Preference: A, because we can capture early sales and patch later.

Reply Y for option A or Z for option B by 4pm today.

Alex`
  },
  praise: {
    title: 'Praise (Reinforces Behavior)',
    structure: [
      'Situation/Behavior: "Yesterday you __"',
      'Impact: "That unblocked __"',
      'Keep: "Please keep doing exactly that"'
    ],
    example: `Hey Maria,

Yesterday you flagged the dependency issue 2 days early.

That unblocked the entire frontend team and saved us from a Friday fire drill.

Please keep doing exactly that proactive communication—it compounds.

Thanks!
Alex`
  }
}

export function AsyncTemplates() {
  const [templates, setTemplates] = useState<AsyncTemplate[]>(() => {
    const saved = localStorage.getItem('async-templates')
    if (saved) {
      return JSON.parse(saved)
    }
    return Object.entries(templateGuides).map(([type, guide]) => ({
      type: type as AsyncTemplate['type'],
      title: guide.title,
      content: '',
      completed: false
    }))
  })

  const [hotThread, setHotThread] = useState<HotThread>(() => {
    const saved = localStorage.getItem('hot-thread-rewrite')
    if (saved) {
      return JSON.parse(saved)
    }
    return { original: '', rewritten: '' }
  })

  const [selectedTemplate, setSelectedTemplate] = useState<AsyncTemplate['type']>('feedback')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem('async-templates', JSON.stringify(templates))
  }, [templates])

  useEffect(() => {
    localStorage.setItem('hot-thread-rewrite', JSON.stringify(hotThread))
  }, [hotThread])

  const updateTemplate = (index: number, content: string) => {
    const newTemplates = [...templates]
    newTemplates[index].content = content
    newTemplates[index].completed = content.length > 50
    setTemplates(newTemplates)
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getCompletionRate = () => {
    const completed = templates.filter(t => t.completed).length
    const hotThreadComplete = hotThread.original && hotThread.rewritten ? 1 : 0
    return Math.round(((completed + hotThreadComplete) / (templates.length + 1)) * 100)
  }

  const getLineCount = (text: string) => {
    return text.split('\n').filter(line => line.trim()).length
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Async Communication Templates</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Master email/Slack templates that reduce back-and-forth and drive action.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Template Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2 flex-wrap">
          {templates.map((template, index) => (
            <button
              key={template.type}
              onClick={() => setSelectedTemplate(template.type)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedTemplate === template.type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {template.type === 'feedback' && <MessageSquare className="w-4 h-4" />}
                {template.type === 'decision' && <CheckCircle className="w-4 h-4" />}
                {template.type === 'escalation' && <Mail className="w-4 h-4" />}
                {template.type === 'praise' && <FileText className="w-4 h-4" />}
                {template.title}
                {template.completed && (
                  <span className="ml-1">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Builder */}
      {templates.map((template, index) => (
        <div
          key={template.type}
          className={`${selectedTemplate === template.type ? 'block' : 'hidden'}`}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Structure Guide */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-3">
                {templateGuides[template.type].title} Structure (≤5 lines)
              </h4>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <ol className="text-sm text-blue-700 space-y-1 list-decimal ml-4">
                  {templateGuides[template.type].structure.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Your Template */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your {template.title} Template
                {template.content && (
                  <span className="ml-2 text-gray-500">
                    ({getLineCount(template.content)} lines)
                  </span>
                )}
              </label>
              <textarea
                value={template.content}
                onChange={(e) => updateTemplate(index, e.target.value)}
                placeholder={`Write your ${template.title.toLowerCase()} template here...`}
                className="w-full px-4 py-3 border rounded-lg font-mono text-sm"
                rows={8}
              />
            </div>

            {/* Line Count Warning */}
            {getLineCount(template.content) > 5 && (
              <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-700">
                  ⚠️ Your template has {getLineCount(template.content)} lines. Aim for ≤5 lines for maximum clarity.
                </p>
              </div>
            )}

            {/* Example */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Example Template:</span>
                <button
                  onClick={() => copyToClipboard(templateGuides[template.type].example, index)}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <Copy className="w-4 h-4" />
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">
                {templateGuides[template.type].example}
              </pre>
            </div>

            {/* Quality Checklist */}
            {template.completed && (
              <div className="mt-4 bg-green-50 rounded-lg p-3">
                <p className="text-sm font-medium text-green-800 mb-2">Quality Check:</p>
                <div className="space-y-1 text-sm text-green-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    ≤5 lines total?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Clear next step with owner/date?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    No blame or judgment?
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    Would you want to receive this?
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Hot Thread Rewrite */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-700 mb-4">
          Hot Thread Rewrite Challenge
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste Your Hot Thread
            </label>
            <textarea
              value={hotThread.original}
              onChange={(e) => setHotThread({ ...hotThread, original: e.target.value })}
              placeholder="Paste a real heated email/Slack thread here..."
              className="w-full px-4 py-3 border rounded-lg text-sm"
              rows={10}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Clear + Kind Rewrite
            </label>
            <textarea
              value={hotThread.rewritten}
              onChange={(e) => setHotThread({ ...hotThread, rewritten: e.target.value })}
              placeholder="Rewrite using one of the templates above..."
              className="w-full px-4 py-3 border rounded-lg text-sm"
              rows={10}
            />
          </div>
        </div>

        {/* Comparison Stats */}
        {hotThread.original && hotThread.rewritten && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-blue-600">Original Lines</p>
                <p className="text-2xl font-bold text-blue-800">
                  {getLineCount(hotThread.original)}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Rewrite Lines</p>
                <p className="text-2xl font-bold text-blue-800">
                  {getLineCount(hotThread.rewritten)}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-600">Reduction</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((1 - getLineCount(hotThread.rewritten) / getLineCount(hotThread.original)) * 100)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
