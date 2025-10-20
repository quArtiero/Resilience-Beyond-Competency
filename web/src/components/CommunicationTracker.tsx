import { useState, useEffect } from 'react'
import { BarChart, Download } from 'lucide-react'

interface DailyLog {
  date: string
  sbiRequests: { sent: number; accepted: number }
  noOptions: { used: number; accepted: number }
  decisionRecaps: { sent: number; withMetrics: number }
  repairs: { attempted: number; resolved: number }
  responseTime: number // hours average
  messagesUnder5Lines: { total: number; under5: number }
  notes: string
}

interface Metrics {
  metric1: string
  metric1Target: string
  metric2: string
  metric2Target: string
}

export function CommunicationTracker() {
  const [metrics, setMetrics] = useState<Metrics>(() => {
    const saved = localStorage.getItem('communication-metrics')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      metric1: '',
      metric1Target: '',
      metric2: '',
      metric2Target: ''
    }
  })

  const [logs, setLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('communication-logs')
    if (saved) {
      return JSON.parse(saved)
    }
    
    // Initialize 7 days
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        sbiRequests: { sent: 0, accepted: 0 },
        noOptions: { used: 0, accepted: 0 },
        decisionRecaps: { sent: 0, withMetrics: 0 },
        repairs: { attempted: 0, resolved: 0 },
        responseTime: 0,
        messagesUnder5Lines: { total: 0, under5: 0 },
        notes: ''
      })
    }
    return days
  })

  const [currentDay, setCurrentDay] = useState(0)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    localStorage.setItem('communication-metrics', JSON.stringify(metrics))
  }, [metrics])

  useEffect(() => {
    localStorage.setItem('communication-logs', JSON.stringify(logs))
  }, [logs])

  const updateLog = (dayIndex: number, field: keyof DailyLog, value: any) => {
    const newLogs = [...logs]
    if (field === 'sbiRequests' || field === 'noOptions' || 
        field === 'decisionRecaps' || field === 'repairs' || 
        field === 'messagesUnder5Lines') {
      newLogs[dayIndex][field] = { ...newLogs[dayIndex][field], ...value }
    } else {
      // @ts-ignore
      newLogs[dayIndex][field] = value
    }
    setLogs(newLogs)
  }

  const calculateStats = () => {
    const stats = {
      sbiAcceptanceRate: 0,
      noOptionAcceptanceRate: 0,
      decisionRecapCompleteness: 0,
      repairSuccessRate: 0,
      avgResponseTime: 0,
      messageEfficiency: 0,
      daysLogged: 0
    }

    let totalSbiSent = 0
    let totalSbiAccepted = 0
    let totalNoOptions = 0
    let totalNoAccepted = 0
    let totalRecaps = 0
    let totalRecapsWithMetrics = 0
    let totalRepairs = 0
    let totalResolved = 0
    let totalResponseTime = 0
    let responseCount = 0
    let totalMessages = 0
    let totalUnder5 = 0

    logs.forEach(log => {
      if (log.sbiRequests.sent > 0 || log.noOptions.used > 0 || 
          log.decisionRecaps.sent > 0 || log.repairs.attempted > 0) {
        stats.daysLogged++
      }

      totalSbiSent += log.sbiRequests.sent
      totalSbiAccepted += log.sbiRequests.accepted
      totalNoOptions += log.noOptions.used
      totalNoAccepted += log.noOptions.accepted
      totalRecaps += log.decisionRecaps.sent
      totalRecapsWithMetrics += log.decisionRecaps.withMetrics
      totalRepairs += log.repairs.attempted
      totalResolved += log.repairs.resolved
      
      if (log.responseTime > 0) {
        totalResponseTime += log.responseTime
        responseCount++
      }
      
      totalMessages += log.messagesUnder5Lines.total
      totalUnder5 += log.messagesUnder5Lines.under5
    })

    if (totalSbiSent > 0) {
      stats.sbiAcceptanceRate = Math.round((totalSbiAccepted / totalSbiSent) * 100)
    }
    if (totalNoOptions > 0) {
      stats.noOptionAcceptanceRate = Math.round((totalNoAccepted / totalNoOptions) * 100)
    }
    if (totalRecaps > 0) {
      stats.decisionRecapCompleteness = Math.round((totalRecapsWithMetrics / totalRecaps) * 100)
    }
    if (totalRepairs > 0) {
      stats.repairSuccessRate = Math.round((totalResolved / totalRepairs) * 100)
    }
    if (responseCount > 0) {
      stats.avgResponseTime = Math.round(totalResponseTime / responseCount * 10) / 10
    }
    if (totalMessages > 0) {
      stats.messageEfficiency = Math.round((totalUnder5 / totalMessages) * 100)
    }

    return stats
  }

  const exportData = () => {
    const stats = calculateStats()
    const text = `7-DAY COMMUNICATION TRACKER
===========================

TRACKING METRICS
----------------
Metric 1: ${metrics.metric1} (Target: ${metrics.metric1Target})
Metric 2: ${metrics.metric2} (Target: ${metrics.metric2Target})

DAILY LOGS
----------
${logs.map((log, i) => `
Day ${i + 1} (${log.date})
- SBI Requests: ${log.sbiRequests.sent} sent, ${log.sbiRequests.accepted} accepted
- No + Options: ${log.noOptions.used} used, ${log.noOptions.accepted} accepted
- Decision Recaps: ${log.decisionRecaps.sent} sent, ${log.decisionRecaps.withMetrics} with metrics
- Repairs: ${log.repairs.attempted} attempted, ${log.repairs.resolved} resolved
- Avg Response Time: ${log.responseTime} hours
- Messages ≤5 Lines: ${log.messagesUnder5Lines.under5}/${log.messagesUnder5Lines.total}
- Notes: ${log.notes}
`).join('')}

OVERALL STATISTICS
------------------
SBI Acceptance Rate: ${stats.sbiAcceptanceRate}%
No + Option Acceptance: ${stats.noOptionAcceptanceRate}%
Decision Recap Completeness: ${stats.decisionRecapCompleteness}%
Repair Success Rate: ${stats.repairSuccessRate}%
Average Response Time: ${stats.avgResponseTime} hours
Message Efficiency: ${stats.messageEfficiency}%
Days Logged: ${stats.daysLogged}/7

Generated: ${new Date().toLocaleString()}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'communication-tracker.txt'
    a.click()
  }

  const stats = calculateStats()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">7-Day Communication Tracker</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Day {currentDay + 1} of 7
            </span>
            <span className="text-sm text-gray-600">
              {stats.daysLogged} days logged
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(stats.daysLogged / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Metrics Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4">Your Tracking Metrics</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metric 1
            </label>
            <input
              type="text"
              value={metrics.metric1}
              onChange={(e) => setMetrics({ ...metrics, metric1: e.target.value })}
              placeholder="e.g., Acceptance rate of requests (%)"
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              value={metrics.metric1Target}
              onChange={(e) => setMetrics({ ...metrics, metric1Target: e.target.value })}
              placeholder="Target: e.g., 80%"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metric 2
            </label>
            <input
              type="text"
              value={metrics.metric2}
              onChange={(e) => setMetrics({ ...metrics, metric2: e.target.value })}
              placeholder="e.g., Response time to clear asks (hours)"
              className="w-full px-3 py-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              value={metrics.metric2Target}
              onChange={(e) => setMetrics({ ...metrics, metric2Target: e.target.value })}
              placeholder="Target: e.g., <2 hours"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2 justify-center">
          {logs.map((log, index) => (
            <button
              key={index}
              onClick={() => setCurrentDay(index)}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentDay === index
                  ? 'bg-blue-600 text-white'
                  : log.sbiRequests.sent > 0 || log.noOptions.used > 0
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="text-xs">Day {index + 1}</div>
              <div className="text-xs">{new Date(log.date).toLocaleDateString('en', { weekday: 'short' })}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Log */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-bold text-gray-800 mb-4">
          Day {currentDay + 1} - {new Date(logs[currentDay].date).toLocaleDateString()}
        </h4>
        
        <div className="space-y-4">
          {/* SBI Requests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SBI + Requests Sent
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].sbiRequests.sent}
                onChange={(e) => updateLog(currentDay, 'sbiRequests', { sent: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accepted First Ask
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].sbiRequests.accepted}
                onChange={(e) => updateLog(currentDay, 'sbiRequests', { accepted: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* No + Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No + Options Used
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].noOptions.used}
                onChange={(e) => updateLog(currentDay, 'noOptions', { used: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Options Accepted
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].noOptions.accepted}
                onChange={(e) => updateLog(currentDay, 'noOptions', { accepted: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Decision Recaps */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Decision Recaps Sent
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].decisionRecaps.sent}
                onChange={(e) => updateLog(currentDay, 'decisionRecaps', { sent: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                With Owner/Date/Metric
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].decisionRecaps.withMetrics}
                onChange={(e) => updateLog(currentDay, 'decisionRecaps', { withMetrics: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Repairs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clear Repairs Attempted
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].repairs.attempted}
                onChange={(e) => updateLog(currentDay, 'repairs', { attempted: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resolved in One Attempt
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].repairs.resolved}
                onChange={(e) => updateLog(currentDay, 'repairs', { resolved: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Response Time & Message Efficiency */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avg Response Time (hrs)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={logs[currentDay].responseTime}
                onChange={(e) => updateLog(currentDay, 'responseTime', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Messages
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].messagesUnder5Lines.total}
                onChange={(e) => updateLog(currentDay, 'messagesUnder5Lines', { total: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ≤5 Lines
              </label>
              <input
                type="number"
                min="0"
                value={logs[currentDay].messagesUnder5Lines.under5}
                onChange={(e) => updateLog(currentDay, 'messagesUnder5Lines', { under5: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (wins, challenges, insights)
            </label>
            <textarea
              value={logs[currentDay].notes}
              onChange={(e) => updateLog(currentDay, 'notes', e.target.value)}
              placeholder="What worked? What didn't? What will you change?"
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800">Overall Statistics</h4>
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <BarChart className="w-5 h-5" />
          </button>
        </div>
        
        {showStats && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">SBI Acceptance</p>
              <p className="text-2xl font-bold text-gray-800">{stats.sbiAcceptanceRate}%</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">No+Option Accept</p>
              <p className="text-2xl font-bold text-gray-800">{stats.noOptionAcceptanceRate}%</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Recap Complete</p>
              <p className="text-2xl font-bold text-gray-800">{stats.decisionRecapCompleteness}%</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Repair Success</p>
              <p className="text-2xl font-bold text-gray-800">{stats.repairSuccessRate}%</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-800">{stats.avgResponseTime}h</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Msg Efficiency</p>
              <p className="text-2xl font-bold text-gray-800">{stats.messageEfficiency}%</p>
            </div>
          </div>
        )}
      </div>

      {/* Export */}
      <div className="flex justify-center">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="w-5 h-5" />
          Export Full Report
        </button>
      </div>
    </div>
  )
}
