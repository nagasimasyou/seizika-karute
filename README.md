# seizika-karute (Airtable x Next.js)

## 使い方（最短）

1. この ZIP を GitHub の **空のリポジトリ直下**にアップロード（置換でOK）。
2. `.env.local` を作って、以下3つの環境変数を必ず入れる。

```
AIRTABLE_PERSONAL_ACCESS_TOKEN=（AirtableのPAT）
AIRTABLE_BASE_ID=app7NTBQ6xAipe6gi
AIRTABLE_TABLE_NAME=Imported table
```

3. Vercel の **Project Settings → Environment Variables** にも同じ3つを入れて **Save → Redeploy**  
4. ブラウザでトップ（/）を開いて、Airtable のレコードが表で出ることを確認。

---

## フォルダ構成

```
pages/
  api/airtable.ts  ← API Route（Airtableからデータを引っ張る）
  index.tsx        ← 画面（SWRで /api/airtable を叩いて一覧表示）
lib/
  airtable.ts      ← Airtable初期化（env変数の読み込み）
```

---

## よく出るエラーと対処

- `No Next.js version detected` → `package.json` が Vercel に反映されてない。**空でない Root Directory** を設定し直す or リポジトリ直下に package.json を置く。  
- `TypeScript が無い` → もう対応済み（package.json に typescript, @types/react, @types/node を追加済み）。  
- 画面が真っ白 → `AIRTABLE_TABLE_NAME` が一致していない（今は **Imported table** で固定済み）。

---

分からないところは、この README のまま再度上げ直して、ここに貼ってください。全てこちらで直せるように組んであります。
