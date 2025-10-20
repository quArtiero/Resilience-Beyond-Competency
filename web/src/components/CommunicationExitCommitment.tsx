import { useState, useEffect } from 'react'
import { Target, CheckCircle, Calendar, TrendingUp } from 'lucide-react'

interface ExitCommitmentData {
  sbiRequest48h: string
  noOptionLine: string
  metric1: string
  metric1Target: string
  metric2: string
  metric2Target: string
  biggestNeed: string
  biggestChallenge: string
  successStory: string
  notYetSituation: string
  whatToChange: string
  top3Scripts: {
    script1: string
    script2: string
    script3: string
  }
}

export function CommunicationExitCommitment() {
  const [data, setData] = useState<ExitCommitmentData>(() => {
    const saved = localStorage.getItem('communication-exit-commitment')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      sbiRequest48h: '',
      noOptionLine: '',
      metric1: '',
      metric1Target: '',
      metric2: '',
      metric2Target: '',
      biggestNeed: '',
      biggestChallenge: '',
      successStory: '',
      notYetSituation: '',
      whatToChange: '',
      top3Scripts: {
        script1: '',
        script2: '',
        script3: ''
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('communication-exit-commitment', JSON.stringify(data))
  }, [data])

  const updateField = (field: keyof ExitCommitmentData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateScript = (script: keyof typeof data.top3Scripts, value: string) => {
    setData(prev => ({
      ...prev,
      top3Scripts: {
        ...prev.top3Scripts,
        [script]: value
      }
    }))
  }

  const getCompletionRate = () => {
    let filled = 0
    const total = 14
    
    if (data.sbiRequest48h) filled++
    if (data.noOptionLine) filled++
    if (data.metric1) filled++
    if (data.metric1Target) filled++
    if (data.metric2) filled++
    if (data.metric2Target) filled++
    if (data.biggestNeed) filled++
    if (data.biggestChallenge) filled++
    if (data.successStory) filled++
    if (data.notYetSituation) filled++
    if (data.whatToChange) filled++
    if (data.top3Scripts.script1) filled++
    if (data.top3Scripts.script2) filled++
    if (data.top3Scripts.script3) filled++
    
    return Math.round((filled / total) * 100)
  }

  const exportCommitment = () => {
    const text = `MY COMMUNICATION EXIT COMMITMENT
================================

IMMEDIATE ACTIONS (48 HOURS)
----------------------------
SBI + Request: ${data.sbiRequest48h}
No + Option: ${data.noOptionLine}

TRACKING METRICS
----------------
Metric 1: ${data.metric1} (Target: ${data.metric1Target})
Metric 2: ${data.metric2} (Target: ${data.metric2Target})

SELF-ASSESSMENT
---------------
Biggest Need: ${data.biggestNeed}
Biggest Challenge: ${data.biggestChallenge}

HOMEWORK REFLECTION
-------------------
Success Story: ${data.successStory}
Not Yet Situation: ${data.notYetSituation}
What I'll Change: ${data.whatToChange}

TOP 3 COMMUNICATION SCRIPTS
---------------------------
1. ${data.top3Scripts.script1}
2. ${data.top3Scripts.script2}
3. ${data.top3Scripts.script3}

Generated: ${new Date().toLocaleDateString()}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'communication-commitment.txt'
    a.click()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Exit Commitment</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Lock in your communication practice plan
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Immediate Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-600" />
          Complete These Statements
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. My SBI + Request sentence I'll use within 48h is:
            </label>
            <textarea
              value={data.sbiRequest48h}
              onChange={(e) => updateField('sbiRequest48h', e.target.value)}
              placeholder="e.g., In tomorrow's standup, when updates exceed 2 minutes, it delays our start by 10 minutes. Request: Keep updates to 90 seconds; I'll timebox; success = on-time finish for 3 days; review Friday."
              className="w-full px-4 py-3 border rounded-lg"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2. My No + Option line is:
            </label>
            <textarea
              value={data.noOptionLine}
              onChange={(e) => updateField('noOptionLine', e.target.value)}
              placeholder="e.g., I can't review the entire codebase by tomorrow, and I can review the critical auth module by 3pm or the full review by Thursday. Which serves the security audit better?"
              className="w-full px-4 py-3 border rounded-lg"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. I'll track [metric 1]
              </label>
              <input
                type="text"
                value={data.metric1}
                onChange={(e) => updateField('metric1', e.target.value)}
                placeholder="e.g., Request acceptance rate"
                className="w-full px-3 py-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={data.metric1Target}
                onChange={(e) => updateField('metric1Target', e.target.value)}
                placeholder="Target: e.g., 80%"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                and [metric 2]
              </label>
              <input
                type="text"
                value={data.metric2}
                onChange={(e) => updateField('metric2', e.target.value)}
                placeholder="e.g., Response time"
                className="w-full px-3 py-2 border rounded-lg mb-2"
              />
              <input
                type="text"
                value={data.metric2Target}
                onChange={(e) => updateField('metric2Target', e.target.value)}
                placeholder="Target: e.g., <2 hours"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4. The situation where I most need clear communication is:
            </label>
            <input
              type="text"
              value={data.biggestNeed}
              onChange={(e) => updateField('biggestNeed', e.target.value)}
              placeholder="e.g., Sprint planning when scope keeps expanding"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              5. My biggest communication challenge is:
            </label>
            <input
              type="text"
              value={data.biggestChallenge}
              onChange={(e) => updateField('biggestChallenge', e.target.value)}
              placeholder="e.g., Being too indirect when giving critical feedback"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Homework Prep */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Homework (Prep for Lesson 7)
        </h4>
        
        <p className="text-gray-600 mb-4">
          Bring to Lesson 7:
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              One communication success story:
            </label>
            <textarea
              value={data.successStory}
              onChange={(e) => updateField('successStory', e.target.value)}
              placeholder="Describe a situation where your clear communication worked well..."
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              One "not yet" situation:
            </label>
            <textarea
              value={data.notYetSituation}
              onChange={(e) => updateField('notYetSituation', e.target.value)}
              placeholder="Describe where communication didn't work as planned..."
              className="w-full px-3 py-2 border rounded-lg"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What you'll change:
            </label>
            <input
              type="text"
              value={data.whatToChange}
              onChange={(e) => updateField('whatToChange', e.target.value)}
              placeholder="e.g., Add more specific metrics to my requests"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Scripts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Your Top 3 Communication Scripts
        </h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Script #1 (Most Used)
            </label>
            <input
              type="text"
              value={data.top3Scripts.script1}
              onChange={(e) => updateScript('script1', e.target.value)}
              placeholder="e.g., Your SBI opener"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Script #2
            </label>
            <input
              type="text"
              value={data.top3Scripts.script2}
              onChange={(e) => updateScript('script2', e.target.value)}
              placeholder="e.g., Your No + Option template"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Script #3
            </label>
            <input
              type="text"
              value={data.top3Scripts.script3}
              onChange={(e) => updateScript('script3', e.target.value)}
              placeholder="e.g., Your decision recap format"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Daily Practice Reminder */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-bold text-blue-800 mb-3">Daily Practice (5-10 minutes)</h4>
        <ol className="space-y-2 text-blue-700 list-decimal ml-5">
          <li>Deliver one SBI + Request in real life; log acceptance Y/N</li>
          <li>Use No + Option once; note the response</li>
          <li>Send one Decision Recap with owner/date/metric</li>
          <li>Attempt one Clear Repair if friction arose; log resolution Y/N</li>
        </ol>
      </div>

      {/* Export Button */}
      {getCompletionRate() >= 70 && (
        <div className="flex justify-center">
          <button
            onClick={exportCommitment}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <CheckCircle className="w-5 h-5" />
            Export My Commitment
          </button>
        </div>
      )}

      {/* Completion Message */}
      {getCompletionRate() === 100 && (
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="font-bold text-green-800 mb-2">
            🎯 Ready for Clear Communication!
          </h4>
          <p className="text-green-700 mb-3">
            You've completed your exit commitment. Remember:
          </p>
          <p className="text-green-600 italic">
            "Caring is clarity. Every interaction is practice."
          </p>
        </div>
      )}
    </div>
  )
}
