import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks';
import s from './AuthPage.module.scss';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(s => s.auth);

  useEffect(() => {
    if (isAuth) {
      navigate('profile');
    }
  }, [isAuth, navigate]);

  return (
    <div className={s.authPage}>
      <Outlet />
    </div>
  );
};
