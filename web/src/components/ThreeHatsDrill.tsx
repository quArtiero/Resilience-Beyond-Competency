import { useState, useEffect } from 'react'
import { User, AlertTriangle, Users, Save, Download } from 'lucide-react'

interface ThreeHatsData {
  situation: string
  userHat: string
  skepticHat: string
  collaboratorHat: string
  likelyNeeds: string[]
  earStatement: string
}

const needsOptions = [
  'clarity',
  'time',
  'predictability',
  'safety',
  'fairness',
  'status',
  'autonomy',
  'progress',
  'recognition'
]

export function ThreeHatsDrill() {
  const [data, setData] = useState<ThreeHatsData>(() => {
    const saved = localStorage.getItem('three-hats-drill')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      situation: '',
      userHat: '',
      skepticHat: '',
      collaboratorHat: '',
      likelyNeeds: [],
      earStatement: ''
    }
  })

  const [currentHat, setCurrentHat] = useState<'user' | 'skeptic' | 'collaborator'>('user')

  useEffect(() => {
    localStorage.setItem('three-hats-drill', JSON.stringify(data))
  }, [data])

  const toggleNeed = (need: string) => {
    const newNeeds = data.likelyNeeds.includes(need)
      ? data.likelyNeeds.filter(n => n !== need)
      : [...data.likelyNeeds, need].slice(0, 2) // Max 2 needs
    
    setData(prev => ({ ...prev, likelyNeeds: newNeeds }))
  }

  const getCompletionRate = () => {
    let completed = 0
    const total = 6
    
    if (data.situation) completed++
    if (data.userHat) completed++
    if (data.skepticHat) completed++
    if (data.collaboratorHat) completed++
    if (data.likelyNeeds.length >= 2) completed++
    if (data.earStatement) completed++
    
    return Math.round((completed / total) * 100)
  }

  const exportWorksheet = () => {
    const worksheet = `
3 HATS + NEEDS MAPPING
======================
Date: ${new Date().toLocaleDateString()}

SITUATION:
${data.situation || '[Not filled]'}

USER HAT:
As the end user, I need: ${data.userHat || '[Not filled]'}

SKEPTIC HAT:
This fails if: ${data.skepticHat || '[Not filled]'}

COLLABORATOR HAT:
Simplest workable version today: ${data.collaboratorHat || '[Not filled]'}

LIKELY NEEDS (Top 2):
${data.likelyNeeds.join(', ') || '[Not selected]'}

EAR STATEMENT:
${data.earStatement || '[Not filled]'}
`
    
    const blob = new Blob([worksheet], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `three-hats-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  const generateEARTemplate = () => {
    const empathy = data.userHat ? `their need for ${data.userHat.toLowerCase()}` : '[empathy]'
    const acknowledge = data.skepticHat ? `the risk of ${data.skepticHat.toLowerCase()}` : '[constraint]'
    const purpose = data.likelyNeeds[0] || '[purpose]'
    const reframe = data.collaboratorHat || '[solution]'
    
    return `I see ${empathy}. I'm aware of ${acknowledge}. If our purpose is ${purpose}, can we try ${reframe} for 48h and review?`
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">3 Hats + Needs Mapping</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Switch perspectives to understand all stakeholder needs.
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionRate()}%` }}
          />
        </div>
      </div>

      {/* Situation Input */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe Your Friction Point (1 line)
        </label>
        <input
          type="text"
          value={data.situation}
          onChange={(e) => setData(prev => ({ ...prev, situation: e.target.value }))}
          placeholder="e.g., PM wants Feature X by Friday but team says it's impossible"
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      {/* Hat Selector */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Put On Each Hat (30 seconds each)</h4>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setCurrentHat('user')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentHat === 'user'
                ? 'bg-blue-50 border-blue-400'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <User className={`w-8 h-8 mx-auto mb-2 ${
              currentHat === 'user' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="text-sm font-medium">User Hat</p>
          </button>
          
          <button
            onClick={() => setCurrentHat('skeptic')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentHat === 'skeptic'
                ? 'bg-orange-50 border-orange-400'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${
              currentHat === 'skeptic' ? 'text-orange-600' : 'text-gray-400'
            }`} />
            <p className="text-sm font-medium">Skeptic Hat</p>
          </button>
          
          <button
            onClick={() => setCurrentHat('collaborator')}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentHat === 'collaborator'
                ? 'bg-green-50 border-green-400'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Users className={`w-8 h-8 mx-auto mb-2 ${
              currentHat === 'collaborator' ? 'text-green-600' : 'text-gray-400'
            }`} />
            <p className="text-sm font-medium">Collaborator</p>
          </button>
        </div>

        {/* Hat-specific Input */}
        <div className="space-y-4">
          {currentHat === 'user' && (
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-blue-800 mb-2">
                User Hat: "As the end user, I need..."
              </label>
              <textarea
                value={data.userHat}
                onChange={(e) => setData(prev => ({ ...prev, userHat: e.target.value }))}
                placeholder="e.g., confidence that critical features work before launch"
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
            </div>
          )}
          
          {currentHat === 'skeptic' && (
            <div className="bg-orange-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-orange-800 mb-2">
                Skeptic Hat: "This fails if..." / "Guardrail needed..."
              </label>
              <textarea
                value={data.skepticHat}
                onChange={(e) => setData(prev => ({ ...prev, skepticHat: e.target.value }))}
                placeholder="e.g., we ship with critical bugs; guardrail: automated tests must pass"
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
            </div>
          )}
          
          {currentHat === 'collaborator' && (
            <div className="bg-green-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-green-800 mb-2">
                Collaborator Hat: "Simplest workable version today..."
              </label>
              <textarea
                value={data.collaboratorHat}
                onChange={(e) => setData(prev => ({ ...prev, collaboratorHat: e.target.value }))}
                placeholder="e.g., ship core feature with manual testing, defer nice-to-haves"
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
              />
            </div>
          )}
        </div>
      </div>

      {/* Needs Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Likely Needs (Select 2)
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {needsOptions.map(need => (
            <button
              key={need}
              onClick={() => toggleNeed(need)}
              disabled={data.likelyNeeds.length >= 2 && !data.likelyNeeds.includes(need)}
              className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                data.likelyNeeds.includes(need)
                  ? 'bg-purple-100 border-purple-400 text-purple-700'
                  : data.likelyNeeds.length >= 2
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              {need}
            </button>
          ))}
        </div>
      </div>

      {/* EAR Statement Builder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-800 mb-4">
          Build Your EAR Statement
        </h4>
        
        {data.situation && data.userHat && data.skepticHat && (
          <div className="bg-yellow-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Template:</strong> {generateEARTemplate()}
            </p>
          </div>
        )}
        
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your EAR Statement (Empathy → Acknowledge → Reframe)
        </label>
        <textarea
          value={data.earStatement}
          onChange={(e) => setData(prev => ({ ...prev, earStatement: e.target.value }))}
          placeholder="I see [empathy]. I'm aware of/constrained by [acknowledge]. If our purpose is [goal], can we try [solution] for 48h and review?"
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Summary */}
      {getCompletionRate() === 100 && (
        <div className="bg-green-50 rounded-lg shadow-md p-6">
          <h4 className="font-semibold text-green-800 mb-4">Your Complete Analysis</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-green-700">Situation:</span>
              <p className="text-green-800">{data.situation}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="font-medium text-blue-700">User Need:</span>
                <p className="text-blue-800">{data.userHat}</p>
              </div>
              <div>
                <span className="font-medium text-orange-700">Risk/Guardrail:</span>
                <p className="text-orange-800">{data.skepticHat}</p>
              </div>
              <div>
                <span className="font-medium text-green-700">Solution:</span>
                <p className="text-green-800">{data.collaboratorHat}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-purple-700">Core Needs:</span>
              <p className="text-purple-800">{data.likelyNeeds.join(', ')}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">EAR Statement:</span>
              <p className="text-gray-800 italic">"{data.earStatement}"</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            localStorage.setItem('three-hats-drill', JSON.stringify(data))
            alert('Worksheet saved!')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-5 h-5" />
          Save Progress
        </button>
        
        <button
          onClick={exportWorksheet}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="w-5 h-5" />
          Export Worksheet
        </button>
      </div>
    </div>
  )
}
