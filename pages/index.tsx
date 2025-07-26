import { useEffect, useState } from 'react'

type Record = {
  名前: string
  生年月日: string
  満年齢: number
}

export default function Home() {
  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setRecords(data))
  }, [])

  return (
    <div>
      <h1>政治家リスト</h1>
      <table border="1">
        <thead>
          <tr><th>名前</th><th>生年月日</th><th>満年齢</th></tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{r.名前}</td>
              <td>{r.生年月日}</td>
              <td>{r.満年齢}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}