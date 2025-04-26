import React, { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import PrioritySelector from './PrioritySelector';
import Button from '../ui/Button';
import './TodoForm.css';

const TodoForm = () => {
  const { addTodo, loading } = useTodos();
  const [newTodo, setNewTodo] = useState({
    description: '',
    priority: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value) => {
    setNewTodo(prev => ({ ...prev, priority: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newTodo.description.trim()) return;
    
    await addTodo({
      ...newTodo,
      completed: false
    });
    
    setNewTodo({
      description: '',
      priority: 5
    });
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <input
          type="text"
          name="description"
          value={newTodo.description}
          onChange={handleChange}
          placeholder="Add a new task..."
          className="todo-input"
          disabled={loading}
          required
        />
        
        <div className="priority-field">
          <label>Priority:</label>
          <PrioritySelector 
            value={newTodo.priority} 
            onChange={handlePriorityChange} 
            disabled={loading}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading || !newTodo.description.trim()}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;