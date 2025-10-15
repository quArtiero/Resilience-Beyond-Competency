import { useState } from 'react'

interface ConflictScenario {
  id: string
  title: string
  description: string
  participants: {
    you: string
    other: string
  }
  context: string
  initialTension: number // 1-10
}

interface DialogueOption {
  id: string
  text: string
  style: 'aggressive' | 'passive' | 'assertive' | 'avoidant'
  impact: {
    tension: number // change in tension (-3 to +3)
    relationship: number // change in relationship (-2 to +2)
    resolution: number // progress toward resolution (0 to +3)
  }
  response: string
  nextOptions?: DialogueOption[]
}

const scenarios: ConflictScenario[] = [
  {
    id: 'team-deadline',
    title: 'Team Project Deadline',
    description: 'A team member hasn\'t delivered their part of a critical project due tomorrow.',
    participants: {
      you: 'Project Lead',
      other: 'Team Member (Alex)'
    },
    context: 'Alex has missed two check-ins and their work is blocking the entire team. The client presentation is tomorrow at 9 AM.',
    initialTension: 7
  },
  {
    id: 'resource-allocation',
    title: 'Resource Allocation Dispute',
    description: 'Two departments are competing for limited budget resources.',
    participants: {
      you: 'Your Department Head',
      other: 'Other Department Head (Sam)'
    },
    context: 'Both departments have critical projects, but only one can get the funding this quarter.',
    initialTension: 6
  },
  {
    id: 'feedback-resistance',
    title: 'Feedback Resistance',
    description: 'An employee is defensive about constructive feedback on their performance.',
    participants: {
      you: 'Manager',
      other: 'Direct Report (Jordan)'
    },
    context: 'Jordan\'s work quality has declined, affecting team morale. This is their performance review.',
    initialTension: 5
  }
]

const initialOptions: Record<string, DialogueOption[]> = {
  'team-deadline': [
    {
      id: 'aggressive-1',
      text: "Alex, this is unacceptable! You've let the entire team down. Where is your work?",
      style: 'aggressive',
      impact: { tension: 2, relationship: -2, resolution: 0 },
      response: "Alex becomes defensive: 'I've been overwhelmed! You never asked if I needed help!'",
      nextOptions: [
        {
          id: 'aggressive-2',
          text: "That's not my job! You should have spoken up earlier!",
          style: 'aggressive',
          impact: { tension: 3, relationship: -2, resolution: -1 },
          response: "Alex shuts down: 'Fine, I'll figure it out myself.' They storm off."
        },
        {
          id: 'assertive-2',
          text: "You're right, I should have checked in. Let's focus on what we can do now.",
          style: 'assertive',
          impact: { tension: -2, relationship: 1, resolution: 2 },
          response: "Alex calms down: 'Thank you. I have 60% done. With help, we can finish by morning.'"
        }
      ]
    },
    {
      id: 'passive-1',
      text: "Hey Alex, um, just wondering if maybe you might have an update on your part?",
      style: 'passive',
      impact: { tension: 0, relationship: 0, resolution: 0 },
      response: "Alex seems confused: 'Oh, the deadline? I thought we had more time...'",
      nextOptions: [
        {
          id: 'passive-2',
          text: "Oh, well, if you thought that... I guess we could try to extend...",
          style: 'passive',
          impact: { tension: 1, relationship: -1, resolution: -1 },
          response: "Alex relaxes too much: 'Great, I'll get it to you next week then.'"
        },
        {
          id: 'assertive-2b',
          text: "The deadline is tomorrow at 9 AM. What specifically do you need to complete your part?",
          style: 'assertive',
          impact: { tension: -1, relationship: 1, resolution: 3 },
          response: "Alex focuses: 'Right. I need 2 hours of help with the data analysis. Can someone assist?'"
        }
      ]
    },
    {
      id: 'assertive-1',
      text: "Alex, I'm concerned about the deadline. Can you tell me where things stand and what support you need?",
      style: 'assertive',
      impact: { tension: -1, relationship: 1, resolution: 2 },
      response: "Alex opens up: 'I'm struggling with the technical requirements. I'm about 60% done but stuck.'",
      nextOptions: [
        {
          id: 'assertive-3',
          text: "Let's break down what's left. Who on the team has the skills to help with the technical parts?",
          style: 'assertive',
          impact: { tension: -2, relationship: 2, resolution: 3 },
          response: "Alex engages: 'Maya knows this system well. If she could spare an hour, we'd make it.'"
        },
        {
          id: 'avoidant-3',
          text: "Well, just do your best. We'll figure something out.",
          style: 'avoidant',
          impact: { tension: 1, relationship: -1, resolution: 0 },
          response: "Alex looks worried: 'But what about the client presentation?'"
        }
      ]
    },
    {
      id: 'avoidant-1',
      text: "Hey everyone, let's just postpone the meeting and regroup next week.",
      style: 'avoidant',
      impact: { tension: -1, relationship: -1, resolution: -2 },
      response: "Team is confused: 'But the client is expecting this tomorrow!'",
    }
  ]
}

