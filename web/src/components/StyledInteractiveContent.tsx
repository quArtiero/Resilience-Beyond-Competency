import React, { useState, useEffect } from 'react'
import { InteractiveInput } from './InteractiveInput'

interface StyledInteractiveContentProps {
  content: string
  lessonId: number
  tabType: string
  className?: string
}

export const StyledInteractiveContent: React.FC<StyledInteractiveContentProps> = ({
  content,
  lessonId,
  tabType
}) => {
  console.log('🎨 StyledInteractiveContent RENDERING:', {
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

  // Process markdown to React elements
  const renderContent = () => {
    const lines = content.split('\n')
    let globalFieldIndex = 0
    const elements: JSX.Element[] = []
    
    // Track table parsing
    let inTable = false
    let tableHeaders: string[] = []
    let tableRows: string[][] = []
    
    lines.forEach((line, lineIdx) => {
      // Handle tables
      if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const cells = line.split('|').filter(cell => cell.trim())
        
        if (cells.every(cell => cell.trim().match(/^-+$/))) {
          inTable = true
          return
        }
        
        if (!inTable && cells.length > 0) {
          tableHeaders = cells.map(cell => cell.trim())
          return
        }
        
        if (inTable) {
          tableRows.push(cells.map(cell => cell.trim()))
          
          const nextLine = lines[lineIdx + 1]
          if (!nextLine || !nextLine.includes('|') || !nextLine.trim().startsWith('|')) {
            // Render complete table
            elements.push(
              <table key={`table-${lineIdx}`} style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    {tableHeaders.map((header, idx) => (
                      <th key={idx} style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: '600',
                        color: '#111827',
                        borderBottom: '2px solid #e5e7eb'
                      }}>
                        {header.replace(/\*\*/g, '')}
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
                          padding: '12px',
                          color: '#4b5563',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          {cell.replace(/\*\*/g, '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )
            inTable = false
            tableHeaders = []
            tableRows = []
          }
          return
        }
      }
      
      // Handle input fields
      if (line.includes('_____')) {
        const parts = line.split('_____')
        const lineElements: (string | JSX.Element)[] = []
        
        parts.forEach((part, i) => {
          if (part) {
            lineElements.push(part)
          }
          if (i < parts.length - 1) {
            const fieldId = `lesson-${lessonId}-${tabType}-field-${globalFieldIndex}`
            globalFieldIndex++
            lineElements.push(
              <InteractiveInput
                key={fieldId}
                fieldId={fieldId}
                value={values[fieldId] || ''}
                onChange={(value) => handleInputChange(fieldId, value)}
                placeholder="Type your response..."
              />
            )
          }
        })
        
        const cleanLine = line.replace(/\*\*/g, '').replace(/_____/g, '')
        if (cleanLine.startsWith('#')) {
          const level = cleanLine.match(/^#+/)?.[0].length || 1
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
          const fontSize = level === 1 ? '32px' : level === 2 ? '24px' : '20px'
          const marginTop = level === 1 ? '32px' : level === 2 ? '24px' : '20px'
          
          elements.push(
            <HeadingTag key={lineIdx} style={{
              fontSize,
              fontWeight: '700',
              color: '#111827',
              marginTop,
              marginBottom: '12px',
              lineHeight: '1.2'
            }}>
              {lineElements}
            </HeadingTag>
          )
        } else {
          elements.push(
            <p key={lineIdx} style={{
              fontSize: '16px',
              color: '#4b5563',
              marginTop: '8px',
              marginBottom: '8px',
              lineHeight: '1.6'
            }}>
              {lineElements}
            </p>
          )
        }
        return
      }
      
      // Handle checkboxes
      if (line.startsWith('- [ ]')) {
        const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${lineIdx}`
        const checkboxText = line.substring(5).trim()
        const isChecked = checkboxStates[checkboxId] || false
        
        elements.push(
          <label key={lineIdx} style={{
            display: 'flex',
            alignItems: 'center',
            margin: '12px 0',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#374151'
          }}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(checkboxId, e.target.checked)}
              style={{
                marginRight: '10px',
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <span>{checkboxText}</span>
          </label>
        )
        return
      }
      
      // Handle headers
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1
        const text = line.replace(/^#+\s*/, '').trim()
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
        const fontSize = level === 1 ? '32px' : level === 2 ? '24px' : '20px'
        const marginTop = level === 1 ? '32px' : level === 2 ? '24px' : '20px'
        const color = level === 1 ? '#111827' : level === 2 ? '#1f2937' : '#374151'
        
        elements.push(
          <HeadingTag key={lineIdx} style={{
            fontSize: `${fontSize} !important`,
            fontWeight: `${level === 1 ? '800' : '700'} !important`,
            color: `${color} !important`,
            marginTop: `${marginTop} !important`,
            marginBottom: '12px !important',
            lineHeight: '1.2 !important',
            display: 'block !important'
          } as React.CSSProperties}>
            {text}
          </HeadingTag>
        )
        return
      }
      
      // Handle blockquotes
      if (line.startsWith('>')) {
        elements.push(
          <blockquote key={lineIdx} style={{
            borderLeft: '4px solid #10b981',
            paddingLeft: '20px',
            margin: '20px 0',
            fontStyle: 'italic',
            color: '#6b7280',
            backgroundColor: '#f0fdf4',
            padding: '16px 20px',
            borderRadius: '0 8px 8px 0'
          }}>
            {line.substring(1).trim()}
          </blockquote>
        )
        return
      }
      
      // Handle lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={lineIdx} style={{
            marginLeft: '24px',
            marginTop: '6px',
            marginBottom: '6px',
            color: '#4b5563',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            {line.substring(2).replace(/\*\*/g, '')}
          </li>
        )
        return
      }
      
      // Handle horizontal rules
      if (line.trim() === '---') {
        elements.push(
          <hr key={lineIdx} style={{
            margin: '32px 0',
            border: 'none',
            borderTop: '2px solid #e5e7eb'
          }} />
        )
        return
      }
      
      // Handle regular paragraphs with bold text
      if (line.trim()) {
        // Process bold text manually
        const parts: (string | JSX.Element)[] = []
        let lastIndex = 0
        const boldRegex = /\*\*(.*?)\*\*/g
        let match
        
        while ((match = boldRegex.exec(line)) !== null) {
          // Add text before bold
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index))
          }
          // Add bold text
          parts.push(
            <strong key={`bold-${lineIdx}-${match.index}`} style={{
              fontWeight: '700',
              color: '#111827'
            }}>
              {match[1]}
            </strong>
          )
          lastIndex = match.index + match[0].length
        }
        
        // Add remaining text
        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex))
        }
        
        // If no bold text was found, just use the line as is
        if (parts.length === 0) {
          parts.push(line)
        }
        
        elements.push(
          <p key={lineIdx} style={{
            fontSize: '16px',
            color: '#4b5563',
            marginTop: '8px',
            marginBottom: '8px',
            lineHeight: '1.6'
          }}>
            {parts}
          </p>
        )
      }
    })
    
    return elements
  }

  const renderedElements = renderContent()
  console.log('🎨 StyledInteractiveContent rendered:', renderedElements.length, 'elements')
  
  // Debug: Log first few elements to see what they contain
  renderedElements.slice(0, 3).forEach((el, i) => {
    console.log(`Element ${i}:`, {
      type: el?.type,
      key: el?.key,
      props: el?.props,
      content: el?.props?.children
    })
  })
  
  return (
    <div style={{
      maxWidth: '100%',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '3px solid #10b981',  // Add green border for visibility
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ color: '#ef4444', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        TEST: StyledInteractiveContent with {renderedElements.length} elements
      </div>
      <div style={{ border: '2px solid blue', padding: '10px', marginBottom: '20px' }}>
        <h2 style={{ color: '#000000', fontSize: '28px', fontWeight: 'bold' }}>
          Testing Direct Style - This Should Be Big and Black
        </h2>
        <p style={{ color: '#ff0000', fontSize: '20px' }}>
          This paragraph should be red and 20px
        </p>
        <p style={{ color: '#0000ff', fontSize: '16px' }}>
          This paragraph should be blue and 16px
        </p>
      </div>
      {renderedElements}
    </div>
  )
}
