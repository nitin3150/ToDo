import React from 'react';
import Select from '../ui/Select';
import './PrioritySelector.css';

const PrioritySelector = ({ value, onChange, disabled = false }) => {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  const options = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: i + 1
  }));

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options}
      disabled={disabled}
      className="priority-selector"
    />
  );
};

export default PrioritySelector;