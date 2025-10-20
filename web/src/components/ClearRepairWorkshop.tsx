import { useState, useEffect } from 'react'
import { Heart, AlertTriangle, CheckCircle, Mic, RefreshCcw } from 'lucide-react'

interface RepairScript {
  situation: string
  impact: string
  intent: string
  repair: string
  request: string
  completed: boolean
  practiced: boolean
}

const repairScenarios = [
  {
    text: "You interrupted a colleague multiple times in a meeting",
    modelImpact: "I interrupted you three times in the design review; that undercut your expertise in front of the team",
    modelIntent: "My intent was to keep us on schedule, not to dismiss your ideas",
    modelRepair: "Next meeting I'll use the hand-raise feature and wait for you to finish",
    modelRequest: "Does that work for you, or would you prefer something else?"
  },
  {
    text: "You sent a harsh email when stressed",
    modelImpact: "In my email yesterday, I used harsh language about your code; that was disrespectful and unprofessional",
    modelIntent: "I was stressed about the deadline, not actually upset with your work",
    modelRepair: "Going forward, I'll draft critical feedback and wait 2 hours before sending",
    modelRequest: "Can we reset? And is there anything else you need from me?"
  },
  {
    text: "You dismissed someone's idea too quickly",
    modelImpact: "In standup, I shot down your suggestion without listening; that probably felt dismissive",
    modelIntent: "I was focused on our current constraints, not trying to shut down creativity",
    modelRepair: "Next time I'll ask clarifying questions before sharing concerns",
    modelRequest: "Could you re-pitch the idea in our 1:1 so I can properly understand it?"
  },
  {
    text: "You forgot an important commitment",
    modelImpact: "I missed our scheduled review yesterday; that wasted your time and blocked your progress",
    modelIntent: "I had a calendar sync issue, not deprioritizing our work",
    modelRepair: "I've set up double notifications and will confirm all meetings morning-of",
    modelRequest: "Can we reschedule for today at 3pm? And how can I unblock you now?"
  },
  {
    text: "You shared information that wasn't yours to share",
    modelImpact: "I mentioned your performance concerns to the team; that violated your privacy and trust",
    modelIntent: "I was trying to explain workload changes, not to expose you",
    modelRepair: "I'll keep all personal information strictly between us going forward",
    modelRequest: "I understand if you need time to rebuild trust. What do you need from me?"
  }
]

