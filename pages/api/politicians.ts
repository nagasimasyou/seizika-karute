import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const base = process.env.AIRTABLE_BASE!;
    const table = process.env.AIRTABLE_TABLE!;
    const token = process.env.AIRTABLE_TOKEN!;
    const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}`;

    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).json({ error: text });

    const json = JSON.parse(text);
    res.status(200).json(json.records ?? json);
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'unknown error' });
  }
}