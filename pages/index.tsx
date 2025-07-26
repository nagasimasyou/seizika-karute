export default function Home(props: any) {
  const { data, error } = props;
  if (error) return <pre>{error}</pre>;
  if (!data) return <p>loading...</p>;
  return (
    <main style={{ padding: 24 }}>
      <h1>みえる政治家カルテ（仮）</h1>
      <p>({data.length} 件)</p>
      <ul>
        {data.map((r: any) => {
          const f = r.fields || {};
          return <li key={r.id}>{f.name || f.氏名 || '(名前未設定)'}</li>;
        })}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/politicians`);
    const data = await res.json();
    if (!res.ok) return { props: { data: null, error: JSON.stringify(data, null, 2) } };
    return { props: { data } };
  } catch (e: any) {
    return { props: { data: null, error: e?.message ?? 'unknown error' } };
  }
}