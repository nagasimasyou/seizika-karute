import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('https://script.google.com/macros/s/AKfycbyHa-TwJZVzNhM6yYs-Uo45cKCTzaVA1gaFI8SEPIf-SyuUvcr52lbGvBFf0tpzzaL-Vg/exec');
        setData(res.data);
      } catch (error) {
        console.error('データ取得エラー:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>みえる政治家カルテ（仮）</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.名前} - {item.政党}</li>
        ))}
      </ul>
    </div>
  );
}