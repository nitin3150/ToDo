import { apiRequest } from './api';

export const loginUser = async ({ username, password }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const data = await apiRequest('/user/login', {
    method: 'POST',
    body: formData
  });
  
  return {
    user: { username },
    token: data.token
  };
};

export const registerUser = async ({ name, email, password }) => {
  const res = await fetch('http://localhost:8000/user/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const logoutUser = () => {
  // Just client-side logout, no API call needed
  return true;
};

export const getCurrentUser = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const payload = JSON.parse(atob(parts[1]));
    return { username: payload.user_id };
  } catch (error) {
    console.error('Failed to decode token:', error);
    throw new Error('Invalid token');
  }
};