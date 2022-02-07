import React from 'react';
import { Label } from '../../shared';
import styles from './AvatarInput.module.scss';

interface Props {
  setAvatar: (avatar: string) => void;
}

export const AvatarInput: React.FC<Props> = ({ setAvatar }) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormat = new RegExp('.png|.jpg|.jpeg');

    if (fileFormat.test(e.target.value) && e.target.files) {
      const fr = new FileReader();

      fr.onload = () => {
        if (typeof fr.result === 'string') {
          setAvatar(fr.result);
        }
      };

      fr.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.avatarInput}>
      <Label title='аватар' />
      <label className={styles.inner}>
        <input
          type='file'
          name='avatar'
          id='avatar'
          onChange={handleFileInput}
          accept='.jpg, .jpeg, .png'
          required
        />
      </label>
    </div>
  );
};
