import {
  Box,
  IconButton,
  TextField,
  Modal,
  Typography,
  Button,
  Slide,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { ListItem } from '../../types';
import { useAddTodoListMutation } from '../../store/queries';
import { Bounce, toast } from 'react-toastify';

export const FormAddList = () => {
  const [addTodoList, { isLoading }] = useAddTodoListMutation();

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTodo = async () => {
    const title = newTitle.trim();
    if (!title) return;
    const item: Omit<ListItem, 'id'> = {
      title,
      description: newDescription,
    };
    await addTodoList(item)
      .unwrap()
      .then((res) => {
        if (res.id) {
          toast.success('Список добавлен', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
          setNewTitle('');
          setNewDescription('');
          setIsModalOpen(false);
        }

        return res;
      })
      .catch((err) => {
        if (err.data.message) {
          toast.error(err.data.message || 'Ошибка при добавлении списка', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        }
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTodo();
    }
  };
  return (
    <>
      {/* Кнопка для открытия модального окна */}
      <IconButton
        color='primary'
        aria-label='add'
        onClick={() => setIsModalOpen(true)}
        sx={{ marginTop: 2 }}
        data-testid='add-list-button'
      >
        <AddIcon />
      </IconButton>

      {/* Модальное окно */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        hideBackdrop
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Slide direction='right' in={isModalOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              width: 400,
              height: '100vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              pb: 3,
            }}
          >
            {/* Заголовок с кнопкой закрытия */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6' component='h2'>
                Добавить новое дело
              </Typography>
              <IconButton
                onClick={handleCloseModal}
                size='small'
                data-testid='close-modal-button'
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Форма */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label='Новое дело'
                placeholder='Что нужно сделать?'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                variant='outlined'
                data-testid='title-input'
              />
              <TextField
                fullWidth
                label='Описание'
                placeholder='Дополнительная информация...'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                multiline
                rows={4}
                variant='outlined'
                data-testid='description-input'
              />
            </Box>

            {/* Кнопка добавления внизу */}
            <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
              <Button
                variant='outlined'
                onClick={handleCloseModal}
                fullWidth
                data-testid='cancel-button'
              >
                Отмена
              </Button>
              <Button
                variant='contained'
                onClick={handleAddTodo}
                disabled={!newTitle.trim() || isLoading}
                fullWidth
                startIcon={<AddIcon />}
                data-testid='add-button'
              >
                {isLoading ? 'Добавление...' : 'Добавить'}
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>

      {/* Toast уведомления */}
      {isLoading &&
        toast.info('Добавление списка...', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })}
    </>
  );
};
