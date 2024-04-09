import React from 'react';

import styles from '@/styles/index.module.scss';

interface ErrorMessageProps {
  error: string | null;
}

const Error: React.FC<ErrorMessageProps> = ({ error }) => {
  return <p className={styles.error}>{error}</p>;
};

export default Error;
