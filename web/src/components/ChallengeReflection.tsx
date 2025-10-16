import React, { useState, useEffect } from 'react'
import { Save, Download } from 'lucide-react'
import { ReflectionEditor } from './ReflectionEditor'

interface ReflectionData {
  // Journey Review
  struggledMost: string
  breakthroughMoment: string
  surpriseDiscovery: string
  signatureMove: string
  
  // Real World Win
  realWorldChange: string
  oneYearMemory: string
  
  // Failure Learning
  hardestDay: string
  breakthroughRealization: string
  
  // Discoveries
  unexpectedLearning: string
  yourSurprise: string
  
  // Calculations
  oneMonthImprovement: string
  threeMonthImprovement: string
  oneYearImprovement: string
  
  // Ripple Effect
  peopleImpacted: string[]
  
  // Meta Learning
  provedToSelf: string
  metaLearning: string
  
  // Letters
  letterToPastSelf: string
  letterToFutureSelf: string
  
  // Medal
  medalFor: string
  medalCitation: string
  
  // Next Challenge
  nextChallenge: string
  nextStartDate: string
  
  // Philosophy
  usedToBelieveChange: string
  nowKnowChange: string
  usedToThinkFlexibility: string
  nowExperienceFlexibility: string
  usedToFear: string
  nowTrust: string
  
  // Gratitude
  gratitudeList: string[]
  
  // Commitment
  dailyMaintain: string
  weeklyTrack: string
  teachSomeoneBy: string
  
  // Story
  challengeStory: string
}

