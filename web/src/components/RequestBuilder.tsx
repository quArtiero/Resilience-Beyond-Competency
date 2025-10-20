import { useState, useEffect } from 'react'
import { Target, Clock, User, CheckCircle, RefreshCcw } from 'lucide-react'

interface SpecificRequest {
  vague: string
  owner: string
  action: string
  datetime: string
  metric: string
  review: string
  completed: boolean
  timeSpent: number
}

const vagueAsks = [
  {
    text: "Can you help with the deck?",
    modelOwner: "You",
    modelAction: "Build a 6-slide draft with bullets only",
    modelDatetime: "Wed 14:00",
    modelMetric: "Covers 3 alternatives + 1 recommendation",
    modelReview: "10-min huddle Thu 9:30"
  },
  {
    text: "Let's be better at updates.",
    modelOwner: "Team",
    modelAction: "Post progress in #standup channel",
    modelDatetime: "Daily by 9:30am",
    modelMetric: "100% participation for 5 days",
    modelReview: "Friday retro check-in"
  },
  {
    text: "We should meet soon.",
    modelOwner: "Sarah + Me",
    modelAction: "30-min architecture review",
    modelDatetime: "Tomorrow 3pm",
    modelMetric: "3 decisions documented",
    modelReview: "Email recap by EOD"
  },
  {
    text: "Try harder on practice problems.",
    modelOwner: "You",
    modelAction: "Complete 5 LeetCode mediums",
    modelDatetime: "By Friday 5pm",
    modelMetric: "All pass without hints",
    modelReview: "Monday 1:1 review"
  },
  {
    text: "Please be more responsive.",
    modelOwner: "You",
    modelAction: "Reply to blocking questions",
    modelDatetime: "Within 1 hour during 9-5",
    modelMetric: "Track response time for 1 week",
    modelReview: "Friday metrics review"
  }
]

