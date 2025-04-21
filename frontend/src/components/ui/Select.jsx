import React from 'react';
import './Select.css';

const Select = ({
  options,
  value,
  onChange,
  name,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const selectClass = `select-field ${className}`.trim();

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={selectClass}
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;