import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, Target, Clock, Download } from 'lucide-react'

interface ChallengeData {
  // Today's Practice
  todayContext: string
  todayTrigger: string
  todayWarningSign: string
  todayResponse: string
  todayRecovery: string
  todayRating: number
  todayInsight: string
  
  // 72-Hour Challenge
  hour24: {
    completed: boolean
    situation: string
    used: string
    outcome: string
  }
  hour48: {
    completed: boolean
    situation: string
    used: string
    outcome: string
  }
  hour72: {
    completed: boolean
    situation: string
    used: string
    outcome: string
  }
  
  // Commitment
  commitmentTool: string
  commitmentWhen: string
  commitmentPartner: string
}

export function RedLineChallenge() {
  const getDefaultData = (): ChallengeData => ({
    todayContext: '',
    todayTrigger: '',
    todayWarningSign: '',
    todayResponse: '',
    todayRecovery: '',
    todayRating: 3,
    todayInsight: '',
    hour24: { completed: false, situation: '', used: '', outcome: '' },
    hour48: { completed: false, situation: '', used: '', outcome: '' },
    hour72: { completed: false, situation: '', used: '', outcome: '' },
    commitmentTool: '',
    commitmentWhen: '',
    commitmentPartner: ''
  })

  const [data, setData] = useState<ChallengeData>(() => {
    const saved = localStorage.getItem('redline-challenge')
    if (!saved) return getDefaultData()
    
    try {
      const parsed = JSON.parse(saved)
      // Validate that the saved data has the correct structure
      // If it has the old structure (with 'days' property), reset to default
      if ('days' in parsed || !('hour24' in parsed)) {
        localStorage.removeItem('redline-challenge')
        return getDefaultData()
      }
      // Ensure all required properties exist
      return {
        ...getDefaultData(),
        ...parsed,
        // Ensure nested objects have the correct structure
        hour24: parsed.hour24 || { completed: false, situation: '', used: '', outcome: '' },
        hour48: parsed.hour48 || { completed: false, situation: '', used: '', outcome: '' },
        hour72: parsed.hour72 || { completed: false, situation: '', used: '', outcome: '' }
      }
    } catch (error) {
      console.error('Error parsing saved challenge data:', error)
      localStorage.removeItem('redline-challenge')
      return getDefaultData()
    }
  })

  const [activeTab, setActiveTab] = useState<'today' | 'sprint' | 'commit'>('today')

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('redline-challenge', JSON.stringify(data))
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  const contextOptions = [
    'Morning standup',
    'Email that frustrated me',
    'Unexpected change in plans',
    'Difficult conversation',
    'Technical problem',
    'Team conflict'
  ]

  const recoveryOptions = [
    '4-7-8 breathing',
    'Stepped away for 2 minutes',
    'Reframed the situation',
    'Asked for help',
    'Used positive self-talk',
    'Took a quick walk'
  ]

  const calculateProgress = () => {
    let points = 0
    // Today's practice (40 points)
    if (data.todayContext) points += 5
    if (data.todayTrigger) points += 5
    if (data.todayWarningSign) points += 5
    if (data.todayResponse) points += 5
    if (data.todayRecovery) points += 5
    if (data.todayRating !== 3) points += 5
    if (data.todayInsight) points += 10
    
    // 72-hour challenge (45 points)
    if (data.hour24.completed) points += 15
    if (data.hour48.completed) points += 15
    if (data.hour72.completed) points += 15
    
    // Commitment (15 points)
    if (data.commitmentTool) points += 5
    if (data.commitmentWhen) points += 5
    if (data.commitmentPartner) points += 5
    
    return points
  }

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `redline-lesson1-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Lesson 1 Challenge Progress</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">{calculateProgress()}%</span>
            {calculateProgress() === 100 && (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('today')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium transition-all
            ${activeTab === 'today' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'}
          `}
        >
          📝 Today's Practice
        </button>
        <button
          onClick={() => setActiveTab('sprint')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium transition-all
            ${activeTab === 'sprint' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'}
          `}
        >
          ⚡ 72-Hour Sprint
        </button>
        <button
          onClick={() => setActiveTab('commit')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium transition-all
            ${activeTab === 'commit' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'}
          `}
        >
          🎯 My Commitment
        </button>
      </div>

      {/* Today's Practice */}
      {activeTab === 'today' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Today's Red Line Practice
          </h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Goal:</strong> Notice ONE emotional trigger today and practice the Red Line protocol.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What situation triggered you today?
              </label>
              <select
                value={data.todayContext}
                onChange={(e) => setData(prev => ({ ...prev, todayContext: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a situation...</option>
                {contextOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                <option value="other">Other situation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe the specific trigger:
              </label>
              <input
                type="text"
                value={data.todayTrigger}
                onChange={(e) => setData(prev => ({ ...prev, todayTrigger: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., John interrupted me three times during my presentation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What warning sign did you notice in your body?
              </label>
              <input
                type="text"
                value={data.todayWarningSign}
                onChange={(e) => setData(prev => ({ ...prev, todayWarningSign: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., My jaw clenched and shoulders tensed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How did you respond?
              </label>
              <textarea
                value={data.todayResponse}
                onChange={(e) => setData(prev => ({ ...prev, todayResponse: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what you did in the moment..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What recovery tool did you use?
              </label>
              <select
                value={data.todayRecovery}
                onChange={(e) => setData(prev => ({ ...prev, todayRecovery: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select what you tried...</option>
                {recoveryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your emotional response: <span className="font-bold text-blue-600">{data.todayRating}/5</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setData(prev => ({ ...prev, todayRating: rating }))}
                    className={`
                      w-12 h-12 rounded-lg font-medium transition-all
                      ${data.todayRating === rating 
                        ? 'bg-blue-600 text-white scale-110' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {rating}
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {data.todayRating === 1 && '😤 Lost control'}
                  {data.todayRating === 2 && '😣 Struggled'}
                  {data.todayRating === 3 && '😐 Managed'}
                  {data.todayRating === 4 && '😊 Handled well'}
                  {data.todayRating === 5 && '😎 Mastered it'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key insight from today:
              </label>
              <textarea
                value={data.todayInsight}
                onChange={(e) => setData(prev => ({ ...prev, todayInsight: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="What did you learn about your red lines?"
                rows={2}
              />
            </div>
          </div>
        </div>
      )}

      {/* 72-Hour Sprint */}
      {activeTab === 'sprint' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            72-Hour Practice Sprint
          </h3>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-orange-800">
              <strong>Challenge:</strong> Apply the Red Line protocol once each day for the next 3 days.
            </p>
          </div>

          <div className="space-y-4">
            {/* Day 1 */}
            <div className={`border rounded-lg p-4 ${data.hour24.completed ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">📅 Within 24 Hours</h4>
                <button
                  onClick={() => setData(prev => ({
                    ...prev,
                    hour24: { ...prev.hour24, completed: !prev.hour24.completed }
                  }))}
                  className={`
                    px-3 py-1 rounded-md text-sm font-medium transition-all
                    ${data.hour24.completed 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                  `}
                >
                  {data.hour24.completed ? '✓ Done' : 'Mark Complete'}
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={data.hour24.situation}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour24: { ...prev.hour24, situation: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Situation faced..."
                />
                <input
                  type="text"
                  value={data.hour24.used}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour24: { ...prev.hour24, used: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tool/technique used..."
                />
                <input
                  type="text"
                  value={data.hour24.outcome}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour24: { ...prev.hour24, outcome: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Outcome..."
                />
              </div>
            </div>

            {/* Day 2 */}
            <div className={`border rounded-lg p-4 ${data.hour48.completed ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">📅 Within 48 Hours</h4>
                <button
                  onClick={() => setData(prev => ({
                    ...prev,
                    hour48: { ...prev.hour48, completed: !prev.hour48.completed }
                  }))}
                  className={`
                    px-3 py-1 rounded-md text-sm font-medium transition-all
                    ${data.hour48.completed 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                  `}
                >
                  {data.hour48.completed ? '✓ Done' : 'Mark Complete'}
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={data.hour48.situation}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour48: { ...prev.hour48, situation: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Situation faced..."
                />
                <input
                  type="text"
                  value={data.hour48.used}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour48: { ...prev.hour48, used: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tool/technique used..."
                />
                <input
                  type="text"
                  value={data.hour48.outcome}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour48: { ...prev.hour48, outcome: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Outcome..."
                />
              </div>
            </div>

            {/* Day 3 */}
            <div className={`border rounded-lg p-4 ${data.hour72.completed ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">📅 Within 72 Hours</h4>
                <button
                  onClick={() => setData(prev => ({
                    ...prev,
                    hour72: { ...prev.hour72, completed: !prev.hour72.completed }
                  }))}
                  className={`
                    px-3 py-1 rounded-md text-sm font-medium transition-all
                    ${data.hour72.completed 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                  `}
                >
                  {data.hour72.completed ? '✓ Done' : 'Mark Complete'}
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={data.hour72.situation}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour72: { ...prev.hour72, situation: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Situation faced..."
                />
                <input
                  type="text"
                  value={data.hour72.used}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour72: { ...prev.hour72, used: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tool/technique used..."
                />
                <input
                  type="text"
                  value={data.hour72.outcome}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    hour72: { ...prev.hour72, outcome: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Outcome..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commitment */}
      {activeTab === 'commit' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            My Commitment Going Forward
          </h3>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-indigo-800">
              <strong>Next Step:</strong> Choose ONE tool from this lesson to use consistently this week.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Which tool will you commit to using?
              </label>
              <select
                value={data.commitmentTool}
                onChange={(e) => setData(prev => ({ ...prev, commitmentTool: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your primary tool...</option>
                <option value="4-7-8 breathing">4-7-8 Breathing Technique</option>
                <option value="red-line-awareness">Red Line Awareness (body scanning)</option>
                <option value="if-then-planning">If-Then Planning</option>
                <option value="2-minute-reset">2-Minute Reset Walk</option>
                <option value="reframing">Positive Reframing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                When will you practice it?
              </label>
              <input
                type="text"
                value={data.commitmentWhen}
                onChange={(e) => setData(prev => ({ ...prev, commitmentWhen: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Before every meeting, When I feel triggered, Every morning at 9am"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Who will support your practice?
              </label>
              <input
                type="text"
                value={data.commitmentPartner}
                onChange={(e) => setData(prev => ({ ...prev, commitmentPartner: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Name someone who will check in on your progress"
              />
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">🎯 Your Commitment Statement:</h4>
              {data.commitmentTool && data.commitmentWhen ? (
                <p className="text-green-700 italic">
                  "I commit to using <strong>{data.commitmentTool}</strong> {data.commitmentWhen}
                  {data.commitmentPartner && `, with ${data.commitmentPartner} as my accountability partner`}."
                </p>
              ) : (
                <p className="text-gray-500 italic">Complete the fields above to see your commitment statement</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Challenge Data
        </button>
      </div>
    </div>
  )
}