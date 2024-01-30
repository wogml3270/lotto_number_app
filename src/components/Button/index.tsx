import React from 'react';
import styles from '@/styles/index.module.scss';

interface ButtonProps {
  handleSubmit: () => void;
}

const Button: React.FC<ButtonProps> = ({ handleSubmit }) => {
  return (
    <button className={styles.submitBtn} onClick={handleSubmit}>
      Check
    </button>
  );
};

export default Button;
