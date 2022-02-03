import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../hooks';
import { setAlert } from '../../store/reducers/alertReducer';
import { signin } from '../../store/reducers/authReducer';
import { ISigninData } from '../../types/auth';
import { Button } from '../shared';
import { FormField } from '../shared/FormField/FormField';
import s from './Login.module.scss';

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<ISigninData>({
    password: '',
    username: '',
  });

  const setFormValuesHelper = (fieldName: keyof ISigninData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormValues(values => ({ ...values, [fieldName]: value }));
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
      .catch(errMessage => {
        dispatch(setAlert({ message: errMessage, variant: 'error' }));
      });
  };

  return (
    <div className={s.login}>
      <form className={s.form} onSubmit={submitHandler}>
        <fieldset className={s.fieldset}>
          <FormField
            label='Email or phone number'
            type='text'
            name='username'
            id='username'
            value={formValues.username}
            onChange={setFormValuesHelper('username')}
          />

          <FormField
            label='Password'
            type='password'
            name='password'
            id='password'
            value={formValues.password}
            onChange={setFormValuesHelper('password')}
          />
        </fieldset>

        <Button type='submit'>Login</Button>
      </form>
      <div className={s.needAccount}>
        <span>Need an account?</span>
        <Link to={'/register'}>Register</Link>
      </div>
    </div>
  );
};
