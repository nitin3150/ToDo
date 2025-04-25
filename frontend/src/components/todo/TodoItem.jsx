import React, { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import PrioritySelector from './PrioritySelector';
import Button from '../ui/Button';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const { toggleComplete, updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: todo.description,
    priority: todo.priority
  });

  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      description: todo.description,
      priority: todo.priority
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value) => {
    setEditData(prev => ({ ...prev, priority: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(todo.id, editData);
    setIsEditing(false);
  };

  const getPriorityClass = () => {
    if (todo.priority >= 8) return 'priority-high';
    if (todo.priority >= 4) return 'priority-medium';
    return 'priority-low';
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${getPriorityClass()}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            name="title"
            value={editData.description}
            onChange={handleChange}
            className="edit-input"
            autoFocus
            required
          />
          
          <div className="edit-priority">
            <label>Priority:</label>
            <PrioritySelector 
              value={editData.priority} 
              onChange={handlePriorityChange} 
            />
          </div>
          
          <div className="edit-actions">
            <Button type="submit" variant="success" size="small">
              Save
            </Button>
            <Button type="button" variant="secondary" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              className="todo-checkbox"
            />
            
            <div className="todo-text">
              <span className="todo-title">{todo.description}</span>
              <span className="todo-priority">Priority: {todo.priority}</span>
            </div>
          </div>
          
          <div className="todo-actions">
            <Button 
              variant="primary" 
              size="small" 
              onClick={handleEdit}
              disabled={todo.completed}
            >
              Edit
            </Button>
            <Button variant="danger" size="small" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;