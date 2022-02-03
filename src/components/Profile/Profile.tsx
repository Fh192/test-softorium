import classnames from 'classnames/bind';
import React from 'react';
import { useSelector } from '../../hooks';
import { transformPhoneNumber } from '../../utils';
import { Label } from '../shared';
import s from './Profile.module.scss';

export const Profile: React.FC = () => {
  const cn = classnames.bind(s);
  const { avatar, email, name, phone, enabled, birthday, dt_create } =
    useSelector(s => s.profile);

  const creationDate = new Date(dt_create).toLocaleDateString();
  const birthDate = new Date(birthday).toLocaleDateString();

  return (
    <div className={s.profile}>
      <div className={s.header}>
        <div className={s.bg} />
        <div
          className={cn({ enabled }, 'avatar')}
          title={enabled ? 'Online' : 'Offline'}
        >
          <div className={s.inner}>
            <img src={avatar} alt='avatar' />
          </div>
        </div>
      </div>
      <div className={s.info}>
        <div className={s.item}>
          <Label title='name' />
          <span>{name}</span>
        </div>
        <div className={s.item}>
          <Label title='email' />
          <span>{email}</span>
        </div>
        <div className={s.item}>
          <Label title='phone number' />
          <span>{transformPhoneNumber(phone)}</span>
        </div>
        <div className={s.item}>
          <Label title='birthday' />
          <span>{birthDate}</span>
        </div>
        <div className={s.item}>
          <Label title='creation date' />
          <span>{creationDate}</span>
        </div>
      </div>
    </div>
  );
};
