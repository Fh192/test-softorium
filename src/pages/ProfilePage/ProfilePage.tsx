import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { setAlert } from '../../store/reducers/alertReducer';
import { getUserProfile } from '../../store/reducers/profileReducer';
import s from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector(s => s.auth);

  useEffect(() => {
    dispatch(getUserProfile())
      .unwrap()
      .then(({ id }) => {
        navigate(id);
      })
      .catch(errMessage => {
        dispatch(setAlert({ message: errMessage, variant: 'error' }));
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className={s.profilePage}>
      <Outlet />
    </div>
  );
};
