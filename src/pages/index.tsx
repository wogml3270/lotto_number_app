import React, { useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.scss";

const Index: React.FC = () => {
  const [results, setResults] = useState<{ text: string; color: string }[]>([]);
  const [lottoWinningNumbers, setLottoWinningNumbers] = useState<string[]>([]);
  const [drwNo, setDrwNo] = useState<number | string>("");
  const [lottoNumbersList, setLottoNumbersList] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLottoAndCheckNumbers = async () => {
    try {
      // Validation
      if (!drwNo && !lottoNumbersList.trim()) {
        setErrorMessage("회차 번호와 로또 번호를 입력하세요.");
        return;
      }
      if (!lottoNumbersList.trim()) {
        setErrorMessage("로또 번호를 입력하세요.");
        return;
      }
      if (!drwNo) {
        setErrorMessage("회차 번호를 입력하세요.");
        return;
      }

      const lines = lottoNumbersList.split("\n");
      const resultsData: { text: string; color: string }[] = [];
      const winningNumbers: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const numbers = line
          .split(",")
          .map((numStr: string) => parseInt(numStr.trim(), 10));

        const drwNoToUse = drwNo ? drwNo : "";

        if (drwNoToUse) {
          try {
            const response = await axios.get(
              `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNoToUse}`
            );
            const data = response.data;
            const currentWinningNumbers = [
              data.drwtNo1,
              data.drwtNo2,
              data.drwtNo3,
              data.drwtNo4,
              data.drwtNo5,
              data.drwtNo6,
              "+ " + data.bnusNo,
            ] as any;

            winningNumbers.push(currentWinningNumbers.join(", "));
            setLottoWinningNumbers(winningNumbers);
            setErrorMessage(null);
          } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            winningNumbers.push("당첨 번호를 가져오지 못했습니다.");
            setLottoWinningNumbers([]);
            setErrorMessage("API 호출 중 오류가 발생했습니다.");
          }
        }

        const response = await axios.post("/api/lottoArr", {
          drwNo: drwNoToUse,
          lottoNumbers: numbers.join(","),
        });

        const result: string = response.data.result;
        const isWinning = result.includes("일치");

        resultsData.push({
          text: `[${i + 1}] ${result}`,
          color: isWinning ? "green" : "red",
        });
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
    setLottoNumbersList("");
    setErrorMessage("");
  };

  return (
    <div className={styles.home}>
      <div className={styles.inputBox}>
        <h2>로또 번호 검증</h2>
        <div className={styles.contents}>
          <label>회차 번호</label>
          <input
            type="number"
            value={drwNo || ""}
            onChange={(e) => setDrwNo(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.contents}>
          <label>번호 입력</label>
          <textarea
            value={lottoNumbersList}
            onChange={(e) => setLottoNumbersList(e.target.value)}
          />
        </div>
        <div className={styles.btnGroup}>
          <button type="button" onClick={fetchLottoAndCheckNumbers}>
            번호 확인
          </button>
          <button type="button" onClick={resetUI}>
            초기화
          </button>
        </div>
      </div>
      <div className={styles.outputBox}>
        <h2>{drwNo || null}회차 추첨 번호</h2>
        <p>{lottoWinningNumbers[0]}</p>
        <div className={styles.result}>
          <div>
            {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
          </div>
          <ul>
            {results.map((item, idx) => (
              <li key={idx} style={{ color: item.color }}>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
