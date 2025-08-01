import Airtable from 'airtable'

const {
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME,
  AIRTABLE_API_KEY,
  AIRTABLE_PERSONAL_ACCESS_TOKEN,
} = process.env

const token = AIRTABLE_API_KEY || AIRTABLE_PERSONAL_ACCESS_TOKEN

function envSnapshot() {
  return {
    hasKey: !!token,
    hasBase: !!AIRTABLE_BASE_ID,
    hasTable: !!AIRTABLE_TABLE_NAME,
    baseId: AIRTABLE_BASE_ID,
    tableName: AIRTABLE_TABLE_NAME,
  }
}

export default async function handler(req, res) {
  try {
    if (!token || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      return res.status(500).json({
        ok: false,
        reason: 'ENV_MISSING',
        env: envSnapshot(),
      })
    }

    const base = new Airtable({ apiKey: token }).base(AIRTABLE_BASE_ID)
    const records = await base(AIRTABLE_TABLE_NAME).select({}).all()

    res.status(200).json({
      ok: true,
      count: records.length,
      sample: records.slice(0, 3).map(r => ({ id: r.id, fields: r.fields })),
    })
  } catch (e) {
    res.status(500).json({
      ok: false,
      reason: 'AIRTABLE_ERROR',
      message: e?.message,
      env: envSnapshot(),
    })
  }
}