import { useState, useEffect } from 'react'
import { ArrowRight, Lightbulb, Download, Plus, Trash2 } from 'lucide-react'

interface ReappraisalEntry {
  id: string
  event: string
  defaultStory: string
  feelings: string
  reappraisalType: string
  newFrame: string
  nextAction: string
  timestamp: string
}

const reappraisalPrompts = [
  {
    type: 'threat-to-challenge',
    label: 'Threat → Challenge',
    prompt: 'This is a chance to practice ___ under pressure.',
    example: 'This presentation is a chance to practice clarity under pressure.'
  },
  {
    type: 'learning-lens',
    label: 'Learning Lens',
    prompt: 'What is this trying to teach me quickly?',
    example: 'This conflict is teaching me about different priorities.'
  },
  {
    type: 'partial-control',
    label: 'Partial Control',
    prompt: 'I control ___; I influence ___; I accept ___.',
    example: 'I control my response; I influence the timeline; I accept the decision.'
  },
  {
    type: 'observer-voice',
    label: 'Observer Voice',
    prompt: 'From the balcony, what matters in 48 hours is ___.',
    example: 'From the balcony, what matters in 48 hours is the relationship, not being right.'
  },
  {
    type: 'temporary-specific',
    label: 'Temporary & Specific',
    prompt: 'This is today\'s ___, not life\'s ___.',
    example: 'This is today\'s setback, not life\'s verdict.'
  },
  {
    type: 'data-not-judgment',
    label: 'Data, Not Judgment',
    prompt: 'This is data about ___, not judgment about ___.',
    example: 'This is data about expectations, not judgment about my worth.'
  }
]

