import classnames from 'classnames/bind';
import React from 'react';
import styles from './Button.module.scss';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'success' | 'danger' | 'primary';
}

export const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const cn = classnames.bind(styles);

  return (
    <button className={cn('button', variant)} {...props}>
      {children}
    </button>
  );
};
