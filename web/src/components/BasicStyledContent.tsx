import React, { useState, useEffect } from 'react'

interface BasicStyledContentProps {
  content: string
  lessonId: number
  tabType: string
  className?: string
}

export const BasicStyledContent: React.FC<BasicStyledContentProps> = ({ content, lessonId, tabType }) => {
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

  // Parse content with complete styling
  const renderContent = () => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let globalFieldIndex = 0
    let inTable = false
    let tableHeaders: string[] = []
    let tableRows: string[][] = []
    
    lines.forEach((line, idx) => {
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
          
          const nextLine = lines[idx + 1]
          if (!nextLine || !nextLine.includes('|') || !nextLine.trim().startsWith('|')) {
            elements.push(
              <table key={`table-${idx}`} style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    {tableHeaders.map((header, hidx) => (
                      <th key={hidx} style={{
                        padding: 12,
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#111827',
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: 14
                      }}>
                        {header.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, ridx) => (
                    <tr key={ridx} style={{
                      backgroundColor: ridx % 2 === 0 ? '#ffffff' : '#f9fafb'
                    }}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} style={{
                          padding: 12,
                          color: '#4b5563',
                          borderBottom: '1px solid #e5e7eb',
                          fontSize: 14
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
            // Handle bold text in the part
            const boldProcessed = part.split(/\*\*(.*?)\*\*/g).map((text, tidx) => {
              if (tidx % 2 === 1) {
                return <strong key={`bold-${idx}-${i}-${tidx}`} style={{ fontWeight: 700, color: '#111827' }}>{text}</strong>
              }
              return text
            })
            lineElements.push(...boldProcessed)
          }
          
          if (i < parts.length - 1) {
            const fieldId = `lesson-${lessonId}-${tabType}-field-${globalFieldIndex}`
            globalFieldIndex++
            lineElements.push(
              <input
                key={fieldId}
                type="text"
                value={values[fieldId] || ''}
                onChange={(e) => handleInputChange(fieldId, e.target.value)}
                placeholder="Type your response..."
                style={{
                  display: 'inline-block',
                  margin: '0 8px',
                  padding: '8px 16px',
                  minWidth: 240,
                  fontSize: 16,
                  fontWeight: 500,
                  border: '2px solid transparent',
                  borderBottom: '3px solid #667eea',
                  backgroundColor: '#f8f9ff',
                  borderRadius: 8,
                  outline: 'none',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 4px rgba(102,126,234,0.1)'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#ffffff'
                  e.target.style.borderBottomColor = '#764ba2'
                  e.target.style.boxShadow = '0 4px 12px rgba(118,75,162,0.2)'
                  e.target.style.transform = 'translateY(-1px)'
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '#f8f9ff'
                  e.target.style.borderBottomColor = '#667eea'
                  e.target.style.boxShadow = '0 2px 4px rgba(102,126,234,0.1)'
                  e.target.style.transform = 'translateY(0)'
                }}
              />
            )
          }
        })
        
        const cleanLine = line.replace(/\*\*/g, '').replace(/_____/g, '')
        if (cleanLine.startsWith('#')) {
          const level = cleanLine.match(/^#+/)?.[0].length || 1
          elements.push(
            <div key={idx} style={{
              fontSize: level === 1 ? 32 : level === 2 ? 24 : 20,
              fontWeight: 700,
              color: '#111827',
              marginTop: level === 1 ? 32 : level === 2 ? 24 : 16,
              marginBottom: level === 1 ? 16 : 12
            }}>
              {lineElements}
            </div>
          )
        } else {
          elements.push(
            <p key={idx} style={{
              fontSize: 16,
              color: '#4b5563',
              marginTop: 8,
              marginBottom: 8,
              lineHeight: 1.6
            }}>
              {lineElements}
            </p>
          )
        }
        return
      }
      
      // Handle checkboxes
      if (line.startsWith('- [ ]')) {
        const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${idx}`
        const checkboxText = line.substring(5).trim()
        const isChecked = checkboxStates[checkboxId] || false
        
        elements.push(
          <label key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            margin: '14px 0',
            marginLeft: 24,
            cursor: 'pointer',
            fontSize: 16,
            color: '#475569',
            padding: '12px 16px',
            borderRadius: 10,
            backgroundColor: isChecked ? 'rgba(102,126,234,0.08)' : 'rgba(248,249,255,0.5)',
            border: `2px solid ${isChecked ? '#667eea' : 'transparent'}`,
            transition: 'all 0.3s',
            transform: isChecked ? 'translateX(4px)' : 'translateX(0)'
          }}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(checkboxId, e.target.checked)}
              style={{
                marginRight: 12,
                width: 20,
                height: 20,
                cursor: 'pointer',
                accentColor: '#667eea'
              }}
            />
            <span style={{ 
              color: isChecked ? '#667eea' : '#64748b',
              fontWeight: isChecked ? 600 : 400,
              textDecoration: isChecked ? 'line-through' : 'none',
              textDecorationColor: '#667eea'
            }}>{checkboxText}</span>
          </label>
        )
        return
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={idx} style={{ 
            fontSize: 36,
            fontWeight: 800,
            color: '#1e293b',
            marginTop: 32,
            marginBottom: 20,
            lineHeight: 1.2,
            borderBottom: '3px solid #667eea',
            paddingBottom: 12
          }}>
            {line.substring(2)}
          </h1>
        )
        return
      }
      
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} style={{ 
            fontSize: 28,
            fontWeight: 700,
            color: '#334155',
            marginTop: 28,
            marginBottom: 16,
            lineHeight: 1.3,
            borderLeft: '4px solid #764ba2',
            paddingLeft: 16
          }}>
            {line.substring(3)}
          </h2>
        )
        return
      }
      
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} style={{ 
            fontSize: 22,
            fontWeight: 600,
            color: '#475569',
            marginTop: 24,
            marginBottom: 12,
            lineHeight: 1.4
          }}>
            {line.substring(4)}
          </h3>
        )
        return
      }
      
      // Handle blockquotes
      if (line.startsWith('>')) {
        elements.push(
          <blockquote key={idx} style={{
            borderLeft: '4px solid #10b981',
            paddingLeft: 20,
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
        const text = line.substring(2)
        // Process bold text in list items
        const processedText = text.split(/\*\*(.*?)\*\*/g).map((part, pidx) => {
          if (pidx % 2 === 1) {
            return <strong key={`bold-${idx}-${pidx}`} style={{ fontWeight: 700, color: '#111827' }}>{part}</strong>
          }
          return part
        })
        
        elements.push(
          <li key={idx} style={{
            marginLeft: 24,
            marginTop: 6,
            marginBottom: 6,
            color: '#4b5563',
            fontSize: 16,
            lineHeight: 1.6,
            listStyleType: 'disc'
          }}>
            {processedText}
          </li>
        )
        return
      }
      
      // Handle horizontal rules
      if (line.trim() === '---') {
        elements.push(
          <hr key={idx} style={{
            margin: '32px 0',
            border: 'none',
            borderTop: '2px solid #e5e7eb'
          }} />
        )
        return
      }
      
      // Handle regular paragraphs with bold text
      if (line.trim()) {
        const processedLine = line.split(/\*\*(.*?)\*\*/g).map((part, pidx) => {
          if (pidx % 2 === 1) {
            return <strong key={`bold-${idx}-${pidx}`} style={{ 
              fontWeight: 700, 
              color: '#1e293b',
              backgroundColor: '#fef3c7',
              padding: '2px 4px',
              borderRadius: 3
            }}>{part}</strong>
          }
          return part
        })
        
        elements.push(
          <p key={idx} style={{
            fontSize: 17,
            color: '#475569',
            marginTop: 12,
            marginBottom: 12,
            lineHeight: 1.7,
            letterSpacing: '0.01em'
          }}>
            {processedLine}
          </p>
        )
      }
    })
    
    return elements
  }
  
  return (
    <div style={{
      maxWidth: '100%',
      padding: 32,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: 'linear-gradient(to bottom, #ffffff, #fafafa)'
    }}>
      <div style={{
        marginBottom: 24,
        padding: 20,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 12,
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Module 3: Cognitive Flexibility
        </h2>
        <p style={{ margin: '8px 0 0 0', fontSize: 14, opacity: 0.9 }}>
          Interactive Learning Experience
        </p>
      </div>
      {renderContent()}
    </div>
  )
}
