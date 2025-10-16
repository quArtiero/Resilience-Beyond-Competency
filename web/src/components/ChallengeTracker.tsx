import React, { useState, useEffect } from 'react'
import { CheckCircle, Target, TrendingUp, Users, AlertCircle, Download } from 'lucide-react'

interface ChallengeData {
  // Setup
  domain: 'work' | 'team' | 'personal' | ''
  purpose: string
  primaryTool: string
  backupTool: string
  metric: string
  metricTarget: number
  timeWindow: string
  location: string
  buddyName: string
  checkIn1Date: string
  checkIn2Date: string
  bounceForward: string
  hypothesis: string
  
  // Daily Logs
  dailyLogs: {
    day: number
    date: string
    situation: string
    purpose: string
    toolsUsed: string[]
    metricValue: number
    optionsGenerated: number
    stressBefore: number
    stressAfter: number
    timeToAction: number
    actionTaken: string
    insight: string
    completed: boolean
    osCheckDone: boolean
    actionDone: boolean
    logDone: boolean
    triggerPhraseDone: boolean
    purposeStateDone: boolean
    toolNameDone: boolean
  }[]
  
  // Check-ins
  checkIn1Sent: boolean
  checkIn2Sent: boolean
  checkIn1Response: string
  checkIn2Response: string
  
  // Final Portfolio
  finalWin: string
  nextFocus: string
  certificateName: string
}

