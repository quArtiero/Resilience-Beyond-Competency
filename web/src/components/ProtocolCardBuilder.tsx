import { useState, useEffect } from 'react'
import { Shield, Download, Save } from 'lucide-react'

interface ProtocolCard {
  triggers: string[]
  signals: {
    first: string
    backup: string
    redFlag: string
  }
  reframeQuestions: string[]
  recoveryProtocol: string[]
}

export function ProtocolCardBuilder() {
  const [card, setCard] = useState<ProtocolCard>(() => {
    const saved = localStorage.getItem('protocol-card')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      triggers: ['', '', ''],
      signals: {
        first: '',
        backup: '',
        redFlag: ''
      },
      reframeQuestions: [
        'Is this story 100% true?',
        'What would [trusted advisor] say?',
        'What serves the purpose here?'
      ],
      recoveryProtocol: [
        'STOP + 3 breaths',
        'Name feeling in 5 words',
        'One ≤10-min action'
      ]
    }
  })

  useEffect(() => {
    localStorage.setItem('protocol-card', JSON.stringify(card))
  }, [card])

  const updateTrigger = (index: number, value: string) => {
    const newTriggers = [...card.triggers]
    newTriggers[index] = value
    setCard(prev => ({ ...prev, triggers: newTriggers }))
  }

  const updateSignal = (type: keyof typeof card.signals, value: string) => {
    setCard(prev => ({
      ...prev,
      signals: {
        ...prev.signals,
        [type]: value
      }
    }))
  }

  const updateReframeQuestion = (index: number, value: string) => {
    const newQuestions = [...card.reframeQuestions]
    newQuestions[index] = value
    setCard(prev => ({ ...prev, reframeQuestions: newQuestions }))
  }

  const exportCard = () => {
    const cardText = `
MY PERSONAL PROTOCOL CARD
=========================

MY TOP 3 TRIGGERS:
1. ${card.triggers[0] || '___________'}
2. ${card.triggers[1] || '___________'}
3. ${card.triggers[2] || '___________'}

MY EARLY SIGNALS:
First signal: ${card.signals.first || '___________'}
Backup signal: ${card.signals.backup || '___________'}
Red flag signal: ${card.signals.redFlag || '___________'}

MY REFRAME QUESTIONS:
• ${card.reframeQuestions[0]}
• ${card.reframeQuestions[1]}
• ${card.reframeQuestions[2]}

MY RECOVERY PROTOCOL:
1. ${card.recoveryProtocol[0]}
2. ${card.recoveryProtocol[1]}
3. ${card.recoveryProtocol[2]}
`
    
    const blob = new Blob([cardText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `protocol-card-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  const getCompletionRate = () => {
    let completed = 0
    const total = 6 // 3 triggers + 3 signals
    
    card.triggers.forEach(t => { if (t) completed++ })
    if (card.signals.first) completed++
    if (card.signals.backup) completed++
    if (card.signals.redFlag) completed++
    
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Your Personal Protocol Card</h3>
          <span className="text-sm text-gray-600">
            {getCompletionRate()}% Complete
          </span>
        </div>
        <p className="text-gray-600">
          Create a pocket card with your personal regulation protocol.
        </p>
      </div>

      {/* Card Builder */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Triggers */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            MY TOP 3 TRIGGERS
          </h4>
          <div className="space-y-3">
            {[0, 1, 2].map(index => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-8 text-center font-bold text-gray-600">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={card.triggers[index]}
                  onChange={(e) => updateTrigger(index, e.target.value)}
                  placeholder={`e.g., ${
                    ['Last-minute deadline changes', 'Being interrupted in meetings', 'Unclear expectations'][index]
                  }`}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Signals */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-500" />
            MY EARLY SIGNALS
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-32 text-sm font-medium text-gray-600">
                First signal:
              </span>
              <input
                type="text"
                value={card.signals.first}
                onChange={(e) => updateSignal('first', e.target.value)}
                placeholder="e.g., Jaw tightens"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-32 text-sm font-medium text-gray-600">
                Backup signal:
              </span>
              <input
                type="text"
                value={card.signals.backup}
                onChange={(e) => updateSignal('backup', e.target.value)}
                placeholder="e.g., Breath becomes shallow"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-32 text-sm font-medium text-gray-600">
                Red flag signal:
              </span>
              <input
                type="text"
                value={card.signals.redFlag}
                onChange={(e) => updateSignal('redFlag', e.target.value)}
                placeholder="e.g., Voice gets sharp"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Reframe Questions */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            MY REFRAME QUESTIONS
          </h4>
          <div className="space-y-3">
            {card.reframeQuestions.map((question, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-gray-400">•</span>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => updateReframeQuestion(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Protocol */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            MY RECOVERY PROTOCOL
          </h4>
          <div className="bg-green-50 rounded-lg p-4">
            <ol className="space-y-2">
              {card.recoveryProtocol.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-bold text-green-700">{index + 1}.</span>
                  <span className="text-green-700">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs text-green-600 mt-3">
              Keep this card visible or in your pocket for quick reference
            </p>
          </div>
        </div>
      </div>

      {/* Card Preview */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Card Preview</h4>
        <div className="bg-white rounded-lg p-4 shadow-sm text-sm font-mono whitespace-pre-wrap">
          <div className="border-2 border-dashed border-gray-300 p-4">
            <div className="text-center font-bold mb-2">PROTOCOL CARD</div>
            <div className="space-y-3">
              <div>
                <strong>TRIGGERS:</strong>
                {card.triggers.map((t, i) => (
                  <div key={i}>{i + 1}. {t || '________'}</div>
                ))}
              </div>
              <div>
                <strong>SIGNALS:</strong>
                <div>1st: {card.signals.first || '________'}</div>
                <div>2nd: {card.signals.backup || '________'}</div>
                <div>Red: {card.signals.redFlag || '________'}</div>
              </div>
              <div>
                <strong>PROTOCOL:</strong>
                {card.recoveryProtocol.map((step, i) => (
                  <div key={i}>{i + 1}. {step}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            localStorage.setItem('protocol-card', JSON.stringify(card))
            alert('Protocol card saved!')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-5 h-5" />
          Save Card
        </button>
        
        <button
          onClick={exportCard}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Download className="w-5 h-5" />
          Export Card
        </button>
      </div>
    </div>
  )
}
