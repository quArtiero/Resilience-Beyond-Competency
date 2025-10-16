import React, { useState, useEffect } from 'react'
import { Save, Download } from 'lucide-react'
import { ReflectionEditor } from './ReflectionEditor'

interface ReflectionData {
  weekReview: {
    problemBroughtHere: string
    patternToBreak: string
    hopedToChange: string
    toolThatWorked: string
    goToPhrase: string
    metricProgress: string
  }
  integrationChallenge: {
    caughtPattern: string
    choseDifferently: string
    measuredResult: string
    whatMadeDifference: string
  }
  philosophy: {
    flexibilityUsedTo: string
    flexibilityNowMeans: string
    biggestBarrier: string
    counterMove: string
    insteadOf: string
    nowIDo: string
    unlockingPhrase: string
  }
  compoundQuestion: {
    stressLevels: string
    relationships: string
    performance: string
    selfTrust: string
  }
  systemsThinking: {
    keyInsight: string
    implementationPlan: string
  }
}

export const IntegrationReflection: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [data, setData] = useState<ReflectionData>({
    weekReview: {
      problemBroughtHere: '',
      patternToBreak: '',
      hopedToChange: '',
      toolThatWorked: '',
      goToPhrase: '',
      metricProgress: ''
    },
    integrationChallenge: {
      caughtPattern: '',
      choseDifferently: '',
      measuredResult: '',
      whatMadeDifference: ''
    },
    philosophy: {
      flexibilityUsedTo: '',
      flexibilityNowMeans: '',
      biggestBarrier: '',
      counterMove: '',
      insteadOf: '',
      nowIDo: '',
      unlockingPhrase: ''
    },
    compoundQuestion: {
      stressLevels: '',
      relationships: '',
      performance: '',
      selfTrust: ''
    },
    systemsThinking: {
      keyInsight: '',
      implementationPlan: ''
    }
  })

  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-integration-reflection`)
    if (saved) {
      setData(JSON.parse(saved))
      setLastSaved(new Date())
    }
  }, [lessonId])

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`lesson-${lessonId}-integration-reflection`, JSON.stringify(data))
      setLastSaved(new Date())
    }, 1000)
    return () => clearTimeout(timer)
  }, [data, lessonId])

  const updateField = (section: keyof ReflectionData, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const exportData = () => {
    const text = `
INTEGRATION REFLECTION - LESSON 6

=== WEEK IN REVIEW ===
What problem brought you here? ${data.weekReview.problemBroughtHere}
What pattern were you trying to break? ${data.weekReview.patternToBreak}
What did you hope would change? ${data.weekReview.hopedToChange}
What tool surprised you by working? ${data.weekReview.toolThatWorked}
What reframe became your go-to? ${data.weekReview.goToPhrase}
What metric showed progress? ${data.weekReview.metricProgress}

=== INTEGRATION CHALLENGE ===
Caught yourself in: ${data.integrationChallenge.caughtPattern}
Chose differently using: ${data.integrationChallenge.choseDifferently}
Measured result: ${data.integrationChallenge.measuredResult}
What made the difference: ${data.integrationChallenge.whatMadeDifference}

=== YOUR FLEXIBILITY PHILOSOPHY ===
Flexibility used to mean: ${data.philosophy.flexibilityUsedTo}
Now it means: ${data.philosophy.flexibilityNowMeans}
Biggest barrier was: ${data.philosophy.biggestBarrier}
Counter-move is: ${data.philosophy.counterMove}
Instead of: ${data.philosophy.insteadOf}
Now I: ${data.philosophy.nowIDo}
Unlocking phrase: ${data.philosophy.unlockingPhrase}

=== 90-DAY PROJECTION ===
Stress levels: ${data.compoundQuestion.stressLevels}
Relationships: ${data.compoundQuestion.relationships}
Performance: ${data.compoundQuestion.performance}
Self-trust: ${data.compoundQuestion.selfTrust}

