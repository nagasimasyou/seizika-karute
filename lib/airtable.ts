import Airtable from 'airtable';

const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableName = process.env.AIRTABLE_TABLE_NAME || 'Imported table';

if (!token || !baseId) {
  throw new Error('Missing Airtable env vars. Please set AIRTABLE_PERSONAL_ACCESS_TOKEN (or AIRTABLE_API_KEY) and AIRTABLE_BASE_ID.');
}

export const base = new Airtable({ apiKey: token }).base(baseId);
export const TABLE_NAME = tableName;