export function ReappraisalBuilder() {
  const [currentEntry, setCurrentEntry] = useState({
    event: '',
    defaultStory: '',
    feelings: '',
    reappraisalType: 'threat-to-challenge',
    newFrame: '',
    nextAction: ''
  })
  
  const [entries, setEntries] = useState<ReappraisalEntry[]>(() => {
    const saved = localStorage.getItem('reappraisal-entries')
    return saved ? JSON.parse(saved) : []
  })

  const [showDefusion, setShowDefusion] = useState(false)
  const [defusionLine, setDefusionLine] = useState('')

  useEffect(() => {
    localStorage.setItem('reappraisal-entries', JSON.stringify(entries))
  }, [entries])

  const selectedPrompt = reappraisalPrompts.find(p => p.type === currentEntry.reappraisalType)

  const generateSuggestion = () => {
    if (!currentEntry.defaultStory) return
    
    const prompt = selectedPrompt
    if (!prompt) return
    
    // Generate a contextual suggestion based on the story
    let suggestion = ''
    
    switch (prompt.type) {
      case 'threat-to-challenge':
        if (currentEntry.defaultStory.includes('fail')) {
          suggestion = 'This is a chance to practice resilience under pressure.'
        } else if (currentEntry.defaultStory.includes('embarrass')) {
          suggestion = 'This is a chance to practice vulnerability and authenticity.'
        } else {
          suggestion = 'This is a chance to practice adaptability under pressure.'
        }
        break
      case 'learning-lens':
        suggestion = 'This is teaching me about my boundaries and values.'
        break
      case 'partial-control':
        suggestion = 'I control my effort; I influence the process; I accept the outcome.'
        break
      case 'observer-voice':
        suggestion = 'From the balcony, what matters in 48 hours is progress, not perfection.'
        break
      case 'temporary-specific':
        suggestion = 'This is today\'s challenge, not my permanent reality.'
        break
      case 'data-not-judgment':
        suggestion = 'This is data about the situation, not judgment about my capability.'
        break
    }
    
    setCurrentEntry(prev => ({ ...prev, newFrame: suggestion }))
  }

  const saveEntry = () => {
    if (!currentEntry.event || !currentEntry.defaultStory || !currentEntry.newFrame) {
      return
    }
    
    const newEntry: ReappraisalEntry = {
      id: Date.now().toString(),
      ...currentEntry,
      timestamp: new Date().toISOString()
    }
    
    setEntries([newEntry, ...entries])
    
    // Reset form
    setCurrentEntry({
      event: '',
      defaultStory: '',
      feelings: '',
      reappraisalType: 'threat-to-challenge',
      newFrame: '',
      nextAction: ''
    })
    setDefusionLine('')
    setShowDefusion(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const exportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `reappraisal-entries-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Reappraisal Builder</h3>
        <p className="text-gray-600">
          Same facts, new meaning. Transform threatening thoughts into workable perspectives.
        </p>
      </div>

      {/* Builder Form */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Step 1: Event */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1. Event (facts only, no interpretation)
          </label>
          <textarea
            value={currentEntry.event}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, event: e.target.value }))}
            placeholder="e.g., Manager moved my project to another team without discussing with me first"
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          />
        </div>

        {/* Step 2: Default Story */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. Default Story (your first interpretation)
          </label>
          <textarea
            value={currentEntry.defaultStory}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, defaultStory: e.target.value }))}
            placeholder="e.g., They don't trust me to handle this. My work isn't valued."
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          />
        </div>

        {/* Step 3: Feelings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            3. Precise Feelings (2 specific words)
          </label>
          <input
            type="text"
            value={currentEntry.feelings}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, feelings: e.target.value }))}
            placeholder="e.g., dismissed, uncertain"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Step 4: Choose Reappraisal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            4. Choose Reappraisal Frame
          </label>
          <div className="grid grid-cols-2 gap-2">
            {reappraisalPrompts.map(prompt => (
              <button
                key={prompt.type}
                onClick={() => setCurrentEntry(prev => ({ ...prev, reappraisalType: prompt.type }))}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  currentEntry.reappraisalType === prompt.type
                    ? 'bg-purple-50 border-purple-400'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-sm">{prompt.label}</div>
                <div className="text-xs text-gray-600 mt-1">{prompt.prompt}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: New Frame */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              5. Reappraisal (using {selectedPrompt?.label})
            </label>
            <button
              onClick={generateSuggestion}
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <Lightbulb className="w-4 h-4" />
              Suggest
            </button>
          </div>
          <textarea
            value={currentEntry.newFrame}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, newFrame: e.target.value }))}
            placeholder={selectedPrompt?.example}
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          />
        </div>

        {/* Step 6: Next Action */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            6. ≤10-minute Next Action
          </label>
          <input
            type="text"
            value={currentEntry.nextAction}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, nextAction: e.target.value }))}
            placeholder="e.g., Send clarifying email with 3 questions"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Optional Defusion */}
        <div className="bg-gray-50 rounded-lg p-4">
          <button
            onClick={() => setShowDefusion(!showDefusion)}
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Optional: Add Defusion Line {showDefusion ? '▾' : '▸'}
          </button>
          {showDefusion && (
            <div className="mt-2">
              <p className="text-xs text-gray-600 mb-2">
                Create distance from the thought by observing it
              </p>
              <input
                type="text"
                value={defusionLine}
                onChange={(e) => setDefusionLine(e.target.value)}
                placeholder="e.g., 'I am having the thought that I am not valued' (not 'I am not valued')"
                className="w-full px-3 py-2 bg-white border rounded-lg text-sm"
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setCurrentEntry({
                event: '',
                defaultStory: '',
                feelings: '',
                reappraisalType: 'threat-to-challenge',
                newFrame: '',
                nextAction: ''
              })
              setDefusionLine('')
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Clear
          </button>
          <button
            onClick={saveEntry}
            disabled={!currentEntry.event || !currentEntry.defaultStory || !currentEntry.newFrame}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            Save Reappraisal
          </button>
        </div>
      </div>

      {/* Visual Transformation */}
      {currentEntry.defaultStory && currentEntry.newFrame && (
        <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-6">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Old Story</p>
              <p className="text-sm font-medium text-red-700">
                {currentEntry.defaultStory.slice(0, 50)}...
              </p>
            </div>
            <div className="text-center">
              <ArrowRight className="w-8 h-8 mx-auto text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Reframed</p>
              <p className="text-sm font-medium text-green-700">
                {currentEntry.newFrame.slice(0, 50)}...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Previous Entries */}
      {entries.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Previous Reappraisals</h4>
            {entries.length > 0 && (
              <button
                onClick={exportEntries}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Export All
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {entries.slice(0, 3).map(entry => (
              <div key={entry.id} className="bg-white rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Event:</strong> {entry.event}
                </p>
                <p className="text-sm text-red-600 mb-1 line-through">
                  {entry.defaultStory}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  → {entry.newFrame}
                </p>
                {entry.nextAction && (
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Action:</strong> {entry.nextAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">
          🧠 Research Note
        </p>
        <p className="text-sm text-blue-700">
          Cognitive reappraisal reduces negative emotion by 0.45 SD and increases positive emotion by 0.38 SD 
          (Webb et al., 2012). It's the most validated regulation strategy with 40+ years of research.
        </p>
      </div>
    </div>
  )
}
