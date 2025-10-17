import { useState } from 'react'
import { Mail, Users, Brain, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

interface SimulationCase {
  id: string
  title: string
  icon: any
  scenario: string
  trigger: string
  toolStack: string[]
  perfectResponse: string
}

const cases: SimulationCase[] = [
  {
    id: 'spiky-email',
    title: 'The Spiky Email',
    icon: Mail,
    scenario: 'You receive an email with subject: "This is unacceptable." The body criticizes your recent project deliverable harshly.',
    trigger: 'Status threat, fairness violation',
    toolStack: ['5-4-3-2-1 Grounding', 'Reappraisal (data about expectations)', 'If-Then reply'],
    perfectResponse: 'Thank you for the feedback. I understand the deliverable didn\'t meet expectations. To align better: 1) Which specific aspects need revision? 2) What\'s the priority order? 3) What timeline works for you? I\'ll send a revised plan within 48 hours with clear metrics.'
  },
  {
    id: 'public-correction',
    title: 'Public Correction',
    icon: Users,
    scenario: 'In a team meeting, your manager corrects your data in front of 15 colleagues, saying "That\'s completely wrong."',
    trigger: 'Status threat, social evaluation',
    toolStack: ['90-second reset', 'Reappraisal (opportunity to clarify)', 'One-sentence response'],
    perfectResponse: 'Thanks for flagging that. To be precise, the verified number is X, and we\'re currently testing Y. I\'ll post a complete update with sources within 48 hours.'
  },
  {
    id: 'exam-spiral',
    title: 'Exam Cram Spiral',
    icon: Brain,
    scenario: 'Studying for a critical certification. It\'s 11 PM, you have 20 tabs open, and you\'re jumping between topics, retaining nothing.',
    trigger: 'Time pressure, cognitive overload',
    toolStack: ['State Switch (water/stretch)', 'Attentional narrow (single 25-min block)', 'Two-Minute Anchor Task'],
    perfectResponse: 'Close 19 tabs. Choose ONE subtopic. Set 25-minute timer. Complete 10 practice questions on just that topic. Then reassess.'
  }
]

export function RegulationSimulator() {
  const [selectedCase, setSelectedCase] = useState<SimulationCase | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({
    initialReaction: '',
    toolsUsed: [] as string[],
    finalResponse: '',
    reflection: ''
  })
  const [showPerfectResponse, setShowPerfectResponse] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)

  const startSimulation = (simCase: SimulationCase) => {
    setSelectedCase(simCase)
    setCurrentStep(1)
    setResponses({
      initialReaction: '',
      toolsUsed: [],
      finalResponse: '',
      reflection: ''
    })
    setShowPerfectResponse(false)
    setSimulationComplete(false)
  }

  const toggleTool = (tool: string) => {
    if (responses.toolsUsed.includes(tool)) {
      setResponses(prev => ({
        ...prev,
        toolsUsed: prev.toolsUsed.filter(t => t !== tool)
      }))
    } else {
      setResponses(prev => ({
        ...prev,
        toolsUsed: [...prev.toolsUsed, tool]
      }))
    }
  }

  const completeSimulation = () => {
    setSimulationComplete(true)
    
    // Save to localStorage
    const saved = localStorage.getItem('regulation-simulations')
    const simulations = saved ? JSON.parse(saved) : []
    simulations.push({
      caseId: selectedCase?.id,
      title: selectedCase?.title,
      responses,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('regulation-simulations', JSON.stringify(simulations))
  }

  const reset = () => {
    setSelectedCase(null)
    setCurrentStep(0)
    setResponses({
      initialReaction: '',
      toolsUsed: [],
      finalResponse: '',
      reflection: ''
    })
    setShowPerfectResponse(false)
    setSimulationComplete(false)
  }

  if (!selectedCase) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Mini-Case Simulations</h3>
          <p className="text-gray-600">
            Practice regulation in realistic scenarios. Choose your tools and craft your response.
          </p>
        </div>

        <div className="grid gap-4">
          {cases.map(simCase => {
            const Icon = simCase.icon
            return (
              <button
                key={simCase.id}
                onClick={() => startSimulation(simCase)}
                className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Icon className="w-8 h-8 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">{simCase.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{simCase.scenario}</p>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-gray-500">Trigger: {simCase.trigger}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const SelectedIcon = selectedCase.icon

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Case Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4 mb-4">
          <SelectedIcon className="w-8 h-8 text-orange-500" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedCase.title}</h3>
            <p className="text-gray-600">{selectedCase.scenario}</p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {['Initial Reaction', 'Choose Tools', 'Craft Response', 'Review'].map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${index < 3 ? 'flex-1' : ''}`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep > index ? 'bg-green-500 text-white' :
                currentStep === index ? 'bg-blue-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                currentStep >= index ? 'text-gray-800 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </span>
              {index < 3 && <div className="flex-1 h-0.5 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">What's your initial reaction?</h4>
            <p className="text-sm text-gray-600">
              Be honest - what would you typically think or feel?
            </p>
            <textarea
              value={responses.initialReaction}
              onChange={(e) => setResponses(prev => ({ ...prev, initialReaction: e.target.value }))}
              placeholder="e.g., I'm furious. They're undermining me. I want to defend myself immediately..."
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Select your regulation tools</h4>
            <p className="text-sm text-gray-600">
              Recommended stack: {selectedCase.toolStack.join(' → ')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                '90-Second Reset',
                '5-4-3-2-1 Grounding',
                'Cognitive Reappraisal',
                'If-Then Plan',
                'State Switch',
                'Attentional Zoom',
                'Two-Minute Anchor',
                'Defusion Line'
              ].map(tool => (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    responses.toolsUsed.includes(tool)
                      ? 'bg-blue-50 border-blue-400'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{tool}</span>
                    {responses.toolsUsed.includes(tool) && (
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Craft your regulated response</h4>
            <p className="text-sm text-gray-600">
              After using your tools, what would you actually say/do?
            </p>
            <textarea
              value={responses.finalResponse}
              onChange={(e) => setResponses(prev => ({ ...prev, finalResponse: e.target.value }))}
              placeholder="Your response after regulation..."
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
            
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-800 mb-1">Quality Check:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Acknowledges the issue</li>
                <li>✓ States your purpose</li>
                <li>✓ Proposes specific next action</li>
                <li>✓ Includes timeline or metric</li>
              </ul>
            </div>
          </div>
        )}

        {currentStep === 4 && !simulationComplete && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Review & Reflect</h4>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Initial Reaction:</p>
                <p className="text-sm">{responses.initialReaction}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-1">Tools Used:</p>
                <div className="flex flex-wrap gap-1">
                  {responses.toolsUsed.map(tool => (
                    <span key={tool} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-1">Your Response:</p>
                <p className="text-sm">{responses.finalResponse}</p>
              </div>
            </div>

            <button
              onClick={() => setShowPerfectResponse(!showPerfectResponse)}
              className="w-full text-left"
            >
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800 mb-2">
                  {showPerfectResponse ? '▾' : '▸'} See Model Response
                </p>
                {showPerfectResponse && (
                  <p className="text-sm text-green-700">{selectedCase.perfectResponse}</p>
                )}
              </div>
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What did you learn from this simulation?
              </label>
              <textarea
                value={responses.reflection}
                onChange={(e) => setResponses(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder="e.g., I need to pause longer before responding..."
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
            </div>
          </div>
        )}

        {simulationComplete && (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h4 className="text-lg font-bold text-gray-800 mb-2">Simulation Complete!</h4>
            <p className="text-gray-600 mb-4">
              You've successfully practiced regulation under pressure.
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Another Case
            </button>
          </div>
        )}

        {/* Navigation */}
        {!simulationComplete && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : reset()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {currentStep === 1 ? 'Back to Cases' : '← Previous'}
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !responses.initialReaction) ||
                  (currentStep === 2 && responses.toolsUsed.length === 0) ||
                  (currentStep === 3 && !responses.finalResponse)
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={completeSimulation}
                disabled={!responses.reflection}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Complete Simulation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
