import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return res.status(500).json({ error: 'DATABASE_URL is not defined in environment.' });
  }

  const sql = neon(connectionString);

  if (req.method === 'GET') {
    try {
      const rows = await sql`SELECT * FROM lost_reports ORDER BY created_at DESC`;
      const reports = rows.map(r => ({
        id: r.id,
        reporterName: r.reporter_name,
        reporterNpm: r.reporter_npm,
        itemName: r.item_name,
        category: r.category,
        campus: r.campus,
        building: r.building,
        color: r.color,
        lostDate: r.lost_date,
        description: r.description,
        status: r.status,
        matchedItemId: r.matched_item_id,
        matchScore: r.match_score
      }));
      return res.status(200).json(reports);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const b = req.body;
      await sql`
        INSERT INTO lost_reports (
          id, reporter_name, reporter_npm, item_name, category, campus, building,
          color, lost_date, description, status, matched_item_id, match_score
        ) VALUES (
          ${b.id}, ${b.reporterName}, ${b.reporterNpm}, ${b.itemName}, ${b.category},
          ${b.campus}, ${b.building}, ${b.color || null}, ${b.lostDate}, ${b.description || null},
          ${b.status || 'OPEN'}, ${b.matchedItemId || null}, ${b.matchScore || null}
        )
      `;
      return res.status(201).json({ success: true, report: b });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
