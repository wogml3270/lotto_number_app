import React from 'react';
import styles from '@/styles/index.module.scss';

interface ResultSectionProps {
  result: string[];
}

const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  // 등수 별 색깔 변경
  const getRankColor = (result: any) => {
    if (result?.includes('1등')) {
      return styles.first;
    } else if (result?.includes('2등')) {
      return styles.second;
    } else if (result?.includes('3등')) {
      return styles.third;
    } else if (result?.includes('4등')) {
      return styles.fourth;
    } else if (result?.includes('5등')) {
      return styles.fifth;
    } else {
      return styles.losing;
    }
  };
  return (
    <div className={styles.resultWrap}>
      {result.map((list, idx) => (
        <p key={list + idx} className={getRankColor(list)}>
          [{idx + 1}번째] - {list}
        </p>
      ))}
    </div>
  );
};

export default ResultSection;
