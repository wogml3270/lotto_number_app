import React, { useState } from 'react';
import axios from 'axios';

import styles from '@/styles/styles.module.scss';

const index: React.FC = () => {
  const [drwNo, setDrwNo] = useState<string>('');
  const [lottoNumbers, setLottoNumbers] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);
  const [winning, setWinning] = useState<any>({});
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
      if (!lottoNumbers) {
        setError('로또 번호를 입력하세요.');
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
        Object.assign(winning, response.data.winningNumbers);
      }
      setResult(resultsArray);
      setWinning(winning);
      setError(null);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);

      setResult([]);
      setError('서버 오류');
    }
  };

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

  // placeholder
  const setPlaceholder = {
    drwNo: '회차 번호를 입력하세요.',
    lottoNumbers:
      '로또 번호 6자리를 입력하세요. \n(여러 개의 번호를 사용하시려면 6자리를 입력한 뒤,\nEnter로 줄을 바꾸면 됩니다.\n대괄호([]) 안에 있는 텍스트는 제외됩니다.',
  };
  return (
    <div className={styles.home}>
      <h1>Lotto Number Checker</h1>
      <div className={styles.inputBox1}>
        <label>회차 번호</label>
        <input
          placeholder={setPlaceholder.drwNo}
          type='number'
          value={drwNo}
          onChange={(e) => setDrwNo(e.target.value)}
        />
      </div>
      <div className={styles.inputBox2}>
        <label>로또 번호</label>
        <textarea
          placeholder={setPlaceholder.lottoNumbers}
          value={lottoNumbers}
          onChange={(e) => setLottoNumbers(e.target.value)}
        />
      </div>
      <button className={styles.submitBtn} onClick={handleSubmit}>
        Check
      </button>
      <div className={styles.winningNumbers}>
        <span>{winning?.drwtNo1}</span>
        <span>{winning?.drwtNo2}</span>
        <span>{winning?.drwtNo3}</span>
        <span>{winning?.drwtNo4}</span>
        <span>{winning?.drwtNo5}</span>
        <span>{winning?.drwtNo6}</span>
        <span>{winning?.bnusNo}</span>
      </div>
      {result.length > 0 && (
        <div className={styles.resultWrap}>
          {result.map((list, idx) => (
            <p key={list + idx} className={getRankColor(list)}>
              {idx + 1}번째 - {list}
            </p>
          ))}
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default index;
