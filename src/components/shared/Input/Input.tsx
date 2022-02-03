import React from 'react';
import s from './Input.module.scss';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => <input className={s.input} {...props} />;
