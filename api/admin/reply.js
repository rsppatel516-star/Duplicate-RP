import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only_change_in_prod';

function authenticate(req) {
  const token = req.cookies?.admin_token;
  if (!token) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;
    const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
    if (!tokenMatch) return null;
    try { return jwt.verify(tokenMatch[1], JWT_SECRET); } catch (e) { return null; }
  }
  try { return jwt.verify(token, JWT_SECRET); } catch (e) { return null; }
}

export default async function handler(req, res) {
  const user = authenticate(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized access' });

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { to, subject, message } = req.body;
  if (!to || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Missing recipient, subject, or message content' });
  }

  // Check if real SMTP config exists in .env
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_NAME } = process.env;
  const fromName = SMTP_FROM_NAME || 'Rudra Patel';

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    // 📧 Real SMTP Dispatch
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || '465'),
        secure: parseInt(SMTP_PORT || '465') === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${fromName}" <${SMTP_USER}>`,
        to,
        subject,
        text: message,
        html: `<div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                 <h2 style="color: #0d6efd; margin-bottom: 20px;">Response from Rudra Patel</h2>
                 <p style="white-space: pre-wrap; font-size: 14px;">${message}</p>
                 <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px; margin-bottom: 20px;" />
                 <p style="font-size: 11px; color: #777;">
                   This message was dispatched securely via the Portfolio Admin Panel.
                 </p>
               </div>`,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        success: true,
        realSent: true,
        message: `Email successfully delivered to ${to} via custom SMTP!`,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `SMTP dispatch error: ${err.message}`,
      });
    }
  } else {
    // 📝 Local Mock Delivery & Logging
    try {
      const mockDir = path.join(process.cwd(), 'outbox_mocks');
      if (!fs.existsSync(mockDir)) fs.mkdirSync(mockDir);

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `reply-${to}-${timestamp}.txt`;
      const filePath = path.join(mockDir, filename);

      const emailPayload = `=========================================
TIMESTAMP: ${new Date().toLocaleString()}
FROM: "${fromName}" <no-reply-sandbox@rudrapatel.dev>
TO: ${to}
SUBJECT: ${subject}
=========================================

${message}

=========================================
`;
      fs.writeFileSync(filePath, emailPayload, 'utf-8');

      return res.status(200).json({
        success: true,
        realSent: false,
        mockPath: filePath,
        message: `Sandbox delivery successful! Written to: outbox_mocks/${filename}. Set SMTP_HOST/USER/PASS in .env to send real mails!`,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Mock delivery error: ${err.message}`,
      });
    }
  }
}
