import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from '../hooks';
import { AuthPage, ProfilePage } from '../pages';
import { setIsAuth } from '../store/reducers/authReducer';
import { Alert } from './Alert/Alert';
import './App.css';
import { Login } from './Login/Login';
import { Profile } from './Profile/Profile';
import { Register } from './Register/Register';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { isAuth, access_token } = useSelector(s => s.auth);

  useEffect(() => {
    if (access_token) {
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
    }
  }, [access_token, dispatch]);

  return (
    <div className='App'>
      <Routes>
        <Route element={<AuthPage />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='profile' element={<ProfilePage />}>
          <Route path=':id' element={<Profile />} />
        </Route>

        <Route
          path='*'
          element={<Navigate to={isAuth ? 'profile' : 'login'} />}
        />
      </Routes>
      <Alert />
    </div>
  );
};
