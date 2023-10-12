import React, { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.scss";

const Index: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [lottoWinningNumbers, setLottoWinningNumbers] = useState<string[]>([]);
  const [drwNo, setDrwNo] = useState<number | string>("");
  const [drwNoView, setDrwNoView] = useState<number | string>("");
  const [lottoNumbersList, setLottoNumbersList] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLottoAndCheckNumbers = async () => {
    try {
      const lines = lottoNumbersList.split("\n");
      const resultsData: string[] = [];
      const winningNumbers: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const numbers = line
          .split(",")
          .map((numStr: any) => parseInt(numStr.trim(), 10));

        const drwNoToUse = drwNo ? drwNo : "";

        if (drwNoToUse) {
          // 로또 사이트 API로부터 당첨 번호 가져오기
          try {
            const response = await axios.get(
              `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNoToUse}`
            );
            const data = response.data;

            // 각각 당첨 번호 추출
            const currentWinningNumbers = [
              data.drwtNo1,
              data.drwtNo2,
              data.drwtNo3,
              data.drwtNo4,
              data.drwtNo5,
              data.drwtNo6,
            ] as any;

            winningNumbers.push(currentWinningNumbers.join(", "));
            setLottoWinningNumbers(winningNumbers);
            setErrorMessage(null);
          } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            winningNumbers.push(`[${i + 1}] 당첨 번호를 가져오지 못했습니다.`);
            setLottoWinningNumbers(winningNumbers);
            setErrorMessage("API 호출 중 오류가 발생했습니다.");
          }
        }

        const response = await axios.post("/api/lottoArr", {
          drwNo: drwNoToUse,
          lottoNumbers: numbers.join(","),
        });

        const result = response.data.result;
        resultsData.push(`[${i + 1}] ${result}`);
        setDrwNoView(drwNo);
      }

      setResults(resultsData);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setResults([]);
      setErrorMessage("API 호출 중 오류가 발생했습니다.");
    }
  };

  const resetUI = () => {
    setResults([]);
    setLottoWinningNumbers([]);
    setDrwNo("");
    setDrwNoView("");
    setLottoNumbersList("");
    setErrorMessage("");
  };

  return (
    <div className={styles.home}>
      <h1>로또 번호 검증</h1>
      <div>
        <label>
          회차 번호
          <input
            type="number"
            value={drwNo || ""}
            onChange={(e) => setDrwNo(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          번호 입력
          <textarea
            value={lottoNumbersList}
            onChange={(e) => setLottoNumbersList(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.btnGroup}>
        <button type="button" onClick={fetchLottoAndCheckNumbers}>
          번호 확인
        </button>
        <button type="button" onClick={resetUI}>
          초기화
        </button>
      </div>
      <div>
        {drwNo || null}회차 추첨 번호: {lottoWinningNumbers[0]}
      </div>
      <div className={styles.result}>
        <div>
          {errorMessage && <p>{errorMessage}</p>}
          {drwNoView && `${drwNoView}회차`}
        </div>
        <ul>
          {results.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
