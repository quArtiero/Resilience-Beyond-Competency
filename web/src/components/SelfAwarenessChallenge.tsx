import { useState, useEffect } from 'react'
import { Clock, MapPin, Mail, Users, Calendar, AlertCircle, Target, Shield, Download, Save } from 'lucide-react'

interface ChallengeData {
  // Heat Maps
  morningHeat: string
  midMorningHeat: string
  afternoonHeat: string
  lateAfternoonHeat: string
  eveningHeat: string
  nightHeat: string
  
  meetingsWithHeat: string
  emailsFromHeat: string
  tasksInvolvingHeat: string
  locationsHeat: string
  daysHeat: string
  patternCluster: string
  
  // Scenarios
  scenarioAResponse: string
  scenarioBResponse: string
  scenarioCResponse: string
  
  // Protocol Card
  trigger1: string
  trigger2: string
  trigger3: string
  firstSignal: string
  backupSignal: string
  redFlagSignal: string
  
  // Exit Commitment
  earliestWarning: string
  defaultPattern: string
  ifThenLine: string
  practiceTomorrow: string
}

export function SelfAwarenessChallenge() {
  const [data, setData] = useState<ChallengeData>(() => {
    const saved = localStorage.getItem('self-awareness-challenge')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      morningHeat: '',
      midMorningHeat: '',
      afternoonHeat: '',
      lateAfternoonHeat: '',
      eveningHeat: '',
      nightHeat: '',
      meetingsWithHeat: '',
      emailsFromHeat: '',
      tasksInvolvingHeat: '',
      locationsHeat: '',
      daysHeat: '',
      patternCluster: '',
      scenarioAResponse: '',
      scenarioBResponse: '',
      scenarioCResponse: '',
      trigger1: '',
      trigger2: '',
      trigger3: '',
      firstSignal: '',
      backupSignal: '',
      redFlagSignal: '',
      earliestWarning: '',
      defaultPattern: '',
      ifThenLine: '',
      practiceTomorrow: ''
    }
  })

  const [activeSection, setActiveSection] = useState<'heat-map' | 'scenarios' | 'protocol' | 'commitment'>('heat-map')

  useEffect(() => {
    localStorage.setItem('self-awareness-challenge', JSON.stringify(data))
  }, [data])

  const updateField = (field: keyof ChallengeData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const getCompletionRate = () => {
    const fields = Object.values(data)
    const filled = fields.filter(f => f.trim() !== '').length
    return Math.round((filled / fields.length) * 100)
  }

  const exportData = () => {
    const exportData = {
      ...data,
      completionRate: getCompletionRate(),
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `self-awareness-challenge-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Self-Awareness Lab</h2>
          <div className="text-sm text-gray-600">
            Completion: {getCompletionRate()}%
          </div>
        </div>
        <p className="text-gray-600">
          Build your personal early warning system through practical exercises and scenario practice.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveSection('heat-map')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeSection === 'heat-map'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Heat Maps
        </button>
        <button
          onClick={() => setActiveSection('scenarios')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeSection === 'scenarios'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Scenarios
        </button>
        <button
          onClick={() => setActiveSection('protocol')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeSection === 'protocol'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Protocol Card
        </button>
        <button
          onClick={() => setActiveSection('commitment')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeSection === 'commitment'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Exit Commitment
        </button>
      </div>

      {/* Heat Map Section */}
      {activeSection === 'heat-map' && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            Mini-Lab 1: Heat Map Creation
          </h3>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-4">Time Heat Map</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Morning (6-9am):</span>
                <input
                  type="text"
                  value={data.morningHeat}
                  onChange={(e) => updateField('morningHeat', e.target.value)}
                  placeholder="e.g., Email overload, rushed prep"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Mid-morning (9-12pm):</span>
                <input
                  type="text"
                  value={data.midMorningHeat}
                  onChange={(e) => updateField('midMorningHeat', e.target.value)}
                  placeholder="e.g., Meeting conflicts"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Afternoon (12-3pm):</span>
                <input
                  type="text"
                  value={data.afternoonHeat}
                  onChange={(e) => updateField('afternoonHeat', e.target.value)}
                  placeholder="e.g., Post-lunch energy dip"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Late afternoon (3-6pm):</span>
                <input
                  type="text"
                  value={data.lateAfternoonHeat}
                  onChange={(e) => updateField('lateAfternoonHeat', e.target.value)}
                  placeholder="e.g., Deadline pressure"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Evening (6-9pm):</span>
                <input
                  type="text"
                  value={data.eveningHeat}
                  onChange={(e) => updateField('eveningHeat', e.target.value)}
                  placeholder="e.g., Family transitions"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Night (after 9pm):</span>
                <input
                  type="text"
                  value={data.nightHeat}
                  onChange={(e) => updateField('nightHeat', e.target.value)}
                  placeholder="e.g., Late work requests"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-4">Context Heat Map</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Meetings with:</span>
                <input
                  type="text"
                  value={data.meetingsWithHeat}
                  onChange={(e) => updateField('meetingsWithHeat', e.target.value)}
                  placeholder="e.g., Senior leadership, certain teammates"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Emails from:</span>
                <input
                  type="text"
                  value={data.emailsFromHeat}
                  onChange={(e) => updateField('emailsFromHeat', e.target.value)}
                  placeholder="e.g., Specific clients, departments"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Tasks involving:</span>
                <input
                  type="text"
                  value={data.tasksInvolvingHeat}
                  onChange={(e) => updateField('tasksInvolvingHeat', e.target.value)}
                  placeholder="e.g., Budget reviews, presentations"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Locations:</span>
                <input
                  type="text"
                  value={data.locationsHeat}
                  onChange={(e) => updateField('locationsHeat', e.target.value)}
                  placeholder="e.g., Open office, conference room B"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="w-40 text-sm">Days:</span>
                <input
                  type="text"
                  value={data.daysHeat}
                  onChange={(e) => updateField('daysHeat', e.target.value)}
                  placeholder="e.g., Mondays, end of month"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-800 mb-2">Pattern Analysis:</p>
            <div className="flex items-center gap-3">
              <span className="text-sm">Where do spikes cluster?</span>
              <input
                type="text"
                value={data.patternCluster}
                onChange={(e) => updateField('patternCluster', e.target.value)}
                placeholder="e.g., Mornings + leadership meetings + budget tasks"
                className="flex-1 px-3 py-2 bg-white border rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Scenarios Section */}
      {activeSection === 'scenarios' && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Mini-Lab 2: Rapid Response Drills
          </h3>

          <div className="space-y-6">
            {/* Scenario A */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3">Scenario A: The Late-Night Email</h4>
              <div className="bg-gray-50 rounded p-3 mb-3 text-sm">
                <p><strong>Time:</strong> 10:47 PM</p>
                <p><strong>Subject:</strong> "Need this by 7am"</p>
                <p><strong>Body signals:</strong> Chest squeeze, jaw clench</p>
                <p><strong>Default story:</strong> "They don't respect boundaries"</p>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response (using Signal→Label→Choose):
              </label>
              <textarea
                value={data.scenarioAResponse}
                onChange={(e) => updateField('scenarioAResponse', e.target.value)}
                placeholder="e.g., STOP + 3 breaths. Label: 'Frustrated and pressured.' Need: Clarity on true urgency. Next: 'Hi, I see the 7am request. Is this blocking something critical, or could we discuss priority order in the morning?'"
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
              />
            </div>

            {/* Scenario B */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3">Scenario B: The Public Correction</h4>
              <div className="bg-gray-50 rounded p-3 mb-3 text-sm">
                <p><strong>Context:</strong> Team meeting</p>
                <p><strong>Event:</strong> Manager corrects your data in front of everyone</p>
                <p><strong>Body signals:</strong> Face heat, throat tight</p>
                <p><strong>Default story:</strong> "I look incompetent"</p>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response (using Signal→Label→Choose):
              </label>
              <textarea
                value={data.scenarioBResponse}
                onChange={(e) => updateField('scenarioBResponse', e.target.value)}
                placeholder="e.g., Notice face heat. Label: 'Embarrassed and defensive.' Need: Maintain credibility. Next: 'Thanks for catching that. The updated figure is X. Let me send the corrected analysis after the meeting.'"
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
              />
            </div>

            {/* Scenario C */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3">Scenario C: The Silent Treatment</h4>
              <div className="bg-gray-50 rounded p-3 mb-3 text-sm">
                <p><strong>Context:</strong> After presenting idea</p>
                <p><strong>Event:</strong> Complete silence from group</p>
                <p><strong>Body signals:</strong> Stomach drop, hands cold</p>
                <p><strong>Default story:</strong> "They hate it"</p>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response (using Signal→Label→Choose):
              </label>
              <textarea
                value={data.scenarioCResponse}
                onChange={(e) => updateField('scenarioCResponse', e.target.value)}
                placeholder="e.g., Feel stomach drop. Label: 'Uncertain and exposed.' Reframe: 'They might be processing.' Next: 'I know that's a lot to absorb. What questions come up first, or would you prefer time to review?'"
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* Protocol Card Section */}
      {activeSection === 'protocol' && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Mini-Lab 3: Build Your Protocol Card
          </h3>

          <div>
            <h4 className="font-medium text-gray-800 mb-4">MY TOP 3 TRIGGERS:</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 font-medium">1.</span>
                <input
                  type="text"
                  value={data.trigger1}
                  onChange={(e) => updateField('trigger1', e.target.value)}
                  placeholder="e.g., Last-minute deadline changes"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 font-medium">2.</span>
                <input
                  type="text"
                  value={data.trigger2}
                  onChange={(e) => updateField('trigger2', e.target.value)}
                  placeholder="e.g., Being interrupted in meetings"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 font-medium">3.</span>
                <input
                  type="text"
                  value={data.trigger3}
                  onChange={(e) => updateField('trigger3', e.target.value)}
                  placeholder="e.g., Unclear expectations"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-4">MY EARLY SIGNALS:</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-32 text-sm">First signal:</span>
                <input
                  type="text"
                  value={data.firstSignal}
                  onChange={(e) => updateField('firstSignal', e.target.value)}
                  placeholder="e.g., Jaw tightens"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-32 text-sm">Backup signal:</span>
                <input
                  type="text"
                  value={data.backupSignal}
                  onChange={(e) => updateField('backupSignal', e.target.value)}
                  placeholder="e.g., Breath becomes shallow"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-32 text-sm">Red flag signal:</span>
                <input
                  type="text"
                  value={data.redFlagSignal}
                  onChange={(e) => updateField('redFlagSignal', e.target.value)}
                  placeholder="e.g., Voice gets sharp"
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">MY RECOVERY PROTOCOL:</h4>
            <ol className="list-decimal list-inside text-sm text-green-700">
              <li>STOP + 3 breaths</li>
              <li>Name feeling in 5 words</li>
              <li>One ≤10-min action</li>
            </ol>
            <p className="text-xs text-green-600 mt-2">
              Keep this card visible or in your pocket for quick reference
            </p>
          </div>
        </div>
      )}

      {/* Exit Commitment Section */}
      {activeSection === 'commitment' && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Exit Commitment
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1. "My earliest warning signal is..."
              </label>
              <input
                type="text"
                value={data.earliestWarning}
                onChange={(e) => updateField('earliestWarning', e.target.value)}
                placeholder="e.g., jaw clenching when I read certain emails"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. "My default story pattern is..."
              </label>
              <input
                type="text"
                value={data.defaultPattern}
                onChange={(e) => updateField('defaultPattern', e.target.value)}
                placeholder="e.g., catastrophizing - assuming worst-case scenarios"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. "My new If-Then line is: If ___, then ___"
              </label>
              <input
                type="text"
                value={data.ifThenLine}
                onChange={(e) => updateField('ifThenLine', e.target.value)}
                placeholder="e.g., If I feel my jaw clench, then I will pause and take 3 deep breaths before responding"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4. "I'll practice this tomorrow when..."
              </label>
              <input
                type="text"
                value={data.practiceTomorrow}
                onChange={(e) => updateField('practiceTomorrow', e.target.value)}
                placeholder="e.g., I check my morning emails at 9am"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-2">Homework for Next Lesson:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Your completed Trigger Map (minimum 3 entries)</li>
              <li>• Your Body Signal Bank (top 5 signals)</li>
              <li>• Three rewritten stories (before/after)</li>
              <li>• One situation where you caught and chose differently</li>
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            localStorage.setItem('self-awareness-challenge', JSON.stringify(data))
            alert('Progress saved!')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Progress
        </button>
        
        <button
          onClick={exportData}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          Export Challenge Data
        </button>
      </div>
    </div>
  )
}
