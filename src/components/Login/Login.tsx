import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../hooks';
import { setAlert } from '../../store/reducers/alertReducer';
import { signin } from '../../store/reducers/authReducer';
import { SigninData } from '../../types/auth';
import { Button } from '../shared';
import { FormField } from '../shared/FormField/FormField';
import styles from './Login.module.scss';

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<SigninData>({
    password: '',
    username: '',
  });

  const handleInputChange = (name: keyof SigninData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormValues(values => ({ ...values, [name]: value }));
    };
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signin(formValues))
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({
            message: 'Вы успешно вошли в аккаунт!',
            variant: 'success',
          })
        );
      })
      .catch(error => {
        if (typeof error === 'string') {
          dispatch(setAlert({ message: error, variant: 'error' }));
        } else {
          dispatch(setAlert({ message: error.message, variant: 'error' }));
        }
      });
  };

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={submitHandler}>
        <fieldset className={styles.fieldset}>
          <FormField
            label='Почта или номер телефона'
            type='text'
            id='username'
            value={formValues.username}
            onChange={handleInputChange('username')}
          />

          <FormField
            label='Пароль'
            type='password'
            id='password'
            value={formValues.password}
            onChange={handleInputChange('password')}
          />
        </fieldset>

        <Button type='submit'>Вход</Button>
      </form>
      <div className={styles.needAccount}>
        <span>Нужен аккаунт?</span>
        <Link to={'/register'}>Регистрация</Link>
      </div>
    </div>
  );
};
