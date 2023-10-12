import React, { useState } from "react";
import axios from "axios";

import styles from "@/styles/Home.module.scss";

const Home: React.FC = () => {
  const [lottoNumbers, setLottoNumbers] = useState<string>("");
  const [drwNo, setDrwNo] = useState<number | undefined>();
  const [result, setResult] = useState<string>("");

  const checkLottoNumbers = async () => {
    try {
      const response = await axios.post("/api/lotto", {
        drwNo,
        lottoNumbers,
      });

      setResult(response.data.result);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setResult("API 호출 중 오류 발생");
    }
  };

  return (
    <div className={styles.home}>
      <h1>로또 번호 검증 앱</h1>
      <div>
        <label>
          회차 번호:
          <input
            type="number"
            value={drwNo || ""}
            onChange={(e) => setDrwNo(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          로또 번호 리스트:
          <input
            type="text"
            value={lottoNumbers}
            onChange={(e) => setLottoNumbers(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={checkLottoNumbers}>번호 확인</button>
      </div>
      <div>
        <p>결과: {result}</p>
      </div>
    </div>
  );
};

export default Home;
