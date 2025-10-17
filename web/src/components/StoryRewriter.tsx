import { useState, useEffect } from 'react'
import { BookOpen, AlertCircle, RefreshCw, Target, Download } from 'lucide-react'

interface StoryEntry {
  id: string
  activatingEvent: string
  belief: string
  consequence: string
  replacementBelief: string
  betterBehavior: string
  timestamp: string
}

interface StoryPattern {
  name: string
  description: string
  example: string
  reframePrompt: string
}

export function StoryRewriter() {
  const [entries, setEntries] = useState<StoryEntry[]>(() => {
    const saved = localStorage.getItem('story-rewriter-entries')
    return saved ? JSON.parse(saved) : []
  })

  const [currentEntry, setCurrentEntry] = useState<Omit<StoryEntry, 'id' | 'timestamp'>>({
    activatingEvent: '',
    belief: '',
    consequence: '',
    replacementBelief: '',
    betterBehavior: ''
  })

  const [selectedPattern, setSelectedPattern] = useState<string>('')

  const storyPatterns: StoryPattern[] = [
    {
      name: 'Catastrophizing',
      description: 'Making mountains out of molehills',
      example: '"If this slips, everything collapses."',
      reframePrompt: 'What\'s the most likely outcome? What could you handle even if it went wrong?'
    },
    {
      name: 'Mind-reading',
      description: 'Assuming you know what others think',
      example: '"They think I\'m incompetent."',
      reframePrompt: 'What evidence do you have? What else might they be thinking?'
    },
    {
      name: 'All-or-Nothing',
      description: 'Seeing only extremes',
      example: '"Perfect or pointless."',
      reframePrompt: 'What\'s the middle ground? What progress is still valuable?'
    },
    {
      name: 'Personalization',
      description: 'Taking responsibility for things beyond your control',
      example: '"It\'s my fault the market changed."',
      reframePrompt: 'What factors were outside your control? What part is actually yours?'
    },
    {
      name: 'Filtering',
      description: 'Only noticing negative data',
      example: 'Ignoring 9 successes, focusing on 1 failure',
      reframePrompt: 'What went well? What positive data are you overlooking?'
    }
  ]

  const reframeStrategies = [
    { name: 'Evidence Check', prompt: 'What proof supports/opposes this?' },
    { name: '10% Truer', prompt: 'What would be a slightly fairer story?' },
    { name: 'Observer View', prompt: 'What would a neutral teammate say?' },
    { name: 'Purpose Pivot', prompt: 'If the purpose is ___, what helps right now?' },
    { name: 'Best Friend Test', prompt: 'What would you tell your best friend?' },
    { name: 'Time Travel', prompt: 'Will this matter in 1 week/month/year?' }
  ]

  useEffect(() => {
    localStorage.setItem('story-rewriter-entries', JSON.stringify(entries))
  }, [entries])

  const identifyPattern = (belief: string): string => {
    const lowerBelief = belief.toLowerCase()
    
    if (lowerBelief.includes('everything') || lowerBelief.includes('disaster') || lowerBelief.includes('collapse')) {
      return 'Catastrophizing'
    }
    if (lowerBelief.includes('they think') || lowerBelief.includes('they believe') || lowerBelief.includes('they feel')) {
      return 'Mind-reading'
    }
    if (lowerBelief.includes('always') || lowerBelief.includes('never') || lowerBelief.includes('perfect')) {
      return 'All-or-Nothing'
    }
    if (lowerBelief.includes('my fault') || lowerBelief.includes('i caused')) {
      return 'Personalization'
    }
    return 'Filtering'
  }

  const generateReframe = (belief: string, pattern: string): string => {
    const patternObj = storyPatterns.find(p => p.name === pattern)
    if (!patternObj) return ''
    
    // Generate a sample reframe based on the pattern
    switch (pattern) {
      case 'Catastrophizing':
        return `While this is challenging, the most likely outcome is manageable. Even if it doesn't go perfectly, I can handle it step by step.`
      case 'Mind-reading':
        return `I don't actually know what they're thinking. They might be focused on their own concerns or see this differently than I imagine.`
      case 'All-or-Nothing':
        return `Progress doesn't require perfection. Even partial success moves things forward and teaches valuable lessons.`
      case 'Personalization':
        return `Multiple factors contributed to this situation. I'm responsible for my part, but not for circumstances beyond my control.`
      case 'Filtering':
        return `Looking at the full picture, there are positive aspects I haven't acknowledged. The situation is more balanced than it first appeared.`
      default:
        return ''
    }
  }

  const handleSubmit = () => {
    if (currentEntry.activatingEvent && currentEntry.belief) {
      const pattern = selectedPattern || identifyPattern(currentEntry.belief)
      
      const newEntry: StoryEntry = {
        id: Date.now().toString(),
        ...currentEntry,
        replacementBelief: currentEntry.replacementBelief || generateReframe(currentEntry.belief, pattern),
        timestamp: new Date().toISOString()
      }
      
      setEntries([newEntry, ...entries])
      setCurrentEntry({
        activatingEvent: '',
        belief: '',
        consequence: '',
        replacementBelief: '',
        betterBehavior: ''
      })
      setSelectedPattern('')
    }
  }

  const exportEntries = () => {
    const data = {
      entries,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `story-rewrites-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const getCompletionScore = () => {
    if (!currentEntry.activatingEvent) return 0
    let score = 20
    if (currentEntry.belief) score += 20
    if (currentEntry.consequence) score += 20
    if (currentEntry.replacementBelief) score += 20
    if (currentEntry.betterBehavior) score += 20
    return score
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Story Rewriter</h2>
          </div>
          <div className="text-sm text-gray-600">
            Entries: {entries.length}
          </div>
        </div>
        <p className="text-gray-600">
          Transform automatic thoughts into balanced perspectives. Use the ABC→A+RB framework to rewrite your stories.
        </p>
      </div>

      {/* Story Patterns */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          Common Story Patterns
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {storyPatterns.map(pattern => (
            <div
              key={pattern.name}
              onClick={() => setSelectedPattern(pattern.name)}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all
                ${selectedPattern === pattern.name
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <h4 className="font-medium text-gray-800 mb-1">{pattern.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
              <p className="text-xs text-gray-500 italic">"{pattern.example}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Entry Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">New Story Rewrite</h3>
          <div className="text-sm text-gray-600">
            Completion: {getCompletionScore()}%
          </div>
        </div>

        <div className="space-y-4">
          {/* A - Activating Event */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              A - Activating Event (facts only)
            </label>
            <textarea
              value={currentEntry.activatingEvent}
              onChange={(e) => setCurrentEntry({...currentEntry, activatingEvent: e.target.value})}
              placeholder="What happened? Just the observable facts..."
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
          </div>

          {/* B - Belief/Story */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              B - Belief/Story (what you told yourself)
            </label>
            <textarea
              value={currentEntry.belief}
              onChange={(e) => {
                setCurrentEntry({...currentEntry, belief: e.target.value})
                if (e.target.value && !selectedPattern) {
                  setSelectedPattern(identifyPattern(e.target.value))
                }
              }}
              placeholder="What story did your brain generate?"
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
            {selectedPattern && (
              <p className="mt-2 text-sm text-purple-600">
                Pattern detected: {selectedPattern}
              </p>
            )}
          </div>

          {/* C - Consequence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              C - Consequence (emotion/behavior)
            </label>
            <textarea
              value={currentEntry.consequence}
              onChange={(e) => setCurrentEntry({...currentEntry, consequence: e.target.value})}
              placeholder="How did you feel and what did you do?"
              className="w-full p-3 border rounded-lg resize-none"
              rows={2}
            />
          </div>

          {/* Reframe Strategies */}
          {currentEntry.belief && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-800 mb-2">Try these reframe strategies:</p>
              <div className="flex flex-wrap gap-2">
                {reframeStrategies.map(strategy => (
                  <button
                    key={strategy.name}
                    onClick={() => {
                      const prompt = window.prompt(strategy.prompt)
                      if (prompt) {
                        setCurrentEntry({...currentEntry, replacementBelief: prompt})
                      }
                    }}
                    className="px-3 py-1 bg-white text-blue-700 border border-blue-300 rounded-full text-xs hover:bg-blue-100"
                  >
                    {strategy.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* R - Replacement Belief */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              R - Replacement Belief (10% truer story)
            </label>
            <textarea
              value={currentEntry.replacementBelief}
              onChange={(e) => setCurrentEntry({...currentEntry, replacementBelief: e.target.value})}
              placeholder="A fairer, more balanced perspective..."
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
            />
          </div>

          {/* B - Better Behavior */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              B - Better Behavior (≤10 minute action)
            </label>
            <input
              type="text"
              value={currentEntry.betterBehavior}
              onChange={(e) => setCurrentEntry({...currentEntry, betterBehavior: e.target.value})}
              placeholder="One specific action that serves the purpose..."
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!currentEntry.activatingEvent || !currentEntry.belief}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            Save Story Rewrite
          </button>
        </div>
      </div>

      {/* Previous Entries */}
      {entries.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Story Rewrites</h3>
            <button
              onClick={exportEntries}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          
          <div className="space-y-4">
            {entries.map(entry => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">ORIGINAL STORY</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Event:</strong> {entry.activatingEvent}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Belief:</strong> "{entry.belief}"
                    </p>
                    {entry.consequence && (
                      <p className="text-sm text-gray-700">
                        <strong>Result:</strong> {entry.consequence}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">REWRITTEN STORY</p>
                    <p className="text-sm text-green-700 mb-2">
                      <strong>New Belief:</strong> "{entry.replacementBelief}"
                    </p>
                    {entry.betterBehavior && (
                      <p className="text-sm text-green-700">
                        <strong>Action:</strong> {entry.betterBehavior}
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Reminder */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Daily Practice
        </h3>
        <p className="text-sm text-yellow-700">
          Rewrite one story each day. The goal isn't toxic positivity — it's accuracy. 
          A 10% truer story can shift your entire response.
        </p>
      </div>
    </div>
  )
}
