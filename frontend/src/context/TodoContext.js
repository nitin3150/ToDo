// src/context/TodoContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { token, isAuthenticated } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: 'all', // all, active, completed
    priority: 'all', // all, high (8-10), medium (4-7), low (1-3)
    search: ''
  });

  const loadTodos = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await fetchTodos(token);
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTodos();
    } else {
      setTodos([]);
    }
  }, [isAuthenticated, loadTodos]);

  const addTodo = async (todoData) => {
    setLoading(true);
    setError('');
    try {
      const newTodo = await createTodo(todoData, token);
      setTodos([...todos, newTodo]);
      return newTodo;
    } catch (err) {
      setError('Failed to add todo: ' + (err.message || 'Unknown error'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTodoItem = async (id, updates) => {
    setLoading(true);
    setError('');
    try {
      const updatedTodo = await updateTodo(id, updates, token);
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError('Failed to update todo: ' + (err.message || 'Unknown error'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id) => {
    setLoading(true);
    setError('');
    try {
      await deleteTodo(id, token);
      setTodos(todos.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete todo: ' + (err.message || 'Unknown error'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      return updateTodoItem(id, { completed: !todo.completed });
    }
    return null;
  };

  const setFilter = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredTodos = () => {
    return todos.filter(todo => {
      // Filter by status
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;
      
      // Filter by priority
      if (filters.priority === 'high' && todo.priority < 8) return false;
      if (filters.priority === 'medium' && (todo.priority < 4 || todo.priority > 7)) return false;
      if (filters.priority === 'low' && todo.priority > 3) return false;
      
      // Filter by search term
      if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      return true;
    }).sort((a, b) => b.priority - a.priority); // Sort by priority (high to low)
  };

  const value = {
    todos: filteredTodos(),
    loading,
    error,
    filters,
    addTodo,
    updateTodo: updateTodoItem,
    deleteTodo: removeTodo,
    toggleComplete,
    setFilter,
    refreshTodos: loadTodos
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};