export const ChallengeReflection: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [data, setData] = useState<ReflectionData>(() => {
    const saved = localStorage.getItem(`lesson-${lessonId}-challenge-reflection`)
    if (saved) return JSON.parse(saved)
    
    return {
      struggledMost: '',
      breakthroughMoment: '',
      surpriseDiscovery: '',
      signatureMove: '',
      realWorldChange: '',
      oneYearMemory: '',
      hardestDay: '',
      breakthroughRealization: '',
      unexpectedLearning: '',
      yourSurprise: '',
      oneMonthImprovement: '',
      threeMonthImprovement: '',
      oneYearImprovement: '',
      peopleImpacted: ['', '', ''],
      provedToSelf: '',
      metaLearning: '',
      letterToPastSelf: '',
      letterToFutureSelf: '',
      medalFor: '',
      medalCitation: '',
      nextChallenge: '',
      nextStartDate: '',
      usedToBelieveChange: '',
      nowKnowChange: '',
      usedToThinkFlexibility: '',
      nowExperienceFlexibility: '',
      usedToFear: '',
      nowTrust: '',
      gratitudeList: ['', '', '', '', ''],
      dailyMaintain: '',
      weeklyTrack: '',
      teachSomeoneBy: '',
      challengeStory: ''
    }
  })
  
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`lesson-${lessonId}-challenge-reflection`, JSON.stringify(data))
      setLastSaved(new Date())
    }, 1000)
    return () => clearTimeout(timer)
  }, [data, lessonId])
  
  const updateField = (field: keyof ReflectionData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }
  
  
  const getCompletionRate = () => {
    const allFields = [
      data.struggledMost,
      data.breakthroughMoment,
      data.surpriseDiscovery,
      data.signatureMove,
      data.realWorldChange,
      data.oneYearMemory,
      data.hardestDay,
      data.breakthroughRealization,
      data.unexpectedLearning,
      data.yourSurprise,
      data.oneMonthImprovement,
      data.threeMonthImprovement,
      data.oneYearImprovement,
      ...data.peopleImpacted,
      data.provedToSelf,
      data.metaLearning,
      data.letterToPastSelf,
      data.letterToFutureSelf,
      data.medalFor,
      data.medalCitation,
      data.nextChallenge,
      data.nextStartDate,
      data.usedToBelieveChange,
      data.nowKnowChange,
      data.usedToThinkFlexibility,
      data.nowExperienceFlexibility,
      data.usedToFear,
      data.nowTrust,
      ...data.gratitudeList,
      data.dailyMaintain,
      data.weeklyTrack,
      data.teachSomeoneBy,
      data.challengeStory
    ]
    
    const filled = allFields.filter(f => f && f.length > 0).length
    return Math.round((filled / allFields.length) * 100)
  }
  
  const exportData = () => {
    const text = `
7-DAY CHALLENGE REFLECTION
==========================

THE JOURNEY
-----------
Where I struggled most: ${data.struggledMost}
When it clicked: ${data.breakthroughMoment}
What surprised me: ${data.surpriseDiscovery}
My signature move: ${data.signatureMove}

REAL WORLD IMPACT
-----------------
What changed: ${data.realWorldChange}
What I'll remember in a year: ${data.oneYearMemory}

BREAKTHROUGH MOMENT
-------------------
Hardest day: ${data.hardestDay}
Key realization: ${data.breakthroughRealization}

DISCOVERIES
-----------
Unexpected learning: ${data.unexpectedLearning}
My surprise: ${data.yourSurprise}

COMPOUND CALCULATIONS
---------------------
1 month improvement: ${data.oneMonthImprovement}
3 month improvement: ${data.threeMonthImprovement}
1 year improvement: ${data.oneYearImprovement}

RIPPLE EFFECT
-------------
People impacted: ${data.peopleImpacted.filter(p => p).join(', ')}

META LEARNING
-------------
Proved to myself: ${data.provedToSelf}
Beyond flexibility: ${data.metaLearning}

LETTER TO PAST SELF
-------------------
${data.letterToPastSelf}

LETTER TO FUTURE SELF
---------------------
${data.letterToFutureSelf}

MY FLEXIBILITY MEDAL
---------------------
Medal for: ${data.medalFor}
Citation: ${data.medalCitation}

NEXT CHALLENGE
--------------
What's next: ${data.nextChallenge}
Start date: ${data.nextStartDate}

PHILOSOPHY SHIFT
----------------
Change - Used to believe: ${data.usedToBelieveChange}
Change - Now know: ${data.nowKnowChange}
Flexibility - Used to think: ${data.usedToThinkFlexibility}
Flexibility - Now experience: ${data.nowExperienceFlexibility}
Used to fear: ${data.usedToFear}
Now trust: ${data.nowTrust}

GRATITUDE LIST
--------------
${data.gratitudeList.filter(g => g).map((g, i) => `${i + 1}. ${g}`).join('\n')}

INTEGRATION COMMITMENT
----------------------
Daily: ${data.dailyMaintain}
Weekly: ${data.weeklyTrack}
Teach by: ${data.teachSomeoneBy}

MY TRANSFORMATION STORY
-----------------------
${data.challengeStory}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'challenge-reflection.txt'
    a.click()
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">🎯 Your Transformation Story</h2>
        <p className="text-purple-100">
          Document your 7-day journey and the changes you've created.
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Reflection Completion</span>
          <span className="text-sm font-bold text-purple-600">{getCompletionRate()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>
      
      {/* Journey Review */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📈 Your Personal Data Story</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Where did you struggle most? (Usually Day 3-4)
            </label>
            <input
              type="text"
              value={data.struggledMost}
              onChange={(e) => updateField('struggledMost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your biggest challenge..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              When did it click? (The breakthrough moment)
            </label>
            <input
              type="text"
              value={data.breakthroughMoment}
              onChange={(e) => updateField('breakthroughMoment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Day X when..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What surprised you? (The unexpected easy win)
            </label>
            <input
              type="text"
              value={data.surpriseDiscovery}
              onChange={(e) => updateField('surpriseDiscovery', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="I didn't expect..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What pattern emerged? (Your signature move)
            </label>
            <select
              value={data.signatureMove}
              onChange={(e) => updateField('signatureMove', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select your superpower...</option>
              <option value="Option Generator">Option Generator (What Else?)</option>
              <option value="Perspective Master">Perspective Master (3 Hats)</option>
              <option value="Creative Minimalist">Creative Minimalist (Constraint Box)</option>
              <option value="Velocity Driver">Velocity Driver (Decision Triage)</option>
              <option value="Risk Manager">Risk Manager (Reverse & Guardrails)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Real World Win */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🎯 The Win That Matters Most</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What real-world change did you create?
            </label>
            <textarea
              value={data.realWorldChange}
              onChange={(e) => updateField('realWorldChange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="A conversation that went differently, a decision that saved hours, a solution you wouldn't have seen before..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              The one win you'll remember a year from now:
            </label>
            <input
              type="text"
              value={data.oneYearMemory}
              onChange={(e) => updateField('oneYearMemory', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="The moment that proved I can change..."
            />
          </div>
        </div>
      </div>
      
      {/* Breakthrough Learning */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">💡 The Failure That Taught You</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Which day almost broke you?
            </label>
            <input
              type="text"
              value={data.hardestDay}
              onChange={(e) => updateField('hardestDay', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Day X was the hardest because..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your breakthrough realization:
            </label>
            <textarea
              value={data.breakthroughRealization}
              onChange={(e) => updateField('breakthroughRealization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="When I stopped trying to be perfect... / When I realized 'good enough' was actually great..."
            />
          </div>
        </div>
      </div>
      
      {/* Compound Calculations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">📊 The Compound Calculation</h3>
        
        <p className="text-gray-600 mb-4">If you maintain this week's improvement:</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              1 month:
            </label>
            <input
              type="text"
              value={data.oneMonthImprovement}
              onChange={(e) => updateField('oneMonthImprovement', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="4x improvement"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              3 months:
            </label>
            <input
              type="text"
              value={data.threeMonthImprovement}
              onChange={(e) => updateField('threeMonthImprovement', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="12x improvement"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              1 year:
            </label>
            <input
              type="text"
              value={data.oneYearImprovement}
              onChange={(e) => updateField('oneYearImprovement', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="37x improvement"
            />
          </div>
        </div>
      </div>
      
      {/* Letters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">✍️ Letters Through Time</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Letter to Past You (from 8 days ago):
            </label>
            <div className="bg-blue-50 p-4 rounded-lg mb-2">
              <p className="text-sm text-blue-800 italic">
                "Dear Day-0 Me, You're about to discover..."
              </p>
            </div>
            <textarea
              value={data.letterToPastSelf}
              onChange={(e) => updateField('letterToPastSelf', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="What would you tell yourself before starting? What encouragement? What warnings?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Letter to Future You (30 days from now):
            </label>
            <div className="bg-green-50 p-4 rounded-lg mb-2">
              <p className="text-sm text-green-800 italic">
                "Dear Day-37 Me, By now, you've..."
              </p>
            </div>
            <textarea
              value={data.letterToFutureSelf}
              onChange={(e) => updateField('letterToFutureSelf', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="What reminders? What expectations? What encouragement for tough days?"
            />
          </div>
        </div>
      </div>
      
      {/* Your Medal */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">🏆 Your Flexibility Medal</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              The Medal for:
            </label>
            <input
              type="text"
              value={data.medalFor}
              onChange={(e) => updateField('medalFor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Fastest Decision Maker, Option Generation Champion, Stress Reduction Master"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Citation:
            </label>
            <textarea
              value={data.medalCitation}
              onChange={(e) => updateField('medalCitation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={2}
              placeholder="For demonstrating exceptional... by achieving... thereby proving that..."
            />
          </div>
        </div>
      </div>
      
      {/* Philosophy Shift */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">💭 The Philosophy Shift</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-700 min-w-fit">I used to believe change required</span>
              <input
                type="text"
                value={data.usedToBelieveChange}
                onChange={(e) => updateField('usedToBelieveChange', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-blue-300 bg-transparent focus:border-blue-500 focus:outline-none"
                placeholder="massive effort..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-gray-700 min-w-fit">Now I know it requires</span>
              <input
                type="text"
                value={data.nowKnowChange}
                onChange={(e) => updateField('nowKnowChange', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-blue-300 bg-transparent focus:border-blue-500 focus:outline-none"
                placeholder="consistent small actions..."
              />
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-700 min-w-fit">I used to think flexibility meant</span>
              <input
                type="text"
                value={data.usedToThinkFlexibility}
                onChange={(e) => updateField('usedToThinkFlexibility', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-green-300 bg-transparent focus:border-green-500 focus:outline-none"
                placeholder="having no structure..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-gray-700 min-w-fit">Now I experience it as</span>
              <input
                type="text"
                value={data.nowExperienceFlexibility}
                onChange={(e) => updateField('nowExperienceFlexibility', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-green-300 bg-transparent focus:border-green-500 focus:outline-none"
                placeholder="structured adaptation..."
              />
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-700 min-w-fit">I used to fear</span>
              <input
                type="text"
                value={data.usedToFear}
                onChange={(e) => updateField('usedToFear', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-purple-300 bg-transparent focus:border-purple-500 focus:outline-none"
                placeholder="making the wrong choice..."
              />
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-gray-700 min-w-fit">Now I trust</span>
              <input
                type="text"
                value={data.nowTrust}
                onChange={(e) => updateField('nowTrust', e.target.value)}
                className="flex-1 px-2 py-1 border-b-2 border-purple-300 bg-transparent focus:border-purple-500 focus:outline-none"
                placeholder="my ability to adapt..."
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Your Challenge Story */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🌟 Your Challenge Story (Share This)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          In 100 words or less, tell your transformation:
        </p>
        <textarea
          value={data.challengeStory}
          onChange={(e) => updateField('challengeStory', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          rows={4}
          placeholder="I took the 7-Day Flexibility Challenge to... My biggest struggle was... The breakthrough came when... By Day 7, I had... The data shows... But the real win was... I'm now..."
          maxLength={500}
        />
        <div className="text-right mt-2">
          <span className="text-sm text-gray-500">{data.challengeStory.length}/500</span>
        </div>
      </div>
      
      {/* Final Reflection Space */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ✏️ Additional Reflections
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Capture any other thoughts, insights, or commitments from your 7-day journey.
        </p>
        <ReflectionEditor
          lessonId={lessonId}
          lessonTitle="7-Day Challenge - Final Reflection"
          reflectionPrompt="What else do you want to remember? What patterns did you notice? What will you do differently going forward?"
          onSave={(content) => {
            console.log('Final reflection saved:', content)
          }}
        />
      </div>
      
      {/* Export Button */}
      <div className="flex justify-center gap-4">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          <Download className="w-5 h-5" />
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
