import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import UserProfile from '../../pages/UserProfile';
import { RequireAuth } from '../RequireAuth';
import { BoardPage } from '../../pages/BoardPage';

export const MainRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        }
      />
      <Route
        path='/board'
        element={
          <RequireAuth>
            <BoardPage />
          </RequireAuth>
        }
      />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
};
