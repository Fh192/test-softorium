import React from 'react';
import styles from './Label.module.scss';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
}

export const Label: React.FC<Props> = ({ title, ...props }) => {
  return (
    <label className={styles.label} {...props}>
      {title}
    </label>
  );
};
