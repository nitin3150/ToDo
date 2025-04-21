import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import Alert from '../ui/Alert';
import Card from '../ui/Card';
import './TodoList.css';

const TodoList = () => {
  const { todos, loading, error, refreshTodos } = useTodos();
  
  return (
    <div className="todo-list-container">
      <Card className="todo-card">
        <div className="todo-header">
          <h2>Your Tasks</h2>
          <button onClick={refreshTodos} className="refresh-button" disabled={loading}>
            Refresh
          </button>
        </div>
        
        <TodoForm />
        
        <TodoFilter />
        
        {error && <Alert type="error" message={error} />}
        
        <div className="todos-wrapper">
          {loading && todos.length === 0 ? (
            <div className="todo-loading">Loading tasks...</div>
          ) : todos.length === 0 ? (
            <div className="no-todos">No tasks found. Add a new one to get started!</div>
          ) : (
            <div className="todos-list">
              {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TodoList;