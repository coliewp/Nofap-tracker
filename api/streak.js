import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'nofap_start_timestamp';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const ts = await redis.get(KEY);
      return res.status(200).json({ ts: ts ?? null });
    }

    if (req.method === 'POST') {
      const { ts } = req.body || {};
      if (typeof ts !== 'number' || isNaN(ts)) {
        return res.status(400).json({ error: 'ts must be a number (milliseconds timestamp)' });
      }
      await redis.set(KEY, ts);
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await redis.del(KEY);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
