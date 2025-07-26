// pages/index.tsx
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  const { data, error } = useSWR('/api/airtable?__debug=1', fetcher, {
    revalidateOnFocus: false,
  })

  if (error) return <div>APIエラー: {String(error)}</div>
  if (!data) return <div>読み込み中...</div>

  if (!data.ok) {
    return (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        APIからエラーが返っています。  
        これをそのまま貼ってください👇

        {JSON.stringify(data, null, 2)}
      </pre>
    )
  }

  const records = data.sample ?? []

  return (
    <div style={{ padding: 24 }}>
      <h1>みえる政治家カルテ（仮）</h1>

      <p>取得件数: {data.count}</p>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>名前</th>
            <th>生年月日</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r: any) => (
            <tr key={r.id}>
              <td>{r.fields['名前']}</td>
              <td>{r.fields['生年月日']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <details style={{ marginTop: 24 }}>
        <summary>RAW (デバッグ用)</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  )
}
