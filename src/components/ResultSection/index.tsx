import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '@/styles/index.module.scss';

interface ResultSectionProps {
  result: string[];
}

const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  // 등수 별 색깔 변경
  const getRankColor = (text: any) => {
    if (text?.includes('1등')) {
      return styles.first;
    }
    if (text?.includes('2등')) {
      return styles.second;
    }
    if (text?.includes('3등')) {
      return styles.third;
    }
    if (text?.includes('4등')) {
      return styles.fourth;
    }
    if (text?.includes('5등')) {
      return styles.fifth;
    }
    return styles.losing;
  };

  return (
    <div className={styles.resultWrap}>
      {result.map((list, idx) => (
        <p key={uuidv4()} className={getRankColor(list)}>
          [{idx + 1}번째] - {list}
        </p>
      ))}
    </div>
  );
};

export default ResultSection;
