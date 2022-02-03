import React from 'react';
import s from './Label.module.scss';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
}

export const Label: React.FC<Props> = ({ title, ...props }) => {
  return (
    <label className={s.label} {...props}>
      {title}
    </label>
  );
};
