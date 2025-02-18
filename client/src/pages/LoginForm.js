import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';  
import { TextField, Button, Box, Typography, Container, Paper, CircularProgress } from '@mui/material';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ userId: '', userName: '' });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);  
  const [loading, setLoading] = useState(false);  
  const [timeoutReached, setTimeoutReached] = useState(false);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('userId') && localStorage.getItem('userName');
    if (isAuthenticated) {
      navigate('/home');  
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      debugger
      await login(credentials.userId, credentials.userName);
      
      
      localStorage.setItem('userId', credentials.userId);
      localStorage.setItem('userName', credentials.userName);
      
      
      navigate('/home');
    } catch (err) {
      setError('שגיאה בהתחברות, בדוק את הנתונים');
      console.error("Authentication failed:", err);
      setShowError(true);  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setTimeoutReached(true);  
    }, 10000);  

    return () => clearTimeout(timeout); 
  }, []);

  
  if (timeoutReached) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
          <Typography variant="h5" align="center" gutterBottom>
            פג זמן התחברות
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          התחברות
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="מזהה משתמש"
            variant="outlined"
            fullWidth
            name="userId"
            value={credentials.userId}
            onChange={handleChange}
            required
          />
          <TextField
            label="שם משתמש"
            variant="outlined"
            fullWidth
            name="userName"
            value={credentials.userName}
            onChange={handleChange}
            required
          />
          {showError && error && <Typography color="error">{error}</Typography>} {/* הודעת שגיאה */}
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'כניסה'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;








