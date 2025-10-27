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

  // Process inline markdown formatting
  const processInlineFormatting = (text: string): (string | JSX.Element)[] => {
    const elements: (string | JSX.Element)[] = []
    let currentPos = 0
    
    // Find all bold text patterns
    const boldRegex = /\*\*(.+?)\*\*/g
    let match
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold
      if (match.index > currentPos) {
        elements.push(text.substring(currentPos, match.index))
      }
      // Add bold text
      elements.push(
        <strong key={`bold-${match.index}`} style={{ fontWeight: 'bold', color: '#111827' }}>
          {match[1]}
        </strong>
      )
      currentPos = match.index + match[0].length
    }
    
    // Add remaining text
    if (currentPos < text.length) {
      elements.push(text.substring(currentPos))
    }
    
    return elements.length > 0 ? elements : [text]
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
              // Process inline formatting in each part
              const formattedPart = processInlineFormatting(parts[i])
              elements.push(...formattedPart.map((item, idx) => 
                typeof item === 'string' 
                  ? <span key={`text-${lineIdx}-${i}-${idx}`}>{item}</span>
                  : React.cloneElement(item, { key: `formatted-${lineIdx}-${i}-${idx}` })
              ))
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
        const cleanLine = line.replace(/\*\*/g, '').replace(/_____/g, '')
        if (cleanLine.startsWith('###')) {
          return (
            <h3 key={lineIdx} style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginTop: '16px', marginBottom: '8px' }}>
              {lineContent}
            </h3>
          )
        } else if (cleanLine.startsWith('##')) {
          return (
            <h2 key={lineIdx} style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
              {lineContent}
            </h2>
          )
        } else if (cleanLine.startsWith('#')) {
          return (
            <h1 key={lineIdx} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginTop: '32px', marginBottom: '16px' }}>
              {lineContent}
            </h1>
          )
        } else if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          return (
            <li key={lineIdx} style={{ marginLeft: '24px', marginTop: '4px', marginBottom: '4px', color: '#374151', listStyleType: 'disc' }}>
              {lineContent}
            </li>
          )
        } else {
          return (
            <p key={lineIdx} style={{ marginTop: '8px', marginBottom: '8px', color: '#374151', lineHeight: '1.625' }}>
              {lineContent}
            </p>
          )
        }
      } else {
        // No underscores in this line - process formatting
        const processedContent = processInlineFormatting(line)
        
        // Clean line for checking type (remove bold markers)
        const cleanLine = line.replace(/\*\*/g, '')
        
        if (cleanLine.startsWith('###')) {
          const content = processInlineFormatting(cleanLine.substring(3).trim())
          return (
            <h3 key={lineIdx} style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginTop: '16px', marginBottom: '8px' }}>
              {content}
            </h3>
          )
        } else if (cleanLine.startsWith('##')) {
          const content = processInlineFormatting(cleanLine.substring(2).trim())
          return (
            <h2 key={lineIdx} style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
              {content}
            </h2>
          )
        } else if (cleanLine.startsWith('#')) {
          const content = processInlineFormatting(cleanLine.substring(1).trim())
          return (
            <h1 key={lineIdx} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginTop: '32px', marginBottom: '16px' }}>
              {content}
            </h1>
          )
        } else if (line.startsWith('- [ ]')) {
          // Checkbox with dash
          const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${lineIdx}`
          const checkboxText = line.substring(5).trim()
          const savedValue = localStorage.getItem(checkboxId)
          const [checked, setChecked] = React.useState(savedValue === 'true')
          
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
              />
              <span style={{ color: '#374151', fontSize: '16px' }}>
                {processInlineFormatting(checkboxText)}
              </span>
            </label>
          )
        } else if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          const content = processInlineFormatting(line.substring(2))
          return (
            <li key={lineIdx} style={{ marginLeft: '24px', marginTop: '4px', marginBottom: '4px', color: '#374151', listStyleType: 'disc' }}>
              {content}
            </li>
          )
        } else if (line.trim() === '---') {
          return <hr key={lineIdx} style={{ margin: '24px 0', borderColor: '#d1d5db' }} />
        } else if (line.trim()) {
          return (
            <p key={lineIdx} style={{ marginTop: '8px', marginBottom: '8px', color: '#374151', lineHeight: '1.625' }}>
              {processedContent}
            </p>
          )
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
