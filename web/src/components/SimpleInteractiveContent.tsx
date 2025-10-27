import React, { useState, useEffect } from 'react'

interface SimpleInteractiveContentProps {
  content: string
  lessonId: number
  tabType: string
  className?: string
}

export const SimpleInteractiveContent: React.FC<SimpleInteractiveContentProps> = ({
  content,
  lessonId,
  tabType,
  className = ''
}) => {
  const [values, setValues] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    // Load saved values from localStorage
    const savedValues: { [key: string]: string } = {}
    let fieldIndex = 0
    const regex = /_____/g
    
    while (regex.exec(content) !== null) {
      const fieldId = `lesson-${lessonId}-${tabType}-field-${fieldIndex}`
      const savedValue = localStorage.getItem(fieldId)
      if (savedValue) {
        savedValues[fieldId] = savedValue
      }
      fieldIndex++
    }
    
    setValues(savedValues)
  }, [content, lessonId, tabType])

  const handleInputChange = (fieldId: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldId]: value }))
    localStorage.setItem(fieldId, value)
  }

  // Simple parsing - split by lines and process each line
  const renderContent = () => {
    const lines = content.split('\n')
    let fieldIndex = 0
    
    return lines.map((line, lineIdx) => {
      // Check if line contains underscores
      if (line.includes('_____')) {
        const parts = line.split('_____')
        const lineElements: (string | JSX.Element)[] = []
        
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            lineElements.push(parts[i])
          }
          
          if (i < parts.length - 1) {
            const fieldId = `lesson-${lessonId}-${tabType}-field-${fieldIndex}`
            lineElements.push(
              <input
                key={`${lineIdx}-${fieldIndex}`}
                type="text"
                className="inline-block mx-1 px-3 py-1 min-w-[200px] border-b-2 border-gray-300 focus:border-primary focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                placeholder="Type your response..."
                value={values[fieldId] || ''}
                onChange={(e) => handleInputChange(fieldId, e.target.value)}
              />
            )
            fieldIndex++
          }
        }
        
        // Determine if this is a header, list item, or paragraph
        if (line.startsWith('###')) {
          return (
            <h3 key={lineIdx} className="text-lg font-bold mt-4 mb-2">
              {lineElements}
            </h3>
          )
        } else if (line.startsWith('##')) {
          return (
            <h2 key={lineIdx} className="text-xl font-bold mt-6 mb-3">
              {lineElements}
            </h2>
          )
        } else if (line.startsWith('#')) {
          return (
            <h1 key={lineIdx} className="text-2xl font-bold mt-8 mb-4">
              {lineElements}
            </h1>
          )
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <li key={lineIdx} className="ml-6 my-1">
              {lineElements}
            </li>
          )
        } else if (line.startsWith('**') && line.endsWith('**')) {
          // Bold text
          const boldContent = line.replace(/\*\*/g, '')
          const boldParts = boldContent.split('_____')
          const boldElements: (string | JSX.Element)[] = []
          
          for (let i = 0; i < boldParts.length; i++) {
            if (boldParts[i]) {
              boldElements.push(boldParts[i])
            }
            
            if (i < boldParts.length - 1) {
              const fieldId = `lesson-${lessonId}-${tabType}-field-${fieldIndex - (parts.length - 1) + i}`
              boldElements.push(
                <input
                  key={`${lineIdx}-bold-${i}`}
                  type="text"
                  className="inline-block mx-1 px-3 py-1 min-w-[200px] border-b-2 border-gray-300 focus:border-primary focus:outline-none transition-colors bg-gray-50 hover:bg-white font-bold"
                  placeholder="Type your response..."
                  value={values[fieldId] || ''}
                  onChange={(e) => handleInputChange(fieldId, e.target.value)}
                />
              )
            }
          }
          
          return (
            <p key={lineIdx} className="my-2 font-bold">
              {boldElements}
            </p>
          )
        } else if (lineElements.length > 0) {
          return (
            <p key={lineIdx} className="my-2">
              {lineElements}
            </p>
          )
        }
      } else {
        // No underscores in this line - render as is
        if (line.startsWith('###')) {
          return <h3 key={lineIdx} className="text-lg font-bold mt-4 mb-2">{line.substring(3).trim()}</h3>
        } else if (line.startsWith('##')) {
          return <h2 key={lineIdx} className="text-xl font-bold mt-6 mb-3">{line.substring(2).trim()}</h2>
        } else if (line.startsWith('#')) {
          return <h1 key={lineIdx} className="text-2xl font-bold mt-8 mb-4">{line.substring(1).trim()}</h1>
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={lineIdx} className="ml-6 my-1">{line.substring(2)}</li>
        } else if (line.startsWith('[ ]')) {
          return (
            <label key={lineIdx} className="flex items-center my-1 ml-4">
              <input type="checkbox" className="mr-2" />
              <span>{line.substring(3).trim()}</span>
            </label>
          )
        } else if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={lineIdx} className="my-2 font-bold">{line.replace(/\*\*/g, '')}</p>
        } else if (line.trim() === '---') {
          return <hr key={lineIdx} className="my-4 border-gray-300" />
        } else if (line.trim()) {
          return <p key={lineIdx} className="my-2">{line}</p>
        } else {
          return <br key={lineIdx} />
        }
      }
      
      return null
    }).filter(Boolean)
  }

  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      {renderContent()}
    </div>
  )
}
