import { useState } from 'react'

interface EARScriptData {
  situation: string
  theirConcern: string
  empathy: string
  acknowledge: string
  sharedGoal: string
  testProposal: string
  option1: string
  option2: string
  option3: string
  guardrailMetric: string
  guardrailThreshold: string
  guardrailDate: string
  alternativePlan: string
}

interface EARScriptBuilderProps {
  lessonId: number
  onComplete?: (script: string) => void
}

export function EARScriptBuilder({ lessonId, onComplete }: EARScriptBuilderProps) {
  const localStorageKey = `earScript_${lessonId}`
  
  const [scriptData, setScriptData] = useState<EARScriptData>(() => {
    const saved = localStorage.getItem(localStorageKey)
    return saved ? JSON.parse(saved) : {
      situation: '',
      theirConcern: '',
      empathy: '',
      acknowledge: '',
      sharedGoal: '',
      testProposal: '',
      option1: '',
      option2: '',
      option3: '',
      guardrailMetric: '',
      guardrailThreshold: '',
      guardrailDate: '',
      alternativePlan: ''
    }
  })
  
  const [showScript, setShowScript] = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const handleChange = (field: keyof EARScriptData, value: string) => {
    setScriptData(prev => ({ ...prev, [field]: value }))
  }

  const generateScript = () => {
    const script = `
${scriptData.empathy || `I can see why ${scriptData.theirConcern} matters to you.`}

${scriptData.acknowledge || `Here's what I might be missing: [specific concern or context].`}

${scriptData.sharedGoal ? `If our purpose is ${scriptData.sharedGoal}` : 'If our purpose is [shared goal]'}, could we try ${scriptData.testProposal || '[specific test]'} for 48 hours and review on ${scriptData.guardrailDate || '[date]'}?

What if we tested a few options:
${scriptData.option1 ? `• ${scriptData.option1}` : '• Option A'}
${scriptData.option2 ? `• ${scriptData.option2}` : '• Option B'}
${scriptData.option3 ? `• ${scriptData.option3}` : '• Option C'}

To make sure this works for both of us, let's agree: if ${scriptData.guardrailMetric || '[metric]'} ${scriptData.guardrailThreshold ? `< ${scriptData.guardrailThreshold}` : '< [threshold]'} by ${scriptData.guardrailDate || '[date]'}, we'll ${scriptData.alternativePlan || 'switch to option B'}.

What do you think? What would make this test more valuable for you?`
    
    return script.trim()
  }

  const handleGenerateScript = () => {
    const script = generateScript()
    setShowScript(true)
    localStorage.setItem(localStorageKey, JSON.stringify(scriptData))
    if (onComplete) {
      onComplete(script)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateScript())
    setCopiedToClipboard(true)
    setTimeout(() => setCopiedToClipboard(false), 2000)
  }

  const scenarios = [
    { 
      name: 'Product vs Marketing', 
      concern: 'brand consistency',
      goal: 'evidence of traction',
      test: 'A/B test three variants'
    },
    { 
      name: 'Study Group Conflict', 
      concern: 'structured notes help you learn',
      goal: 'high recall on the exam',
      test: 'mixed study methods'
    },
    { 
      name: 'Team Deadline', 
      concern: 'quality standards',
      goal: 'ship on time with acceptable quality',
      test: 'MVP version with core features'
    }
  ]

  const loadScenario = (scenario: typeof scenarios[0]) => {
    setScriptData(prev => ({
      ...prev,
      theirConcern: scenario.concern,
      sharedGoal: scenario.goal,
      testProposal: scenario.test
    }))
  }

  return (
    <div className="p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🤝 EAR Script Builder</h3>
        <p className="text-gray-600">Transform conflict into collaboration</p>
        
        <div className="mt-4 p-3 bg-white/80 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            <strong>E</strong>mpathy • <strong>A</strong>cknowledge • <strong>R</strong>eframe to purpose
          </p>
        </div>
      </div>

      {/* Example Scenarios */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Quick Examples:</p>
        <div className="flex gap-2 flex-wrap">
          {scenarios.map((scenario, idx) => (
            <button
              key={idx}
              onClick={() => loadScenario(scenario)}
              className="px-3 py-1 text-sm bg-white border border-cyan-300 rounded-full hover:bg-cyan-50 transition-colors"
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Context Setup */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-teal-200">
          <h4 className="font-semibold text-teal-900 mb-3">📋 Context</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Briefly describe the conflict situation:
              </label>
              <textarea
                value={scriptData.situation}
                onChange={(e) => handleChange('situation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                rows={2}
                placeholder="e.g., Team wants to delay launch for perfection, I think we need to ship MVP"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's their main concern? (Be specific)
              </label>
              <input
                type="text"
                value={scriptData.theirConcern}
                onChange={(e) => handleChange('theirConcern', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., quality standards, brand consistency, technical debt"
              />
            </div>
          </div>
        </div>

        {/* Empathy & Acknowledge */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-cyan-200">
          <h4 className="font-semibold text-cyan-900 mb-3">💚 Empathy & Acknowledge</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <strong>E</strong>mpathy statement (validate their concern):
              </label>
              <input
                type="text"
                value={scriptData.empathy}
                onChange={(e) => handleChange('empathy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder={`e.g., I can see why ${scriptData.theirConcern || 'quality'} matters to you`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <strong>A</strong>cknowledge (what you might be missing):
              </label>
              <input
                type="text"
                value={scriptData.acknowledge}
                onChange={(e) => handleChange('acknowledge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., I might be underestimating the reputational risk"
              />
            </div>
          </div>
        </div>

        {/* Reframe & Options */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">🎯 Reframe to Purpose</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's the shared goal? (neutral terms)
              </label>
              <input
                type="text"
                value={scriptData.sharedGoal}
                onChange={(e) => handleChange('sharedGoal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., deliver value to users quickly while maintaining trust"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Propose a 48-hour test:
              </label>
              <input
                type="text"
                value={scriptData.testProposal}
                onChange={(e) => handleChange('testProposal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., soft launch to 100 beta users"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Co-create 3 options:
              </label>
              <input
                type="text"
                value={scriptData.option1}
                onChange={(e) => handleChange('option1', e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Option 1: e.g., Limited beta with feedback form"
              />
              <input
                type="text"
                value={scriptData.option2}
                onChange={(e) => handleChange('option2', e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Option 2: e.g., Internal launch first"
              />
              <input
                type="text"
                value={scriptData.option3}
                onChange={(e) => handleChange('option3', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Option 3: e.g., Feature flag with quick rollback"
              />
            </div>
          </div>
        </div>

        {/* Guardrails */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-3">🛡️ Guardrails</h4>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                If this metric...
              </label>
              <input
                type="text"
                value={scriptData.guardrailMetric}
                onChange={(e) => handleChange('guardrailMetric', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., error rate"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goes below...
              </label>
              <input
                type="text"
                value={scriptData.guardrailThreshold}
                onChange={(e) => handleChange('guardrailThreshold', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., 5%"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                By this date...
              </label>
              <input
                type="text"
                value={scriptData.guardrailDate}
                onChange={(e) => handleChange('guardrailDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Friday 5pm"
              />
            </div>
          </div>
          
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              We'll switch to:
            </label>
            <input
              type="text"
              value={scriptData.alternativePlan}
              onChange={(e) => handleChange('alternativePlan', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., pause and refine for another week"
            />
          </div>
        </div>
      </div>

      {/* Generate Script Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleGenerateScript}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md text-lg font-semibold"
        >
          Generate EAR Script
        </button>
      </div>

      {/* Generated Script */}
      {showScript && (
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm border-2 border-teal-400">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-900">Your EAR Script</h4>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
            >
              {copiedToClipboard ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          <div className="bg-gray-50 rounded p-4 whitespace-pre-wrap text-sm text-gray-700 font-mono">
            {generateScript()}
          </div>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Pro tip:</strong> Practice reading this aloud once. Tone matters! 
              Keep it warm and collaborative, not defensive.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