export function RequestBuilder() {
  const [requests, setRequests] = useState<SpecificRequest[]>(() => {
    const saved = localStorage.getItem('request-builder')
    if (saved) {
      return JSON.parse(saved)
    }
    return vagueAsks.map(v => ({
      vague: v.text,
      owner: '',
      action: '',
      datetime: '',
      metric: '',
      review: '',
      completed: false,
      timeSpent: 0
    }))
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModels, setShowModels] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem('request-builder', JSON.stringify(requests))
  }, [requests])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        setRequests(prev => {
          const updated = [...prev]
          updated[currentIndex].timeSpent = elapsed
          return updated
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, startTime, currentIndex])

  const startTimer = () => {
    setTimerActive(true)
    setStartTime(Date.now())
  }

  const stopTimer = () => {
    setTimerActive(false)
    setStartTime(null)
  }

  const updateRequest = (index: number, field: keyof SpecificRequest, value: string) => {
    const newRequests = [...requests]
    newRequests[index] = {
      ...newRequests[index],
      [field]: value
    }
    
    // Check completion
    const r = newRequests[index]
    newRequests[index].completed = !!(r.owner && r.action && r.datetime && r.metric && r.review)
    
    setRequests(newRequests)
  }

  const generateFullRequest = (r: SpecificRequest) => {
    if (!r.owner || !r.action || !r.datetime || !r.metric || !r.review) return ''
    return `Owner: ${r.owner} → Action: ${r.action} → When: ${r.datetime} → Metric: ${r.metric} → Review: ${r.review}`
  }

  const getCompletionRate = () => {
    const completed = requests.filter(r => r.completed).length
    return Math.round((completed / requests.length) * 100)
  }

  const nextRequest = () => {
    stopTimer()
    if (currentIndex < requests.length - 1) {
      setCurrentIndex(currentIndex + 1)
      startTimer()
    }
  }

  const reset = () => {
    stopTimer()
    setRequests(vagueAsks.map(v => ({
      vague: v.text,
      owner: '',
      action: '',
      datetime: '',
      metric: '',
      review: '',
      completed: false,
      timeSpent: 0
    })))
    setCurrentIndex(0)
    setShowModels(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Request Builder (90s Each)</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {currentIndex + 1} of {requests.length}
            </span>
            <span className="text-sm text-gray-600">
              {getCompletionRate()}% Complete
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      {timerActive && (
        <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">
              Time: {formatTime(requests[currentIndex].timeSpent)}
            </span>
          </div>
          <span className="text-sm text-yellow-600">
            Target: 90 seconds
          </span>
        </div>
      )}

      {/* Current Request */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Vague Ask */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-gray-700">Vague Ask:</span>
            {requests[currentIndex].completed && (
              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
            )}
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-gray-800 font-medium text-lg">
              "{requests[currentIndex].vague}"
            </p>
          </div>
        </div>

        {/* Specific Request Builder */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4" />
                Owner
              </label>
              <input
                type="text"
                value={requests[currentIndex].owner}
                onChange={(e) => updateRequest(currentIndex, 'owner', e.target.value)}
                placeholder="Who will do this?"
                className="w-full px-3 py-2 border rounded-lg"
                onFocus={() => !timerActive && startTimer()}
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
                <Clock className="w-4 h-4" />
                Date/Time
              </label>
              <input
                type="text"
                value={requests[currentIndex].datetime}
                onChange={(e) => updateRequest(currentIndex, 'datetime', e.target.value)}
                placeholder="e.g., Wed 14:00"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action (specific deliverable)
            </label>
            <input
              type="text"
              value={requests[currentIndex].action}
              onChange={(e) => updateRequest(currentIndex, 'action', e.target.value)}
              placeholder="e.g., Build 6-slide draft with bullets only"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Success Metric
            </label>
            <input
              type="text"
              value={requests[currentIndex].metric}
              onChange={(e) => updateRequest(currentIndex, 'metric', e.target.value)}
              placeholder="e.g., Covers 3 alternatives + 1 recommendation"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Plan
            </label>
            <input
              type="text"
              value={requests[currentIndex].review}
              onChange={(e) => updateRequest(currentIndex, 'review', e.target.value)}
              placeholder="e.g., 10-min huddle Thu 9:30"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Generated Request */}
        {requests[currentIndex].completed && (
          <div className="mt-6 bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-700 mb-2">Your Specific Request:</p>
            <p className="text-green-800 text-sm">
              {generateFullRequest(requests[currentIndex])}
            </p>
          </div>
        )}

        {/* Model Answer */}
        {showModels && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-700 mb-2">Model Request:</p>
            <p className="text-blue-800 text-sm">
              Owner: {vagueAsks[currentIndex].modelOwner} → 
              Action: {vagueAsks[currentIndex].modelAction} → 
              When: {vagueAsks[currentIndex].modelDatetime} → 
              Metric: {vagueAsks[currentIndex].modelMetric} → 
              Review: {vagueAsks[currentIndex].modelReview}
            </p>
          </div>
        )}
      </div>

      {/* Time Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Time Performance:</p>
        <div className="grid grid-cols-5 gap-2">
          {requests.map((r, i) => (
            <div 
              key={i}
              className={`text-center p-2 rounded ${
                r.completed 
                  ? r.timeSpent <= 90 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <p className="text-xs font-medium">#{i + 1}</p>
              <p className="text-sm font-bold">
                {r.timeSpent > 0 ? formatTime(r.timeSpent) : '--:--'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModels(!showModels)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showModels ? 'Hide' : 'Show'} Model Answers
        </button>
        
        <div className="flex gap-3">
          {currentIndex < requests.length - 1 && (
            <button
              onClick={nextRequest}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              disabled={!requests[currentIndex].completed}
            >
              Next Request →
            </button>
          )}
          
          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <RefreshCcw className="w-5 h-5" />
            Reset All
          </button>
        </div>
      </div>
    </div>
  )
}
