import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useMemo, useState } from 'react';
import { ListItem as TodoListItemType } from '../../types';
import {
  useGetTodoListQuery,
  useUpdateTodoListMutation,
  useAddListItemMutation,
  useDeleteTodoListMutation,
} from '../../store/queries';
import { Modal } from '@mui/material';

export const TodoList = () => {
  const { data, isLoading, isError } = useGetTodoListQuery();
  const [updateList, { isLoading: isUpdating }] = useUpdateTodoListMutation();
  const [addListItem, { isLoading: isAddingItem }] = useAddListItemMutation();
  const [deleteList, { isLoading: isDeleting }] = useDeleteTodoListMutation();

  const lists: TodoListItemType[] = useMemo(() => data?.data || [], [data]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const [newTaskTitle, setNewTaskTitle] = useState<Record<string, string>>({});
  const [newTaskDescription, setNewTaskDescription] = useState<
    Record<string, string>
  >({});
  const [modalOpenForList, setModalOpenForList] = useState<string | null>(null);

  useEffect(() => {
    if (!editingId) return;
    const current = lists.find((l) => l.id === editingId);
    if (current) {
      setEditTitle(current.title);
      setEditDescription(current.description);
    }
  }, [editingId, lists]);

  const handleStartEdit = (item: TodoListItemType) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    await updateList({
      id: editingId,
      title: editTitle.trim(),
      description: editDescription,
    }).unwrap();
    setEditingId(null);
  };

  const handleAddTask = async (listId: string) => {
    const title = (newTaskTitle[listId] || '').trim();
    if (!title) return;
    const description = newTaskDescription[listId] || '';
    await addListItem({ listId, title, description, done: false }).unwrap();
    setNewTaskTitle((prev) => ({ ...prev, [listId]: '' }));
    setNewTaskDescription((prev) => ({ ...prev, [listId]: '' }));
    setModalOpenForList(null);
  };

  const handleDeleteList = async (listId: string) => {
    await deleteList({ id: listId }).unwrap();
  };

  if (isLoading) {
    return <Typography color='text.secondary'>Загрузка списков...</Typography>;
  }
  if (isError) {
    return <Typography color='error'>Ошибка загрузки списков</Typography>;
  }

  if (!lists.length) {
    return (
      <Typography color='text.secondary'>
        Списков пока нет. Добавьте первый через кнопку выше.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {lists.map((item) => (
        <Box key={item.id}>
          <Stack direction='row' alignItems='flex-start' spacing={1}>
            {editingId === item.id ? (
              <Stack direction='row' spacing={1} alignItems='center' flex={1}>
                <TextField
                  size='small'
                  label='Название списка'
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  fullWidth
                  data-testid='edit-title-input'
                />
                <TextField
                  size='small'
                  label='Описание'
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  fullWidth
                  data-testid='edit-description-input'
                />
                <IconButton
                  color='primary'
                  onClick={handleSaveEdit}
                  disabled={isUpdating || !editTitle.trim()}
                  data-testid='save-edit-button'
                >
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelEdit} data-testid='cancel-edit-button'>
                  <CloseIcon />
                </IconButton>
              </Stack>
            ) : (
              <>
                <Box flex={1}>
                  <Typography variant='subtitle1'>{item.title}</Typography>
                  {item.description ? (
                    <Typography variant='body2' color='text.secondary'>
                      {item.description}
                    </Typography>
                  ) : null}
                </Box>
                <IconButton
                  aria-label='edit'
                  onClick={() => handleStartEdit(item)}
                  data-testid='edit-button'
                >
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Stack>

          {/* Действия со списком: добавить дело (модалка) и удалить список */}
          <Stack direction='row' spacing={1} alignItems='center' mt={1}>
            <Button
              variant='contained'
              size='small'
              startIcon={<AddIcon />}
              onClick={() => setModalOpenForList(item.id)}
              data-testid='add-list-button'
            >
              Добавить дело
            </Button>
            <Button
              variant='outlined'
              size='small'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteList(item.id)}
              disabled={isDeleting}
              data-testid='delete-list-button'
            >
              Удалить список
            </Button>
          </Stack>

          {/* Модальное окно добавления дела */}
          <Modal
            open={modalOpenForList === item.id}
            onClose={() => setModalOpenForList(null)}
            aria-labelledby='add-task-title'
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 3,
                minWidth: 360,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography id='add-task-title' variant='h6' data-testid='add-task-title'>
                Добавить дело
              </Typography>
              <TextField
                autoFocus
                label='Заголовок'
                value={newTaskTitle[item.id] || ''}
                onChange={(e) =>
                  setNewTaskTitle((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
                fullWidth
                data-testid='task-title-input'
              />
              <TextField
                label='Описание'
                value={newTaskDescription[item.id] || ''}
                onChange={(e) =>
                  setNewTaskDescription((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
                fullWidth
                multiline
                minRows={3}
                data-testid='task-description-input'
              />
              <Stack direction='row' spacing={1} justifyContent='flex-end'>
                <Button
                  onClick={() => setModalOpenForList(null)}
                  startIcon={<CloseIcon />}
                  data-testid='cancel-button'
                >
                  Отмена
                </Button>
                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  onClick={() => handleAddTask(item.id)}
                  disabled={
                    isAddingItem || !(newTaskTitle[item.id] || '').trim()
                  }
                  data-testid='add-task-button'
                >
                  Добавить
                </Button>
              </Stack>
            </Box>
          </Modal>

          <Divider style={{ marginTop: 12 }} />
        </Box>
      ))}
    </Stack>
  );
};