=== SYSTEMS THINKING ===
Key insight: ${data.systemsThinking.keyInsight}
Implementation plan: ${data.systemsThinking.implementationPlan}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'integration-reflection.txt'
    a.click()
  }

  const completionRate = () => {
    const allFields = [
      ...Object.values(data.weekReview),
      ...Object.values(data.integrationChallenge),
      ...Object.values(data.philosophy),
      ...Object.values(data.compoundQuestion),
      ...Object.values(data.systemsThinking)
    ]
    const filled = allFields.filter(f => f.length > 0).length
    return Math.round((filled / allFields.length) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">📝 Your Integration Story</h2>
        <p className="text-purple-100">
          Transform your learnings into a personal operating system for flexibility.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Reflection Progress</span>
          <span className="text-sm font-bold text-purple-600">{completionRate()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate()}%` }}
          />
        </div>
      </div>

      {/* Week in Review */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🗓️ Week in Review</h3>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Looking Back:</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What problem brought you here?
            </label>
            <textarea
              value={data.weekReview.problemBroughtHere}
              onChange={(e) => updateField('weekReview', 'problemBroughtHere', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="The specific challenge or situation that motivated you to learn flexibility..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What pattern were you trying to break?
            </label>
            <textarea
              value={data.weekReview.patternToBreak}
              onChange={(e) => updateField('weekReview', 'patternToBreak', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="The rigid behavior or thinking pattern you wanted to change..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What did you hope would change?
            </label>
            <input
              type="text"
              value={data.weekReview.hopedToChange}
              onChange={(e) => updateField('weekReview', 'hopedToChange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Your desired outcome or transformation..."
            />
          </div>

          <h4 className="font-semibold text-gray-700 mt-6">Looking Forward:</h4>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What tool surprised you by actually working?
            </label>
            <input
              type="text"
              value={data.weekReview.toolThatWorked}
              onChange={(e) => updateField('weekReview', 'toolThatWorked', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Constraint Box, 3 Hats, Decision Triage..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What reframe became your go-to phrase?
            </label>
            <input
              type="text"
              value={data.weekReview.goToPhrase}
              onChange={(e) => updateField('weekReview', 'goToPhrase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="The phrase that consistently helps you shift perspective..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What metric showed genuine progress?
            </label>
            <input
              type="text"
              value={data.weekReview.metricProgress}
              onChange={(e) => updateField('weekReview', 'metricProgress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Decision time reduced by 40%, stress levels down 2 points..."
            />
          </div>
        </div>
      </div>

      {/* Integration Challenge */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ The Integration Challenge</h3>
        
        <p className="text-gray-600 mb-4">
          The hardest part isn't learning new tools—it's <strong>remembering to use them</strong> when stress hits.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              1. Describe when you caught yourself in an old pattern:
            </label>
            <textarea
              value={data.integrationChallenge.caughtPattern}
              onChange={(e) => updateField('integrationChallenge', 'caughtPattern', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="The moment you noticed yourself falling into old habits..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              2. How did you choose differently using a tool from our lessons?
            </label>
            <textarea
              value={data.integrationChallenge.choseDifferently}
              onChange={(e) => updateField('integrationChallenge', 'choseDifferently', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="The specific tool or technique you applied..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              3. What result did you measure (not just feel)?
            </label>
            <input
              type="text"
              value={data.integrationChallenge.measuredResult}
              onChange={(e) => updateField('integrationChallenge', 'measuredResult', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="The concrete, measurable outcome..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              What made the difference between knowing and doing?
            </label>
            <textarea
              value={data.integrationChallenge.whatMadeDifference}
              onChange={(e) => updateField('integrationChallenge', 'whatMadeDifference', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="The key factor that helped you actually apply what you learned..."
            />
          </div>
        </div>
      </div>

      {/* Flexibility Philosophy */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Your Flexibility Philosophy</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-fit">I used to believe flexibility meant</span>
              <input
                type="text"
                value={data.philosophy.flexibilityUsedTo}
                onChange={(e) => updateField('philosophy', 'flexibilityUsedTo', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-blue-300 bg-transparent focus:border-blue-500 focus:outline-none"
                placeholder="having no plan..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-fit">Now I understand it means</span>
              <input
                type="text"
                value={data.philosophy.flexibilityNowMeans}
                onChange={(e) => updateField('philosophy', 'flexibilityNowMeans', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-blue-300 bg-transparent focus:border-blue-500 focus:outline-none"
                placeholder="adapting methods while preserving purpose..."
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-fit">My biggest barrier to adaptation was</span>
              <input
                type="text"
                value={data.philosophy.biggestBarrier}
                onChange={(e) => updateField('philosophy', 'biggestBarrier', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-green-300 bg-transparent focus:border-green-500 focus:outline-none"
                placeholder="fear of looking incompetent..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-fit">My counter-move is now</span>
              <input
                type="text"
                value={data.philosophy.counterMove}
                onChange={(e) => updateField('philosophy', 'counterMove', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-green-300 bg-transparent focus:border-green-500 focus:outline-none"
                placeholder="running a 15-minute Decision Triage..."
              />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-fit">When plans break, instead of</span>
              <input
                type="text"
                value={data.philosophy.insteadOf}
                onChange={(e) => updateField('philosophy', 'insteadOf', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-purple-300 bg-transparent focus:border-purple-500 focus:outline-none"
                placeholder="panicking or freezing..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-gray-600 min-w-fit">I now</span>
              <input
                type="text"
                value={data.philosophy.nowIDo}
                onChange={(e) => updateField('philosophy', 'nowIDo', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-purple-300 bg-transparent focus:border-purple-500 focus:outline-none"
                placeholder="ask 'What else?' and generate 3 options..."
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              The phrase that unlocks movement for me is:
            </label>
            <input
              type="text"
              value={data.philosophy.unlockingPhrase}
              onChange={(e) => updateField('philosophy', 'unlockingPhrase', e.target.value)}
              className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-medium text-purple-700"
              placeholder="Stabilize now, optimize later..."
            />
          </div>
        </div>
      </div>

      {/* 90-Day Projection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📈 The Compound Question</h3>
        
        <p className="text-gray-600 mb-4">
          If you applied your Flexibility OS consistently for 90 days, what would be different?
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your stress levels:
            </label>
            <textarea
              value={data.compoundQuestion.stressLevels}
              onChange={(e) => updateField('compoundQuestion', 'stressLevels', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="How would your stress response change?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your relationships:
            </label>
            <textarea
              value={data.compoundQuestion.relationships}
              onChange={(e) => updateField('compoundQuestion', 'relationships', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="How would your interactions improve?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your performance:
            </label>
            <textarea
              value={data.compoundQuestion.performance}
              onChange={(e) => updateField('compoundQuestion', 'performance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="How would your results change?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your self-trust:
            </label>
            <textarea
              value={data.compoundQuestion.selfTrust}
              onChange={(e) => updateField('compoundQuestion', 'selfTrust', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="How would your confidence evolve?"
            />
          </div>
        </div>
      </div>

      {/* Systems Thinking */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🔄 Systems Thinking</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your key insight about flexibility as a system:
            </label>
            <textarea
              value={data.systemsThinking.keyInsight}
              onChange={(e) => updateField('systemsThinking', 'keyInsight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="What have you realized about how flexibility creates compound returns?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your implementation plan for the next 7 days:
            </label>
            <textarea
              value={data.systemsThinking.implementationPlan}
              onChange={(e) => updateField('systemsThinking', 'implementationPlan', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Specific actions you'll take to embed your Flexibility OS..."
            />
          </div>
        </div>
      </div>

      {/* General Reflection Space */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✍️ Additional Reflections & Exit Ticket
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Capture any additional thoughts, insights, or commitments that emerged from completing this integration reflection.
        </p>
        <ReflectionEditor
          lessonId={lessonId}
          lessonTitle="Lesson 6 - Integration Reflection"
          reflectionPrompt="Complete your exit ticket: What's your biggest takeaway? What will you do differently tomorrow? What questions remain?"
          onSave={(content) => {
            console.log('Additional reflection saved:', content)
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Reflection
        </button>
        
        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Save className="w-4 h-4" />
            <span>Auto-saved {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}
