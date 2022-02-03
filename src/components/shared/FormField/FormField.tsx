import React from 'react';
import { Input, Label } from '..';
import s from './FormField.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormField: React.FC<Props> = ({ label, id, ...props }) => {
  return (
    <div className={s.formField}>
      {label && <Label id={id} title={label} />}
      <Input id={id} {...props} />
    </div>
  );
};
