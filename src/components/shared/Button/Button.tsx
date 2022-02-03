import classnames from 'classnames/bind';
import React from 'react';
import s from './Button.module.scss';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'success' | 'danger' | 'primary';
}

export const Button: React.FC<Props> = ({
  children,
  color = 'primary',
  ...props
}) => {
  const cn = classnames.bind(s);
  
  return (
    <button className={cn('button', color)} {...props}>
      {children}
    </button>
  );
};
