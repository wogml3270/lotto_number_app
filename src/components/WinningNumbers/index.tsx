import React from 'react';
import styles from '@/styles/index.module.scss';

interface WinningNumbersProps {
  winning: any;
}

const WinningNumbers: React.FC<WinningNumbersProps> = ({ winning }) => {
  return (
    <div className={styles.winningNumbers}>
      <span>{winning?.drwtNo1}</span>
      <span>{winning?.drwtNo2}</span>
      <span>{winning?.drwtNo3}</span>
      <span>{winning?.drwtNo4}</span>
      <span>{winning?.drwtNo5}</span>
      <span>{winning?.drwtNo6}</span>
      <span>{winning?.bnusNo}</span>
    </div>
  );
};

export default WinningNumbers;
