import { Button, Stack, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogoutMutation } from '../../store/queries';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Header = () => {
  const [trigger] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    trigger();
    Cookies.remove('is_auth');
    navigate('/login');
  };
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      spacing={2}
    >
      <Typography variant='h5' component='h1'>
        Список дел
      </Typography>
      <Button
        variant='outlined'
        color='secondary'
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        data-testid='logout-button'
      >
        Выйти
      </Button>
    </Stack>
  );
};
