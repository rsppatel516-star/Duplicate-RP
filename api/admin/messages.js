import dbConnect from '../_lib/db.js';
import { Contact } from '../_lib/models.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only_change_in_prod';

function authenticate(req) {
  // req.cookies is populated by Express cookie-parser (dev) and Vercel (prod)
  const token = req.cookies?.admin_token;
  if (!token) {
    // Fallback: manually parse cookie header for environments without cookie-parser
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;
    const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
    if (!tokenMatch) return null;
    try { return jwt.verify(tokenMatch[1], JWT_SECRET); } catch (e) { return null; }
  }
  try { return jwt.verify(token, JWT_SECRET); } catch (e) { return null; }
}

export default async function handler(req, res) {
  await dbConnect();

  const user = authenticate(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const messages = await Contact.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: messages });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: 'ID required' });
      const message = await Contact.findByIdAndDelete(id);
      if (!message) return res.status(404).json({ success: false, message: 'Not found' });
      return res.status(200).json({ success: true, data: {} });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
