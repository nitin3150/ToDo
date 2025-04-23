import { apiRequest } from './api';

export const fetchTodos = async (token) => {
  return apiRequest('/tasks/gettask', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const createTodo = async (todoData, token) => {
  return apiRequest('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(todoData)
  });
};

export const updateTodo = async (id, updates, token) => {
  return apiRequest(`/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
};

export const deleteTodo = async (id, token) => {
  return apiRequest(`/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};