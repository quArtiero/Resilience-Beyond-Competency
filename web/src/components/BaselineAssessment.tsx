import { useState, useEffect } from 'react'
import { CheckCircle2, TrendingUp, Target, Brain, Heart } from 'lucide-react'

interface PillarScores {
  selfAwareness: number[]
  selfRegulation: number[]
  motivation: number[]
  empathy: number[]
  socialSkills: number[]
}

interface AssessmentResults {
  selfAwarenessTotal: number
  selfRegulationTotal: number
  motivationTotal: number
  empathyTotal: number
  socialSkillsTotal: number
  grandTotal: number
  level: 'foundation' | 'developing' | 'strong'
  lowestPillar: string
  highestPillar: string
}

const ASSESSMENT_ITEMS = {
  selfAwareness: [
    "I can name two feelings I'm having in the moment",
    "I notice body signals that precede a blow-up (jaw, chest, breath)",
    "I can identify the trigger behind my reaction",
    "I can separate feelings (data) from orders (impulses)",
    "I can articulate my purpose in one sentence",
    "I recognize repeating emotional patterns across weeks"
  ],
  selfRegulation: [
    "I can down-shift arousal in 90 seconds (breath/grounding)",
    "I use If-Then plans for known triggers",
    "I can reappraise (same facts, new meaning)",
    "I can take a ≤10-minute action instead of ruminating",
    "I can return to baseline after a setback the same day",
    "I choose actions that serve the goal, not the mood"
  ],
  motivation: [
    "I connect tasks to values (why it matters to me/us)",
    "I set approach goals (move toward ___) more than avoidance goals",
    "I structure effort with time-boxes and review points",
    "I continue after small failures without self-attack",
    "I can find a smaller version of progress when time is tight"
  ],
  empathy: [
    "I can reflect another's view so they say 'yes, that's it'",
    "I ask at least one open, forward-moving question",
    "I can hold my view and theirs without collapsing",
    "I can spot needs under the surface (clarity, safety, respect, time)",
    "I use 'AND' boundaries ('I get X, and my constraint is Y...')"
  ],
  socialSkills: [
    "I deliver feedback with SBI (Situation-Behavior-Impact)",
    "I make specific, doable requests with a date",
    "I propose micro-tests (48-hour trial + metric)",
    "I repair after conflict (own impact, restate purpose)",
    "I can say No + Option (boundary + alternative)",
    "I keep tone direct and respectful under time pressure"
  ]
}

