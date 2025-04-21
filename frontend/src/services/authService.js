import { apiRequest } from './api';

// export const loginUser = async ({ username, password }) => {
//   const formData = new FormData();
//   formData.append('email', username);
//   formData.append('password', password);
  
//   const data = await apiRequest('/login', {
//     method: 'POST',
//     body: formData
//   });
  
//   return {
//     user: { username },
//     token: data.access_token
//   };
// };
export const loginUser = async ({ email, password }) => {
  const response = await fetch('http://localhost:8000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();

  return {
    user: { email },
    token: data.access_token
  };
};

export const registerUser = async ({ username, password }) => {
  const data = await apiRequest('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  
  return {
    user: { username },
    token: data.access_token
  };
};

export const logoutUser = () => {
  // Just client-side logout, no API call needed
  return true;
};

export const getCurrentUser = async (token) => {
  // You could add an endpoint to fetch current user data if needed
  // For now, we'll just return the username from the token payload
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { username: payload.sub };
  } catch (error) {
    throw new Error('Invalid token');
  }
};