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
      className={`inline-block mx-1 px-3 py-1 min-w-[200px] border-b-2 border-gray-300 focus:border-primary focus:outline-none transition-colors bg-gray-50 hover:bg-white ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    />
  )
}
