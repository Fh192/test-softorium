import React, { useEffect, useState } from 'react';
import { ISignupData } from '../../../types/auth';
import { Input } from '../../shared';
import s from './Birthday.module.scss';

interface Props {
  setFormValues: React.Dispatch<React.SetStateAction<ISignupData>>;
}

export const Birthday: React.FC<Props> = ({ setFormValues }) => {
  const [birthday, setBirthday] = useState({ day: '', month: '', year: '' });

  const setBirthdayHelper = (key: keyof typeof birthday) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setBirthday(birthday => ({ ...birthday, [key]: value }));
    };
  };

  useEffect(() => {
    const { day, month, year } = birthday;

    setFormValues(values => ({
      ...values,
      birthday: `${year}-${month}-${day}`,
    }));
  }, [birthday, setFormValues]);

  return (
    <div className={s.birthday} title='Date of birth'>
      <label className={s.label} htmlFor=''>
        birthday
      </label>
      <div className={s.inner}>
        <Input
          type='number'
          name='day'
          id='day'
          max={31}
          min={1}
          value={birthday.day}
          onChange={setBirthdayHelper('day')}
          placeholder='DD'
          required
        />
        <Input
          type='number'
          name='month'
          id='month'
          max={12}
          min={1}
          value={birthday.month}
          onChange={setBirthdayHelper('month')}
          placeholder='MM'
          required
        />
        <Input
          type='number'
          name='year'
          id='year'
          max={new Date().getFullYear() - 1}
          min={1920}
          value={birthday.year}
          onChange={setBirthdayHelper('year')}
          placeholder='YYYY'
          required
        />
      </div>
    </div>
  );
};
