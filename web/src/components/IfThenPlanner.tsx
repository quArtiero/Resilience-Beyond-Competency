import { useState } from 'react'

interface IfThenPlan {
  id: string
  trigger: string
  alternative: string
  category: 'work' | 'personal' | 'relationship'
  tested: boolean
  successful: boolean | null
  notes: string
}

interface IfThenPlannerProps {
  lessonId: number
  onComplete?: (plans: IfThenPlan[]) => void
}

export function IfThenPlanner({ lessonId, onComplete }: IfThenPlannerProps) {
  const localStorageKey = `ifThenPlans_${lessonId}`
  
  const [plans, setPlans] = useState<IfThenPlan[]>(() => {
    const saved = localStorage.getItem(localStorageKey)
    return saved ? JSON.parse(saved) : []
  })
  
  const [newPlan, setNewPlan] = useState({
    trigger: '',
    alternative: '',
    category: 'personal' as const
  })
  
  const [filter, setFilter] = useState<'all' | 'work' | 'personal' | 'relationship'>('all')
  const [showTemplates, setShowTemplates] = useState(false)

  const templates = {
    work: [
      { trigger: "No hour for deep work", alternative: "25-min Pomodoro sprint before lunch" },
      { trigger: "Meeting runs over", alternative: "5-min voice memo with key decisions" },
      { trigger: "Blocked by dependency", alternative: "Ship mock data version" },
      { trigger: "Stakeholder unavailable", alternative: "Send Loom video + async feedback form" },
      { trigger: "Tool/system down", alternative: "Manual process with spreadsheet" }
    ],
    personal: [
      { trigger: "Gym closed", alternative: "12-min HIIT in living room" },
      { trigger: "Too tired to study", alternative: "15-min retrieval practice (no new content)" },
      { trigger: "Missed morning routine", alternative: "5-min reset ritual at lunch" },
      { trigger: "No time for full workout", alternative: "Stairs for 10 min + 50 pushups" },
      { trigger: "Can't sleep", alternative: "4-7-8 breathing + write 3 tomorrow priorities" }
    ],
    relationship: [
      { trigger: "Partner stressed", alternative: "10-min walk together, no phones" },
      { trigger: "Team tension high", alternative: "Suggest 5-min break + reset" },
      { trigger: "Conflict arising", alternative: "Pause, use EAR script" },
      { trigger: "Communication breakdown", alternative: "Switch to written summary" },
      { trigger: "Disagreement on approach", alternative: "Propose 48h test with data" }
    ]
  }

  const addPlan = () => {
    if (!newPlan.trigger || !newPlan.alternative) return
    
    const plan: IfThenPlan = {
      id: Date.now().toString(),
      trigger: newPlan.trigger,
      alternative: newPlan.alternative,
      category: newPlan.category,
      tested: false,
      successful: null,
      notes: ''
    }
    
    const updatedPlans = [...plans, plan]
    setPlans(updatedPlans)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPlans))
    
    setNewPlan({ trigger: '', alternative: '', category: 'personal' })
    
    if (onComplete) {
      onComplete(updatedPlans)
    }
  }

  const updatePlan = (id: string, updates: Partial<IfThenPlan>) => {
    const updatedPlans = plans.map(plan => 
      plan.id === id ? { ...plan, ...updates } : plan
    )
    setPlans(updatedPlans)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPlans))
  }

  const deletePlan = (id: string) => {
    const updatedPlans = plans.filter(plan => plan.id !== id)
    setPlans(updatedPlans)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPlans))
  }

  const applyTemplate = (template: { trigger: string, alternative: string }, category: IfThenPlan['category']) => {
    setNewPlan({
      trigger: template.trigger,
      alternative: template.alternative,
      category
    })
    setShowTemplates(false)
  }

  const filteredPlans = filter === 'all' 
    ? plans 
    : plans.filter(plan => plan.category === filter)

  const getStats = () => {
    const tested = plans.filter(p => p.tested).length
    const successful = plans.filter(p => p.successful === true).length
    const total = plans.length
    
    return { total, tested, successful }
  }

  const stats = getStats()

  const exportPlans = () => {
    const content = plans.map((plan, idx) => 
      `${idx + 1}. IF ${plan.trigger}, THEN I will ${plan.alternative}\n   Category: ${plan.category}\n   Tested: ${plan.tested ? 'Yes' : 'No'}\n   Success: ${plan.successful === null ? 'Not tested' : plan.successful ? 'Yes' : 'No'}\n   Notes: ${plan.notes || 'None'}`
    ).join('\n\n')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `if-then-plans-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🎯 If-Then Planner</h3>
        <p className="text-gray-600">Build your flexibility muscle memory</p>
        
        {/* Stats */}
        {stats.total > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.total}</p>
              <p className="text-xs text-gray-600">Plans Created</p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.tested}</p>
              <p className="text-xs text-gray-600">Tested</p>
            </div>
            <div className="bg-white/80 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.successful}</p>
              <p className="text-xs text-gray-600">Successful</p>
            </div>
          </div>
        )}
      </div>

      {/* Create New Plan */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200 mb-6">
        <h4 className="font-semibold text-purple-900 mb-3">✨ Create New Plan</h4>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category:
            </label>
            <div className="flex gap-2">
              {(['personal', 'work', 'relationship'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setNewPlan(prev => ({ ...prev, category: cat }))}
                  className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
                    newPlan.category === cat 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                IF (trigger/obstacle):
              </label>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                {showTemplates ? 'Hide' : 'Show'} Templates
              </button>
            </div>
            <input
              type="text"
              value={newPlan.trigger}
              onChange={(e) => setNewPlan(prev => ({ ...prev, trigger: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., No time for workout"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              THEN I will (tiny alternative):
            </label>
            <input
              type="text"
              value={newPlan.alternative}
              onChange={(e) => setNewPlan(prev => ({ ...prev, alternative: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 7-minute HIIT circuit"
            />
          </div>
          
          <button
            onClick={addPlan}
            disabled={!newPlan.trigger || !newPlan.alternative}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-lg hover:from-purple-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Add Plan
          </button>
        </div>

        {/* Templates */}
        {showTemplates && (
          <div className="mt-4 space-y-3">
            {Object.entries(templates).map(([category, items]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-3">
                <h5 className="font-medium text-gray-700 capitalize mb-2">{category} Templates:</h5>
                <div className="space-y-1">
                  {items.slice(0, 3).map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyTemplate(template, category as IfThenPlan['category'])}
                      className="w-full text-left text-sm p-2 hover:bg-white rounded transition-colors"
                    >
                      <span className="font-medium">If:</span> {template.trigger}<br/>
                      <span className="font-medium">Then:</span> {template.alternative}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        {(['all', 'work', 'personal', 'relationship'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm capitalize transition-all ${
              filter === f 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div className="space-y-3">
        {filteredPlans.map(plan => (
          <div key={plan.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                plan.category === 'work' ? 'bg-blue-100 text-blue-700' :
                plan.category === 'personal' ? 'bg-green-100 text-green-700' :
                'bg-pink-100 text-pink-700'
              }`}>
                {plan.category}
              </span>
              <button
                onClick={() => deletePlan(plan.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">IF</span> {plan.trigger},
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">THEN</span> I will {plan.alternative}
              </p>
            </div>
            
            <div className="flex gap-2 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={plan.tested}
                  onChange={(e) => updatePlan(plan.id, { tested: e.target.checked })}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600">Tested</span>
              </label>
              
              {plan.tested && (
                <>
                  <button
                    onClick={() => updatePlan(plan.id, { successful: true })}
                    className={`px-2 py-1 text-xs rounded ${
                      plan.successful === true 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ✅ Worked
                  </button>
                  <button
                    onClick={() => updatePlan(plan.id, { successful: false })}
                    className={`px-2 py-1 text-xs rounded ${
                      plan.successful === false 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ❌ Didn't Work
                  </button>
                </>
              )}
            </div>
            
            {plan.tested && (
              <div className="mt-2">
                <input
                  type="text"
                  value={plan.notes}
                  onChange={(e) => updatePlan(plan.id, { notes: e.target.value })}
                  className="w-full text-sm px-2 py-1 border border-gray-200 rounded"
                  placeholder="Notes (what did you learn?)"
                />
              </div>
            )}
          </div>
        ))}
        
        {filteredPlans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">No plans yet</p>
            <p className="text-sm">Create your first If-Then plan above!</p>
          </div>
        )}
      </div>

      {/* Export Button */}
      {plans.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={exportPlans}
            className="px-4 py-2 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all"
          >
            Export All Plans
          </button>
        </div>
      )}
    </div>
  )
}
