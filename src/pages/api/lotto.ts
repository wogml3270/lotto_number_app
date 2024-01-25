import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { drwNo, lottoNumbers } = req.body;
    try {
      // 로또 API 호출
      const lottoApiResponse = await axios.get(
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`,
      );

      // API 응답에서 당첨 번호 추출
      const { bnusNo, drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6 } = lottoApiResponse.data;

      // 로또 번호 리스트 파싱
      const parsingLottoList = lottoNumbers.split(',').map((num: any) => parseInt(num, 10));

      // 일치하는 번호 개수 계산
      const matchedNumbers = parsingLottoList.filter((num: any) =>
        [drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6].includes(num),
      );

      let result = '';

      if (matchedNumbers.length === 6) {
        result = '1등입니다! 모든 번호가 일치합니다!';
      } else if (matchedNumbers.length === 5 && parsingLottoList.includes(bnusNo)) {
        result = '2등입니다! 5개 번호와 보너스 번호가 일치합니다!';
      } else if (matchedNumbers.length === 5) {
        result = '3등입니다! 5개 번호가 일치합니다!';
      } else if (matchedNumbers.length === 4) {
        result = '4등입니다! 4개 번호가 일치합니다!';
      } else if (matchedNumbers.length === 3) {
        result = '5등입니다! 3개 번호가 일치합니다!';
      } else {
        result = '꽝입니다. 다음 기회에 다시 시도하세요.';
      }

      // 클라이언트로 결과 전송
      res
        .status(200)
        .json({ result, winningNumbers: { drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo } });
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  } else {
    res.status(405).json({ error: '허용되지 않는 메소드' });
  }
}
