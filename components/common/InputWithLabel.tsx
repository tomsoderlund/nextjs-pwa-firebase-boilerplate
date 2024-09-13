import React from 'react'

interface InputWithLabelProps {
  name: string
  label?: string
  placeholder?: string
  value?: string
  type?: string
  autoComplete?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  name,
  label,
  placeholder,
  value,
  type,
  autoComplete,
  onChange,
  required,
  disabled
}) => {
  return (
    <div className='fieldset'>
      <label htmlFor={name}>{label}{required && <span className='required'>*</span>}</label>
      {type === 'multiline'
        ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            disabled={disabled}
            rows={3}
          />
          )
        : (
          <input
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            disabled={disabled}
          />
          )}
      <style jsx>{`
          .required {
            color: tomato;
          }
        `}
      </style>
    </div>
  )
}
export default InputWithLabel
