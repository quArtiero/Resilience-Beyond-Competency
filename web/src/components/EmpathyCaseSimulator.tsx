import { useState, createElement } from 'react'
import { Briefcase, Users, Home, GraduationCap, Heart, ChevronRight, CheckCircle } from 'lucide-react'

interface Case {
  id: string
  title: string
  icon: any
  scenario: string
  prompt: string
  modelLRL: string
  modelResponse: string
  keyPoints: string[]
}

const cases: Case[] = [
  {
    id: 'scope',
    title: 'Scope Change at 5pm',
    icon: Briefcase,
    scenario: 'PM: "We need to add Feature B by Friday."',
    prompt: 'Write your LRL and AND-boundary response:',
    modelLRL: "Sounds like you're under pressure to show B by Friday for stakeholders.",
    modelResponse: "...and we have 10 hours left. If the purpose is stakeholder confidence, can we demo a clickable mock + log intent? Review Monday.",
    keyPoints: [
      'Acknowledged pressure',
      'Named constraint (time)',
      'Proposed alternative (mock)',
      'Set review point'
    ]
  },
  {
    id: 'deadline',
    title: 'Missed Deadline (Peer)',
    icon: Users,
    scenario: 'Peer: "You said it would be done yesterday. Now we\'re all blocked."',
    prompt: 'Write your LRL and EAR response:',
    modelLRL: "You're frustrated because my delay is blocking the team's progress.",
    modelResponse: "I'm constrained by the API bug we found. If our purpose is unblocking the team, can I ship the working 80% by noon and patch the edge case by EOD? Status update at 2pm.",
    keyPoints: [
      'Owned the impact',
      'Explained constraint',
      'Offered partial solution',
      'Committed to timeline'
    ]
  },
  {
    id: 'customer',
    title: 'Intense Customer',
    icon: Heart,
    scenario: 'Customer: "This is the third outage this month. We\'re considering switching vendors."',
    prompt: 'Write your LRL and EAR response:',
    modelLRL: "You're paying for reliability and three outages is unacceptable for your business.",
    modelResponse: "We're constrained by our supplier's infrastructure this week. If the goal is zero downtime, can we implement our redundancy patch in 24h and provide daily status updates at 5pm? Plus a service credit for this month.",
    keyPoints: [
      'Validated their business impact',
      'Transparent about root cause',
      'Specific solution + timeline',
      'Offered compensation'
    ]
  },
  {
    id: 'family',
    title: 'Family Plan Change',
    icon: Home,
    scenario: 'Partner: "You promised we\'d have dinner together tonight. This is the third time this week."',
    prompt: 'Write your LRL and AND-boundary response:',
    modelLRL: "You're disappointed—we planned this and I keep breaking our agreements.",
    modelResponse: "...and I can't leave until this deploy finishes at 6:30. If the purpose is quality time together, can we move dinner to 7:30 and I'll block all of Sunday afternoon for us? No phone.",
    keyPoints: [
      'Acknowledged pattern',
      'Clear about constraint',
      'Alternative proposal',
      'Future commitment'
    ]
  },
  {
    id: 'study',
    title: 'Study Group Tension',
    icon: GraduationCap,
    scenario: 'Classmate: "You always pick the easy problems. I need practice with the hard ones for the exam."',
    prompt: 'Write your LRL and EAR response:',
    modelLRL: "You feel the problem selection isn't preparing you for the exam difficulty.",
    modelResponse: "I've been avoiding hard ones due to time. If our purpose is exam readiness, how about we alternate who picks daily, and dedicate last 20 minutes to one hard problem together? Review method Friday.",
    keyPoints: [
      'Acknowledged their need',
      'Admitted own behavior',
      'Collaborative solution',
      'Built in feedback loop'
    ]
  }
]

interface CaseResponse {
  caseId: string
  userResponse: string
  completed: boolean
}

