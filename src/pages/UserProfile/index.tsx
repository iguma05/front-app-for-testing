import { Button, Box, Typography, Paper } from '@mui/material';
import Cookies from 'js-cookie';
import { useLogoutMutation } from '../../store/queries';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const isAuthenticated = Cookies.get('is_auth');
  console.log('isAuthenticated', isAuthenticated);
  const [trigger] = useLogoutMutation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  const handleLogout = () => {
    trigger();
    Cookies.remove('is_auth');
    navigate('/login');
  };
  useEffect(() => {
    if (!isAuthenticated) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          navigate('/board');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}
    >
      <Typography variant='h5' gutterBottom>
        Добро пожаловать! Вы будете перенаправлены на страницу с Вашими делами через{' '}
        {seconds} ...
      </Typography>
      <Box style={{ marginTop: '20px' }}>
        <Button variant='contained' color='secondary' onClick={handleLogout}>
          Выйти
        </Button>
      </Box>
    </Paper>
  );
};

export default UserProfile;