export function BaselineAssessment() {
  const [scores, setScores] = useState<PillarScores>(() => {
    const saved = localStorage.getItem('ei-baseline-assessment')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      selfAwareness: new Array(6).fill(3),
      selfRegulation: new Array(6).fill(3),
      motivation: new Array(5).fill(3),
      empathy: new Array(5).fill(3),
      socialSkills: new Array(6).fill(3)
    }
  })
  
  const [results, setResults] = useState<AssessmentResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    localStorage.setItem('ei-baseline-assessment', JSON.stringify(scores))
  }, [scores])

  const updateScore = (pillar: keyof PillarScores, index: number, value: number) => {
    setScores(prev => ({
      ...prev,
      [pillar]: prev[pillar].map((s, i) => i === index ? value : s)
    }))
  }

  const calculateResults = () => {
    const selfAwarenessTotal = scores.selfAwareness.reduce((a, b) => a + b, 0)
    const selfRegulationTotal = scores.selfRegulation.reduce((a, b) => a + b, 0)
    const motivationTotal = scores.motivation.reduce((a, b) => a + b, 0)
    const empathyTotal = scores.empathy.reduce((a, b) => a + b, 0)
    const socialSkillsTotal = scores.socialSkills.reduce((a, b) => a + b, 0)
    const grandTotal = selfAwarenessTotal + selfRegulationTotal + motivationTotal + empathyTotal + socialSkillsTotal

    const pillarTotals = [
      { name: 'Self-Awareness', score: selfAwarenessTotal, max: 30 },
      { name: 'Self-Regulation', score: selfRegulationTotal, max: 30 },
      { name: 'Motivation', score: motivationTotal, max: 25 },
      { name: 'Empathy', score: empathyTotal, max: 25 },
      { name: 'Social Skills', score: socialSkillsTotal, max: 30 }
    ]

    const lowestPillar = pillarTotals.reduce((min, p) => 
      (p.score / p.max) < (min.score / min.max) ? p : min
    ).name

    const highestPillar = pillarTotals.reduce((max, p) => 
      (p.score / p.max) > (max.score / max.max) ? p : max
    ).name

    let level: 'foundation' | 'developing' | 'strong'
    if (grandTotal <= 70) level = 'foundation'
    else if (grandTotal <= 105) level = 'developing'
    else level = 'strong'

    const calculatedResults: AssessmentResults = {
      selfAwarenessTotal,
      selfRegulationTotal,
      motivationTotal,
      empathyTotal,
      socialSkillsTotal,
      grandTotal,
      level,
      lowestPillar,
      highestPillar
    }

    setResults(calculatedResults)
    setShowResults(true)
    localStorage.setItem('ei-baseline-results', JSON.stringify(calculatedResults))
    localStorage.setItem('ei-baseline-date', new Date().toISOString())
  }

  const renderPillar = (
    pillarName: string,
    pillarKey: keyof PillarScores,
    items: string[],
    icon: React.ReactNode,
    colorClasses: {
      text: string
      bgActive: string
      bgHover: string
    }
  ) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className={`flex items-center gap-3 mb-4 ${colorClasses.text}`}>
        {icon}
        <h3 className="text-lg font-semibold">{pillarName}</h3>
        <span className="ml-auto text-sm font-medium">
          Subtotal: {scores[pillarKey].reduce((a, b) => a + b, 0)}/{items.length * 5}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">{index + 1}.</span> {item}
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => updateScore(pillarKey, index, rating)}
                  className={`
                    w-10 h-10 rounded-lg text-sm font-medium transition-all
                    ${scores[pillarKey][index] === rating
                      ? `${colorClasses.bgActive} text-white scale-110`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {rating}
                </button>
              ))}
              <span className="ml-4 text-xs text-gray-500">
                {scores[pillarKey][index] === 1 && 'Rarely/Never'}
                {scores[pillarKey][index] === 2 && 'Sometimes'}
                {scores[pillarKey][index] === 3 && 'Often'}
                {scores[pillarKey][index] === 4 && 'Usually'}
                {scores[pillarKey][index] === 5 && 'Almost Always'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          5-Pillar EI Baseline Assessment
        </h2>
        <p className="text-gray-600">
          Rate each item from 1 (rarely/never) to 5 (almost always). Be honest — this creates your growth map.
        </p>
      </div>

      {!showResults ? (
        <>
          {renderPillar(
            'Self-Awareness',
            'selfAwareness',
            ASSESSMENT_ITEMS.selfAwareness,
            <Brain className="w-5 h-5" />,
            {
              text: 'text-blue-600',
              bgActive: 'bg-blue-600',
              bgHover: 'hover:bg-blue-500'
            }
          )}

          {renderPillar(
            'Self-Regulation',
            'selfRegulation',
            ASSESSMENT_ITEMS.selfRegulation,
            <Target className="w-5 h-5" />,
            {
              text: 'text-green-600',
              bgActive: 'bg-green-600',
              bgHover: 'hover:bg-green-500'
            }
          )}

          {renderPillar(
            'Motivation',
            'motivation',
            ASSESSMENT_ITEMS.motivation,
            <TrendingUp className="w-5 h-5" />,
            {
              text: 'text-yellow-600',
              bgActive: 'bg-yellow-600',
              bgHover: 'hover:bg-yellow-500'
            }
          )}

          {renderPillar(
            'Empathy',
            'empathy',
            ASSESSMENT_ITEMS.empathy,
            <Heart className="w-5 h-5" />,
            {
              text: 'text-rose-600',
              bgActive: 'bg-rose-600',
              bgHover: 'hover:bg-rose-500'
            }
          )}

          {renderPillar(
            'Social Skills',
            'socialSkills',
            ASSESSMENT_ITEMS.socialSkills,
            <CheckCircle2 className="w-5 h-5" />,
            {
              text: 'text-purple-600',
              bgActive: 'bg-purple-600',
              bgHover: 'hover:bg-purple-500'
            }
          )}

          <button
            onClick={calculateResults}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Calculate My Baseline
          </button>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Your EI Baseline Results</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">Self-Awareness</div>
              <div className="text-2xl font-bold text-blue-800">{results!.selfAwarenessTotal}/30</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">Self-Regulation</div>
              <div className="text-2xl font-bold text-green-800">{results!.selfRegulationTotal}/30</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-sm text-yellow-600 font-medium">Motivation</div>
              <div className="text-2xl font-bold text-yellow-800">{results!.motivationTotal}/25</div>
            </div>
            <div className="bg-rose-50 rounded-lg p-4">
              <div className="text-sm text-rose-600 font-medium">Empathy</div>
              <div className="text-2xl font-bold text-rose-800">{results!.empathyTotal}/25</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Social Skills</div>
              <div className="text-2xl font-bold text-purple-800">{results!.socialSkillsTotal}/30</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="text-sm text-indigo-600 font-medium">Total Score</div>
              <div className="text-2xl font-bold text-indigo-800">{results!.grandTotal}/140</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div>
              <span className="text-sm text-gray-600">Level: </span>
              <span className="font-semibold text-lg">
                {results!.level === 'foundation' && '🌱 Foundation Phase'}
                {results!.level === 'developing' && '🌿 Developing'}
                {results!.level === 'strong' && '🌳 Strong'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Lowest Pillar: </span>
              <span className="font-semibold text-red-600">{results!.lowestPillar}</span>
              <span className="text-sm text-gray-500 ml-2">(Focus here first)</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Highest Pillar: </span>
              <span className="font-semibold text-green-600">{results!.highestPillar}</span>
              <span className="text-sm text-gray-500 ml-2">(Your current strength)</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Your Prescription:</h4>
            <p className="text-sm text-gray-700">
              {results!.level === 'foundation' && 
                "Small daily reps will move you fast. Focus on your lowest pillar with 1-2 exercises daily. You'll see noticeable improvement within a week."
              }
              {results!.level === 'developing' && 
                "Target your lowest pillar with 1 drill per day. You have solid foundations — now it's about consistency and handling harder situations."
              }
              {results!.level === 'strong' && 
                "Refine speed, consistency, and teaching others. Your challenge is maintaining excellence under extreme pressure and helping others develop."
              }
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setShowResults(false)}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Review Answers
            </button>
            <button
              onClick={() => {
                const a = document.createElement('a')
                a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(results, null, 2))}`
                a.download = `ei-baseline-${new Date().toISOString().split('T')[0]}.json`
                a.click()
              }}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Export Results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
