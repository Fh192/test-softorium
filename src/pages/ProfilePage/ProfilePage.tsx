import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../../components/Profile/Profile';
import { useDispatch, useSelector } from '../../hooks';
import { setAlert } from '../../store/reducers/alertReducer';
import { getUserProfile } from '../../store/reducers/profileReducer';
import s from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector(s => s.auth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserProfile()).catch(errMessage => {
        dispatch(setAlert({ message: errMessage, variant: 'error' }));
      });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, isAuth]);

  return (
    <div className={s.profilePage}>
      <Profile />
    </div>
  );
};
