import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
      const rows = await sql`SELECT * FROM found_items ORDER BY created_at DESC`;
      // Map to camelCase
      const items = rows.map(r => ({
        id: r.id,
        itemCode: r.item_code,
        itemName: r.item_name,
        category: r.category,
        campus: r.campus,
        building: r.building,
        specificSpot: r.specific_spot,
        areaType: r.area_type,
        labShift: r.lab_shift,
        labPcNumber: r.lab_pc_number,
        storagePoint: r.storage_point,
        lockerRackCode: r.locker_rack_code,
        foundDate: r.found_date,
        publicDescription: r.public_description,
        secretFeatures: r.secret_features,
        photoUrl: r.photo_url,
        isCensored: r.is_censored,
        status: r.status,
        finderType: r.finder_type,
        finderName: r.finder_name,
        finderNpm: r.finder_npm,
        expiryDate: r.expiry_date
      }));
      return res.status(200).json(items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const b = req.body;
      await sql`
        INSERT INTO found_items (
          id, item_code, item_name, category, campus, building, specific_spot, area_type,
          lab_shift, lab_pc_number, storage_point, locker_rack_code, found_date,
          public_description, secret_features, photo_url, is_censored, status,
          finder_type, finder_name, finder_npm, expiry_date
        ) VALUES (
          ${b.id}, ${b.itemCode}, ${b.itemName}, ${b.category}, ${b.campus}, ${b.building},
          ${b.specificSpot}, ${b.areaType}, ${b.labShift || null}, ${b.labPcNumber || null},
          ${b.storagePoint}, ${b.lockerRackCode}, ${b.foundDate}, ${b.publicDescription},
          ${b.secretFeatures}, ${b.photoUrl}, ${b.isCensored}, ${b.status || 'SAVED'},
          ${b.finderType}, ${b.finderName}, ${b.finderNpm || null}, ${b.expiryDate}
        )
      `;
      return res.status(201).json({ success: true, item: b });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
