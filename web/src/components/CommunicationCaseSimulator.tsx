import { useState } from 'react'
import { Briefcase, CheckCircle, XCircle, RotateCcw } from 'lucide-react'

interface CommunicationCase {
  id: number
  title: string
  scenario: string
  challenge: string
  options: {
    text: string
    feedback: string
    isOptimal: boolean
  }[]
  optimalApproach: string
  keyPrinciples: string[]
}

const cases: CommunicationCase[] = [
  {
    id: 1,
    title: 'Missed Handoff (Peer)',
    scenario: 'Your peer Alex has missed the handoff deadline for the third time this month. The QA team is blocked, and the release is at risk.',
    challenge: 'Write your SBI + Request message to Alex.',
    options: [
      {
        text: 'Hey Alex, you keep missing handoffs. This needs to stop.',
        feedback: 'Too accusatory. Uses "you" statements and lacks specificity.',
        isOptimal: false
      },
      {
        text: 'Alex, in the last 3 sprints (weeks of Nov 1, 8, 15), code was delivered after 6pm on handoff day, which blocked QA from testing before morning standup. Request: Deliver by 3pm on handoff days starting this Thursday. Success = 3 on-time deliveries. Review at Friday retro.',
        feedback: 'Excellent! Specific situations, observable behavior, clear impact, measurable request with review.',
        isOptimal: true
      },
      {
        text: 'Hi Alex, could you try to be more on time with handoffs? It would really help the team.',
        feedback: 'Too vague. No specific situations, behaviors, or measurable requests.',
        isOptimal: false
      }
    ],
    optimalApproach: 'Use SBI + Request: State specific situations, observable behaviors, operational impact, and a measurable request with review time.',
    keyPrinciples: ['Specificity', 'Observable facts', 'Clear metrics', 'Review mechanism']
  },
  {
    id: 2,
    title: 'Scope Creep (Stakeholder)',
    scenario: 'The product stakeholder wants to add three new features to the current sprint, which ends in 2 days. Your team is already at capacity.',
    challenge: 'Deliver a No + Option response with an EAR micro-test.',
    options: [
      {
        text: 'Sorry, we can\'t do that. The sprint is almost over.',
        feedback: 'Flat rejection without alternatives. Doesn\'t acknowledge their need or offer solutions.',
        isOptimal: false
      },
      {
        text: 'I understand you need these features for the demo (E). We\'re at capacity with 2 days left (A). I can\'t add all three by Friday, and I can deliver Feature A as a prototype by Thursday 4pm or all three fully tested by next Wednesday. If the purpose is showing progress, let\'s run Feature A for 48h and measure engagement, then decide on B&C at Monday\'s review. Which serves best?',
        feedback: 'Perfect! Acknowledges need (E), explains constraint (A), offers clear options with micro-test proposal.',
        isOptimal: true
      },
      {
        text: 'Let me check with the team and get back to you later.',
        feedback: 'Avoids the decision. Creates uncertainty and delays resolution.',
        isOptimal: false
      }
    ],
    optimalApproach: 'Use No + Option with EAR: Empathize with need, acknowledge constraint, offer alternatives with a 48-hour test.',
    keyPrinciples: ['Empathy first', 'Clear constraints', 'Multiple options', 'Test & learn']
  },
  {
    id: 3,
    title: 'Low-Quality Notes (Direct Report)',
    scenario: 'Your direct report\'s meeting notes consistently lack action items with owners and dates, causing confusion and missed deliverables.',
    challenge: 'Use NVC-Lite to address this issue.',
    options: [
      {
        text: 'Your notes are terrible and causing problems. You need to do better.',
        feedback: 'Judgmental and vague. No specific observation or request.',
        isOptimal: false
      },
      {
        text: 'When meeting notes lack owners and dates for action items (O), I feel concerned (F) because we need accountability (N). Request: Use format "Owner - Action - Date" for all items starting tomorrow. Share a template example by EOD. Success = 100% formatted items for 1 week. Review Friday 1:1.',
        feedback: 'Excellent NVC-Lite! Clear observation, feeling, need, and specific request with metrics.',
        isOptimal: true
      },
      {
        text: 'Could you maybe improve your note-taking when you have time?',
        feedback: 'Too passive and vague. No clear observation, need, or measurable request.',
        isOptimal: false
      }
    ],
    optimalApproach: 'Use NVC-Lite: Observation without judgment, brief feeling, clear need, specific measurable request.',
    keyPrinciples: ['Non-judgmental observation', 'Brief feelings', 'Clear needs', 'Measurable requests']
  },
  {
    id: 4,
    title: 'Family Logistics Clash',
    scenario: 'Your partner scheduled a dinner with friends on the same night you have an important work deadline. Both were planned weeks ago.',
    challenge: 'Use AND-boundary with Decision Recap.',
    options: [
      {
        text: 'You always do this! Cancel the dinner.',
        feedback: 'Accusatory and demanding. No acknowledgment of both needs.',
        isOptimal: false
      },
      {
        text: 'I see we both have important commitments tonight (acknowledge). I need to meet my deadline AND you want to see friends. Options: I work until 7pm then join late, or you go solo and we host brunch Sunday, or we both reschedule. If the purpose is maintaining both work and friendships, which works? Decision: [chosen option]. Review: Check in at 9pm tonight.',
        feedback: 'Perfect AND-boundary! Acknowledges both needs, offers options, includes decision recap.',
        isOptimal: true
      },
      {
        text: 'Fine, whatever you want.',
        feedback: 'Passive-aggressive. Doesn\'t address the conflict or find a solution.',
        isOptimal: false
      }
    ],
    optimalApproach: 'Use AND-boundary: Acknowledge both needs, offer options that honor both, create clear decision with review.',
    keyPrinciples: ['Both/and thinking', 'Multiple options', 'Shared purpose', 'Clear decision']
  },
  {
    id: 5,
    title: 'Study Group Drift',
    scenario: 'Your study group consistently starts 15-20 minutes late, reducing productive time. The final exam is in 2 weeks.',
    challenge: 'Use SBI on lateness with clear Request and Review.',
    options: [
      {
        text: 'If you guys don\'t start showing up on time, I\'m finding a new group.',
        feedback: 'Threatening ultimatum. No specific feedback or collaborative solution.',
        isOptimal: false
      },
      {
        text: 'Can we please try to be more punctual?',
        feedback: 'Too vague. No specific situation, impact, or measurable request.',
        isOptimal: false
      },
      {
        text: 'Team, in our last 3 sessions (Mon, Wed, Fri), we started 15+ minutes late, which cost us 45 minutes of practice time total. With finals in 2 weeks, that\'s critical. Request: Start within 5 minutes of scheduled time. Implementation: Whoever\'s late brings practice problems for the group. Success = 5 on-time starts. Review: After Friday\'s mock quiz (target score ≥80%).',
        feedback: 'Excellent! Specific situations, clear impact, creative accountability mechanism, measurable success.',
        isOptimal: true
      }
    ],
    optimalApproach: 'Use SBI + Request: Specific instances, time impact, clear request with accountability mechanism and review.',
    keyPrinciples: ['Quantify impact', 'Creative accountability', 'Clear success metrics', 'Timely review']
  }
]

