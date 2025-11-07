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
  tabType
}) => {
  console.log('🎨 SimpleInteractiveContent RENDERING:', {
    lessonId,
    tabType,
    contentLength: content?.length || 0,
    contentPreview: content?.substring(0, 100)
  })
  
  const [values, setValues] = useState<{ [key: string]: string }>({})
  const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Load saved values from localStorage
    const savedValues: { [key: string]: string } = {}
    const savedCheckboxes: { [key: string]: boolean } = {}
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
    
    // Load checkbox states
    const lines = content.split('\n')
    lines.forEach((line, lineIdx) => {
      if (line.startsWith('- [ ]')) {
        const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${lineIdx}`
        const savedState = localStorage.getItem(checkboxId)
        if (savedState !== null) {
          savedCheckboxes[checkboxId] = savedState === 'true'
        }
      }
    })
    
    setValues(savedValues)
    setCheckboxStates(savedCheckboxes)
  }, [content, lessonId, tabType])

  const handleInputChange = (fieldId: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldId]: value }))
    localStorage.setItem(fieldId, value)
  }

  const handleCheckboxChange = (checkboxId: string, checked: boolean) => {
    setCheckboxStates(prev => ({ ...prev, [checkboxId]: checked }))
    localStorage.setItem(checkboxId, checked.toString())
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
        <strong key={`bold-${match.index}`}>
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
    let inTable = false
    let tableHeaders: string[] = []
    let tableRows: string[][] = []
    let skipNext = false
    
    return lines.map((line, lineIdx) => {
      // Skip lines that are part of table processing
      if (skipNext) {
        skipNext = false
        return null
      }
      
      // Check if this is a table row
      if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const cells = line.split('|').filter(cell => cell.trim())
        
        // Check if it's a separator row (like |---|---|)
        if (cells.every(cell => cell.trim().match(/^-+$/))) {
          inTable = true
          return null // Don't render separator row
        }
        
        // If we haven't captured headers yet, this is the header row
        if (!inTable && cells.length > 0) {
          tableHeaders = cells.map(cell => cell.trim())
          skipNext = true // Skip the separator row that follows headers
          return null // Don't render yet, wait for complete table
        }
        
        // This is a data row
        if (inTable) {
          tableRows.push(cells.map(cell => cell.trim()))
          
          // Check if next line is not a table row to render the complete table
          const nextLine = lines[lineIdx + 1]
          if (!nextLine || !nextLine.includes('|') || !nextLine.trim().startsWith('|')) {
            // Render the complete table
            const table = (
              <div key={`table-${lineIdx}`} style={{ overflowX: 'auto', marginTop: '16px', marginBottom: '16px' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      {tableHeaders.map((header, idx) => (
                        <th key={idx} style={{
                          borderBottom: '2px solid #e5e7eb',
                          borderRight: idx < tableHeaders.length - 1 ? '1px solid #e5e7eb' : 'none',
                          padding: '12px',
                          textAlign: 'left',
                          fontWeight: 'bold',
                          color: '#111827',
                          fontSize: '14px'
                        }}>
                          {typeof processInlineFormatting(header) === 'string' 
                            ? processInlineFormatting(header) 
                            : processInlineFormatting(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, rowIdx) => (
                      <tr key={rowIdx} style={{ 
                        backgroundColor: rowIdx % 2 === 0 ? '#ffffff' : '#f9fafb' 
                      }}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} style={{
                            borderBottom: '1px solid #e5e7eb',
                            borderRight: cellIdx < row.length - 1 ? '1px solid #e5e7eb' : 'none',
                            padding: '12px',
                            color: '#374151',
                            fontSize: '14px'
                          }}>
                            {typeof processInlineFormatting(cell) === 'string' 
                              ? processInlineFormatting(cell) 
                              : processInlineFormatting(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
            // Reset table tracking
            inTable = false
            tableHeaders = []
            tableRows = []
            return table
          }
          return null // Don't render individual rows
        }
        return null
      }
      
      // Reset table state if we hit a non-table line while in table mode
      if (inTable && !line.includes('|')) {
        inTable = false
        tableHeaders = []
        tableRows = []
      }
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
            <h3 key={lineIdx}>
              {lineContent}
            </h3>
          )
        } else if (cleanLine.startsWith('##')) {
          return (
            <h2 key={lineIdx}>
              {lineContent}
            </h2>
          )
        } else if (cleanLine.startsWith('#')) {
          return (
            <h1 key={lineIdx}>
              {lineContent}
            </h1>
          )
        } else if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          return (
            <li key={lineIdx}>
              {lineContent}
            </li>
          )
        } else {
          return (
            <p key={lineIdx}>
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
            <h3 key={lineIdx}>
              {content}
            </h3>
          )
        } else if (cleanLine.startsWith('##')) {
          const content = processInlineFormatting(cleanLine.substring(2).trim())
          return (
            <h2 key={lineIdx}>
              {content}
            </h2>
          )
        } else if (cleanLine.startsWith('#')) {
          const content = processInlineFormatting(cleanLine.substring(1).trim())
          return (
            <h1 key={lineIdx}>
              {content}
            </h1>
          )
        } else if (line.startsWith('- [ ]')) {
          // Checkbox with dash
          const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${lineIdx}`
          const checkboxText = line.substring(5).trim()
          const isChecked = checkboxStates[checkboxId] || false
          
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
                checked={isChecked}
                onChange={(e) => {
                  handleCheckboxChange(checkboxId, e.target.checked)
                }}
              />
              <span style={{ color: '#374151', fontSize: '16px' }}>
                {processInlineFormatting(checkboxText)}
              </span>
            </label>
          )
        } else if (cleanLine.startsWith('> ')) {
          const content = processInlineFormatting(line.substring(2))
          return (
            <blockquote key={lineIdx}>
              {content}
            </blockquote>
          )
        } else if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          const content = processInlineFormatting(line.substring(2))
          return (
            <li key={lineIdx}>
              {content}
            </li>
          )
        } else if (line.trim() === '---') {
          return <hr key={lineIdx} />
        } else if (line.trim()) {
          return (
            <p key={lineIdx}>
              {processedContent}
            </p>
          )
        } else {
          return <br key={lineIdx} />
        }
      }
      
      return null
    }).filter(element => element !== null)
  }

  const renderedContent = renderContent()
  console.log('🎨 SimpleInteractiveContent rendered elements:', renderedContent.length, 'elements')
  
  return (
    <div className="simple-interactive-content">
      <style>{`
        .simple-interactive-content {
          max-width: 100%;
          color: #1f2937;
          padding: 16px;
          background-color: #ffffff;
          border-radius: 8px;
        }
        .simple-interactive-content h1 {
          font-size: 2rem !important;
          font-weight: 700 !important;
          color: #111827 !important;
          margin-top: 32px !important;
          margin-bottom: 16px !important;
        }
        .simple-interactive-content h2 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          color: #1f2937 !important;
          margin-top: 24px !important;
          margin-bottom: 12px !important;
        }
        .simple-interactive-content h3 {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: #374151 !important;
          margin-top: 20px !important;
          margin-bottom: 8px !important;
        }
        .simple-interactive-content p {
          margin-top: 8px !important;
          margin-bottom: 8px !important;
          color: #4b5563 !important;
          line-height: 1.625 !important;
        }
        .simple-interactive-content strong {
          font-weight: 700 !important;
          color: #111827 !important;
        }
        .simple-interactive-content li {
          margin-left: 24px !important;
          margin-top: 4px !important;
          margin-bottom: 4px !important;
          color: #374151 !important;
          list-style-type: disc !important;
        }
        .simple-interactive-content blockquote {
          border-left: 4px solid #d1d5db !important;
          padding-left: 16px !important;
          margin-top: 12px !important;
          margin-bottom: 12px !important;
          font-style: italic !important;
          color: #6b7280 !important;
        }
        .simple-interactive-content hr {
          margin: 24px 0 !important;
          border-color: #e5e7eb !important;
        }
        .simple-interactive-content table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 16px 0 !important;
        }
        .simple-interactive-content th {
          background-color: #f9fafb !important;
          border: 1px solid #e5e7eb !important;
          padding: 12px !important;
          text-align: left !important;
          font-weight: 600 !important;
        }
        .simple-interactive-content td {
          border: 1px solid #e5e7eb !important;
          padding: 12px !important;
        }
      `}</style>
      {renderedContent}
    </div>
  )
}
