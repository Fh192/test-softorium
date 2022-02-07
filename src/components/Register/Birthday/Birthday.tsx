import React, { useEffect, useState } from 'react';
import { SignupData } from '../../../types/auth';
import { Input } from '../../shared';
import styles from './Birthday.module.scss';

interface Props {
  setFormValues: React.Dispatch<React.SetStateAction<SignupData>>;
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
    <div className={styles.birthday}>
      <label className={styles.label}>Дата рождения</label>
      <div className={styles.inner}>
        <Input
          type='number'
          id='day'
          max={31}
          min={1}
          value={birthday.day}
          onChange={setBirthdayHelper('day')}
          placeholder='ДД'
          required
        />
        <Input
          type='number'
          id='month'
          max={12}
          min={1}
          value={birthday.month}
          onChange={setBirthdayHelper('month')}
          placeholder='ММ'
          required
        />
        <Input
          type='number'
          id='year'
          max={new Date().getFullYear() - 1}
          min={1920}
          value={birthday.year}
          onChange={setBirthdayHelper('year')}
          placeholder='ГГГГ'
          required
        />
      </div>
    </div>
  );
};
