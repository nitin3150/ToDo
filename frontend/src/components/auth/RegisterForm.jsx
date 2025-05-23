import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import Card from '../ui/Card';
import './AuthForms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });
  const [validationError, setValidationError] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const { name, email, password } = formData;
    const success = await register({ name,email, password });
    
    if (success) {
      // navigate('/tasks/gettask');
      setTimeout(() => {
        navigate('/tasks/gettask');
      }, 1000);
    }
    
  };

  return (
    <Card className="auth-card">
      <h2 className="auth-title">Create Account</h2>
      
      {(error || validationError) && (
        <Alert type="error" message={validationError || error} />
      )}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          label="Username"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        
        <Input
          label="E-mail"
          type="text"
          name="email"
          value={formData.email}
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
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
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
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </form>
      
      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <Link to="/tasks/gettask" className="auth-link">Login</Link>
        </p>
      </div>
    </Card>
  );
};

export default RegisterForm;