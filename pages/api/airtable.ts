import type { NextApiRequest, NextApiResponse } from 'next';
import { base, TABLE_NAME } from '../../lib/airtable';

type RecordItem = {
  id: string;
  fields: {
    [key: string]: any;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const records = await base(TABLE_NAME).select({}).all();
    const result: RecordItem[] = records.map(r => ({ id: r.id, fields: r.fields }));
    res.status(200).json({ records: result });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e?.message ?? 'unknown error' });
  }
}
