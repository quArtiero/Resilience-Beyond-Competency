import { useState, useEffect } from 'react'
import { Brain, ArrowRight } from 'lucide-react'

interface GranularityData {
  exercise1: {
    feeling: string
    trigger: string
    need: string
  }
  exercise2: {
    feeling: string
    trigger: string
    need: string
  }
}

const VAGUE_TO_PRECISE = {
  stressed: ['Overloaded', 'Time-pressed', 'Uncertain', 'Scattered'],
  angry: ['Dismissed', 'Blocked', 'Disrespected', 'Protective'],
  anxious: ['Uneasy', 'Exposed', 'Unprepared', 'Anticipatory'],
  sad: ['Disappointed', 'Grieving', 'Depleted', 'Let-down'],
  happy: ['Relieved', 'Proud', 'Connected', 'Energized']
}

export function EmotionGranularity() {
  const [data, setData] = useState<GranularityData>(() => {
    const saved = localStorage.getItem('emotion-granularity')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      exercise1: { feeling: '', trigger: '', need: '' },
      exercise2: { feeling: '', trigger: '', need: '' }
    }
  })

  const [selectedVague, setSelectedVague] = useState<keyof typeof VAGUE_TO_PRECISE | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('emotion-granularity', JSON.stringify(data))
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  const updateExercise = (exercise: 'exercise1' | 'exercise2', field: keyof GranularityData['exercise1'], value: string) => {
    setData(prev => ({
      ...prev,
      [exercise]: { ...prev[exercise], [field]: value }
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Vocabulary Ladder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">The Granularity Ladder</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Click a vague emotion to see precise alternatives:
        </p>

        <div className="grid grid-cols-5 gap-3">
          {Object.keys(VAGUE_TO_PRECISE).map((vague) => (
            <button
              key={vague}
              onClick={() => setSelectedVague(vague as keyof typeof VAGUE_TO_PRECISE)}
              className={`
                p-3 rounded-lg text-sm font-medium capitalize transition-all
                ${selectedVague === vague
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }
              `}
            >
              {vague}
            </button>
          ))}
        </div>

        {selectedVague && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-600 capitalize">{selectedVague}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-purple-700">More Precise:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {VAGUE_TO_PRECISE[selectedVague].map(precise => (
                <div
                  key={precise}
                  className="p-2 bg-white rounded border border-purple-200 text-sm"
                >
                  {precise}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Practice Exercise */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Precision Practice</h3>
        <p className="text-sm text-gray-600 mb-4">
          Write two precise feeling words you've experienced this week:
        </p>

        {['exercise1', 'exercise2'].map((exercise, index) => (
          <div key={exercise} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-3">Feeling {index + 1}</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Precise feeling word:
                </label>
                <input
                  type="text"
                  value={data[exercise as keyof GranularityData].feeling}
                  onChange={(e) => updateExercise(exercise as 'exercise1' | 'exercise2', 'feeling', e.target.value)}
                  placeholder="e.g., Overwhelmed, Dismissed, Time-pressed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Usually triggered by:
                </label>
                <input
                  type="text"
                  value={data[exercise as keyof GranularityData].trigger}
                  onChange={(e) => updateExercise(exercise as 'exercise1' | 'exercise2', 'trigger', e.target.value)}
                  placeholder="e.g., Multiple urgent requests at once"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  The underlying need is:
                </label>
                <input
                  type="text"
                  value={data[exercise as keyof GranularityData].need}
                  onChange={(e) => updateExercise(exercise as 'exercise1' | 'exercise2', 'need', e.target.value)}
                  placeholder="e.g., Clear priorities, manageable workload"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {data[exercise as keyof GranularityData].feeling && 
             data[exercise as keyof GranularityData].trigger && 
             data[exercise as keyof GranularityData].need && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm">
                <span className="font-medium text-green-800">Complete sentence: </span>
                <span className="text-green-700">
                  "When I feel {data[exercise as keyof GranularityData].feeling}, 
                  it's usually triggered by {data[exercise as keyof GranularityData].trigger}; 
                  the need is {data[exercise as keyof GranularityData].need}."
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
