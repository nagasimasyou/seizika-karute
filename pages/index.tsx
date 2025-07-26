
import { GetServerSideProps } from "next";

type Politician = {
  名前: string;
  生年月日?: string;
  満年齢?: number;
};

export default function Home({ data }: { data: Politician[] }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>政治家リスト</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>名前</th>
            <th>生年月日</th>
            <th>満年齢</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.名前}</td>
              <td>{item.生年月日 || "不明"}</td>
              <td>{item.満年齢 ?? "不明"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE;
  const table = process.env.AIRTABLE_TABLE;

  const res = await fetch(
    `https://api.airtable.com/v0/${base}/${encodeURIComponent(table!)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await res.json();
  const data = json.records.map((r: any) => r.fields);
  return { props: { data } };
};
