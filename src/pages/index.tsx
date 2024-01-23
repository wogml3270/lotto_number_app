import React, { useState } from 'react';
import axios from 'axios';

import styles from '@/styles/styles.module.scss';

const index: React.FC = () => {
  const [drwNo, setDrwNo] = useState<string>('');
  const [lottoNumbers, setLottoNumbers] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const parseLottoNumbers = (input: string): string => {
    // [] 안의 내용을 제거하고 숫자와 쉼표로 이루어진 문자열로 변환
    return input.replace(/\[\d+\]/g, '').trim();
  };

  const handleSubmit = async () => {
    try {
      // 입력된 로또 번호 형식 파싱
      const formattedLottoNumbers = parseLottoNumbers(lottoNumbers);

      if (!drwNo) {
        setError('회차 번호를 입력하세요.');
        return;
      }

      const lines = formattedLottoNumbers.split('\n');
      const resultsArray: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace(/\s/g, '');

        if (line.length === 0) {
          resultsArray.push('');
          continue;
        }

        const response = await axios.post('/api/lotto', {
          drwNo,
          lottoNumbers: line,
        });
        resultsArray.push(response.data.result);
      }

      setResult(resultsArray);
      setError(null);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);

      setResult([]);
      setError('서버 오류');
    }
  };

  // 등수 별 색깔 변경
  const getRankClass = (result: any) => {
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
    <div className={styles.home}>
      <h1>Lotto Checker</h1>
      <div className={styles.inputBox1}>
        <label>회차 번호:</label>
        <input type='text' value={drwNo} onChange={(e) => setDrwNo(e.target.value)} />
      </div>
      <div className={styles.inputBox2}>
        <label>로또 번호:</label>
        <textarea value={lottoNumbers} onChange={(e) => setLottoNumbers(e.target.value)} />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>
        결과 확인
      </button>
      {result.length > 0 && (
        <div className={styles.resultWrap}>
          {result.map((list, idx) => (
            <p key={list + idx} className={getRankClass(list)}>
              {list}
            </p>
          ))}
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default index;