export const ChallengeTracker: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [activeDay, setActiveDay] = useState(1)
  const [showSetup, setShowSetup] = useState(true)
  const [data, setData] = useState<ChallengeData>(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-challenge`)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Calculate current day based on start date
      if (parsed.dailyLogs && parsed.dailyLogs[0]?.date) {
        const startDate = new Date(parsed.dailyLogs[0].date)
        const today = new Date()
        const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        if (daysDiff >= 0 && daysDiff < 7) {
          setActiveDay(daysDiff + 1)
          setShowSetup(false)
        }
      }
      return parsed
    }
    
    return {
      domain: '',
      purpose: '',
      primaryTool: '',
      backupTool: '',
      metric: '',
      metricTarget: 0,
      timeWindow: '',
      location: '',
      buddyName: '',
      checkIn1Date: '',
      checkIn2Date: '',
      bounceForward: '',
      hypothesis: '',
      dailyLogs: Array(7).fill(null).map((_, i) => ({
        day: i + 1,
        date: '',
        situation: '',
        purpose: '',
        toolsUsed: [],
        metricValue: 0,
        optionsGenerated: 0,
        stressBefore: 0,
        stressAfter: 0,
        timeToAction: 0,
        actionTaken: '',
        insight: '',
        completed: false,
        osCheckDone: false,
        actionDone: false,
        logDone: false,
        triggerPhraseDone: false,
        purposeStateDone: false,
        toolNameDone: false
      })),
      checkIn1Sent: false,
      checkIn2Sent: false,
      checkIn1Response: '',
      checkIn2Response: '',
      finalWin: '',
      nextFocus: '',
      certificateName: ''
    }
  })
  
  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`lesson-${lessonId}-challenge`, JSON.stringify(data))
    }, 1000)
    return () => clearTimeout(timer)
  }, [data, lessonId])
  
  const updateSetup = (field: keyof ChallengeData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }
  
  const updateDayLog = (dayIndex: number, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      dailyLogs: prev.dailyLogs.map((log, i) => 
        i === dayIndex ? { ...log, [field]: value } : log
      )
    }))
  }
  
  const startChallenge = () => {
    if (!data.domain || !data.purpose || !data.primaryTool || !data.metric) {
      alert('Please fill in all required fields before starting!')
      return
    }
    
    // Set Day 1 date
    const today = new Date().toISOString().split('T')[0]
    updateDayLog(0, 'date', today)
    setShowSetup(false)
    setActiveDay(1)
  }
  
  const getStreak = () => {
    return data.dailyLogs.filter(log => log.completed).length
  }
  
  const getAverageMetric = () => {
    const completedLogs = data.dailyLogs.filter(log => log.completed && log.metricValue)
    if (completedLogs.length === 0) return 0
    return Math.round(completedLogs.reduce((acc, log) => acc + log.metricValue, 0) / completedLogs.length)
  }
  
  const getTotalOptionsGenerated = () => {
    return data.dailyLogs.reduce((acc, log) => acc + (log.optionsGenerated || 0), 0)
  }
  
  const getAverageStressReduction = () => {
    const completedLogs = data.dailyLogs.filter(log => log.completed && log.stressBefore)
    if (completedLogs.length === 0) return 0
    const totalReduction = completedLogs.reduce((acc, log) => acc + (log.stressBefore - log.stressAfter), 0)
    return (totalReduction / completedLogs.length).toFixed(1)
  }
  
  const exportData = () => {
    const text = `
7-DAY FLEXIBILITY CHALLENGE REPORT
==================================

SETUP
-----
Domain: ${data.domain}
Purpose: ${data.purpose}
Primary Tool: ${data.primaryTool}
Backup Tool: ${data.backupTool}
Metric: ${data.metric}
Target: ${data.metricTarget}
Hypothesis: ${data.hypothesis}

DAILY LOGS
----------
${data.dailyLogs.map(log => `
Day ${log.day} (${log.date})
Situation: ${log.situation}
Tools Used: ${log.toolsUsed.join(', ')}
Metric Value: ${log.metricValue}
Options Generated: ${log.optionsGenerated}
Stress: ${log.stressBefore} → ${log.stressAfter}
Time to Action: ${log.timeToAction} min
Action Taken: ${log.actionTaken}
Insight: ${log.insight}
`).join('')}

RESULTS
-------
Total Days Completed: ${getStreak()}/7
Average Metric Value: ${getAverageMetric()}
Total Options Generated: ${getTotalOptionsGenerated()}
Average Stress Reduction: ${getAverageStressReduction()} points
Check-ins Completed: ${(data.checkIn1Sent ? 1 : 0) + (data.checkIn2Sent ? 1 : 0)}/2

FINAL REFLECTION
----------------
Tangible Win: ${data.finalWin}
Next Focus: ${data.nextFocus}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '7-day-challenge-report.txt'
    a.click()
  }
  
  const dayThemes = [
    { title: "Breaking Inertia", tool: "What Else + Constraint Box" },
    { title: "Perspective Alchemy", tool: "3 Hats + EAR" },
    { title: "Decision Velocity", tool: "Decision Triage" },
    { title: "Operational Excellence", tool: "Reverse & Guardrails" },
    { title: "Zoom Mastery", tool: "Zoom Out/In" },
    { title: "Simplification Sprint", tool: "SCAMPER Lite" },
    { title: "Integration Masterclass", tool: "Full Sequence" }
  ]
  
  if (showSetup) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-2">🚀 7-Day Flexibility Challenge</h2>
          <p className="text-purple-100">
            Transform flexibility from concept to habit with measurable proof.
          </p>
        </div>
        
        {/* Challenge Card Setup */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Your Challenge Card</h3>
          
          <div className="space-y-6">
            {/* Domain Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain Selection (pick ONE) *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['work', 'team', 'personal'].map(domain => (
                  <button
                    key={domain}
                    onClick={() => updateSetup('domain', domain)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      data.domain === domain 
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold capitalize">{domain}</div>
                    <div className="text-xs mt-1">
                      {domain === 'work' && 'Deadlines, projects, stakeholders'}
                      {domain === 'team' && 'Communication, conflict, collaboration'}
                      {domain === 'personal' && 'Habits, routines, self-management'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Purpose Statement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose Statement (10 words max) *
              </label>
              <input
                type="text"
                value={data.purpose}
                onChange={(e) => updateSetup('purpose', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="This week I will..."
                maxLength={100}
              />
            </div>
            
            {/* Tool Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Tool *
                </label>
                <select
                  value={data.primaryTool}
                  onChange={(e) => updateSetup('primaryTool', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a tool...</option>
                  <option value="What Else Rule">What Else Rule</option>
                  <option value="Constraint Box">Constraint Box</option>
                  <option value="3 Hats">3 Hats/Perspective</option>
                  <option value="Decision Triage">Decision Triage</option>
                  <option value="Reverse & Guardrails">Reverse & Guardrails</option>
                  <option value="Zoom Out/In">Zoom Out/In</option>
                  <option value="SCAMPER">SCAMPER</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Tool
                </label>
                <select
                  value={data.backupTool}
                  onChange={(e) => updateSetup('backupTool', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a backup...</option>
                  <option value="What Else Rule">What Else Rule</option>
                  <option value="Constraint Box">Constraint Box</option>
                  <option value="3 Hats">3 Hats/Perspective</option>
                  <option value="Decision Triage">Decision Triage</option>
                  <option value="Reverse & Guardrails">Reverse & Guardrails</option>
                  <option value="Zoom Out/In">Zoom Out/In</option>
                  <option value="SCAMPER">SCAMPER</option>
                </select>
              </div>
            </div>
            
            {/* Metric Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Metric to Track *
                </label>
                <select
                  value={data.metric}
                  onChange={(e) => updateSetup('metric', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a metric...</option>
                  <option value="Decision latency (hours)">Decision latency (hours)</option>
                  <option value="Options generated">Options generated</option>
                  <option value="Stress reduction">Stress reduction (1-10)</option>
                  <option value="48-hour tests started">48-hour tests started</option>
                  <option value="What else repetitions">What else? repetitions</option>
                  <option value="Time to action (minutes)">Time to action (minutes)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Value
                </label>
                <input
                  type="number"
                  value={data.metricTarget}
                  onChange={(e) => updateSetup('metricTarget', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 3, 30, 5"
                />
              </div>
            </div>
            
            {/* Time Commitment */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Time Window
                </label>
                <input
                  type="text"
                  value={data.timeWindow}
                  onChange={(e) => updateSetup('timeWindow', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 8:30-8:45 AM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => updateSetup('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Home office, Coffee shop"
                />
              </div>
            </div>
            
            {/* Accountability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accountability Buddy
              </label>
              <input
                type="text"
                value={data.buddyName}
                onChange={(e) => updateSetup('buddyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Name of your accountability partner"
              />
            </div>
            
            {/* Bounce-Forward Protocol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bounce-Forward Protocol (if you miss a day)
              </label>
              <input
                type="text"
                value={data.bounceForward}
                onChange={(e) => updateSetup('bounceForward', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Complete a 5-min micro-rep before bed and log it"
              />
            </div>
            
            {/* Hypothesis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Hypothesis
              </label>
              <textarea
                value={data.hypothesis}
                onChange={(e) => updateSetup('hypothesis', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={2}
                placeholder="If I apply flexibility tools daily for 7 days, then..."
              />
            </div>
          </div>
          
          {/* Start Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={startChallenge}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Start My 7-Day Challenge
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Daily Challenge View
  const currentLog = data.dailyLogs[activeDay - 1]
  const theme = dayThemes[activeDay - 1]
  
  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Day {activeDay}: {theme.title}</h2>
            <p className="text-purple-100">Tool Focus: {theme.tool}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{getStreak()}/7</div>
            <div className="text-sm text-purple-200">Days Complete</div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <Target className="w-8 h-8 text-purple-500" />
            <div className="text-right">
              <div className="text-xl font-bold">{getAverageMetric()}</div>
              <div className="text-xs text-gray-600">Avg {data.metric}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div className="text-right">
              <div className="text-xl font-bold">{getTotalOptionsGenerated()}</div>
              <div className="text-xs text-gray-600">Options Generated</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <AlertCircle className="w-8 h-8 text-blue-500" />
            <div className="text-right">
              <div className="text-xl font-bold">-{getAverageStressReduction()}</div>
              <div className="text-xs text-gray-600">Stress Reduction</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <Users className="w-8 h-8 text-orange-500" />
            <div className="text-right">
              <div className="text-xl font-bold">
                {(data.checkIn1Sent ? 1 : 0) + (data.checkIn2Sent ? 1 : 0)}/2
              </div>
              <div className="text-xs text-gray-600">Check-ins</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Day Navigator */}
      <div className="bg-white rounded-lg shadow p-2">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-1 py-3 px-2 text-center rounded-lg transition-all ${
                day === activeDay 
                  ? 'bg-purple-600 text-white' 
                  : data.dailyLogs[day - 1].completed
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="text-xs font-medium">Day {day}</div>
              {data.dailyLogs[day - 1].completed && (
                <CheckCircle className="w-4 h-4 mx-auto mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Today's Mission */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📱 Today's Mission</h3>
        
        {/* Morning OS Check */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Morning OS Check (1 minute)</h4>
            <input
              type="checkbox"
              checked={currentLog.osCheckDone}
              onChange={(e) => updateDayLog(activeDay - 1, 'osCheckDone', e.target.checked)}
              className="w-5 h-5 text-purple-600"
            />
          </div>
          <div className="ml-6 space-y-2 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={currentLog.triggerPhraseDone || false}
                onChange={(e) => updateDayLog(activeDay - 1, 'triggerPhraseDone', e.target.checked)}
                className="w-4 h-4" 
              />
              Read your trigger phrase aloud
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={currentLog.purposeStateDone || false}
                onChange={(e) => updateDayLog(activeDay - 1, 'purposeStateDone', e.target.checked)}
                className="w-4 h-4" 
              />
              State today's purpose
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={currentLog.toolNameDone || false}
                onChange={(e) => updateDayLog(activeDay - 1, 'toolNameDone', e.target.checked)}
                className="w-4 h-4" 
              />
              Name your primary tool
            </label>
          </div>
        </div>
        
        {/* 12-Minute Action */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">12-Minute Action</h4>
            <input
              type="checkbox"
              checked={currentLog.actionDone}
              onChange={(e) => updateDayLog(activeDay - 1, 'actionDone', e.target.checked)}
              className="w-5 h-5 text-purple-600"
            />
          </div>
          
          <div className="ml-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Situation Faced
              </label>
              <input
                type="text"
                value={currentLog.situation}
                onChange={(e) => updateDayLog(activeDay - 1, 'situation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Brief description of the challenge..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Action Taken
              </label>
              <textarea
                value={currentLog.actionTaken}
                onChange={(e) => updateDayLog(activeDay - 1, 'actionTaken', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="What did you do?"
              />
            </div>
          </div>
        </div>
        
        {/* Evening Log */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Evening Log (1 minute)</h4>
            <input
              type="checkbox"
              checked={currentLog.logDone}
              onChange={(e) => updateDayLog(activeDay - 1, 'logDone', e.target.checked)}
              className="w-5 h-5 text-purple-600"
            />
          </div>
          
          <div className="ml-6 grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {data.metric} Value
              </label>
              <input
                type="number"
                value={currentLog.metricValue}
                onChange={(e) => updateDayLog(activeDay - 1, 'metricValue', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Options Generated
              </label>
              <input
                type="number"
                value={currentLog.optionsGenerated}
                onChange={(e) => updateDayLog(activeDay - 1, 'optionsGenerated', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Stress Before (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={currentLog.stressBefore}
                onChange={(e) => updateDayLog(activeDay - 1, 'stressBefore', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Stress After (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={currentLog.stressAfter}
                onChange={(e) => updateDayLog(activeDay - 1, 'stressAfter', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Key Insight
              </label>
              <input
                type="text"
                value={currentLog.insight}
                onChange={(e) => updateDayLog(activeDay - 1, 'insight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="What did you learn today?"
              />
            </div>
          </div>
        </div>
        
        {/* Complete Day Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              updateDayLog(activeDay - 1, 'completed', true)
              updateDayLog(activeDay - 1, 'date', new Date().toISOString().split('T')[0])
            }}
            disabled={currentLog.completed}
            className={`px-6 py-3 font-semibold rounded-lg transition-all ${
              currentLog.completed
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {currentLog.completed ? '✓ Day Complete!' : 'Mark Day Complete'}
          </button>
        </div>
      </div>
      
      {/* Check-in Reminders */}
      {(activeDay === 3 || activeDay === 6) && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <h4 className="font-bold text-yellow-800 mb-3">
            📱 Check-in Day! Send to {data.buddyName || 'Your Buddy'}
          </h4>
          <div className="bg-white rounded-lg p-4 mb-3">
            <p className="text-sm text-gray-700 font-mono">
              {activeDay === 3 
                ? `Day 3 update:\n✓ Purpose: ${data.purpose}\n✓ Tool working best: ${data.primaryTool}\n✓ Metric: ${currentLog.metricValue}\n✓ Surprise: ${currentLog.insight}`
                : `Day 6 - Almost there!\n✓ Simplified: [your answer]\n✓ Time saved: [x] min\n✓ Biggest win: ${currentLog.insight}\n✓ Tomorrow's focus: Full integration`
              }
            </p>
          </div>
          <button
            onClick={() => updateSetup(activeDay === 3 ? 'checkIn1Sent' : 'checkIn2Sent', true)}
            disabled={activeDay === 3 ? data.checkIn1Sent : data.checkIn2Sent}
            className={`px-4 py-2 rounded-lg ${
              (activeDay === 3 ? data.checkIn1Sent : data.checkIn2Sent)
                ? 'bg-green-500 text-white'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            {(activeDay === 3 ? data.checkIn1Sent : data.checkIn2Sent) 
              ? '✓ Check-in Sent!' 
              : 'Mark as Sent'}
          </button>
        </div>
      )}
      
      {/* Export Button */}
      <div className="flex justify-center">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          <Download className="w-5 h-5" />
          Export Challenge Report
        </button>
      </div>
    </div>
  )
}
