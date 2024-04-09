import React from 'react';

import styles from '@/styles/index.module.scss';

interface InputSectionProps {
  drwNo: string;
  setDrwNo: React.Dispatch<React.SetStateAction<string>>;
  lottoNumbers: string;
  setLottoNumbers: React.Dispatch<React.SetStateAction<string>>;
}

const InputSection: React.FC<InputSectionProps> = ({ drwNo, setDrwNo, lottoNumbers, setLottoNumbers }) => {
  // placeholder
  const setPlaceholder = {
    drwNo: '회차 번호를 입력하세요.',
    lottoNumbers:
      '로또 번호 6자리를 입력하세요. \n- 여러 개의 번호를 사용하시려면 6자리를 입력한 뒤, Enter로 줄을 바꾸면 됩니다.\n- 대괄호([]) 안에 있는 텍스트는 제외됩니다.',
  };

  return (
    <>
      <div className={styles.inputBox1}>
        <label>회차 번호</label>
        <input
          type='number'
          placeholder={setPlaceholder.drwNo}
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
    </>
  );
};

export default InputSection;
