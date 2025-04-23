import { apiRequest } from './api';

export const loginUser = async ({ username, password }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const data = await apiRequest('user/login', {
    method: 'POST',
    body: formData
  });
  
  return {
    user: { username },
    token: data.access_token
  };
};
// export const loginUser = async ({ email, password }) => {
//   const response = await fetch('http://localhost:8000/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.detail || 'Login failed');
//   }

//   const data = await response.json();

//   return {
//     user: { email },
//     token: data.access_token
//   };
// };

// export const registerUser = async ({ username, password }) => {
//   const data = await apiRequest('user/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ username, password })
//   });
  
//   return {
//     user: { username },
//     token: data.access_token
//   };
// };
// export const useAuth = () => {
//   const registerUser = async ({ name, email, password }) => {
//     const res = await fetch('http://localhost:8000/user/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       // Throw the server’s error object so your component can display it
//       throw data;
//     }
//     return true;
//   };

//   // ... login, logout, etc.

//   return { registerUser, /* ... */ };
// };
// authService.js

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
  // You could add an endpoint to fetch current user data if needed
  // For now, we'll just return the username from the token payload
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { username: payload.sub };
  } catch (error) {
    throw new Error('Invalid token');
  }
};