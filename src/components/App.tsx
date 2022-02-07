import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks';
import { AuthPage, ProfilePage } from '../pages';
import { setIsAuth } from '../store/reducers/authReducer';
import { Alert } from './Alert/Alert';
import './App.css';
import { Login } from './Login/Login';
import { Register } from './Register/Register';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { isAuth, access_token } = useSelector(s => s.auth);

  useEffect(() => {
    dispatch(setIsAuth(!!access_token));
  }, [dispatch, access_token]);

  return (
    <div className='App'>
      <Routes>
        <Route element={<AuthPage />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='profile' element={<ProfilePage />} />

        <Route
          path='*'
          element={<Navigate to={isAuth ? 'profile' : 'login'} />}
        />
      </Routes>
      <Alert />
    </div>
  );
};
