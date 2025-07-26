
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app7NTBQ6xAipe6gi')

export default async function handler(req, res) {
  const records = await base('seizika-karute').select({}).all()
  res.status(200).json({ records })
}
