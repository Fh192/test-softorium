import classnames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from '../../hooks';
import s from './Alert.module.scss';

export const Alert: React.FC = () => {
  const cn = classnames.bind(s);

  const { message, variant } = useSelector(s => s.alert);
  const [hide, setHide] = useState(!message);

  useEffect(() => {
    if (message) {
      setHide(false);
      setTimeout(() => {
        setHide(true);
      }, 2000);
    } else {
      setHide(true);
    }
  }, [message]);

  return (
    <div className={cn('alert', variant, { hide })}>
      <span>{message}</span>
    </div>
  );
};
