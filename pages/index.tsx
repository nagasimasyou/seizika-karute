import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/airtable', fetcher)

  if (error) return <div>エラーが発生しました</div>
  if (!data) return <div>読み込み中...</div>

  return (
    <div>
      <h1>みえる政治家カルテ（仮）</h1>
      <ul>
        {data.sample.map((record) => (
          <li key={record.id}>
            {record.fields['名前']}（{record.fields['生年月日']}）
          </li>
        ))}
      </ul>
    </div>
  )
}