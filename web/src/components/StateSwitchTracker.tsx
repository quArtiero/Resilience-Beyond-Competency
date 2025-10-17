import { useState, useEffect } from 'react'
import { Activity, Droplets, Move, CheckCircle, RotateCcw } from 'lucide-react'

interface StateSwitch {
  timestamp: string
  type: string
  beforeState: number
  afterState: number
  notes: string
}

export function StateSwitchTracker() {
  const [currentSwitch, setCurrentSwitch] = useState({
    type: '',
    beforeState: 5,
    afterState: 5,
    notes: ''
  })
  
  const [switches, setSwitches] = useState<StateSwitch[]>(() => {
    const saved = localStorage.getItem('state-switches')
    return saved ? JSON.parse(saved) : []
  })

  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    localStorage.setItem('state-switches', JSON.stringify(switches))
  }, [switches])

  const switchTypes = [
    { id: 'stand', label: 'Stand & Stretch', icon: Move, description: 'Stand up, stretch arms overhead, roll shoulders' },
    { id: 'shake', label: 'Shake It Out', icon: Activity, description: 'Shake arms vigorously for 30 seconds' },
    { id: 'water', label: 'Water Break', icon: Droplets, description: 'Drink a full glass of water slowly' },
    { id: 'posture', label: 'Posture Reset', icon: CheckCircle, description: 'Feet flat, spine tall, shoulders back and down' },
    { id: 'walk', label: '2-Minute Walk', icon: Move, description: 'Quick walk, even if just around the room' },
  ]

  const completeSwitch = () => {
    if (!currentSwitch.type) return
    
    const newSwitch: StateSwitch = {
      timestamp: new Date().toISOString(),
      type: currentSwitch.type,
      beforeState: currentSwitch.beforeState,
      afterState: currentSwitch.afterState,
      notes: currentSwitch.notes
    }
    
    setSwitches([newSwitch, ...switches])
    setHasCompleted(true)
    
    // Reset after a moment
    setTimeout(() => {
      setCurrentSwitch({
        type: '',
        beforeState: 5,
        afterState: 5,
        notes: ''
      })
      setHasCompleted(false)
    }, 2000)
  }

  const getStateDelta = () => {
    const delta = currentSwitch.afterState - currentSwitch.beforeState
    if (delta > 0) return `+${delta}`
    if (delta < 0) return `${delta}`
    return '0'
  }

  const getAverageImprovement = () => {
    if (switches.length === 0) return 0
    const totalDelta = switches.reduce((sum, s) => sum + (s.afterState - s.beforeState), 0)
    return (totalDelta / switches.length).toFixed(1)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">State Switch Tracker</h3>
        <p className="text-gray-600">
          Quick physical changes that shift your mental state in under 2 minutes.
        </p>
      </div>

      {/* Switch Selection */}
      {!hasCompleted && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold text-gray-800 mb-4">Choose Your State Switch</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {switchTypes.map(type => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setCurrentSwitch(prev => ({ ...prev, type: type.id }))}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      currentSwitch.type === type.id
                        ? 'bg-teal-50 border-teal-400'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-6 h-6 mt-1 ${
                        currentSwitch.type === type.id ? 'text-teal-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className="font-medium text-gray-800">{type.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* State Assessment */}
          {currentSwitch.type && (
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Before State Switch</h4>
                <label className="block text-sm text-gray-600 mb-2">
                  Energy/Focus Level (1-10)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentSwitch.beforeState}
                    onChange={(e) => setCurrentSwitch(prev => ({ 
                      ...prev, 
                      beforeState: Number(e.target.value) 
                    }))}
                    className="flex-1"
                  />
                  <span className="w-8 text-center font-bold text-lg">
                    {currentSwitch.beforeState}
                  </span>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-6 text-center">
                <p className="text-lg font-medium text-teal-800 mb-2">
                  Now Do Your State Switch!
                </p>
                <p className="text-sm text-teal-600">
                  {switchTypes.find(t => t.id === currentSwitch.type)?.description}
                </p>
                <div className="mt-4">
                  <Activity className="w-12 h-12 mx-auto text-teal-500 animate-pulse" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4">After State Switch</h4>
                <label className="block text-sm text-gray-600 mb-2">
                  Energy/Focus Level (1-10)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentSwitch.afterState}
                    onChange={(e) => setCurrentSwitch(prev => ({ 
                      ...prev, 
                      afterState: Number(e.target.value) 
                    }))}
                    className="flex-1"
                  />
                  <span className="w-8 text-center font-bold text-lg">
                    {currentSwitch.afterState}
                  </span>
                </div>
                
                {currentSwitch.afterState !== currentSwitch.beforeState && (
                  <div className="mt-2 text-center">
                    <span className={`text-2xl font-bold ${
                      currentSwitch.afterState > currentSwitch.beforeState
                        ? 'text-green-600'
                        : currentSwitch.afterState < currentSwitch.beforeState
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}>
                      {getStateDelta()} points
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Quick Note (optional)
                </label>
                <input
                  type="text"
                  value={currentSwitch.notes}
                  onChange={(e) => setCurrentSwitch(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="e.g., Helped clear mental fog"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <button
                onClick={completeSwitch}
                className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Complete State Switch
              </button>
            </div>
          )}
        </>
      )}

      {/* Completion Message */}
      {hasCompleted && (
        <div className="bg-green-50 rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            State Switch Complete!
          </h4>
          <p className="text-gray-600">
            Great job! Your state has been shifted.
          </p>
        </div>
      )}

      {/* History */}
      {switches.length > 0 && !hasCompleted && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Recent Switches</h4>
            <span className="text-sm text-gray-600">
              Avg improvement: {getAverageImprovement()} points
            </span>
          </div>
          <div className="space-y-2">
            {switches.slice(0, 5).map((sw, index) => (
              <div key={index} className="bg-white rounded p-3 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-700">
                    {switchTypes.find(t => t.id === sw.type)?.label || sw.type}
                  </span>
                  {sw.notes && (
                    <p className="text-xs text-gray-500 mt-1">{sw.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className={`font-bold ${
                    sw.afterState > sw.beforeState ? 'text-green-600' :
                    sw.afterState < sw.beforeState ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {sw.beforeState} → {sw.afterState}
                  </span>
                  <p className="text-xs text-gray-500">
                    {new Date(sw.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">
          💡 When to Use State Switches
        </p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• After 45+ minutes of focused work</li>
          <li>• When you notice tension building</li>
          <li>• Before important meetings or calls</li>
          <li>• When transitioning between tasks</li>
        </ul>
      </div>
    </div>
  )
}
