import { useState, useEffect } from 'react'
import { TrendingUp, Award, Target, BarChart3 } from 'lucide-react'

interface DailyEntry {
  date: string
  lrlInteractions: number
  understandingScore: number
  earAccepted: number
  earRejected: number
  asyncMessages: number
  avgLineCount: number
  notes: string
}

interface EmpathyMetrics {
  totalInteractions: number
  avgUnderstandingScore: number
  earAcceptanceRate: number
  avgAsyncLines: number
  streak: number
  bestDay: string
}

export function EmpathyTracker() {
  const [entries, setEntries] = useState<DailyEntry[]>(() => {
    const saved = localStorage.getItem('empathy-tracker-entries')
    if (saved) {
      return JSON.parse(saved)
    }
    
    // Initialize with 7 days
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push({
        date: date.toISOString().split('T')[0],
        lrlInteractions: 0,
        understandingScore: 0,
        earAccepted: 0,
        earRejected: 0,
        asyncMessages: 0,
        avgLineCount: 0,
        notes: ''
      })
    }
    return dates.reverse()
  })

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [metrics, setMetrics] = useState<EmpathyMetrics>({
    totalInteractions: 0,
    avgUnderstandingScore: 0,
    earAcceptanceRate: 0,
    avgAsyncLines: 0,
    streak: 0,
    bestDay: ''
  })

  useEffect(() => {
    localStorage.setItem('empathy-tracker-entries', JSON.stringify(entries))
    calculateMetrics()
  }, [entries])

  const calculateMetrics = () => {
    const activeEntries = entries.filter(e => 
      e.lrlInteractions > 0 || e.earAccepted > 0 || e.earRejected > 0
    )
    
    if (activeEntries.length === 0) {
      setMetrics({
        totalInteractions: 0,
        avgUnderstandingScore: 0,
        earAcceptanceRate: 0,
        avgAsyncLines: 0,
        streak: 0,
        bestDay: ''
      })
      return
    }

    const totalInteractions = activeEntries.reduce((sum, e) => 
      sum + e.lrlInteractions + e.earAccepted + e.earRejected, 0
    )
    
    const avgUnderstandingScore = activeEntries.length > 0
      ? activeEntries.reduce((sum, e) => sum + e.understandingScore, 0) / activeEntries.length
      : 0
    
    const totalEAR = entries.reduce((sum, e) => sum + e.earAccepted + e.earRejected, 0)
    const earAcceptanceRate = totalEAR > 0
      ? (entries.reduce((sum, e) => sum + e.earAccepted, 0) / totalEAR) * 100
      : 0
    
    const asyncEntries = entries.filter(e => e.asyncMessages > 0)
    const avgAsyncLines = asyncEntries.length > 0
      ? asyncEntries.reduce((sum, e) => sum + e.avgLineCount, 0) / asyncEntries.length
      : 0
    
    // Calculate streak (consecutive days with activity)
    let streak = 0
    for (let i = entries.length - 1; i >= 0; i--) {
      if (entries[i].lrlInteractions > 0 || entries[i].earAccepted > 0) {
        streak++
      } else if (i < entries.length - 1) {
        break // Stop at first gap after today
      }
    }
    
    // Find best day (highest understanding score)
    const bestEntry = activeEntries.reduce((best, entry) => 
      entry.understandingScore > best.understandingScore ? entry : best
    , activeEntries[0])
    
    setMetrics({
      totalInteractions,
      avgUnderstandingScore,
      earAcceptanceRate,
      avgAsyncLines,
      streak,
      bestDay: bestEntry?.date || ''
    })
  }

  const updateEntry = (date: string, field: keyof DailyEntry, value: number | string) => {
    setEntries(prev => prev.map(entry => 
      entry.date === date
        ? { ...entry, [field]: value }
        : entry
    ))
  }

  const currentEntry = entries.find(e => e.date === selectedDate) || entries[0]

  const getDayOfWeek = (dateStr: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const date = new Date(dateStr)
    return days[date.getDay()]
  }

  const isToday = (dateStr: string) => {
    return dateStr === new Date().toISOString().split('T')[0]
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">7-Day Empathy Tracker</h3>
        <p className="text-gray-600">
          Track your daily empathy practice and watch your skills grow.
        </p>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-600">Total Interactions</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{metrics.totalInteractions}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-xs text-gray-600">Avg Understanding</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {metrics.avgUnderstandingScore.toFixed(1)}/10
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-600">EAR Acceptance</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {metrics.earAcceptanceRate.toFixed(0)}%
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gray-600">Current Streak</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{metrics.streak} days</p>
        </div>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Select Day</h4>
        <div className="grid grid-cols-7 gap-2">
          {entries.map(entry => (
            <button
              key={entry.date}
              onClick={() => setSelectedDate(entry.date)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedDate === entry.date
                  ? 'bg-blue-50 border-blue-400'
                  : entry.lrlInteractions > 0 || entry.earAccepted > 0
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <p className="text-xs text-gray-600">{getDayOfWeek(entry.date)}</p>
              <p className="text-sm font-medium">
                {new Date(entry.date).getDate()}
              </p>
              {isToday(entry.date) && (
                <p className="text-xs text-blue-600 mt-1">Today</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Entry Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          {isToday(selectedDate) ? "Today's" : `${getDayOfWeek(selectedDate)}'s`} Practice
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* LRL Interactions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LRL Interactions
            </label>
            <input
              type="number"
              min="0"
              value={currentEntry.lrlInteractions}
              onChange={(e) => updateEntry(selectedDate, 'lrlInteractions', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">How many times did you use LRL?</p>
          </div>
          
          {/* Understanding Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avg Understanding Score (0-10)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={currentEntry.understandingScore}
              onChange={(e) => updateEntry(selectedDate, 'understandingScore', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Average when you asked</p>
          </div>
          
          {/* EAR Accepted */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EAR Proposals Accepted
            </label>
            <input
              type="number"
              min="0"
              value={currentEntry.earAccepted}
              onChange={(e) => updateEntry(selectedDate, 'earAccepted', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          {/* EAR Rejected */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EAR Proposals Rejected
            </label>
            <input
              type="number"
              min="0"
              value={currentEntry.earRejected}
              onChange={(e) => updateEntry(selectedDate, 'earRejected', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          {/* Async Messages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Async Messages Sent
            </label>
            <input
              type="number"
              min="0"
              value={currentEntry.asyncMessages}
              onChange={(e) => updateEntry(selectedDate, 'asyncMessages', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          {/* Average Line Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avg Lines per Message
            </label>
            <input
              type="number"
              min="0"
              value={currentEntry.avgLineCount}
              onChange={(e) => updateEntry(selectedDate, 'avgLineCount', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Target: ≤5 lines</p>
          </div>
        </div>
        
        {/* Notes */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Notes
          </label>
          <textarea
            value={currentEntry.notes}
            onChange={(e) => updateEntry(selectedDate, 'notes', e.target.value)}
            placeholder="What worked? What was challenging? Key insights..."
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
        </div>
      </div>

      {/* Progress Chart (Visual) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Week Progress</h4>
        <div className="space-y-3">
          {entries.map(entry => {
            const score = entry.understandingScore
            const interactions = entry.lrlInteractions + entry.earAccepted + entry.earRejected
            
            return (
              <div key={entry.date} className="flex items-center gap-3">
                <span className="w-12 text-sm text-gray-600">
                  {getDayOfWeek(entry.date)}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                    {interactions > 0 ? `${interactions} interactions` : 'No activity'}
                  </span>
                </div>
                <span className="w-12 text-sm text-right font-medium">
                  {score > 0 ? score.toFixed(1) : '-'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Insights */}
      {metrics.totalInteractions >= 10 && (
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-3">Your Insights</h4>
          <div className="space-y-2 text-sm text-green-700">
            <p>✓ You've practiced {metrics.totalInteractions} empathy interactions this week</p>
            <p>✓ Your average understanding score is {metrics.avgUnderstandingScore.toFixed(1)}/10</p>
            <p>✓ Your EAR acceptance rate is {metrics.earAcceptanceRate.toFixed(0)}%</p>
            {metrics.streak >= 3 && <p>🔥 You're on a {metrics.streak}-day streak!</p>}
            {metrics.bestDay && (
              <p>⭐ Your best day was {getDayOfWeek(metrics.bestDay)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
