import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../hooks';
import { setAlert } from '../../store/reducers/alertReducer';
import { signup } from '../../store/reducers/authReducer';
import { SignupData } from '../../types/auth';
import { transformPhoneNumber } from '../../utils';
import { Button } from '../shared';
import { FormField } from '../shared/FormField/FormField';
import { AvatarInput } from './AvatarInput/AvatarInput';
import { Birthday } from './Birthday/Birthday';
import styles from './Register.module.scss';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<SignupData>({
    email: '',
    name: '',
    password: '',
    phone: '',
    time_zone: (new Date().getTimezoneOffset() / 60).toString(),
    avatar_img: '',
    birthday: '',
  });

  const handleInputChange = (name: keyof SignupData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        name === 'phone'
          ? transformPhoneNumber(e.target.value)
          : e.target.value;

      setFormValues(values => ({ ...values, [name]: value }));
    };
  };

  const setAvatar = (avatar_img: string) => {
    setFormValues(v => ({ ...v, avatar_img }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signup(formValues))
      .unwrap()
      .then(() => {
        dispatch(
          setAlert({ message: 'Аккаунт успешно создан!', variant: 'success' })
        );
        navigate('/login');
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
    <div className={styles.register}>
      <form className={styles.form} onSubmit={submitHandler}>
        <fieldset className={styles.fieldset}>
          <FormField
            label='Почта'
            type='email'
            id='email'
            value={formValues.email}
            onChange={handleInputChange('email')}
            required
          />

          <FormField
            label='Имя'
            type='text'
            id='name'
            value={formValues.name}
            onChange={handleInputChange('name')}
            required
          />

          <FormField
            label='Номер телефона'
            type='tel'
            id='phone'
            maxLength={18}
            minLength={18}
            value={formValues.phone}
            onChange={handleInputChange('phone')}
            placeholder='+7'
            required
          />

          <FormField
            label='Пароль'
            type='password'
            id='password'
            value={formValues.password}
            onChange={handleInputChange('password')}
            required
          />

          <Birthday setFormValues={setFormValues} />
          <AvatarInput setAvatar={setAvatar} />
        </fieldset>

        <Button type='submit'>Регистрация</Button>
      </form>
      <div className={styles.haveAccount}>
        <Link to={'/login'}>Уже есть аккаунт?</Link>
      </div>
    </div>
  );
};
