// api/check-password.js
export default function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body || {};
    const secret = process.env.STARTUP_PASSWORD || '';

    if (!password) return res.status(400).json({ ok: false, error: 'Missing password' });

    // Time-constant comparison would be better if you need security against timing attacks.
    const ok = password === secret;

    return res.status(200).json({ ok });
  } catch (err) {
    console.error('check-password error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
