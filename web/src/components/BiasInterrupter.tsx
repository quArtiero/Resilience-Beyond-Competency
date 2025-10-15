import { useState } from 'react'

interface Bias {
  name: string
  description: string
  counterStrategy: string
  pillar: string
}

const biasData: Bias[] = [
  {
    name: "Acute stress / overload",
    description: "Tunnels attention",
    counterStrategy: "90-second reset (box/5-5 breathing), name the threat, then name the purpose",
    pillar: "Frame Awareness"
  },
  {
    name: "Ego defensiveness",
    description: "Blocks new info",
    counterStrategy: "Steelman the opposing view in 2 sentences",
    pillar: "Perspective-Taking"
  },
  {
    name: "Confirmation bias",
    description: "Cherry-picks data",
    counterStrategy: "Consider-the-opposite: list 2 facts that would make you wrong",
    pillar: "Frame Awareness"
  },
  {
    name: "Anchoring",
    description: "Fixates on first value",
    counterStrategy: "Re-anchor with 2 independent references",
    pillar: "Option Laddering"
  },
  {
    name: "Sunk cost",
    description: "Glues you to past effort",
    counterStrategy: "Pre-commit rule: 'Only future costs/benefits count'",
    pillar: "Set-Shifting"
  },
  {
    name: "Status quo bias",
    description: "Freezes change",
    counterStrategy: "Default swap: force a temporary new default for 48h",
    pillar: "Set-Shifting"
  },
  {
    name: "Loss aversion",
    description: "Over-weights small losses",
    counterStrategy: "Two-sided tally: write explicit 'cost of not switching'",
    pillar: "Option Laddering"
  },
  {
    name: "Groupthink",
    description: "Silences dissent",
    counterStrategy: "Red team 10-minute critique; anonymous first pass",
    pillar: "Perspective-Taking"
  },
  {
    name: "Expertise trap",
    description: "Overfits method",
    counterStrategy: "Beginner lens: explain to a novice; ask for 1 non-domain idea",
    pillar: "Perspective-Taking"
  },
  {
    name: "Time pressure",
    description: "Rushes first plan",
    counterStrategy: "Decision triage: 'Decide now vs. defer' gate + minimum viable test",
    pillar: "Sequencing"
  }
]

export function BiasInterrupter() {
  const [selectedBias, setSelectedBias] = useState<Bias | null>(null)
  const [appliedStrategies, setAppliedStrategies] = useState<string[]>([])
  const [showQuickReference, setShowQuickReference] = useState(false)

  const handleBiasSelect = (bias: Bias) => {
    setSelectedBias(bias)
  }

  const handleApplyStrategy = () => {
    if (selectedBias && !appliedStrategies.includes(selectedBias.name)) {
      setAppliedStrategies([...appliedStrategies, selectedBias.name])
    }
  }

  const getPillarColor = (pillar: string) => {
    const colors: Record<string, string> = {
      "Frame Awareness": "bg-blue-100 text-blue-800 border-blue-300",
      "Set-Shifting": "bg-green-100 text-green-800 border-green-300",
      "Perspective-Taking": "bg-purple-100 text-purple-800 border-purple-300",
      "Option Laddering": "bg-orange-100 text-orange-800 border-orange-300",
      "Sequencing": "bg-pink-100 text-pink-800 border-pink-300"
    }
    return colors[pillar] || "bg-gray-100 text-gray-800 border-gray-300"
  }

  return (
    <div className="space-y-6">
      {/* Interactive Bias Selector */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🎯 Identify Your Active Bias
        </h3>
        <p className="text-gray-600 mb-4">
          Click on the bias that best describes what you're experiencing right now:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {biasData.map((bias) => (
            <button
              key={bias.name}
              onClick={() => handleBiasSelect(bias)}
              className={`text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedBias?.name === bias.name
                  ? 'border-red-500 bg-red-50 shadow-md transform scale-105'
                  : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/50'
              } ${appliedStrategies.includes(bias.name) ? 'opacity-60' : ''}`}
            >
              <div className="font-semibold text-gray-800">{bias.name}</div>
              <div className="text-sm text-gray-600">{bias.description}</div>
              {appliedStrategies.includes(bias.name) && (
                <div className="text-xs text-green-600 mt-1">✓ Strategy applied</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Counter-Strategy Display */}
      {selectedBias && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-lg animate-fadeIn">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            💡 Your Counter-Strategy
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-lg text-gray-800">{selectedBias.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPillarColor(selectedBias.pillar)}`}>
                  {selectedBias.pillar}
                </span>
              </div>
              <p className="text-gray-600 mb-3">{selectedBias.description}</p>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="font-semibold text-green-800 mb-2">Counter-Strategy:</p>
                <p className="text-green-700">{selectedBias.counterStrategy}</p>
              </div>
            </div>

            <button
              onClick={handleApplyStrategy}
              disabled={appliedStrategies.includes(selectedBias.name)}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                appliedStrategies.includes(selectedBias.name)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {appliedStrategies.includes(selectedBias.name) 
                ? '✓ Strategy Applied' 
                : 'Apply This Strategy Now'}
            </button>
          </div>
        </div>
      )}

      {/* Quick Reference Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
        <button
          onClick={() => setShowQuickReference(!showQuickReference)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-xl font-bold text-gray-800">
            📋 Quick Reference Card
          </h3>
          <span className="text-2xl text-gray-600">
            {showQuickReference ? '−' : '+'}
          </span>
        </button>
        
        {showQuickReference && (
          <div className="mt-4 space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-2">Barrier</th>
                    <th className="text-left py-2 px-2">Counter-Strategy</th>
                    <th className="text-left py-2 px-2">Pillar</th>
                  </tr>
                </thead>
                <tbody>
                  {biasData.map((bias, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-2 font-medium">{bias.name}</td>
                      <td className="py-2 px-2 text-gray-600">{bias.counterStrategy}</td>
                      <td className="py-2 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${getPillarColor(bias.pillar)}`}>
                          {bias.pillar}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Progress Tracker */}
      {appliedStrategies.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            🏆 Your Progress
          </h3>
          <div className="flex items-center mb-3">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(appliedStrategies.length / biasData.length) * 100}%` }}
              />
            </div>
            <span className="ml-3 font-semibold text-gray-700">
              {appliedStrategies.length}/{biasData.length}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            You've practiced {appliedStrategies.length} counter-strategies. Keep going!
          </p>
        </div>
      )}
    </div>
  )
}
