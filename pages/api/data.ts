import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const records = await base('議員リスト').select().all()
  const data = records.map(r => ({
    名前: r.get('名前') || '',
    生年月日: r.get('生年月日') || '',
    満年齢: r.get('満年齢') || ''
  }))
  res.status(200).json(data)
}