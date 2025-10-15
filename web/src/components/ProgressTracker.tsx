import { useState, useEffect } from 'react'

interface DayEntry {
  day: string
  challengeFaced: string
  toolUsed: string
  outcome: string
  timeSaved: string
}

interface ProgressTrackerProps {
  title?: string
  lessonId?: number
}

export function ProgressTracker({ title = "Reframing Tracker", lessonId = 0 }: ProgressTrackerProps) {
  const [entries, setEntries] = useState<DayEntry[]>([
    { day: 'Mon', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' },
    { day: 'Tue', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' },
    { day: 'Wed', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' },
    { day: 'Thu', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' },
    { day: 'Fri', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' },
    { day: 'Sat', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' },
    { day: 'Sun', challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' }
  ])
  const [isSaved, setIsSaved] = useState(false)

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`progress_tracker_${lessonId}`)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setEntries(parsed.entries || entries)
      } catch (e) {
        console.error('Error loading progress tracker:', e)
      }
    }
  }, [lessonId])

  const handleInputChange = (dayIndex: number, field: keyof DayEntry, value: string) => {
    const newEntries = [...entries]
    newEntries[dayIndex] = {
      ...newEntries[dayIndex],
      [field]: value
    }
    setEntries(newEntries)
    setIsSaved(false)
  }

  const saveProgress = () => {
    const dataToSave = {
      entries,
      savedAt: new Date().toISOString(),
      lessonId
    }
    localStorage.setItem(`progress_tracker_${lessonId}`, JSON.stringify(dataToSave))
    setIsSaved(true)
  }

  const exportAsCSV = () => {
    const headers = ['Day', 'Challenge Faced', 'Tool Used', 'Outcome', 'Time Saved']
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => 
        [entry.day, entry.challengeFaced, entry.toolUsed, entry.outcome, entry.timeSaved]
          .map(field => `"${field}"`) // Wrap in quotes for CSV
          .join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `progress_tracker_week_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all entries?')) {
      setEntries(entries.map(e => ({ ...e, challengeFaced: '', toolUsed: '', outcome: '', timeSaved: '' })))
      setIsSaved(false)
    }
  }

  const getCompletionStats = () => {
    const filledDays = entries.filter(e => e.challengeFaced || e.toolUsed || e.outcome).length
    const totalTimeSaved = entries
      .map(e => {
        const match = e.timeSaved.match(/(\d+)/)
        return match ? parseInt(match[1]) : 0
      })
      .reduce((sum, time) => sum + time, 0)
    
    return { filledDays, totalTimeSaved }
  }

  const stats = getCompletionStats()

  const toolOptions = [
    'What Else?',
    'Reverse Thinking',
    'Perspective Switching',
    'Zoom Out/In',
    'SCAMPER',
    'Constraint Box',
    'Multiple Tools',
    'Other'
  ]

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          📊 {title} (This Week)
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">
            {stats.filledDays}/7 days tracked
          </span>
          {stats.totalTimeSaved > 0 && (
            <span className="text-green-600 font-semibold">
              {stats.totalTimeSaved} min saved
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="p-3 text-left font-semibold">Day</th>
              <th className="p-3 text-left font-semibold">Challenge Faced</th>
              <th className="p-3 text-left font-semibold">Tool Used</th>
              <th className="p-3 text-left font-semibold">Outcome</th>
              <th className="p-3 text-left font-semibold">Time Saved</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-3 font-medium text-gray-700">
                  {entry.day}
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-400 focus:outline-none"
                    placeholder="What happened?"
                    value={entry.challengeFaced}
                    onChange={(e) => handleInputChange(idx, 'challengeFaced', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <select
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-400 focus:outline-none"
                    value={entry.toolUsed}
                    onChange={(e) => handleInputChange(idx, 'toolUsed', e.target.value)}
                  >
                    <option value="">Select tool...</option>
                    {toolOptions.map(tool => (
                      <option key={tool} value={tool}>{tool}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-400 focus:outline-none"
                    placeholder="Result?"
                    value={entry.outcome}
                    onChange={(e) => handleInputChange(idx, 'outcome', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-200 rounded focus:border-blue-400 focus:outline-none"
                    placeholder="e.g., 30 min"
                    value={entry.timeSaved}
                    onChange={(e) => handleInputChange(idx, 'timeSaved', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={saveProgress}
          className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          {isSaved ? '✓ Saved' : 'Save Progress'}
        </button>
        <button
          onClick={exportAsCSV}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Export CSV
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          Clear
        </button>
      </div>

      {isSaved && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center">
          ✅ Your progress has been saved locally
        </div>
      )}

      {/* Reflection Prompts */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Weekly Reflection:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Which tool became most natural to use?</li>
          <li>• What patterns do you notice in your stuck points?</li>
          <li>• How has your stress response changed?</li>
          <li>• What tool do you want to practice more next week?</li>
        </ul>
      </div>
    </div>
  )
}

// Simplified version for other lessons
export function SimpleProgressTracker({ title = "Practice Tracker", fields = ['Activity', 'Date', 'Result', 'Notes'] }: { title?: string, fields?: string[] }) {
  const [rows, setRows] = useState<Record<string, string>[]>([
    Object.fromEntries(fields.map(f => [f, ''])),
    Object.fromEntries(fields.map(f => [f, ''])),
    Object.fromEntries(fields.map(f => [f, ''])),
    Object.fromEntries(fields.map(f => [f, ''])),
    Object.fromEntries(fields.map(f => [f, '']))
  ])

  const handleCellChange = (rowIndex: number, field: string, value: string) => {
    const newRows = [...rows]
    newRows[rowIndex][field] = value
    setRows(newRows)
  }

  const addRow = () => {
    setRows([...rows, Object.fromEntries(fields.map(f => [f, '']))])
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📈 {title}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {fields.map(field => (
                <th key={field} className="p-3 text-left font-semibold">{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {fields.map(field => (
                  <td key={field} className="p-2">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-200 rounded focus:border-purple-400 focus:outline-none"
                      value={row[field]}
                      onChange={(e) => handleCellChange(idx, field, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addRow}
        className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
      >
        + Add Row
      </button>
    </div>
  )
}
