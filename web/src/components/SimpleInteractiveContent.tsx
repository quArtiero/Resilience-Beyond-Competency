import React, { useState, useEffect } from 'react'
import { InteractiveInput } from './InteractiveInput'

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
    let globalFieldIndex = 0
    
    return lines.map((line, lineIdx) => {
      // Check if line contains underscores
      if (line.includes('_____')) {
        const parts = line.split('_____')
        
        // Build the complete line with inputs
        const renderLineWithInputs = () => {
          const elements = []
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]) {
              elements.push(<span key={`text-${lineIdx}-${i}`}>{parts[i]}</span>)
            }
            
            if (i < parts.length - 1) {
              const fieldId = `lesson-${lessonId}-${tabType}-field-${globalFieldIndex}`
              globalFieldIndex++
              elements.push(
                <InteractiveInput
                  key={fieldId}
                  fieldId={fieldId}
                  value={values[fieldId] || ''}
                  onChange={(value) => handleInputChange(fieldId, value)}
                  placeholder="Type your response..."
                />
              )
            }
          }
          return elements
        }
        
        const lineContent = renderLineWithInputs()
        
        // Determine if this is a header, list item, or paragraph
        if (line.startsWith('###')) {
          return (
            <h3 key={lineIdx} style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginTop: '16px', marginBottom: '8px' }}>
              {lineContent}
            </h3>
          )
        } else if (line.startsWith('##')) {
          return (
            <h2 key={lineIdx} style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
              {lineContent}
            </h2>
          )
        } else if (line.startsWith('#')) {
          return (
            <h1 key={lineIdx} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginTop: '32px', marginBottom: '16px' }}>
              {lineContent}
            </h1>
          )
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <li key={lineIdx} style={{ marginLeft: '24px', marginTop: '4px', marginBottom: '4px', color: '#374151', listStyleType: 'disc' }}>
              {lineContent}
            </li>
          )
        } else if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={lineIdx} style={{ marginTop: '8px', marginBottom: '8px', fontWeight: 'bold', color: '#111827' }}>
              {lineContent}
            </p>
          )
        } else {
          return (
            <p key={lineIdx} style={{ marginTop: '8px', marginBottom: '8px', color: '#374151', lineHeight: '1.625' }}>
              {lineContent}
            </p>
          )
        }
      } else {
        // No underscores in this line - render as is
        if (line.startsWith('###')) {
          return <h3 key={lineIdx} style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginTop: '16px', marginBottom: '8px' }}>{line.substring(3).trim()}</h3>
        } else if (line.startsWith('##')) {
          return <h2 key={lineIdx} style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>{line.substring(2).trim()}</h2>
        } else if (line.startsWith('#')) {
          return <h1 key={lineIdx} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginTop: '32px', marginBottom: '16px' }}>{line.substring(1).trim()}</h1>
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={lineIdx} style={{ marginLeft: '24px', marginTop: '4px', marginBottom: '4px', color: '#374151', listStyleType: 'disc' }}>{line.substring(2)}</li>
        } else if (line.startsWith('[ ]')) {
          const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${lineIdx}`
          const [checked, setChecked] = React.useState(() => 
            localStorage.getItem(checkboxId) === 'true'
          )
          return (
            <label 
              key={lineIdx} 
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '8px 0',
                marginLeft: '16px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <input 
                type="checkbox" 
                style={{
                  marginRight: '8px',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  accentColor: '#3b82f6'
                }}
                checked={checked}
                onChange={(e) => {
                  const newValue = e.target.checked
                  setChecked(newValue)
                  localStorage.setItem(checkboxId, newValue.toString())
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <span style={{ color: '#374151', fontSize: '16px' }}>
                {line.substring(3).trim()}
              </span>
            </label>
          )
        } else if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={lineIdx} style={{ marginTop: '8px', marginBottom: '8px', fontWeight: 'bold', color: '#111827' }}>{line.replace(/\*\*/g, '')}</p>
        } else if (line.trim() === '---') {
          return <hr key={lineIdx} style={{ margin: '24px 0', borderColor: '#d1d5db' }} />
        } else if (line.trim()) {
          return <p key={lineIdx} style={{ marginTop: '8px', marginBottom: '8px', color: '#374151', lineHeight: '1.625' }}>{line}</p>
        } else {
          return <br key={lineIdx} />
        }
      }
      
      return null
    }).filter(Boolean)
  }

  return (
    <div style={{ maxWidth: '100%', color: '#1f2937' }}>
      {renderContent()}
    </div>
  )
}
