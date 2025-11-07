import React from 'react'

interface BasicStyledContentProps {
  content: string
  lessonId: number
  tabType: string
  className?: string
}

export const BasicStyledContent: React.FC<BasicStyledContentProps> = ({ content }) => {
  // Just render the content with basic styles using React createElement
  const lines = content.split('\n')
  
  return (
    <div>
      {/* Test Section - This MUST show colors */}
      <div style={{ padding: 20, backgroundColor: '#f0f0f0', marginBottom: 20 }}>
        <h1 style={{ color: 'red', fontSize: 48 }}>TEST: Red 48px Heading</h1>
        <h2 style={{ color: 'green', fontSize: 36 }}>TEST: Green 36px Subheading</h2>
        <p style={{ color: 'blue', fontSize: 24 }}>TEST: Blue 24px Paragraph</p>
      </div>
      
      {/* Actual content with forced inline styles */}
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) {
          return React.createElement('h1', {
            key: idx,
            style: { 
              color: '#000000', 
              fontSize: 32, 
              fontWeight: 700,
              marginTop: 20,
              marginBottom: 10
            }
          }, line.substring(2))
        }
        
        if (line.startsWith('## ')) {
          return React.createElement('h2', {
            key: idx,
            style: { 
              color: '#333333', 
              fontSize: 24, 
              fontWeight: 600,
              marginTop: 16,
              marginBottom: 8
            }
          }, line.substring(3))
        }
        
        if (line.startsWith('### ')) {
          return React.createElement('h3', {
            key: idx,
            style: { 
              color: '#555555', 
              fontSize: 20, 
              fontWeight: 600,
              marginTop: 12,
              marginBottom: 6
            }
          }, line.substring(4))
        }
        
        if (line.startsWith('- ')) {
          return React.createElement('li', {
            key: idx,
            style: { 
              color: '#666666', 
              fontSize: 16,
              marginLeft: 20,
              marginTop: 4,
              marginBottom: 4
            }
          }, line.substring(2))
        }
        
        if (line.trim() && !line.startsWith('#')) {
          return React.createElement('p', {
            key: idx,
            style: { 
              color: '#777777', 
              fontSize: 16,
              marginTop: 8,
              marginBottom: 8,
              lineHeight: 1.6
            }
          }, line)
        }
        
        return null
      })}
    </div>
  )
}
