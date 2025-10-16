import { useState, useEffect } from 'react'

interface SprintData {
  challengeOption: 'A' | 'B' | 'C' | ''
  specificGoal: string
  
  // Day 1
  day1PurposeGrid: boolean
  day1TimeToDecision: string
  day1OptionsGenerated: string
  day1OptionChosen: string
  day1ObstaclesHit: string
  day1IfThenUsed: string
  
  // Day 2
  day2StrategyDeployed: boolean
  day2Adjustments: string
  day2StressLevel: number
  day2TimeSaved: string
  day2UnexpectedOutcome: string
  
  // Day 3
  day3MetricResult: string
  day3ComparedToBaseline: string
  day3WillContinue: boolean
  day3NextExperiment: string
  
  // Debrief
  debrief: {
    surprised: string
    naturalTool: string
    uncomfortable: string
    differently: string
    nextWeek: string
  }
}

interface FlexibilitySprintProps {
  lessonId: number
  onComplete?: (data: SprintData) => void
}

export function FlexibilitySprint({ lessonId, onComplete }: FlexibilitySprintProps) {
  const localStorageKey = `flexibilitySprint_${lessonId}`
  
  const [sprintData, setSprintData] = useState<SprintData>(() => {
    const saved = localStorage.getItem(localStorageKey)
    return saved ? JSON.parse(saved) : {
      challengeOption: '',
      specificGoal: '',
      day1PurposeGrid: false,
      day1TimeToDecision: '',
      day1OptionsGenerated: '',
      day1OptionChosen: '',
      day1ObstaclesHit: '',
      day1IfThenUsed: '',
      day2StrategyDeployed: false,
      day2Adjustments: '',
      day2StressLevel: 5,
      day2TimeSaved: '',
      day2UnexpectedOutcome: '',
      day3MetricResult: '',
      day3ComparedToBaseline: '',
      day3WillContinue: false,
      day3NextExperiment: '',
      debrief: {
        surprised: '',
        naturalTool: '',
        uncomfortable: '',
        differently: '',
        nextWeek: ''
      }
    }
  })
  
  const [currentDay, setCurrentDay] = useState<1 | 2 | 3 | 'complete'>(1)
  const [commitment, setCommitment] = useState({
    challenge: '',
    startDate: '',
    reportDate: '',
    partner: '',
    signed: false
  })
  
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const savedCommitment = localStorage.getItem(localStorageKey + '_commitment')
    if (savedCommitment) {
      setCommitment(JSON.parse(savedCommitment))
    }
  }, [localStorageKey])

  const challenges = {
    A: {
      title: 'The Work/School Blitz',
      scenario: 'Choose your most stressful deliverable this week',
      metrics: [
        'Decision made in <4 hours',
        'First version shipped in <24 hours',
        'Stakeholder satisfaction ≥7/10'
      ],
      tasks: [
        'Run the full 15-minute Decision Triage',
        'Create 3 options using Constraint Box (€0, <2h, no new tools)',
        'Ship version 1 within 24 hours',
        'Iterate based on feedback',
        'Document time saved vs. traditional approach'
      ]
    },
    B: {
      title: 'The Relationship Reset',
      scenario: 'Choose one tense relationship (work, personal, or family)',
      metrics: [
        'Conversation happens (binary)',
        'Experiment agreed upon (binary)',
        'Tension level decreased (1-10 scale)'
      ],
      tasks: [
        'Write out the EAR script for your situation',
        'Have the conversation within 48 hours',
        'Propose a 48-hour experiment with clear metrics',
        'Follow through on the experiment',
        'Schedule the review conversation'
      ]
    },
    C: {
      title: 'The Personal System Upgrade',
      scenario: 'Choose your most broken personal routine',
      metrics: [
        '5/7 days with some version completed',
        'Average completion time documented',
        'Stress level when routine breaks (1-10)'
      ],
      tasks: [
        'Write 5 If-Then plans for common obstacles',
        'Test at least 3 of them this week',
        'Track adherence with simple checklist',
        'Iterate the plans based on what works',
        'Create a "minimum viable routine" version'
      ]
    }
  }

  const handleChange = (field: keyof SprintData | string, value: any) => {
    if (field.startsWith('debrief.')) {
      const debriefField = field.replace('debrief.', '')
      setSprintData(prev => ({
        ...prev,
        debrief: { ...prev.debrief, [debriefField]: value }
      }))
    } else {
      setSprintData(prev => ({ ...prev, [field]: value }))
    }
    setIsSaved(false)
  }

  const handleCommitment = (field: keyof typeof commitment, value: any) => {
    setCommitment(prev => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(sprintData))
    localStorage.setItem(localStorageKey + '_commitment', JSON.stringify(commitment))
    setIsSaved(true)
    if (onComplete) {
      onComplete(sprintData)
    }
  }

  const exportReport = () => {
    const challenge = challenges[sprintData.challengeOption as keyof typeof challenges]
    const report = `72-HOUR FLEXIBILITY SPRINT REPORT
═══════════════════════════════════
Challenge: ${challenge?.title || 'Not selected'}
Specific Goal: ${sprintData.specificGoal}
Started: ${commitment.startDate}
Partner: ${commitment.partner}

DAY 1 RESULTS
─────────────
✓ Purpose Grid Completed: ${sprintData.day1PurposeGrid ? 'Yes' : 'No'}
Time to Decision: ${sprintData.day1TimeToDecision} hours
Options Generated: ${sprintData.day1OptionsGenerated}
Option Chosen: ${sprintData.day1OptionChosen}
Obstacles Hit: ${sprintData.day1ObstaclesHit}
If-Then Used: ${sprintData.day1IfThenUsed}

DAY 2 RESULTS
─────────────
✓ Strategy Deployed: ${sprintData.day2StrategyDeployed ? 'Yes' : 'No'}
Adjustments Made: ${sprintData.day2Adjustments}
Stress Level: ${sprintData.day2StressLevel}/10
Time Saved/Spent: ${sprintData.day2TimeSaved}
Unexpected Outcome: ${sprintData.day2UnexpectedOutcome}

DAY 3 RESULTS
─────────────
Success Metric Result: ${sprintData.day3MetricResult}
Compared to Baseline: ${sprintData.day3ComparedToBaseline}
Will Continue: ${sprintData.day3WillContinue ? 'Yes' : 'No'}
Next Experiment: ${sprintData.day3NextExperiment}

DEBRIEF
───────
What surprised me: ${sprintData.debrief.surprised}
Most natural tool: ${sprintData.debrief.naturalTool}
Where uncomfortable: ${sprintData.debrief.uncomfortable}
Do differently: ${sprintData.debrief.differently}
Test next week: ${sprintData.debrief.nextWeek}
`
    
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flexibility-sprint-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getProgress = () => {
    let total = 14 // Total trackable items
    let completed = 0
    
    if (sprintData.challengeOption) completed++
    if (sprintData.specificGoal) completed++
    if (sprintData.day1PurposeGrid) completed++
    if (sprintData.day1TimeToDecision) completed++
    if (sprintData.day1OptionsGenerated) completed++
    if (sprintData.day1OptionChosen) completed++
    if (sprintData.day2StrategyDeployed) completed++
    if (sprintData.day2Adjustments) completed++
    if (sprintData.day2TimeSaved) completed++
    if (sprintData.day3MetricResult) completed++
    if (sprintData.day3WillContinue !== undefined) completed++
    if (sprintData.debrief.surprised) completed++
    if (sprintData.debrief.naturalTool) completed++
    if (commitment.signed) completed++
    
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Header and Mission */}
      <div className="p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl shadow-lg">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">🚀 The 72-Hour Flexibility Sprint</h3>
        <p className="text-lg text-gray-700 mb-4">
          Your Mission: Run a real-world flexibility experiment using the tools from this lesson.
        </p>
        
        {/* Progress Bar */}
        <div className="bg-white/80 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Sprint Progress</span>
            <span className="text-sm font-bold text-orange-600">{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Challenge Selection */}
      <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-orange-200">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Choose Your Challenge</h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(challenges).map(([key, challenge]) => (
            <button
              key={key}
              onClick={() => handleChange('challengeOption', key)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                sprintData.challengeOption === key
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`text-2xl font-bold ${
                  sprintData.challengeOption === key ? 'text-orange-600' : 'text-gray-400'
                }`}>
                  {key}
                </span>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-1">{challenge.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">{challenge.scenario}</p>
                  <div className="space-y-1">
                    {challenge.metrics.slice(0, 2).map((metric, idx) => (
                      <p key={idx} className="text-xs text-gray-500">• {metric}</p>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {sprintData.challengeOption && (
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Specific Goal:
            </label>
            <input
              type="text"
              value={sprintData.specificGoal}
              onChange={(e) => handleChange('specificGoal', e.target.value)}
              className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Be specific about what you'll tackle..."
            />
          </div>
        )}
      </div>

      {/* Sprint Protocol Tabs */}
      {sprintData.challengeOption && (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">The Sprint Protocol</h4>
          
          {/* Day Selector */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map(day => (
              <button
                key={day}
                onClick={() => setCurrentDay(day as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentDay === day
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Day {day}
              </button>
            ))}
            <button
              onClick={() => setCurrentDay('complete')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentDay === 'complete'
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Review & Report
            </button>
          </div>

          {/* Day 1 Content */}
          {currentDay === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-3">📅 Day 1: Setup (20 minutes)</h5>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sprintData.day1PurposeGrid}
                      onChange={(e) => handleChange('day1PurposeGrid', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Complete the Purpose Grid</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time to decision (hours):
                    </label>
                    <input
                      type="text"
                      value={sprintData.day1TimeToDecision}
                      onChange={(e) => handleChange('day1TimeToDecision', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2.5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Options generated:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day1OptionsGenerated}
                      onChange={(e) => handleChange('day1OptionsGenerated', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option chosen:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day1OptionChosen}
                      onChange={(e) => handleChange('day1OptionChosen', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your choice"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Obstacles hit:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day1ObstaclesHit}
                      onChange={(e) => handleChange('day1ObstaclesHit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="What got in the way?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      If-Then used:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day1IfThenUsed}
                      onChange={(e) => handleChange('day1IfThenUsed', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Which backup plan activated?"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Remember: Set up simple tracking (notes app is fine) and share commitment with accountability partner
                </p>
              </div>
            </div>
          )}

          {/* Day 2 Content */}
          {currentDay === 2 && (
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 mb-3">🎯 Day 2: Execute (Active work)</h5>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sprintData.day2StrategyDeployed}
                      onChange={(e) => handleChange('day2StrategyDeployed', e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">Primary strategy deployed</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adjustments made:
                    </label>
                    <textarea
                      value={sprintData.day2Adjustments}
                      onChange={(e) => handleChange('day2Adjustments', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      placeholder="What did you change on the fly?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stress level (1-10):
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={sprintData.day2StressLevel}
                        onChange={(e) => handleChange('day2StressLevel', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-bold text-purple-600 text-xl w-8 text-center">
                        {sprintData.day2StressLevel}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time saved/spent:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day2TimeSaved}
                      onChange={(e) => handleChange('day2TimeSaved', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Saved 2 hours"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unexpected outcome:
                    </label>
                    <textarea
                      value={sprintData.day2UnexpectedOutcome}
                      onChange={(e) => handleChange('day2UnexpectedOutcome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={2}
                      placeholder="What surprised you?"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 Tip: When obstacles hit, use If-Then plans. Document in real-time. Check in with accountability partner.
                </p>
              </div>
            </div>
          )}

          {/* Day 3 Content */}
          {currentDay === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-3">📊 Day 3: Review & Report (30 minutes)</h5>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Success metric result:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day3MetricResult}
                      onChange={(e) => handleChange('day3MetricResult', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Decision made in 3.5 hours"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compared to baseline:
                    </label>
                    <input
                      type="text"
                      value={sprintData.day3ComparedToBaseline}
                      onChange={(e) => handleChange('day3ComparedToBaseline', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 50% faster than usual"
                    />
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sprintData.day3WillContinue}
                      onChange={(e) => handleChange('day3WillContinue', e.target.checked)}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">Will continue this approach</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Next experiment:
                    </label>
                    <textarea
                      value={sprintData.day3NextExperiment}
                      onChange={(e) => handleChange('day3NextExperiment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      rows={2}
                      placeholder="What will you test next?"
                    />
                  </div>
                </div>
              </div>

              {/* 3-Bullet Debrief */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h6 className="font-semibold text-gray-800 mb-3">📝 3-Bullet Debrief:</h6>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">What worked better than expected?</span>
                      {sprintData.day3MetricResult && (
                        <p className="text-sm text-gray-600 mt-1">{sprintData.day3MetricResult}</p>
                      )}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">What failed and why?</span>
                      {sprintData.day2UnexpectedOutcome && (
                        <p className="text-sm text-gray-600 mt-1">{sprintData.day2UnexpectedOutcome}</p>
                      )}
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">What will you keep doing?</span>
                      {sprintData.day3NextExperiment && (
                        <p className="text-sm text-gray-600 mt-1">{sprintData.day3NextExperiment}</p>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Complete/Debrief Content */}
          {currentDay === 'complete' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-3">🎯 The Debrief Questions</h5>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What surprised you most?
                    </label>
                    <textarea
                      value={sprintData.debrief.surprised}
                      onChange={(e) => handleChange('debrief.surprised', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Which tool became most natural?
                    </label>
                    <input
                      type="text"
                      value={sprintData.debrief.naturalTool}
                      onChange={(e) => handleChange('debrief.naturalTool', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Purpose Grid, EAR Script"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Where did flexibility feel uncomfortable?
                    </label>
                    <textarea
                      value={sprintData.debrief.uncomfortable}
                      onChange={(e) => handleChange('debrief.uncomfortable', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What would you do differently?
                    </label>
                    <textarea
                      value={sprintData.debrief.differently}
                      onChange={(e) => handleChange('debrief.differently', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What will you test next week?
                    </label>
                    <input
                      type="text"
                      value={sprintData.debrief.nextWeek}
                      onChange={(e) => handleChange('debrief.nextWeek', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Your next experiment"
                    />
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              {getProgress() > 70 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 text-center">
                  <h5 className="text-2xl font-bold text-orange-800 mb-3">
                    🏆 Sprint Complete!
                  </h5>
                  <p className="text-orange-700 mb-4">
                    You've completed {getProgress()}% of the sprint protocol.
                  </p>
                  <button
                    onClick={exportReport}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                  >
                    Export Sprint Report
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bonus Challenges */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">🏅 Bonus Challenges</h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-bold text-purple-700 mb-2">🏆 The Triple Crown</h5>
            <p className="text-sm text-gray-600 mb-2">
              Complete all three challenge options in one week
            </p>
            <p className="text-xs text-purple-600">
              Bonus: Document how skills transfer between arenas
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-bold text-blue-700 mb-2">🚀 The Speed Run</h5>
            <p className="text-sm text-gray-600 mb-2">
              Complete Decision Triage in &lt;10 minutes with success
            </p>
            <p className="text-xs text-blue-600">
              Bonus: Teach someone else the protocol
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-bold text-green-700 mb-2">🎯 The Precision Strike</h5>
            <p className="text-sm text-gray-600 mb-2">
              Achieve 100% on your success metrics
            </p>
            <p className="text-xs text-green-600">
              Bonus: Replicate the success next week
            </p>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-indigo-300">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">✍️ Your Commitment</h4>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenge Choice:
              </label>
              <select
                value={commitment.challenge}
                onChange={(e) => handleCommitment('challenge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select...</option>
                <option value="A">A - Work/School Blitz</option>
                <option value="B">B - Relationship Reset</option>
                <option value="C">C - Personal System</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting:
              </label>
              <input
                type="date"
                value={commitment.startDate}
                onChange={(e) => handleCommitment('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report by:
              </label>
              <input
                type="date"
                value={commitment.reportDate}
                onChange={(e) => handleCommitment('reportDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accountability Partner:
            </label>
            <input
              type="text"
              value={commitment.partner}
              onChange={(e) => handleCommitment('partner', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Name or email"
            />
          </div>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={commitment.signed}
              onChange={(e) => handleCommitment('signed', e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-700 font-medium">
              I commit to completing the {commitment.challenge || '___'} Challenge, 
              starting {commitment.startDate || '___'}, and reporting results by {commitment.reportDate || '___'}.
            </span>
          </label>
        </div>
        
        {commitment.signed && (
          <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-center">
            <p className="text-green-800 font-medium">
              ✅ Commitment signed! Your 72 hours start now. Let's see what you can do when you stop forcing and start flexing!
            </p>
          </div>
        )}
      </div>

      {/* Save & Export */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-semibold"
        >
          {isSaved ? '✅ Saved!' : 'Save Sprint Data'}
        </button>
        
        {getProgress() > 30 && (
          <button
            onClick={exportReport}
            className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all font-semibold"
          >
            Export Report
          </button>
        )}
      </div>
      
      {isSaved && (
        <p className="text-center text-sm text-green-600 mt-3">
          Your sprint data is saved locally
        </p>
      )}

      {/* Final Reminder */}
      <div className="p-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl text-center">
        <p className="text-yellow-900 font-bold text-lg mb-2">
          Remember: Failed experiments teach as much as successful ones.
        </p>
        <p className="text-yellow-800">
          The only true failure? Not running the experiment at all.
        </p>
      </div>
    </div>
  )
}
