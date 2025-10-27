import React from 'react'

interface InteractiveInputProps {
  fieldId: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const InteractiveInput: React.FC<InteractiveInputProps> = ({
  fieldId,
  value,
  onChange,
  placeholder = "Type your response...",
  className = ""
}) => {
  return (
    <input
      id={fieldId}
      name={fieldId}
      type="text"
      autoComplete="off"
      style={{
        display: 'inline-block',
        margin: '0 4px',
        padding: '4px 12px',
        minWidth: '200px',
        borderBottom: '2px solid #d1d5db',
        backgroundColor: '#f9fafb',
        transition: 'all 0.2s',
        outline: 'none'
      }}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onFocus={(e) => {
        e.target.style.backgroundColor = '#ffffff';
        e.target.style.borderBottomColor = '#3b82f6';
      }}
      onBlur={(e) => {
        e.target.style.backgroundColor = '#f9fafb';
        e.target.style.borderBottomColor = '#d1d5db';
      }}
      onMouseEnter={(e) => {
        if (document.activeElement !== e.target) {
          (e.target as HTMLInputElement).style.backgroundColor = '#f3f4f6';
        }
      }}
      onMouseLeave={(e) => {
        if (document.activeElement !== e.target) {
          (e.target as HTMLInputElement).style.backgroundColor = '#f9fafb';
        }
      }}
    />
  )
}