export function CommunicationCaseSimulator() {
  const [currentCase, setCurrentCase] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedCases, setCompletedCases] = useState<Set<number>>(new Set())
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({})

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowFeedback(true)
    if (cases[currentCase].options[optionIndex].isOptimal) {
      setCompletedCases(new Set([...completedCases, currentCase]))
    }
  }

  const handleCustomResponse = (response: string) => {
    setUserResponses({ ...userResponses, [currentCase]: response })
    setCompletedCases(new Set([...completedCases, currentCase]))
  }

  const nextCase = () => {
    if (currentCase < cases.length - 1) {
      setCurrentCase(currentCase + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }

  const previousCase = () => {
    if (currentCase > 0) {
      setCurrentCase(currentCase - 1)
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }

  const reset = () => {
    setCurrentCase(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setCompletedCases(new Set())
    setUserResponses({})
  }

  const getCompletionRate = () => {
    return Math.round((completedCases.size / cases.length) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Communication Case Simulator</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Case {currentCase + 1} of {cases.length}
            </span>
            <span className="text-sm text-gray-600">
              {getCompletionRate()}% Complete
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Case Progress Dots */}
      <div className="flex justify-center gap-2">
        {cases.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentCase(index)
              setSelectedOption(null)
              setShowFeedback(false)
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              completedCases.has(index)
                ? 'bg-green-500 text-white'
                : index === currentCase
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Current Case */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-bold text-gray-800">
            {cases[currentCase].title}
          </h4>
          {completedCases.has(currentCase) && (
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          )}
        </div>

        {/* Scenario */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h5 className="font-semibold text-gray-700 mb-2">Scenario:</h5>
          <p className="text-gray-600">{cases[currentCase].scenario}</p>
        </div>

        {/* Challenge */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h5 className="font-semibold text-blue-800 mb-2">Your Challenge:</h5>
          <p className="text-blue-700">{cases[currentCase].challenge}</p>
        </div>

        {/* Response Options */}
        <div className="space-y-3 mb-6">
          <h5 className="font-semibold text-gray-700">Choose Your Response:</h5>
          {cases[currentCase].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedOption === index
                  ? option.isOptimal
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center ${
                  selectedOption === index
                    ? option.isOptimal
                      ? 'border-green-500 bg-green-500'
                      : 'border-red-500 bg-red-500'
                    : 'border-gray-300'
                }`}>
                  {selectedOption === index && (
                    option.isOptimal
                      ? <CheckCircle className="w-4 h-4 text-white" />
                      : <XCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{option.text}</p>
                  
                  {/* Feedback */}
                  {showFeedback && selectedOption === index && (
                    <div className={`mt-2 p-2 rounded ${
                      option.isOptimal ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <p className={`text-sm ${
                        option.isOptimal ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {option.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Response */}
        <div className="border-t pt-6">
          <h5 className="font-semibold text-gray-700 mb-3">Or Write Your Own Response:</h5>
          <textarea
            value={userResponses[currentCase] || ''}
            onChange={(e) => setUserResponses({ ...userResponses, [currentCase]: e.target.value })}
            placeholder="Type your communication approach here..."
            className="w-full px-4 py-3 border rounded-lg"
            rows={4}
          />
          {userResponses[currentCase] && userResponses[currentCase].length > 50 && (
            <button
              onClick={() => handleCustomResponse(userResponses[currentCase])}
              className="mt-3 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Mark Complete
            </button>
          )}
        </div>

        {/* Optimal Approach */}
        {showFeedback && (
          <div className="mt-6 bg-purple-50 rounded-lg p-4">
            <h5 className="font-semibold text-purple-800 mb-2">Optimal Approach:</h5>
            <p className="text-purple-700 mb-3">{cases[currentCase].optimalApproach}</p>
            
            <h6 className="font-medium text-purple-800 mb-2">Key Principles:</h6>
            <ul className="list-disc ml-5 space-y-1">
              {cases[currentCase].keyPrinciples.map((principle, index) => (
                <li key={index} className="text-purple-700 text-sm">{principle}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={previousCase}
          disabled={currentCase === 0}
          className={`px-6 py-3 rounded-lg ${
            currentCase === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          ← Previous Case
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <RotateCcw className="w-5 h-5" />
          Reset All
        </button>

        <button
          onClick={nextCase}
          disabled={currentCase === cases.length - 1}
          className={`px-6 py-3 rounded-lg ${
            currentCase === cases.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Next Case →
        </button>
      </div>
    </div>
  )
}
