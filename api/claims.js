import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
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
      const rows = await sql`SELECT * FROM claims ORDER BY created_at DESC`;
      const claims = rows.map(r => ({
        id: r.id,
        itemId: r.item_id,
        claimantName: r.claimant_name,
        claimantNpm: r.claimant_npm,
        claimantMajor: r.claimant_major,
        claimantPhone: r.claimant_phone,
        secretAnswer: r.secret_answer,
        proofDocument: r.proof_document,
        status: r.status,
        appliedAt: r.applied_at,
        claimTicketQr: r.claim_ticket_qr,
        rejectionReason: r.rejection_reason,
        signatureUrl: r.signature_url,
        handoverNotes: r.handover_notes,
        completedAt: r.completed_at
      }));
      return res.status(200).json(claims);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const b = req.body;
      await sql`
        INSERT INTO claims (
          id, item_id, claimant_name, claimant_npm, claimant_major, claimant_phone,
          secret_answer, proof_document, status, applied_at, claim_ticket_qr
        ) VALUES (
          ${b.id}, ${b.itemId}, ${b.claimantName}, ${b.claimantNpm}, ${b.claimantMajor},
          ${b.claimantPhone}, ${b.secretAnswer}, ${b.proofDocument}, ${b.status || 'PENDING'},
          ${b.appliedAt}, ${b.claimTicketQr}
        )
      `;
      // Update item status to IN_CLAIM_PROCESS
      await sql`UPDATE found_items SET status = 'IN_CLAIM_PROCESS' WHERE id = ${b.itemId}`;

      return res.status(201).json({ success: true, claim: b });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, action, rejectionReason, handoverNotes, signatureUrl, completedAt } = req.body;

      if (action === 'APPROVE') {
        await sql`UPDATE claims SET status = 'APPROVED' WHERE id = ${id}`;
        return res.status(200).json({ success: true });
      }

      if (action === 'REJECT') {
        const rows = await sql`SELECT item_id FROM claims WHERE id = ${id}`;
        await sql`UPDATE claims SET status = 'REJECTED', rejection_reason = ${rejectionReason || null} WHERE id = ${id}`;
        if (rows.length > 0) {
          await sql`UPDATE found_items SET status = 'SAVED' WHERE id = ${rows[0].item_id}`;
        }
        return res.status(200).json({ success: true });
      }

      if (action === 'HANDOVER') {
        const rows = await sql`SELECT item_id FROM claims WHERE id = ${id}`;
        await sql`
          UPDATE claims SET
            status = 'COMPLETED',
            handover_notes = ${handoverNotes || null},
            signature_url = ${signatureUrl || null},
            completed_at = ${completedAt || new Date().toISOString()}
          WHERE id = ${id}
        `;
        if (rows.length > 0) {
          await sql`UPDATE found_items SET status = 'RETURNED' WHERE id = ${rows[0].item_id}`;
        }
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Invalid action' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
