import classnames from 'classnames/bind';
import React from 'react';
import { useSelector } from '../../hooks';
import { transformPhoneNumber } from '../../utils';
import { Label } from '../shared';
import styles from './Profile.module.scss';

export const Profile: React.FC = () => {
  const cn = classnames.bind(styles);
  const { avatar, email, name, phone, enabled, birthday, dt_create } =
    useSelector(s => s.profile);

  const creationDate = new Date(dt_create).toLocaleDateString();
  const birthDate = new Date(birthday).toLocaleDateString();

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.bg} />
        <div
          className={cn({ enabled }, 'avatar')}
          title={enabled ? 'В сети' : 'Не в сети'}
        >
          <div className={styles.inner}>
            <img src={avatar} alt='avatar' />
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.item}>
          <Label title='Имя' />
          <span>{name}</span>
        </div>
        <div className={styles.item}>
          <Label title='Почта' />
          <span>{email}</span>
        </div>
        <div className={styles.item}>
          <Label title='Номер телефона' />
          <span>{transformPhoneNumber(phone)}</span>
        </div>
        <div className={styles.item}>
          <Label title='Дата рождения' />
          <span>{birthDate}</span>
        </div>
        <div className={styles.item}>
          <Label title='Дата регистрации' />
          <span>{creationDate}</span>
        </div>
      </div>
    </div>
  );
};
