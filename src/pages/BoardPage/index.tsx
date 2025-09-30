import { Container, Paper, Divider } from '@mui/material';

import { Header } from '../../components/Header';
import { FormAddList } from '../../components/FormAddList';
import { ToastContainer } from 'react-toastify';
import { TodoList } from '../../components/TodoList';
import { Tabs } from '../../components/Tabs';

export const BoardPage = () => {
  return (
    <>
      <Container maxWidth='sm' style={{ paddingTop: 24, paddingBottom: 32 }}>
        <Paper elevation={2} style={{ padding: 16 }}>
          <Header />
          <FormAddList />
          <Tabs />
          <Divider style={{ marginTop: 12, marginBottom: 12 }} />
          <TodoList />
          <ToastContainer/>
        </Paper>
      </Container>
    </>
  );
};
