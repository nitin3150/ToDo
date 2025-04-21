import React from 'react';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputClass = `
    input-field 
    ${error ? 'input-error' : ''} 
    ${fullWidth ? 'input-full-width' : ''} 
    ${className}
  `.trim();

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClass}
        {...props}
      />
      
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default Input;