import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../hooks';
import { setAlert } from '../../store/reducers/alertReducer';
import { signup } from '../../store/reducers/authReducer';
import { ISignupData } from '../../types/auth';
import { Button } from '../shared';
import { FormField } from '../shared/FormField/FormField';
import { AvatarInput } from './AvatarInput/AvatarInput';
import { Birthday } from './Birthday/Birthday';
import s from './Register.module.scss';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<ISignupData>({
    email: '',
    name: '',
    password: '',
    phone: '',
    time_zone: (new Date().getTimezoneOffset() / 60).toString(),
    avatar_img: '',
    birthday: '',
  });

  const setFormValuesHelper = (fieldName: keyof ISignupData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormValues(values => ({ ...values, [fieldName]: value }));
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
      })
      .catch(e => {
        dispatch(setAlert({ message: e.message, variant: 'error' }));
      });
  };

  return (
    <div className={s.register}>
      <h3 className={s.title}>Create an account</h3>
      <form className={s.form} onSubmit={submitHandler}>
        <fieldset className={s.fieldset}>
          <FormField
            label='Email'
            type='email'
            name='email'
            id='email'
            value={formValues.email}
            onChange={setFormValuesHelper('email')}
            required
          />

          <FormField
            label='Name'
            type='text'
            name='name'
            id='name'
            value={formValues.name}
            onChange={setFormValuesHelper('name')}
            required
          />

          <FormField
            label='Phone number'
            type='text'
            name='phone'
            id='phone'
            value={formValues.phone}
            onChange={setFormValuesHelper('phone')}
            required
          />

          <FormField
            label='Password'
            type='password'
            name='password'
            id='password'
            value={formValues.password}
            onChange={setFormValuesHelper('password')}
            required
          />

          <Birthday setFormValues={setFormValues} />
          <AvatarInput setAvatar={setAvatar} />
        </fieldset>

        <Button type='submit'>Register</Button>
      </form>
      <div className={s.haveAccount}>
        <Link to={'/login'}>Already have an account?</Link>
      </div>
    </div>
  );
};
