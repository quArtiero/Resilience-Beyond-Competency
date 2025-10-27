import React, { useState, useEffect } from 'react'
import { InteractiveInput } from './InteractiveInput'

interface EnhancedInteractiveContentProps {
  content: string
  lessonId: number
  tabType: string
  className?: string
}

export const EnhancedInteractiveContent: React.FC<EnhancedInteractiveContentProps> = ({
  content,
  lessonId,
  tabType,
  className = ''
}) => {
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

  // Process inline markdown formatting with enhanced styling
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
      // Add bold text with enhanced styling
      elements.push(
        <strong key={`bold-${match.index}`} style={{ 
          fontWeight: '600', 
          color: '#1e40af',
          letterSpacing: '0.025em' 
        }}>
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
  
  // Enhanced input field component
  const EnhancedInput: React.FC<{ fieldId: string }> = ({ fieldId }) => {
    return (
      <input
        id={fieldId}
        name={fieldId}
        type="text"
        autoComplete="off"
        style={{
          display: 'inline-block',
          margin: '0 8px',
          padding: '8px 16px',
          minWidth: '250px',
          border: 'none',
          borderBottom: '2px solid #ddd6fe',
          backgroundColor: '#faf5ff',
          borderRadius: '4px 4px 0 0',
          fontSize: '15px',
          color: '#4c1d95',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          outline: 'none',
          fontFamily: 'inherit',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        }}
        placeholder="✍️ Type your response..."
        value={values[fieldId] || ''}
        onChange={(e) => handleInputChange(fieldId, e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onFocus={(e) => {
          e.target.style.backgroundColor = '#ffffff';
          e.target.style.borderBottomColor = '#7c3aed';
          e.target.style.boxShadow = '0 4px 6px -1px rgb(124 58 237 / 0.1)';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onBlur={(e) => {
          e.target.style.backgroundColor = '#faf5ff';
          e.target.style.borderBottomColor = '#ddd6fe';
          e.target.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
          e.target.style.transform = 'translateY(0)';
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.target) {
            (e.target as HTMLInputElement).style.backgroundColor = '#f3e8ff';
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.target) {
            (e.target as HTMLInputElement).style.backgroundColor = '#faf5ff';
          }
        }}
      />
    )
  }
  
  // Simple parsing with enhanced design
  const renderContent = () => {
    const lines = content.split('\n')
    let globalFieldIndex = 0
    let currentSection: JSX.Element[] = []
    let sections: JSX.Element[] = []
    
    const flushSection = () => {
      // Only create a section box if we have actual content (not just <br/> elements)
      const hasContent = currentSection.some(element => 
        element.type !== 'br' && 
        (element.props?.children || element.props?.style)
      )
      
      if (currentSection.length > 0 && hasContent) {
        sections.push(
          <div key={`section-${sections.length}`} style={{
            background: 'linear-gradient(to right, #faf5ff, #f3e8ff)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 2px 4px rgb(124 58 237 / 0.08)',
            border: '1px solid #e9d5ff'
          }}>
            {currentSection}
          </div>
        )
      }
      currentSection = []
    }
    
    lines.forEach((line, lineIdx) => {
      // Skip completely empty lines at the start of sections
      if (!line.trim() && currentSection.length === 0) {
        return
      }
      
      // Check if this is a section header
      if (line.startsWith('#')) {
        flushSection()
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
                <EnhancedInput key={fieldId} fieldId={fieldId} />
              )
            }
          }
          return elements
        }
        
        const lineContent = renderLineWithInputs()
        
        // Determine if this is a header, list item, or paragraph
        const cleanLine = line.replace(/\*\*/g, '').replace(/_____/g, '')
        if (cleanLine.startsWith('###')) {
          currentSection.push(
            <h3 key={lineIdx} style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: '#6b21a8', 
              marginTop: '20px', 
              marginBottom: '12px',
              letterSpacing: '0.025em',
              textTransform: 'uppercase',
              borderBottom: '2px solid #e9d5ff',
              paddingBottom: '8px'
            }}>
              {lineContent}
            </h3>
          )
        } else if (cleanLine.startsWith('##')) {
          sections.push(
            <h2 key={lineIdx} style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '28px', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
              {lineContent}
            </h2>
          )
        } else if (cleanLine.startsWith('#')) {
          sections.push(
            <h1 key={lineIdx} style={{ 
              fontSize: '1.875rem', 
              fontWeight: '800', 
              background: 'linear-gradient(135deg, #6b21a8, #7c3aed)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '32px', 
              marginBottom: '20px',
              letterSpacing: '-0.025em'
            }}>
              {lineContent}
            </h1>
          )
        } else if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          currentSection.push(
            <li key={lineIdx} style={{ 
              marginLeft: '28px', 
              marginTop: '8px', 
              marginBottom: '8px', 
              color: '#4c1d95',
              listStyleType: 'none',
              position: 'relative',
              paddingLeft: '24px'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                color: '#a855f7',
                fontSize: '18px'
              }}>▸</span>
              {lineContent}
            </li>
          )
        } else {
          currentSection.push(
            <p key={lineIdx} style={{ 
              marginTop: '12px', 
              marginBottom: '12px', 
              color: '#581c87',
              lineHeight: '1.75',
              fontSize: '16px'
            }}>
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
          currentSection.push(
            <h3 key={lineIdx} style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: '#6b21a8', 
              marginTop: '20px', 
              marginBottom: '12px',
              letterSpacing: '0.025em',
              textTransform: 'uppercase',
              borderBottom: '2px solid #e9d5ff',
              paddingBottom: '8px'
            }}>
              {content}
            </h3>
          )
        } else if (cleanLine.startsWith('##')) {
          flushSection()
          const content = processInlineFormatting(cleanLine.substring(2).trim())
          sections.push(
            <h2 key={lineIdx} style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '28px', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.25rem' }}>
                {cleanLine.includes('Part') ? '📝' : 
                 cleanLine.includes('Drill') ? '⚡' :
                 cleanLine.includes('Assessment') ? '📊' : '🎯'}
              </span>
              {content}
            </h2>
          )
        } else if (cleanLine.startsWith('#')) {
          flushSection()
          const content = processInlineFormatting(cleanLine.substring(1).trim())
          sections.push(
            <h1 key={lineIdx} style={{ 
              fontSize: '1.875rem', 
              fontWeight: '800', 
              background: 'linear-gradient(135deg, #6b21a8, #7c3aed)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '32px', 
              marginBottom: '20px',
              letterSpacing: '-0.025em',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {tabType === 'reflection' ? '🤔' : tabType === 'challenge' ? '🎯' : '📚'}
              </span>
              {content}
            </h1>
          )
        } else if (line.startsWith('- [ ]')) {
          // Enhanced checkbox with dash
          const checkboxId = `lesson-${lessonId}-${tabType}-checkbox-${lineIdx}`
          const checkboxText = line.substring(5).trim()
          const isChecked = checkboxStates[checkboxId] || false
          
          currentSection.push(
            <label 
              key={lineIdx} 
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '12px 0',
                marginLeft: '20px',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: '8px',
                background: isChecked ? 'linear-gradient(135deg, #f3e8ff, #e9d5ff)' : '#ffffff',
                border: `2px solid ${isChecked ? '#a855f7' : '#e9d5ff'}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isChecked ? '0 4px 6px -1px rgb(168 85 247 / 0.1)' : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                transform: isChecked ? 'scale(1.02)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (!isChecked) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#faf5ff';
                  (e.currentTarget as HTMLElement).style.borderColor = '#c084fc';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isChecked) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#ffffff';
                  (e.currentTarget as HTMLElement).style.borderColor = '#e9d5ff';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }
              }}
            >
              <input 
                type="checkbox" 
                style={{
                  marginRight: '12px',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#7c3aed',
                  transform: 'scale(1.2)'
                }}
                checked={isChecked}
                onChange={(e) => {
                  handleCheckboxChange(checkboxId, e.target.checked)
                }}
              />
              <span style={{ 
                color: isChecked ? '#6b21a8' : '#581c87',
                fontSize: '16px',
                fontWeight: isChecked ? '600' : '400',
                textDecoration: isChecked ? 'line-through' : 'none',
                opacity: isChecked ? 0.8 : 1
              }}>
                {processInlineFormatting(checkboxText)}
              </span>
              {isChecked && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '18px'
                }}>✅</span>
              )}
            </label>
          )
        } else if (cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          const content = processInlineFormatting(line.substring(2))
          currentSection.push(
            <li key={lineIdx} style={{ 
              marginLeft: '28px', 
              marginTop: '8px', 
              marginBottom: '8px', 
              color: '#4c1d95',
              listStyleType: 'none',
              position: 'relative',
              paddingLeft: '24px',
              fontSize: '16px'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                color: '#a855f7',
                fontSize: '18px'
              }}>▸</span>
              {content}
            </li>
          )
        } else if (line.trim() === '---') {
          currentSection.push(
            <hr key={lineIdx} style={{ 
              margin: '28px 0', 
              border: 'none',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #e9d5ff, transparent)'
            }} />
          )
        } else if (line.trim()) {
          currentSection.push(
            <p key={lineIdx} style={{ 
              marginTop: '12px', 
              marginBottom: '12px', 
              color: '#581c87',
              lineHeight: '1.75',
              fontSize: '16px'
            }}>
              {processedContent}
            </p>
          )
        }
        // Skip empty lines - don't add <br/> elements
      }
    })
    
    flushSection()
    
    return sections
  }

  return (
    <div className={className} style={{
      padding: '24px',
      background: 'linear-gradient(135deg, #ffffff, #faf5ff)',
      borderRadius: '16px',
      minHeight: '600px'
    }}>
      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        borderRadius: '12px',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgb(124 58 237 / 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>
            {tabType === 'reflection' ? '🤔' : tabType === 'challenge' ? '🎯' : '📚'}
          </span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '18px', textTransform: 'capitalize' }}>
              {tabType} Section
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              Interactive exercises and reflection prompts
            </div>
          </div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          Module 3: Cognitive Flexibility
        </div>
      </div>
      
      {renderContent()}
    </div>
  )
}
