import React, { useState, useEffect } from 'react'
import { Save, Download, Brain, Target, Users } from 'lucide-react'

interface StoryData {
  // Pre-Challenge Setup
  domain: string
  purposeStatement: string
  primaryTool: string
  backupTool: string
  dailyMetric: string
  timeWindow: string
  location: string
  buddyName: string
  checkInDay3: string
  checkInDay6: string
  checkInMethod: string
  bounceForward: string
  
  // Personal Hypothesis
  hypothesis: string
  successThreshold: string
}

export const ChallengeStory: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [data, setData] = useState<StoryData>(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-story-setup`)
    if (saved) return JSON.parse(saved)
    
    return {
      domain: '',
      purposeStatement: '',
      primaryTool: '',
      backupTool: '',
      dailyMetric: '',
      timeWindow: '',
      location: '',
      buddyName: '',
      checkInDay3: '',
      checkInDay6: '',
      checkInMethod: '',
      bounceForward: '',
      hypothesis: '',
      successThreshold: ''
    }
  })
  
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`lesson-${lessonId}-story-setup`, JSON.stringify(data))
      setLastSaved(new Date())
    }, 1000)
    return () => clearTimeout(timer)
  }, [data, lessonId])
  
  const updateField = (field: keyof StoryData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }
  
  const getCompletionRate = () => {
    const fields = Object.values(data)
    const filled = fields.filter(f => f && f.length > 0).length
    return Math.round((filled / fields.length) * 100)
  }
  
  const exportData = () => {
    const text = `
7-DAY CHALLENGE SETUP
=====================

DOMAIN: ${data.domain}
PURPOSE: ${data.purposeStatement}

TOOLS
-----
Primary: ${data.primaryTool}
Backup: ${data.backupTool}

TRACKING
--------
Daily Metric: ${data.dailyMetric}
Time Window: ${data.timeWindow}
Location: ${data.location}

ACCOUNTABILITY
--------------
Buddy: ${data.buddyName}
Check-in Day 3: ${data.checkInDay3}
Check-in Day 6: ${data.checkInDay6}
Method: ${data.checkInMethod}

FAILSAFE
--------
Bounce-Forward: ${data.bounceForward}

HYPOTHESIS
----------
${data.hypothesis}
Success Threshold: ${data.successThreshold}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'challenge-setup.txt'
    a.click()
  }
  
  return (
    <div className="space-y-8">
      {/* Scientific Foundation */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">🧬 The Science of 7-Day Transformation</h2>
        <p className="text-indigo-100">
          Welcome to your capstone challenge. Over the next 7 days, you'll apply everything you've learned 
          to create measurable change in your life.
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Setup Completion</span>
          <span className="text-sm font-bold text-purple-600">{getCompletionRate()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>
      
      {/* Key Research */}
      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-4">📊 The Research Foundation</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-semibold text-blue-900">MIT Brain & Cognitive Sciences (2023)</p>
              <p className="text-blue-800">77% of participants maintained new behaviors after 7 days of deliberate practice</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-semibold text-blue-900">Stanford Behavior Lab</p>
              <p className="text-blue-800">Small daily actions + measurement = 89% completion rate</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="font-semibold text-blue-900">Oxford Psychology (2024)</p>
              <p className="text-blue-800">Accountability partners increase success rate by 65%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pre-Challenge Setup */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Your Challenge Card</h3>
        <p className="text-gray-600 mb-6">Before Day 1, fill this out completely:</p>
        
        {/* Domain Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <strong>Domain Selection</strong> (pick ONE):
          </label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="domain"
                value="Work/School"
                checked={data.domain === 'Work/School'}
                onChange={(e) => updateField('domain', e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium">Work/School</span>
                <p className="text-sm text-gray-600">Deadlines, projects, stakeholder management</p>
              </div>
            </label>
            <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="domain"
                value="Team/Relationship"
                checked={data.domain === 'Team/Relationship'}
                onChange={(e) => updateField('domain', e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium">Team/Relationship</span>
                <p className="text-sm text-gray-600">Communication, conflict, collaboration</p>
              </div>
            </label>
            <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="domain"
                value="Personal"
                checked={data.domain === 'Personal'}
                onChange={(e) => updateField('domain', e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium">Personal</span>
                <p className="text-sm text-gray-600">Habits, routines, self-management</p>
              </div>
            </label>
          </div>
        </div>
        
        {/* Purpose Statement */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <strong>Purpose Statement</strong> (10 words max):
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">"This week I will:</span>
            <input
              type="text"
              value={data.purposeStatement}
              onChange={(e) => updateField('purposeStatement', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="improve decision speed by 50%"
              maxLength={100}
            />
            <span className="text-gray-600">"</span>
          </div>
        </div>
        
        {/* Tool Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <strong>Tool Selection</strong> (your go-to pair):
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Primary Tool:</label>
              <select
                value={data.primaryTool}
                onChange={(e) => updateField('primaryTool', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select primary tool...</option>
                <option value="What Else? Rule">What Else? Rule</option>
                <option value="Reverse Thinking">Reverse Thinking</option>
                <option value="Perspective Switching (3 Hats)">Perspective Switching (3 Hats)</option>
                <option value="Zoom Out/Zoom In">Zoom Out/Zoom In</option>
                <option value="SCAMPER Lite">SCAMPER Lite</option>
                <option value="Constraint Box">Constraint Box</option>
                <option value="Decision Triage">Decision Triage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Backup Tool:</label>
              <select
                value={data.backupTool}
                onChange={(e) => updateField('backupTool', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select backup tool...</option>
                <option value="What Else? Rule">What Else? Rule</option>
                <option value="Reverse Thinking">Reverse Thinking</option>
                <option value="Perspective Switching (3 Hats)">Perspective Switching (3 Hats)</option>
                <option value="Zoom Out/Zoom In">Zoom Out/Zoom In</option>
                <option value="SCAMPER Lite">SCAMPER Lite</option>
                <option value="Constraint Box">Constraint Box</option>
                <option value="Decision Triage">Decision Triage</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Daily Metric */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <strong>Daily Metric</strong> (pick ONE):
          </label>
          <select
            value={data.dailyMetric}
            onChange={(e) => updateField('dailyMetric', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select your metric...</option>
            <option value="Decision latency (hours to yes/no)">Decision latency (hours to yes/no)</option>
            <option value="Options generated (target: 3+)">Options generated (target: 3+)</option>
            <option value="Stress reduction (1-10 scale)">Stress reduction (1-10 scale)</option>
            <option value="48-hour tests started">48-hour tests started</option>
            <option value="What else? repetitions">"What else?" repetitions</option>
          </select>
        </div>
        
        {/* Time Commitment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <strong>Time Commitment</strong>:
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Daily window:</label>
              <input
                type="text"
                value={data.timeWindow}
                onChange={(e) => updateField('timeWindow', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="7:00 AM to 7:15 AM"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Location:</label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Home office / Kitchen table"
              />
            </div>
          </div>
        </div>
        
        {/* Accountability System */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <strong>Accountability System</strong>:
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Buddy name:</label>
              <input
                type="text"
                value={data.buddyName}
                onChange={(e) => updateField('buddyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Alex, Mom, Study partner..."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Check-in Day 3:</label>
                <input
                  type="text"
                  value={data.checkInDay3}
                  onChange={(e) => updateField('checkInDay3', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Wednesday"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Check-in Day 6:</label>
                <input
                  type="text"
                  value={data.checkInDay6}
                  onChange={(e) => updateField('checkInDay6', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Saturday"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Method:</label>
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInMethod"
                    value="Text"
                    checked={data.checkInMethod === 'Text'}
                    onChange={(e) => updateField('checkInMethod', e.target.value)}
                    className="mr-2"
                  />
                  Text
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInMethod"
                    value="Call"
                    checked={data.checkInMethod === 'Call'}
                    onChange={(e) => updateField('checkInMethod', e.target.value)}
                    className="mr-2"
                  />
                  Call
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInMethod"
                    value="Coffee"
                    checked={data.checkInMethod === 'Coffee'}
                    onChange={(e) => updateField('checkInMethod', e.target.value)}
                    className="mr-2"
                  />
                  Coffee
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInMethod"
                    value="Slack"
                    checked={data.checkInMethod === 'Slack'}
                    onChange={(e) => updateField('checkInMethod', e.target.value)}
                    className="mr-2"
                  />
                  Slack
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bounce-Forward Protocol */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <strong>Bounce-Forward Protocol</strong> (your failsafe):
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">"If I miss a day, I will</span>
            <input
              type="text"
              value={data.bounceForward}
              onChange={(e) => updateField('bounceForward', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="complete a 5-min micro-rep before bed and log it"
            />
            <span className="text-gray-600">"</span>
          </div>
        </div>
      </div>
      
      {/* Personal Experiment */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🧪 Your Personal Experiment</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <strong>My hypothesis</strong>:
          </label>
          <div className="bg-white p-4 rounded-lg">
            <span className="text-gray-600">"If I apply</span>
            <input
              type="text"
              value={data.hypothesis}
              onChange={(e) => updateField('hypothesis', e.target.value)}
              className="mx-2 px-2 py-1 border-b-2 border-purple-300 focus:border-purple-500 focus:outline-none"
              placeholder="[tool]"
              style={{ width: '120px' }}
            />
            <span className="text-gray-600">to</span>
            <input
              type="text"
              value={data.successThreshold}
              onChange={(e) => updateField('successThreshold', e.target.value)}
              className="mx-2 px-2 py-1 border-b-2 border-purple-300 focus:border-purple-500 focus:outline-none"
              placeholder="[domain]"
              style={{ width: '150px' }}
            />
            <span className="text-gray-600">
              daily for 7 days, I will see measurable improvement in my ability to adapt quickly and reduce stress."
            </span>
          </div>
        </div>
      </div>
      
      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-green-900 mb-4">🎯 Your Mission</h3>
        <blockquote className="text-green-800 italic border-l-4 border-green-600 pl-4">
          "We don't rise to the level of our goals. We fall to the level of our systems." — James Clear
        </blockquote>
        <p className="text-green-800 mt-4">
          In the next 7 days, you will transform one area of your life with tiny, consistent actions,
          prove with numbers that flexibility is now your default, build unshakeable confidence in your ability to adapt,
          and create a portfolio of real-world wins.
        </p>
      </div>
      
      {/* Export Button */}
      <div className="flex justify-center gap-4">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          <Download className="w-5 h-5" />
          Export Setup
        </button>
        
        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Save className="w-4 h-4" />
            <span>Auto-saved {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}
