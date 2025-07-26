import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/airtable', fetcher);

  if (error) return <div>エラーが発生しました: {String(error)}</div>;
  if (!data) return <div>読み込み中...</div>;

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>みえる政治家カルテ（仮）</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>名前</th>
            <th>生年月日</th>
            <th>満年齢</th>
          </tr>
        </thead>
        <tbody>
          {data.records.map((r: any) => (
            <tr key={r.id}>
              <td>{r.fields['名前']}</td>
              <td>{r.fields['生年月日']}</td>
              <td>{r.fields['満年齢']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
