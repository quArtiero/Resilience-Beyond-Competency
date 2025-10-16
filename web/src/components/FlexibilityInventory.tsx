import { useState, useEffect } from 'react'

interface PatternData {
  workDeliverable: string[]
  stakeholderResponse: string[]
  conflict: string[]
  teamTense: string[]
  routineBreaks: string[]
  ifThenFails: string[]
  tooFlexibleWork: string
  tooRigidWork: string
  lastEmpathy: string
  rigidRoutine: string
  flexibleRoutine: string
}

interface ExperimentData {
  arena: 'work' | 'relationships' | 'personal' | ''
  situation: string
  outcome: string
  timeBox: string
  goodEnough: string
  option1: string
  option2: string
  option3: string
  choice: string
  firstStep: string
  metric: string
  ifThen1Trigger: string
  ifThen1Action: string
  ifThen2Trigger: string
  ifThen2Action: string
  reviewDate: string
}

interface FlexibilityInventoryProps {
  lessonId: number
  onComplete?: (data: { patterns: PatternData, experiment: ExperimentData }) => void
}

export function FlexibilityInventory({ lessonId, onComplete }: FlexibilityInventoryProps) {
  const localStorageKey = `flexibilityInventory_${lessonId}`
  
  const [patterns, setPatterns] = useState<PatternData>(() => {
    const saved = localStorage.getItem(localStorageKey + '_patterns')
    return saved ? JSON.parse(saved) : {
      workDeliverable: [],
      stakeholderResponse: [],
      conflict: [],
      teamTense: [],
      routineBreaks: [],
      ifThenFails: [],
      tooFlexibleWork: '',
      tooRigidWork: '',
      lastEmpathy: '',
      rigidRoutine: '',
      flexibleRoutine: ''
    }
  })
  
  const [experiment, setExperiment] = useState<ExperimentData>(() => {
    const saved = localStorage.getItem(localStorageKey + '_experiment')
    return saved ? JSON.parse(saved) : {
      arena: '',
      situation: '',
      outcome: '',
      timeBox: '',
      goodEnough: '',
      option1: '',
      option2: '',
      option3: '',
      choice: '',
      firstStep: '',
      metric: '',
      ifThen1Trigger: '',
      ifThen1Action: '',
      ifThen2Trigger: '',
      ifThen2Action: '',
      reviewDate: ''
    }
  })
  
  const [greenZones, setGreenZones] = useState<string[]>(['', '', ''])
  const [redZones, setRedZones] = useState<string[]>(['', '', ''])
  const [insights, setInsights] = useState({
    usedToThink: '',
    nowUnderstand: '',
    mostLikely: '',
    because: '',
    mostResistant: '',
    whichMeans: '',
    commitment: '',
    surprised: '',
    nextAction: '',
    question: ''
  })
  
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const savedGreen = localStorage.getItem(localStorageKey + '_greenZones')
    const savedRed = localStorage.getItem(localStorageKey + '_redZones')
    const savedInsights = localStorage.getItem(localStorageKey + '_insights')
    
    if (savedGreen) setGreenZones(JSON.parse(savedGreen))
    if (savedRed) setRedZones(JSON.parse(savedRed))
    if (savedInsights) setInsights(JSON.parse(savedInsights))
  }, [localStorageKey])

  const handleCheckbox = (category: keyof PatternData, value: string) => {
    setPatterns(prev => {
      const current = prev[category] as string[]
      if (!Array.isArray(current)) return prev
      
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value]
      
      return { ...prev, [category]: updated }
    })
    setIsSaved(false)
  }

  const handleText = (field: keyof PatternData, value: string) => {
    setPatterns(prev => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const handleExperiment = (field: keyof ExperimentData, value: string) => {
    setExperiment(prev => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem(localStorageKey + '_patterns', JSON.stringify(patterns))
    localStorage.setItem(localStorageKey + '_experiment', JSON.stringify(experiment))
    localStorage.setItem(localStorageKey + '_greenZones', JSON.stringify(greenZones))
    localStorage.setItem(localStorageKey + '_redZones', JSON.stringify(redZones))
    localStorage.setItem(localStorageKey + '_insights', JSON.stringify(insights))
    setIsSaved(true)
    
    if (onComplete) {
      onComplete({ patterns, experiment })
    }
  }

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Flexibility Inventory</h3>
        
        {/* Part 1: Pattern Recognition */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-800">Part 1: Pattern Recognition</h4>
          
          {/* Work/School Patterns */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-700 mb-3">Work/School Patterns</h5>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                When a deliverable gets blocked, I typically:
              </p>
              <div className="space-y-2">
                {[
                  'Panic and overwork to compensate',
                  'Wait for the blocker to clear',
                  'Immediately find a workaround',
                  'Ask for deadline extension'
                ].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patterns.workDeliverable.includes(option)}
                      onChange={() => handleCheckbox('workDeliverable', option)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                My default response to stakeholder disagreement:
              </p>
              <div className="space-y-2">
                {[
                  'Try to convince everyone I\'m right',
                  'Withdraw and let others decide',
                  'Propose we test multiple options',
                  'Escalate to higher authority'
                ].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patterns.stakeholderResponse.includes(option)}
                      onChange={() => handleCheckbox('stakeholderResponse', option)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  One place I'm TOO flexible at work:
                </label>
                <input
                  type="text"
                  value={patterns.tooFlexibleWork}
                  onChange={(e) => handleText('tooFlexibleWork', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Deadlines, standards"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  One place I'm TOO rigid at work:
                </label>
                <input
                  type="text"
                  value={patterns.tooRigidWork}
                  onChange={(e) => handleText('tooRigidWork', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Processes, tools"
                />
              </div>
            </div>
          </div>

          {/* Relationship/Team Patterns */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-700 mb-3">Relationship/Team Patterns</h5>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                In conflict, I usually:
              </p>
              <div className="space-y-2">
                {[
                  'Argue my position harder',
                  'Give in to keep peace',
                  'Suggest we both compromise',
                  'Propose an experiment'
                ].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patterns.conflict.includes(option)}
                      onChange={() => handleCheckbox('conflict', option)}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                When team dynamics get tense, I:
              </p>
              <div className="space-y-2">
                {[
                  'Take sides',
                  'Stay quiet',
                  'Try to mediate',
                  'Focus on the task'
                ].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patterns.teamTense.includes(option)}
                      onChange={() => handleCheckbox('teamTense', option)}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                The last time I used "empathy + purpose" in a disagreement was:
              </label>
              <input
                type="text"
                value={patterns.lastEmpathy}
                onChange={(e) => handleText('lastEmpathy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Last week with my manager, Never tried it"
              />
            </div>
          </div>

          {/* Personal System Patterns */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-700 mb-3">Personal System Patterns</h5>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                When my routine breaks, I:
              </p>
              <div className="space-y-2">
                {[
                  'Give up for the day',
                  'Force myself through anyway',
                  'Adapt with a smaller version',
                  'Make a new plan'
                ].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patterns.routineBreaks.includes(option)}
                      onChange={() => handleCheckbox('routineBreaks', option)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                My If-Then plans usually fail because:
              </p>
              <div className="space-y-2">
                {[
                  'Too ambitious',
                  'Too vague',
                  'Not written down',
                  'No accountability'
                ].map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patterns.ifThenFails.includes(option)}
                      onChange={() => handleCheckbox('ifThenFails', option)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  One routine I protect too rigidly:
                </label>
                <input
                  type="text"
                  value={patterns.rigidRoutine}
                  onChange={(e) => handleText('rigidRoutine', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Morning coffee ritual"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  One routine that needs more flexibility:
                </label>
                <input
                  type="text"
                  value={patterns.flexibleRoutine}
                  onChange={(e) => handleText('flexibleRoutine', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Exercise schedule"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Your Flexibility Edges */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-6">Part 2: Your Flexibility Edges</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-green-700 mb-3">🟢 Green Zones (Where You Flex Well)</h5>
            <p className="text-sm text-gray-600 mb-3">
              List 2-3 situations where you naturally adapt:
            </p>
            {greenZones.map((zone, idx) => (
              <div key={idx} className="mb-2">
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => {
                    const updated = [...greenZones]
                    updated[idx] = e.target.value
                    setGreenZones(updated)
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder={`Situation ${idx + 1}`}
                />
              </div>
            ))}
            <p className="text-sm text-gray-600 mt-3">
              What makes flexibility easier here?
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-red-700 mb-3">🔴 Red Zones (Where You Get Rigid)</h5>
            <p className="text-sm text-gray-600 mb-3">
              List 2-3 situations where you freeze or force:
            </p>
            {redZones.map((zone, idx) => (
              <div key={idx} className="mb-2">
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => {
                    const updated = [...redZones]
                    updated[idx] = e.target.value
                    setRedZones(updated)
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder={`Situation ${idx + 1}`}
                />
              </div>
            ))}
            <p className="text-sm text-gray-600 mt-3">
              What makes flexibility harder here?
            </p>
          </div>
        </div>
      </div>

      {/* Part 3: The Integration Challenge */}
      <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-6">Part 3: Design Your 72-Hour Experiment</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arena I'm targeting:
            </label>
            <div className="flex gap-3">
              {['work', 'relationships', 'personal'].map(arena => (
                <button
                  key={arena}
                  onClick={() => handleExperiment('arena', arena)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all ${
                    experiment.arena === arena 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-white border border-orange-300 text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  {arena}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific situation I'll address:
            </label>
            <input
              type="text"
              value={experiment.situation}
              onChange={(e) => handleExperiment('situation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Daily standup running too long"
            />
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-700 mb-3">My Purpose Grid:</h5>
            
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Outcome needed:
                </label>
                <input
                  type="text"
                  value={experiment.outcome}
                  onChange={(e) => handleExperiment('outcome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="What must happen?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Time box:
                </label>
                <input
                  type="text"
                  value={experiment.timeBox}
                  onChange={(e) => handleExperiment('timeBox', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., 48 hours"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Good enough if:
              </label>
              <input
                type="text"
                value={experiment.goodEnough}
                onChange={(e) => handleExperiment('goodEnough', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Meeting stays under 15 minutes"
              />
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Three options:
              </label>
              <input
                type="text"
                value={experiment.option1}
                onChange={(e) => handleExperiment('option1', e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="1) Quick & dirty solution"
              />
              <input
                type="text"
                value={experiment.option2}
                onChange={(e) => handleExperiment('option2', e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="2) Middle ground"
              />
              <input
                type="text"
                value={experiment.option3}
                onChange={(e) => handleExperiment('option3', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="3) Best with constraints"
              />
            </div>

            <div className="mt-3 grid md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  I choose:
                </label>
                <input
                  type="text"
                  value={experiment.choice}
                  onChange={(e) => handleExperiment('choice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Option #"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First step:
                </label>
                <input
                  type="text"
                  value={experiment.firstStep}
                  onChange={(e) => handleExperiment('firstStep', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Calendar it"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Success metric:
                </label>
                <input
                  type="text"
                  value={experiment.metric}
                  onChange={(e) => handleExperiment('metric', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Y/N, %"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                If obstacles arise, my If-Then plans:
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={experiment.ifThen1Trigger}
                    onChange={(e) => handleExperiment('ifThen1Trigger', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="If..."
                  />
                  <input
                    type="text"
                    value={experiment.ifThen1Action}
                    onChange={(e) => handleExperiment('ifThen1Action', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Then I'll..."
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={experiment.ifThen2Trigger}
                    onChange={(e) => handleExperiment('ifThen2Trigger', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="If..."
                  />
                  <input
                    type="text"
                    value={experiment.ifThen2Action}
                    onChange={(e) => handleExperiment('ifThen2Action', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Then I'll..."
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                I'll review results on:
              </label>
              <input
                type="text"
                value={experiment.reviewDate}
                onChange={(e) => handleExperiment('reviewDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Date/time"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Part 4: The Meta-Skill */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-6">Part 4: The Meta-Skill</h4>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-purple-700 mb-3">The Flexibility Paradox Resolution</h5>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  I used to think flexibility meant:
                </label>
                <input
                  type="text"
                  value={insights.usedToThink}
                  onChange={(e) => {
                    setInsights(prev => ({ ...prev, usedToThink: e.target.value }))
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Having no plan, being wishy-washy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Now I understand flexibility means:
                </label>
                <input
                  type="text"
                  value={insights.nowUnderstand}
                  onChange={(e) => {
                    setInsights(prev => ({ ...prev, nowUnderstand: e.target.value }))
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Having multiple structures ready"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  The tool from this lesson I'm most likely to use:
                </label>
                <input
                  type="text"
                  value={insights.mostLikely}
                  onChange={(e) => {
                    setInsights(prev => ({ ...prev, mostLikely: e.target.value }))
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Purpose Grid"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Because it helps me:
                </label>
                <input
                  type="text"
                  value={insights.because}
                  onChange={(e) => {
                    setInsights(prev => ({ ...prev, because: e.target.value }))
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Make faster decisions"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  The tool I'm most resistant to:
                </label>
                <input
                  type="text"
                  value={insights.mostResistant}
                  onChange={(e) => {
                    setInsights(prev => ({ ...prev, mostResistant: e.target.value }))
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., EAR Script"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Which probably means:
                </label>
                <input
                  type="text"
                  value={insights.whichMeans}
                  onChange={(e) => {
                    setInsights(prev => ({ ...prev, whichMeans: e.target.value }))
                    setIsSaved(false)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., I need it most"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Flexibility Commitment (keep visible this week):
            </label>
            <textarea
              value={insights.commitment}
              onChange={(e) => {
                setInsights(prev => ({ ...prev, commitment: e.target.value }))
                setIsSaved(false)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="When ___ breaks, I will ___ instead of ___."
            />
          </div>
        </div>
      </div>

      {/* Final Reflection */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Final Reflection</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              One insight from this lesson that surprised you:
            </label>
            <input
              type="text"
              value={insights.surprised}
              onChange={(e) => {
                setInsights(prev => ({ ...prev, surprised: e.target.value }))
                setIsSaved(false)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              One action you'll take in the next 24 hours:
            </label>
            <input
              type="text"
              value={insights.nextAction}
              onChange={(e) => {
                setInsights(prev => ({ ...prev, nextAction: e.target.value }))
                setIsSaved(false)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              One question you still have:
            </label>
            <input
              type="text"
              value={insights.question}
              onChange={(e) => {
                setInsights(prev => ({ ...prev, question: e.target.value }))
                setIsSaved(false)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg text-lg font-semibold"
        >
          {isSaved ? '✅ Saved!' : 'Save All Responses'}
        </button>
        
        {isSaved && (
          <p className="mt-3 text-sm text-green-600">
            Your flexibility inventory is saved locally
          </p>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-center">
        <p className="text-yellow-800 font-medium">
          💡 Remember: Flexibility isn't about having no structure—it's about having multiple structures ready to deploy.
        </p>
      </div>
    </div>
  )
}
