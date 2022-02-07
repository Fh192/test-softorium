import React from 'react';
import { Input, Label } from '..';
import styles from './FormField.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormField: React.FC<Props> = ({ label, id, ...props }) => {
  return (
    <div className={styles.formField}>
      {label && <Label htmlFor={id} title={label} />}
      <Input id={id} name={id} {...props} />
    </div>
  );
};
