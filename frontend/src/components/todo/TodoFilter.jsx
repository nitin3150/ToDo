import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import Select from '../ui/Select';
import './TodoFilter.css';

const TodoFilter = () => {
  const { filters, setFilter } = useTodos();

  const handleStatusChange = (e) => {
    setFilter('status', e.target.value);
  };

  const handlePriorityChange = (e) => {
    setFilter('priority', e.target.value);
  };

  const handleSearchChange = (e) => {
    setFilter('search', e.target.value);
  };

  return (
    <div className="todo-filter">
      <div className="filter-row">
        <div className="filter-group">
          <label>Status:</label>
          <Select
            value={filters.status}
            onChange={handleStatusChange}
            options={[
              { value: 'all', label: 'All' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' }
            ]}
          />
        </div>
        
        <div className="filter-group">
          <label>Priority:</label>
          <Select
            value={filters.priority}
            onChange={handlePriorityChange}
            options={[
              { value: 'all', label: 'All' },
              { value: 'high', label: 'High (8-10)' },
              { value: 'medium', label: 'Medium (4-7)' },
              { value: 'low', label: 'Low (1-3)' }
            ]}
          />
        </div>
        
        <div className="filter-group search-group">
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;