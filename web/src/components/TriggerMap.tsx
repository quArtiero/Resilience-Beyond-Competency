import { useState, useEffect } from 'react'
import { AlertTriangle, Brain, Target, Download, Plus, Trash2 } from 'lucide-react'

interface TriggerEntry {
  id: string
  context: string
  trigger: string
  bodySignals: string
  feelingWords: string
  defaultReaction: string
  cost: string
  betterResponse: string
}

export function TriggerMap() {
  const [entries, setEntries] = useState<TriggerEntry[]>(() => {
    const saved = localStorage.getItem('trigger-map-entries')
    if (saved) {
      return JSON.parse(saved)
    }
    return [{
      id: '1',
      context: '',
      trigger: '',
      bodySignals: '',
      feelingWords: '',
      defaultReaction: '',
      cost: '',
      betterResponse: ''
    }]
  })

  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(() => {
    const saved = localStorage.getItem('trigger-map-selected')
    return saved ? JSON.parse(saved) : []
  })

  const triggerCategories = {
    'Time/Workload': ['deadlines', 'last-minute changes', 'multiple demands', 'competing priorities'],
    'Ambiguity/Uncertainty': ['unclear roles', 'missing info', 'changing requirements', 'no feedback'],
    'Status/Esteem': ['being ignored', 'contradicted in public', 'unfair blame', 'credit not given'],
    'Fairness/Justice': ['unequal workload', 'moving goalposts', 'broken promises', 'favoritism'],
    'Rejection/Exclusion': ['not invited', 'silence after speaking', 'ideas dismissed', 'left out'],
    'Value Violation': ['honesty compromised', 'reliability questioned', 'autonomy removed', 'respect lacking'],
    'Physical State (HALT)': ['hungry', 'angry', 'lonely', 'tired', 'pain/illness']
  }

  const bodySignalOptions = [
    'Jaw clenches', 'Shoulders tense', 'Chest tightens', 'Breath shortens',
    'Stomach knots', 'Face heats', 'Hands clench/buzz', 'Heart races',
    'Throat constricts', 'Head pressure', 'Eyes strain', 'Back stiffens'
  ]

  useEffect(() => {
    localStorage.setItem('trigger-map-entries', JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    localStorage.setItem('trigger-map-selected', JSON.stringify(selectedTriggers))
  }, [selectedTriggers])

  const addEntry = () => {
    const newEntry: TriggerEntry = {
      id: Date.now().toString(),
      context: '',
      trigger: '',
      bodySignals: '',
      feelingWords: '',
      defaultReaction: '',
      cost: '',
      betterResponse: ''
    }
    setEntries([...entries, newEntry])
  }

  const updateEntry = (id: string, field: keyof TriggerEntry, value: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
  }

  const deleteEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id))
    }
  }

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    )
  }

  const getCompletionRate = () => {
    const totalFields = entries.length * 7
    const filledFields = entries.reduce((acc, entry) => {
      return acc + Object.values(entry).filter(v => v && v !== entry.id).length
    }, 0)
    return Math.round((filledFields / totalFields) * 100)
  }

  const exportData = () => {
    const data = {
      selectedTriggers,
      entries,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trigger-map-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-800">Trigger Map Workshop</h2>
          </div>
          <div className="text-sm text-gray-600">
            Completion: {getCompletionRate()}%
          </div>
        </div>
        <p className="text-gray-600">
          Map your triggers to build awareness and create better responses. The more specific you are, the more powerful this becomes.
        </p>
      </div>

      {/* Trigger Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Step 1: Identify Your Trigger Categories
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Select all that apply. These are situations that reliably spark strong emotions in you.
        </p>
        <div className="space-y-4">
          {Object.entries(triggerCategories).map(([category, examples]) => (
            <div key={category} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {examples.map(trigger => (
                  <button
                    key={trigger}
                    onClick={() => toggleTrigger(trigger)}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-all
                      ${selectedTriggers.includes(trigger)
                        ? 'bg-orange-100 text-orange-700 border-orange-300'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                      } border hover:scale-105
                    `}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Mapping Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Step 2: Map Your Specific Triggers
          </h3>
          <button
            onClick={addEntry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-2 text-sm font-medium text-gray-700">Context</th>
                <th className="text-left p-2 text-sm font-medium text-gray-700">Trigger</th>
                <th className="text-left p-2 text-sm font-medium text-gray-700">Body Signals</th>
                <th className="text-left p-2 text-sm font-medium text-gray-700">Feeling Words</th>
                <th className="text-left p-2 text-sm font-medium text-gray-700">Default Reaction</th>
                <th className="text-left p-2 text-sm font-medium text-gray-700">Cost</th>
                <th className="text-left p-2 text-sm font-medium text-gray-700">Better Response</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <textarea
                      value={entry.context}
                      onChange={(e) => updateEntry(entry.id, 'context', e.target.value)}
                      placeholder="e.g., Sprint review, Wed 3pm"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={entry.trigger}
                      onChange={(e) => updateEntry(entry.id, 'trigger', e.target.value)}
                      placeholder="e.g., Public critique"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={entry.bodySignals}
                      onChange={(e) => updateEntry(entry.id, 'bodySignals', e.target.value)}
                      placeholder="e.g., Face heat, jaw clench"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={entry.feelingWords}
                      onChange={(e) => updateEntry(entry.id, 'feelingWords', e.target.value)}
                      placeholder="e.g., Protective, rushed"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={entry.defaultReaction}
                      onChange={(e) => updateEntry(entry.id, 'defaultReaction', e.target.value)}
                      placeholder="e.g., Interrupt/defend"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={entry.cost}
                      onChange={(e) => updateEntry(entry.id, 'cost', e.target.value)}
                      placeholder="e.g., Tension; decision stalls"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    <textarea
                      value={entry.betterResponse}
                      onChange={(e) => updateEntry(entry.id, 'betterResponse', e.target.value)}
                      placeholder="e.g., STOP + Name→Need→Next"
                      className="w-full p-2 border rounded text-sm resize-none"
                      rows={2}
                    />
                  </td>
                  <td className="p-2">
                    {entries.length > 1 && (
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Example:</strong> Context: "Sprint review, Wed 3pm" | Trigger: "Public critique" | 
            Body: "Face heat, jaw" | Feelings: "Protective, rushed" | Default: "Interrupt/defend" | 
            Cost: "Tension; decision stalls" | Better: "I feel protective; need clarity → 4-bullet response + 48h test"
          </p>
        </div>
      </div>

      {/* Body Signal Bank */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Your Top 5 Body Signals</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your body often signals 30-90 seconds before your mouth or mouse does. What are your early warning signs?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {bodySignalOptions.map(signal => (
            <div key={signal} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                id={signal}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor={signal} className="text-sm cursor-pointer">
                {signal}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Export Trigger Map
        </button>
      </div>
    </div>
  )
}