export function EmpathyCaseSimulator() {
  const [responses, setResponses] = useState<CaseResponse[]>(() => {
    const saved = localStorage.getItem('empathy-case-responses')
    if (saved) {
      return JSON.parse(saved)
    }
    return cases.map(c => ({
      caseId: c.id,
      userResponse: '',
      completed: false
    }))
  })

  const [selectedCase, setSelectedCase] = useState<string>(cases[0].id)
  const [showModels, setShowModels] = useState(false)

  const updateResponse = (caseId: string, response: string) => {
    setResponses(prev => prev.map(r => 
      r.caseId === caseId
        ? { ...r, userResponse: response, completed: response.length > 20 }
        : r
    ))
  }

  const getCompletionRate = () => {
    const completed = responses.filter(r => r.completed).length
    return Math.round((completed / cases.length) * 100)
  }

  const currentCase = cases.find(c => c.id === selectedCase)!
  const currentResponse = responses.find(r => r.caseId === selectedCase)!

  const saveProgress = () => {
    localStorage.setItem('empathy-case-responses', JSON.stringify(responses))
    alert('Progress saved!')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Mini-Case Simulations</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Practice empathy in realistic scenarios. Choose 3 to complete.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Case Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Select a Case</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {cases.map(caseItem => {
            const Icon = caseItem.icon
            const isCompleted = responses.find(r => r.caseId === caseItem.id)?.completed
            
            return (
              <button
                key={caseItem.id}
                onClick={() => setSelectedCase(caseItem.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCase === caseItem.id
                    ? 'bg-purple-50 border-purple-400'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <Icon className={`w-8 h-8 ${
                      selectedCase === caseItem.id ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-center">{caseItem.title}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Case Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Scenario */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            {createElement(currentCase.icon, { 
              className: "w-6 h-6 text-purple-600" 
            })}
            <h4 className="font-semibold text-lg text-gray-800">
              {currentCase.title}
            </h4>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 mb-4">
            <p className="text-gray-800 font-medium">
              {currentCase.scenario}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            {currentCase.prompt}
          </p>
        </div>

        {/* Response Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Response
          </label>
          <textarea
            value={currentResponse.userResponse}
            onChange={(e) => updateResponse(selectedCase, e.target.value)}
            placeholder="Start with LRL, then add your boundary/solution..."
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
          />
          
          {/* Response Structure Guide */}
          <div className="mt-2 text-xs text-gray-600">
            <p>Structure: 
              <span className="font-medium"> [LRL reflection]</span> + 
              <span className="font-medium"> [AND/EAR response with solution]</span>
            </p>
          </div>
        </div>

        {/* Model Answer */}
        {showModels && (
          <div className="bg-green-50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Model LRL:</p>
              <p className="text-green-800">"{currentCase.modelLRL}"</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Model Response:</p>
              <p className="text-green-800">"{currentCase.modelResponse}"</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-green-700 mb-2">Key Points:</p>
              <ul className="space-y-1">
                {currentCase.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm text-green-800">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Self-Assessment */}
        {currentResponse.completed && !showModels && (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-800 mb-3">
              Self-Assessment Checklist
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-blue-700">
                <input type="checkbox" className="rounded" />
                Did I accurately reflect their concern?
              </label>
              <label className="flex items-center gap-2 text-sm text-blue-700">
                <input type="checkbox" className="rounded" />
                Did I acknowledge my constraint or limitation?
              </label>
              <label className="flex items-center gap-2 text-sm text-blue-700">
                <input type="checkbox" className="rounded" />
                Did I propose a specific, actionable solution?
              </label>
              <label className="flex items-center gap-2 text-sm text-blue-700">
                <input type="checkbox" className="rounded" />
                Did I include a timeline or review point?
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModels(!showModels)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {showModels ? 'Hide' : 'Show'} Model Answers
        </button>
        
        <button
          onClick={saveProgress}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Progress
        </button>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm font-medium text-yellow-800 mb-2">
          💡 Response Formula
        </p>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal ml-4">
          <li>Start with empathy (show you understand their position)</li>
          <li>Add your boundary or constraint with AND (not but)</li>
          <li>Connect to shared purpose or goal</li>
          <li>Propose specific next step with timeline</li>
          <li>Include review or check-in point</li>
        </ol>
      </div>
    </div>
  )
}
