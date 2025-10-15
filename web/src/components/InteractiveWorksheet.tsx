import { useState } from 'react'

interface WorksheetField {
  id: string
  label: string
  type?: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
  rows?: number
}

interface WorksheetSection {
  title: string
  description?: string
  fields: WorksheetField[]
}

interface InteractiveWorksheetProps {
  title: string
  sections: WorksheetSection[]
  onSave?: (responses: Record<string, string>) => void
}

export function InteractiveWorksheet({ title, sections, onSave }: InteractiveWorksheetProps) {
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [isSaved, setIsSaved] = useState(false)

  const handleInputChange = (fieldId: string, value: string) => {
    setResponses({ ...responses, [fieldId]: value })
    setIsSaved(false)
  }

  const handleSave = () => {
    // Save to localStorage
    const worksheetData = {
      title,
      responses,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem(`worksheet_${title}`, JSON.stringify(worksheetData))
    setIsSaved(true)
    
    if (onSave) {
      onSave(responses)
    }
  }

  const handleExport = () => {
    const text = sections.map(section => {
      const sectionText = [`## ${section.title}`, section.description || '']
      section.fields.forEach(field => {
        const response = responses[field.id] || '[not filled]'
        sectionText.push(`**${field.label}:** ${response}`)
      })
      return sectionText.join('\n')
    }).join('\n\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_')}_worksheet.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const completionPercentage = () => {
    const totalFields = sections.reduce((acc, section) => acc + section.fields.length, 0)
    const filledFields = Object.values(responses).filter(r => r.trim()).length
    return Math.round((filledFields / totalFields) * 100)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📝 {title}
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {completionPercentage()}% Complete
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            {section.title}
          </h3>
          {section.description && (
            <p className="text-sm text-gray-600 mb-4">{section.description}</p>
          )}
          
          <div className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    rows={field.rows || 3}
                    placeholder={field.placeholder}
                    value={responses[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                ) : field.type === 'select' && field.options ? (
                  <select
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    value={responses[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  >
                    <option value="">Select an option...</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none"
                    placeholder={field.placeholder}
                    value={responses[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          {isSaved ? '✓ Saved' : 'Save Progress'}
        </button>
        <button
          onClick={handleExport}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Export as Text
        </button>
      </div>

      {isSaved && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center">
          ✅ Your responses have been saved locally
        </div>
      )}
    </div>
  )
}

// Pre-configured worksheet for Lesson 4 Reframing Sprint
export function ReframingSprintWorksheet() {
  const sections: WorksheetSection[] = [
    {
      title: 'Phase 1: Bridge → Purpose',
      description: 'Identify what broke and what you\'re really trying to achieve',
      fields: [
        { id: 'bridge', label: 'Bridge (method) that broke', placeholder: 'e.g., Team meeting cancelled' },
        { id: 'purpose', label: 'Purpose (true outcome)', placeholder: 'e.g., Get consensus on project direction' }
      ]
    },
    {
      title: 'Phase 2: What Else?',
      description: 'Generate 3 options (include one cheap & fast)',
      fields: [
        { id: 'option1', label: 'Option 1', placeholder: 'First alternative approach' },
        { id: 'option2', label: 'Option 2 (cheap & fast)', placeholder: 'Quick and easy solution' },
        { id: 'option3', label: 'Option 3', placeholder: 'Backup plan' }
      ]
    },
    {
      title: 'Phase 3: Perspective Switching',
      description: 'See through 3 different lenses',
      fields: [
        { id: 'user_hat', label: '👤 User Hat', placeholder: 'What matters most to the user?' },
        { id: 'skeptic_hat', label: '🔍 Skeptic Hat', placeholder: 'What could go wrong?' },
        { id: 'builder_hat', label: '🔨 Builder Hat', placeholder: 'Simplest MVP?' }
      ]
    },
    {
      title: 'Phase 4: Constraint Box',
      description: 'Solve with €0, <2 hours, no new tools',
      fields: [
        { id: 'constraint_solution', label: 'Constraint-based solution', type: 'textarea', rows: 2 }
      ]
    },
    {
      title: 'Phase 5: Pick & Plan',
      description: 'Choose your path forward',
      fields: [
        { id: 'chosen_option', label: 'I will test this option', placeholder: 'Which option will you pursue?' },
        { id: 'timeframe', label: 'In the next', type: 'select', options: ['24 hours', '48 hours', '3 days', '1 week'] },
        { id: 'success_metric', label: 'Success looks like', placeholder: 'How will you measure success?' },
        { id: 'first_step', label: 'First step (calendar it)', placeholder: 'What will you do first?' }
      ]
    }
  ]

  return (
    <InteractiveWorksheet
      title="12-Minute Reframing Sprint Worksheet"
      sections={sections}
      onSave={(responses) => {
        console.log('Sprint worksheet saved:', responses)
      }}
    />
  )
}

// Pre-configured worksheet for Personal Go-To Reframe
export function PersonalReframeWorksheet() {
  const sections: WorksheetSection[] = [
    {
      title: 'Your Personal Go-To Reframe',
      description: 'Create a sentence you\'ll keep on your phone/desk',
      fields: [
        { id: 'common_obstacle', label: 'When this common obstacle occurs', placeholder: 'e.g., my study plan breaks' },
        { id: 'my_purpose', label: 'My purpose is', placeholder: 'e.g., recall under pressure' },
        { 
          id: 'first_tool', 
          label: 'My first tool is', 
          type: 'select',
          options: ['What Else?', 'Reverse Thinking', 'Perspective Switching', 'Zoom Out/In', 'SCAMPER', 'Constraint Box']
        },
        { 
          id: 'full_statement', 
          label: 'My complete reframe statement', 
          type: 'textarea',
          placeholder: 'When [obstacle] breaks, my purpose is [outcome], and my first tool is [tool]'
        }
      ]
    }
  ]

  return (
    <InteractiveWorksheet
      title="Personal Reframe Designer"
      sections={sections}
      onSave={(responses) => {
        console.log('Personal reframe saved:', responses)
      }}
    />
  )
}
