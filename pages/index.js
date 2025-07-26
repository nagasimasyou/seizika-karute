
import { useEffect, useState } from 'react'

export default function Home() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetch('/api/airtable')
      .then(res => res.json())
      .then(data => setRecords(data.records || []))
  }, [])

  return (
    <div>
      <h1>みえる政治家カルテ（仮）</h1>
      <ul>
        {records.map(record => (
          <li key={record.id}>{record.fields['名前']}</li>
        ))}
      </ul>
    </div>
  )
}
