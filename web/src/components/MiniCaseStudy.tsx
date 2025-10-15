import { useState } from 'react'

interface Case {
  id: string
  title: string
  scenario: string
  biases: string[]
  counterMoves: string[]
  task: string
  taskType: 'plan' | 'metric' | 'script'
}

const cases: Case[] = [
  {
    id: 'roadmap',
    title: 'Product Roadmap',
    scenario: 'Your team keeps a low-value feature because "we already built half of it."',
    biases: ['Sunk cost fallacy', 'Status quo bias'],
    counterMoves: ['Future-only rule', 'Red-team 10 min', 'Default swap (remove unless users demand)'],
    task: 'Write a 3-step plan to test whether it stays or goes.',
    taskType: 'plan'
  },
  {
    id: 'exam',
    title: 'Exam Strategy',
    scenario: 'You keep rereading notes despite low quiz scores.',
    biases: ['Anchoring on familiar method', 'Availability heuristic'],
    counterMoves: ['Re-anchor to retrieval practice data', '1-week AB test (half topics retrieval, half reread)'],
    task: 'Define success metric and cut-line.',
    taskType: 'metric'
  },
  {
    id: 'vendor',
    title: 'Vendor Negotiation',
    scenario: 'First quote anchors you; every counteroffer feels "lossy."',
    biases: ['Anchoring', 'Loss aversion'],
    counterMoves: ['Get 2 independent quotes', 'Compute total cost of delay', 'Reframe to long-run value'],
    task: 'Draft a 2-paragraph negotiation script using new anchors.',
    taskType: 'script'
  }
]

export function MiniCaseStudy() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [completedCases, setCompletedCases] = useState<string[]>([])
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})

  const handleCaseSelect = (caseStudy: Case) => {
    setSelectedCase(caseStudy)
    setShowHints({ ...showHints, [caseStudy.id]: false })
  }

  const handleResponseChange = (caseId: string, value: string) => {
    setResponses({ ...responses, [caseId]: value })
  }

  const handleComplete = (caseId: string) => {
    if (responses[caseId]?.trim()) {
      setCompletedCases([...completedCases, caseId])
    }
  }

  const toggleHints = (caseId: string) => {
    setShowHints({ ...showHints, [caseId]: !showHints[caseId] })
  }

  const getProgress = () => {
    return (completedCases.length / cases.length) * 100
  }

  const renderTaskInput = (caseStudy: Case) => {
    switch (caseStudy.taskType) {
      case 'plan':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Your 3-Step Test Plan:</label>
            <div className="space-y-2">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-start gap-2">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {step}
                  </span>
                  <textarea
                    placeholder={`Step ${step}...`}
                    className="flex-1 p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
                    rows={2}
                    onChange={(e) => {
                      const stepKey = `${caseStudy.id}_step${step}`
                      const allSteps = [
                        responses[`${caseStudy.id}_step1`] || '',
                        responses[`${caseStudy.id}_step2`] || '',
                        responses[`${caseStudy.id}_step3`] || ''
                      ]
                      allSteps[step - 1] = e.target.value
                      handleResponseChange(caseStudy.id, allSteps.join('\n'))
                      setResponses({ ...responses, [stepKey]: e.target.value })
                    }}
                    value={responses[`${caseStudy.id}_step${step}`] || ''}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'metric':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Success Metric:</label>
              <input
                type="text"
                placeholder="e.g., Quiz scores increase by 20%"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
                onChange={(e) => {
                  const cutline = responses[`${caseStudy.id}_cutline`] || ''
                  handleResponseChange(caseStudy.id, `Metric: ${e.target.value}\nCut-line: ${cutline}`)
                  setResponses({ ...responses, [`${caseStudy.id}_metric`]: e.target.value })
                }}
                value={responses[`${caseStudy.id}_metric`] || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cut-line (Decision Point):</label>
              <input
                type="text"
                placeholder="e.g., If retrieval > reread by 15%, switch permanently"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:outline-none"
                onChange={(e) => {
                  const metric = responses[`${caseStudy.id}_metric`] || ''
                  handleResponseChange(caseStudy.id, `Metric: ${metric}\nCut-line: ${e.target.value}`)
                  setResponses({ ...responses, [`${caseStudy.id}_cutline`]: e.target.value })
                }}
                value={responses[`${caseStudy.id}_cutline`] || ''}
              />
            </div>
          </div>
        )
      
      case 'script':
        return (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Your 2-Paragraph Negotiation Script:</label>
            <textarea
              placeholder="Paragraph 1: Opening with new anchors...\n\nParagraph 2: Value-based reframe..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
              rows={8}
              onChange={(e) => handleResponseChange(caseStudy.id, e.target.value)}
              value={responses[caseStudy.id] || ''}
            />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Cases Completed</span>
          <span className="text-sm text-gray-600">{completedCases.length}/{cases.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>

      {/* Case Selection */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Case Study</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map(caseStudy => (
            <button
              key={caseStudy.id}
              onClick={() => handleCaseSelect(caseStudy)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedCase?.id === caseStudy.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-105'
                  : completedCases.includes(caseStudy.id)
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-800">{caseStudy.title}</h4>
                {completedCases.includes(caseStudy.id) && (
                  <span className="text-green-600 text-xl">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{caseStudy.scenario}</p>
              {selectedCase?.id === caseStudy.id && (
                <div className="mt-2 text-xs text-indigo-600 font-semibold">Currently Working</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Case Details */}
      {selectedCase && (
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Case {cases.findIndex(c => c.id === selectedCase.id) + 1}: {selectedCase.title}
            </h3>
            
            {/* Scenario */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="text-xl mr-2">📋</span> Scenario
              </h4>
              <p className="text-gray-700">{selectedCase.scenario}</p>
            </div>

            {/* Biases */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="text-xl mr-2">🎯</span> Likely Biases
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase.biases.map((bias, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm font-medium">
                    {bias}
                  </span>
                ))}
              </div>
            </div>

            {/* Counter-Moves */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                <span className="text-xl mr-2">💡</span> Suggested Counter-Moves
                <button
                  onClick={() => toggleHints(selectedCase.id)}
                  className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showHints[selectedCase.id] ? 'Hide' : 'Show'} Hints
                </button>
              </h4>
              {showHints[selectedCase.id] && (
                <ul className="mt-2 space-y-1">
                  {selectedCase.counterMoves.map((move, idx) => (
                    <li key={idx} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {move}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Task */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <span className="text-xl mr-2">✍️</span> Your Task
              </h4>
              <p className="text-gray-700 font-medium mb-4">{selectedCase.task}</p>
              {renderTaskInput(selectedCase)}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleComplete(selectedCase.id)}
                disabled={!responses[selectedCase.id]?.trim()}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  responses[selectedCase.id]?.trim()
                    ? completedCases.includes(selectedCase.id)
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {completedCases.includes(selectedCase.id) ? '✓ Completed' : 'Mark Complete'}
              </button>
              
              {completedCases.includes(selectedCase.id) && (
                <button
                  onClick={() => {
                    const caseIndex = cases.findIndex(c => c.id === selectedCase.id)
                    const nextCase = cases[(caseIndex + 1) % cases.length]
                    handleCaseSelect(nextCase)
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Next Case →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Completion Summary */}
      {completedCases.length === cases.length && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-xl border-2 border-green-300">
          <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
            🏆 All Cases Complete!
          </h3>
          <p className="text-gray-700 text-center mb-6">
            You've successfully applied bias-interruption strategies to all three scenarios!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cases.map(c => (
              <div key={c.id} className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">{c.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{responses[c.id]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