export function ConflictSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<ConflictScenario | null>(null)
  const [currentOptions, setCurrentOptions] = useState<DialogueOption[]>([])
  const [dialogue, setDialogue] = useState<Array<{speaker: string, text: string, style?: string}>>([])
  const [metrics, setMetrics] = useState({
    tension: 0,
    relationship: 0,
    resolution: 0
  })
  const [isComplete, setIsComplete] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)

  const startScenario = (scenario: ConflictScenario) => {
    setSelectedScenario(scenario)
    setCurrentOptions(initialOptions[scenario.id] || [])
    setDialogue([
      { speaker: 'Context', text: scenario.context },
      { speaker: scenario.participants.other, text: getInitialStatement(scenario.id) }
    ])
    setMetrics({ tension: scenario.initialTension, relationship: 5, resolution: 0 })
    setIsComplete(false)
  }

  const getInitialStatement = (scenarioId: string) => {
    const statements: Record<string, string> = {
      'team-deadline': "I know you wanted an update on my part of the project...",
      'resource-allocation': "We need to talk about the Q3 budget allocation.",
      'feedback-resistance': "I saw the performance review notes. I don't think they're fair."
    }
    return statements[scenarioId] || "We need to discuss something important."
  }

  const handleOptionSelect = (option: DialogueOption) => {
    // Add your dialogue
    setDialogue([...dialogue, 
      { speaker: 'You', text: option.text, style: option.style },
      { speaker: selectedScenario?.participants.other || 'Other', text: option.response }
    ])

    // Update metrics
    const newMetrics = {
      tension: Math.max(0, Math.min(10, metrics.tension + option.impact.tension)),
      relationship: Math.max(0, Math.min(10, metrics.relationship + option.impact.relationship)),
      resolution: Math.max(0, Math.min(10, metrics.resolution + option.impact.resolution))
    }
    setMetrics(newMetrics)

    // Set next options or complete
    if (option.nextOptions) {
      setCurrentOptions(option.nextOptions)
    } else if (newMetrics.resolution >= 7 || newMetrics.tension >= 10 || newMetrics.relationship <= 2) {
      setIsComplete(true)
    } else {
      // Generate follow-up options based on current state
      setCurrentOptions(generateFollowUpOptions())
    }

    setSelectedStyle(option.style)
  }

  const generateFollowUpOptions = (): DialogueOption[] => {
    // Simplified follow-up generation
    return [
      {
        id: 'follow-assertive',
        text: "Let's create an action plan together to move forward.",
        style: 'assertive',
        impact: { tension: -1, relationship: 1, resolution: 2 },
        response: "That sounds productive. What do you suggest?"
      },
      {
        id: 'follow-passive',
        text: "Whatever you think is best...",
        style: 'passive',
        impact: { tension: 0, relationship: -1, resolution: 0 },
        response: "I need more input from you on this."
      }
    ]
  }

  const getStyleColor = (style?: string) => {
    const colors: Record<string, string> = {
      aggressive: 'bg-red-100 text-red-800 border-red-300',
      passive: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      assertive: 'bg-green-100 text-green-800 border-green-300',
      avoidant: 'bg-gray-100 text-gray-800 border-gray-300'
    }
    return colors[style || ''] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  const getOutcome = () => {
    if (metrics.resolution >= 7) {
      return {
        type: 'success',
        title: '✅ Conflict Resolved Successfully!',
        message: 'You found a mutually beneficial solution while maintaining the relationship.',
        color: 'from-green-50 to-emerald-50'
      }
    } else if (metrics.tension >= 10) {
      return {
        type: 'escalated',
        title: '🔥 Conflict Escalated',
        message: 'The situation became too heated. Time to cool down and try again later.',
        color: 'from-red-50 to-orange-50'
      }
    } else if (metrics.relationship <= 2) {
      return {
        type: 'damaged',
        title: '💔 Relationship Damaged',
        message: 'The conflict damaged the relationship. Repair work will be needed.',
        color: 'from-gray-50 to-slate-50'
      }
    } else {
      return {
        type: 'partial',
        title: '🤝 Partial Progress',
        message: 'Some progress was made, but the conflict isn\'t fully resolved.',
        color: 'from-blue-50 to-indigo-50'
      }
    }
  }

  const resetSimulator = () => {
    setSelectedScenario(null)
    setCurrentOptions([])
    setDialogue([])
    setMetrics({ tension: 0, relationship: 0, resolution: 0 })
    setIsComplete(false)
    setSelectedStyle(null)
  }

  if (!selectedScenario) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎭 Conflict Resolution Simulator
          </h2>
          <p className="text-gray-600 mb-6">
            Practice navigating difficult conversations with real-time feedback on your approach.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => startScenario(scenario)}
                className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 text-left"
              >
                <h3 className="font-bold text-gray-800 mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Tension: {scenario.initialTension}/10</span>
                  <span className="text-blue-600 font-semibold">Start →</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-3">Communication Styles:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-300">
              <div className="font-semibold text-green-800">Assertive</div>
              <div className="text-xs text-green-600">Clear, respectful, solution-focused</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-300">
              <div className="font-semibold text-red-800">Aggressive</div>
              <div className="text-xs text-red-600">Forceful, demanding, critical</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300">
              <div className="font-semibold text-yellow-800">Passive</div>
              <div className="text-xs text-yellow-600">Indirect, yielding, unclear</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
              <div className="font-semibold text-gray-800">Avoidant</div>
              <div className="text-xs text-gray-600">Deflecting, withdrawing, delaying</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isComplete) {
    const outcome = getOutcome()
    
    return (
      <div className={`bg-gradient-to-br ${outcome.color} rounded-xl p-8 shadow-xl`}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {outcome.title}
        </h2>
        <p className="text-gray-700 mb-6">{outcome.message}</p>

        {/* Final Metrics */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Final Metrics:</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tension Level</span>
                <span>{metrics.tension}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full"
                  style={{ width: `${metrics.tension * 10}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Relationship Quality</span>
                <span>{metrics.relationship}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-400 to-green-400 h-2 rounded-full"
                  style={{ width: `${metrics.relationship * 10}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Resolution Progress</span>
                <span>{metrics.resolution}/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${metrics.resolution * 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Communication Style Analysis */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Your Approach:</h3>
          <p className="text-gray-600">
            Your last response style was <span className={`px-2 py-1 rounded ${getStyleColor(selectedStyle || undefined)}`}>
              {selectedStyle}
            </span>
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Assertive communication typically yields the best outcomes, 
              balancing clarity with respect for all parties.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => startScenario(selectedScenario)}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={resetSimulator}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            New Scenario
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Scenario Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedScenario.title}</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>You: {selectedScenario.participants.you}</span>
          <span>Other: {selectedScenario.participants.other}</span>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-600 mb-1">Tension</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.tension * 10}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{metrics.tension}</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Relationship</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-400 to-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.relationship * 10}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{metrics.relationship}</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Resolution</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metrics.resolution * 10}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{metrics.resolution}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogue History */}
      <div className="bg-white rounded-lg p-6 shadow-md max-h-96 overflow-y-auto">
        {dialogue.map((entry, idx) => (
          <div key={idx} className={`mb-4 ${entry.speaker === 'You' ? 'text-right' : 'text-left'}`}>
            <div className="text-xs text-gray-500 mb-1">{entry.speaker}</div>
            <div className={`inline-block p-3 rounded-lg max-w-md ${
              entry.speaker === 'You' 
                ? `${getStyleColor(entry.style)} border`
                : 'bg-gray-100 text-gray-800'
            }`}>
              {entry.text}
            </div>
          </div>
        ))}
      </div>

      {/* Response Options */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Choose Your Response:</h3>
        <div className="space-y-3">
          {currentOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                getStyleColor(option.style)
              } border hover:scale-102`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold uppercase">{option.style}</span>
                <div className="flex gap-2 text-xs">
                  <span className={option.impact.tension > 0 ? 'text-red-600' : 'text-green-600'}>
                    T: {option.impact.tension > 0 ? '+' : ''}{option.impact.tension}
                  </span>
                  <span className={option.impact.relationship > 0 ? 'text-green-600' : 'text-red-600'}>
                    R: {option.impact.relationship > 0 ? '+' : ''}{option.impact.relationship}
                  </span>
                  <span className="text-blue-600">
                    P: +{option.impact.resolution}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{option.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
