import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import Card from '../ui/Card';
import './AuthForms.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Sending to backend:", formData);
    const success = await login(formData);
    if (success) {
      navigate('/tasks/gettask');
    }
  };

  return (
    <Card className="auth-card">
      <h2 className="auth-title">Login</h2>
      
      {error && <Alert type="error" message={error} />}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          label="Email"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <Link to="/user" className="auth-link">Register</Link>
        </p>
      </div>
    </Card>
  );
};



export default LoginForm;