import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignInMutation } from '../../store/queries';
import Cookies from 'js-cookie';

const schema = yup.object({
  username: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Your password needs to be at least 6 characters.')
    .max(40)
    .required(),
});

const SignInPage = () => {
  const navigate = useNavigate();

  const [trigger, { isLoading, isError }] = useSignInMutation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const login = async (data: FieldValues) => {
    try {
      const result = await trigger(
        data as { username: string; password: string }
      );

      if (result.data?.token) {
        // Сохраняем токен в куки
        Cookies.set('token', result.data.token, { sameSite: 'Lax' });
        // Ставим видимую куку-маркер для клиента
        Cookies.set('is_auth', '1', { sameSite: 'Lax' });
        // Редирект на главную
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <Box
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component='form'
        className='singIn_form'
        onSubmit={handleSubmit(login)}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {isError && (
          <div
            style={{
              color: 'red',
              textAlign: 'center',
              marginBottom: '16px',
              padding: '8px',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
            }}
          >
            Ошибка входа
          </div>
        )}
        <TextField
          id='username'
          label='Username'
          variant='outlined'
          className='singIn_form_item'
          error={!!errors?.username}
          helperText={errors?.username?.message}
          {...register('username')}
        />
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field }: { field: any }) => (
            <FormControl
              variant='outlined'
              className='singIn_form_item'
              error={!!errors?.password}
              {...field}
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
              <FormHelperText
                id='component-helper-text'
                error={!!errors?.password}
              >
                {errors?.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Button
          type='submit'
          variant='contained'
          disabled={isLoading}
          style={{ marginTop: '16px' }}
          data-testid='login-button'
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </Box>
    </Box>
  );
};

export default SignInPage;
