import React, { useState, lazy } from 'react';
import axios from 'axios';

const InputSection = lazy(() => import('@/components/InputSection'));
const Button = lazy(() => import('@/components/Button'));
const WinningNumbers = lazy(() => import('@/components/WinningNumbers'));
const ResultSection = lazy(() => import('@/components/ResultSection'));
const ErrorMsg = lazy(() => import('@/components/Error'));

import Spinner from '@/components/Spinner';

import styles from '@/styles/index.module.scss';

const index: React.FC = () => {
  const [drwNo, setDrwNo] = useState<string>('');
  const [lottoNumbers, setLottoNumbers] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);
  const [winning, setWinning] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parseLottoNumbers = (input: string): string => {
    const formattedInput = input.replace(/\[\d+\]/g, '').trim();

    if (/[^0-9,\n]/.test(formattedInput)) {
      throw new Error('로또 번호는 숫자와 쉼표만 입력 가능합니다.');
    }
    return formattedInput;
  };

  const handleSubmit = async () => {
    if (!drwNo) {
      setResult([]);
      setError('회차 번호를 입력하세요.');
      return;
    }
    if (!lottoNumbers) {
      setResult([]);
      setError('로또 번호를 입력하세요.');
      return;
    }

    try {
      setIsLoading(true);
      // 입력된 로또 번호 형식 파싱
      const formattedLottoNumbers = parseLottoNumbers(lottoNumbers);

      const lines = formattedLottoNumbers.split('\n');
      const resultsArray: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace(/\s/g, '');

        if (line.length === 0) {
          resultsArray.push('입력 오류');
          continue;
        }

        const response = await axios.post('/api/lotto', {
          drwNo,
          lottoNumbers: line,
        });
        resultsArray.push(response.data.result);
        Object.assign(winning, response.data.winningNumbers);
      }
      setIsLoading(false);
      setResult(resultsArray);
      setWinning(winning);
      setError(null);
    } catch (error: any) {
      console.error('API 호출 중 오류 발생:', error);
      setResult([]);
      setIsLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className={styles.home}>
      <h1>Lotto Number Checker</h1>
      <InputSection drwNo={drwNo} setDrwNo={setDrwNo} lottoNumbers={lottoNumbers} setLottoNumbers={setLottoNumbers} />
      <Button handleSubmit={handleSubmit} />
      <WinningNumbers winning={winning} />
      {isLoading ? <Spinner /> : <ResultSection result={result} />}
      <ErrorMsg error={error} />
    </div>
  );
};

export default index;
