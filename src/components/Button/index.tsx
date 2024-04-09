import React from 'react';
import styles from '@/styles/index.module.scss';

interface ButtonProps {
  submit: () => void;
}

const Button: React.FC<ButtonProps> = ({ submit }) => {
  return (
    <button className={styles.submitBtn} onClick={submit}>
      Check
    </button>
  );
};

export default Button;
