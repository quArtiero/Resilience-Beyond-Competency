import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface InteractiveMarkdownProps {
  content: string
  lessonId: number
  tabType: string
  className?: string
}

export const InteractiveMarkdown: React.FC<InteractiveMarkdownProps> = ({
  content,
  lessonId,
  tabType,
  className
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

  // Process content to replace underscores with input components
  const processContent = (text: string): (string | JSX.Element)[] => {
    let fieldIndex = 0
    const parts = text.split('_____')
    
    if (parts.length === 1) {
      // No underscores found, return as array with single text element
      return [text]
    }

    const elements: (string | JSX.Element)[] = []
    
    for (let i = 0; i < parts.length; i++) {
      // Add the text part
      if (parts[i]) {
        elements.push(parts[i])
      }
      
      // Add input field if not the last part
      if (i < parts.length - 1) {
        const fieldId = `lesson-${lessonId}-${tabType}-field-${fieldIndex}`
        elements.push(
          <input
            key={fieldId}
            type="text"
            className="inline-block mx-1 px-3 py-1 min-w-[200px] border-b-2 border-gray-300 focus:border-primary focus:outline-none transition-colors bg-gray-50 hover:bg-white"
            placeholder="Type your response..."
            value={values[fieldId] || ''}
            onChange={(e) => handleInputChange(fieldId, e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )
        fieldIndex++
      }
    }

    return elements
  }

  // Custom component for rendering paragraphs with inputs
  const components = {
    p: ({ children }: any) => {
      const text = children?.toString() || ''
      if (text.includes('_____')) {
        const processed = processContent(text)
        return (
          <p className="my-2">
            {processed.map((item: string | JSX.Element, idx: number) => 
              typeof item === 'string' ? <span key={idx}>{item}</span> : item
            )}
          </p>
        )
      }
      return <p className="my-2">{children}</p>
    },
    li: ({ children }: any) => {
      const text = children?.toString() || ''
      if (text.includes('_____')) {
        const processed = processContent(text)
        return (
          <li className="my-1">
            {processed.map((item: string | JSX.Element, idx: number) => 
              typeof item === 'string' ? <span key={idx}>{item}</span> : item
            )}
          </li>
        )
      }
      return <li className="my-1">{children}</li>
    },
    strong: ({ children }: any) => {
      const text = children?.toString() || ''
      if (text.includes('_____')) {
        const processed = processContent(text)
        return (
          <strong>
            {processed.map((item: string | JSX.Element, idx: number) => 
              typeof item === 'string' ? <span key={idx}>{item}</span> : item
            )}
          </strong>
        )
      }
      return <strong>{children}</strong>
    }
  }

  const classNames = ["prose", "prose-gray", "max-w-none", className].filter(Boolean).join(" ")

  return (
    <div className={classNames}>
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
