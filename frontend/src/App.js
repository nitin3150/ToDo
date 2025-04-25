import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';

import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodosPage from './pages/TodosPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/auth/PrivateRoute';

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <AppRoutes />
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <Routes>
      {/* Redirect root path to login or tasks */}
      <Route
        path="/"
        element={
          <Navigate to={currentUser ? "/tasks/gettask" : "/user/login"} replace />
        }
      />
      
      {/* Public Routes */}
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/user" element={<RegisterPage />} />

      {/* Redirect /tasks to /tasks/gettask */}
      <Route path="/tasks" element={<Navigate to="/tasks/gettask" replace />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/tasks/gettask" element={<TodosPage />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;