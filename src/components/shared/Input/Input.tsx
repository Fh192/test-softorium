import React from 'react';
import styles from './Input.module.scss';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  ...props
}) => <input id={id} name={id} className={styles.input} {...props} />;