export function ClearRepairWorkshop() {
  const [repairs, setRepairs] = useState<RepairScript[]>(() => {
    const saved = localStorage.getItem('clear-repair-workshop')
    if (saved) {
      return JSON.parse(saved)
    }
    return repairScenarios.map(s => ({
      situation: s.text,
      impact: '',
      intent: '',
      repair: '',
      request: '',
      completed: false,
      practiced: false
    }))
  })

  const [showModels, setShowModels] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPracticeTimer, setShowPracticeTimer] = useState(false)
  const [practiceTime, setPracticeTime] = useState(30)

  useEffect(() => {
    localStorage.setItem('clear-repair-workshop', JSON.stringify(repairs))
  }, [repairs])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (showPracticeTimer && practiceTime > 0) {
      interval = setInterval(() => {
        setPracticeTime(prev => prev - 1)
      }, 1000)
    } else if (practiceTime === 0) {
      setShowPracticeTimer(false)
      markAsPracticed(currentIndex)
    }
    return () => clearInterval(interval)
  }, [showPracticeTimer, practiceTime, currentIndex])

  const updateRepair = (index: number, field: keyof RepairScript, value: string) => {
    const newRepairs = [...repairs]
    newRepairs[index] = {
      ...newRepairs[index],
      [field]: value
    }
    
    // Check completion
    const r = newRepairs[index]
    newRepairs[index].completed = !!(r.impact && r.intent && r.repair && r.request)
    
    setRepairs(newRepairs)
  }

  const markAsPracticed = (index: number) => {
    const newRepairs = [...repairs]
    newRepairs[index].practiced = true
    setRepairs(newRepairs)
  }

  const generateFullRepair = (r: RepairScript) => {
    if (!r.impact || !r.intent || !r.repair || !r.request) return ''
    return `Impact: ${r.impact}. Intent: ${r.intent}. Repair: ${r.repair}. Request: ${r.request}`
  }

  const getCompletionRate = () => {
    const completed = repairs.filter(r => r.completed).length
    return Math.round((completed / repairs.length) * 100)
  }

  const getPracticeRate = () => {
    const practiced = repairs.filter(r => r.practiced).length
    return Math.round((practiced / repairs.length) * 100)
  }

  const startPractice = () => {
    setShowPracticeTimer(true)
    setPracticeTime(30)
  }

  const reset = () => {
    setRepairs(repairScenarios.map(s => ({
      situation: s.text,
      impact: '',
      intent: '',
      repair: '',
      request: '',
      completed: false,
      practiced: false
    })))
    setShowModels(false)
    setCurrentIndex(0)
    setShowPracticeTimer(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Clear Repair Workshop</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Written: {getCompletionRate()}%
            </span>
            <span className="text-sm text-gray-600">
              Practiced: {getPracticeRate()}%
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Own impact, share intent, propose repair, make request.
        </p>
        
        {/* Progress Bars */}
        <div className="space-y-2 mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getPracticeRate()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Formula Card */}
      <div className="bg-teal-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-teal-600" />
          <span className="font-medium text-teal-800">Clear Repair Formula</span>
        </div>
        <ol className="text-sm text-teal-700 space-y-1 list-decimal ml-6">
          <li><strong>Impact:</strong> "I [specific behavior]; that caused [specific impact]"</li>
          <li><strong>Intent:</strong> "My intent was [positive goal], not [negative interpretation]"</li>
          <li><strong>Repair:</strong> "Going forward, I'll [specific new behavior]"</li>
          <li><strong>Request:</strong> "Okay if we try that? / What else do you need?"</li>
        </ol>
      </div>

      {/* Practice Timer */}
      {showPracticeTimer && (
        <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-yellow-600 animate-pulse" />
            <span className="font-semibold text-yellow-800">
              Practice Out Loud!
            </span>
          </div>
          <span className="text-2xl font-bold text-yellow-600">
            {practiceTime}s
          </span>
        </div>
      )}

      {/* Repair Items */}
      <div className="space-y-6">
        {repairs.map((repair, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-md p-6 ${
              currentIndex === index ? 'ring-2 ring-teal-400' : ''
            }`}
          >
            {/* Situation */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-700">Scenario {index + 1}:</span>
                {repair.completed && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {repair.practiced && (
                  <Mic className="w-5 h-5 text-blue-500 ml-2" />
                )}
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-gray-800 font-medium">{repair.situation}</p>
              </div>
            </div>

            {/* Repair Builder */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact (Own what happened)
                </label>
                <textarea
                  value={repair.impact}
                  onChange={(e) => updateRepair(index, 'impact', e.target.value)}
                  placeholder="e.g., I interrupted you three times; that undercut your expertise"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intent (Your positive goal)
                </label>
                <textarea
                  value={repair.intent}
                  onChange={(e) => updateRepair(index, 'intent', e.target.value)}
                  placeholder="e.g., My intent was to keep us on time, not to dismiss you"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repair (Specific new behavior)
                </label>
                <textarea
                  value={repair.repair}
                  onChange={(e) => updateRepair(index, 'repair', e.target.value)}
                  placeholder="e.g., Next meeting I'll use hand-raise and wait"
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={2}
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request (Invite collaboration)
                </label>
                <input
                  type="text"
                  value={repair.request}
                  onChange={(e) => updateRepair(index, 'request', e.target.value)}
                  placeholder="e.g., Does that work, or would you prefer something else?"
                  className="w-full px-3 py-2 border rounded-lg"
                  onFocus={() => setCurrentIndex(index)}
                />
              </div>
            </div>

            {/* Generated Repair */}
            {repair.completed && (
              <div className="mt-4 bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-700 mb-2">Your Clear Repair:</p>
                <p className="text-green-800 text-sm italic">
                  "{generateFullRepair(repair)}"
                </p>
              </div>
            )}

            {/* Model Answer */}
            {showModels && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-700 mb-2">Model Repair:</p>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Impact:</strong> {repairScenarios[index].modelImpact}</p>
                  <p><strong>Intent:</strong> {repairScenarios[index].modelIntent}</p>
                  <p><strong>Repair:</strong> {repairScenarios[index].modelRepair}</p>
                  <p><strong>Request:</strong> {repairScenarios[index].modelRequest}</p>
                </div>
              </div>
            )}

            {/* Practice Button */}
            {repair.completed && !repair.practiced && currentIndex === index && !showPracticeTimer && (
              <button
                onClick={startPractice}
                className="mt-4 w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Practice Out Loud (30s)
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModels(!showModels)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showModels ? 'Hide' : 'Show'} Model Repairs
        </button>
        
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RefreshCcw className="w-5 h-5" />
          Reset All
        </button>
      </div>
    </div>
  )
}
