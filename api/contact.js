import dbConnect from './_lib/db.js';
import { Contact } from './_lib/models.js';
import nodemailer from 'nodemailer';

async function sendNotificationEmails({ name, email, subject, message, project_type }) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || 'patelrudra99098@gmail.com';

  if (!user || !pass || user.includes('placeholder') || pass.includes('placeholder')) {
    console.warn('[Nodemailer] SMTP credentials are not configured or still placeholders. Skipping email notifications.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  const adminMailOptions = {
    from: `"Rudra Portfolio HUD" <${user}>`,
    to,
    replyTo: email,
    subject: `🔔 New Contact Submission: ${subject || 'General Inquiry'}`,
    html: `
      <div style="background-color: #050510; color: #f8fafc; font-family: 'Bricolage Grotesque', 'Inter', sans-serif; padding: 40px; border-radius: 20px; border: 1px solid #ffffff1a; max-width: 600px; margin: auto;">
        <h2 style="color: #ec4899; margin-bottom: 24px; font-weight: 900; letter-spacing: -0.05em; font-size: 28px;">INCOMING TRANSMISSION</h2>
        <hr style="border: 0; border-top: 1px solid #ffffff1a; margin-bottom: 24px;" />
        <div style="margin-bottom: 16px;"><strong style="color: #6366f1; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Sender Name:</strong> <span style="font-size: 16px;">${name}</span></div>
        <div style="margin-bottom: 16px;"><strong style="color: #6366f1; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Sender Email:</strong> <a href="mailto:${email}" style="color: #f8fafc; font-size: 16px; text-decoration: underline;">${email}</a></div>
        <div style="margin-bottom: 16px;"><strong style="color: #6366f1; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Project Type:</strong> <span style="font-size: 16px;">${project_type}</span></div>
        <div style="margin-bottom: 24px;"><strong style="color: #6366f1; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Subject:</strong> <span style="font-size: 16px;">${subject}</span></div>
        <div style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; font-size: 15px; line-height: 1.6; color: rgba(248, 250, 252, 0.85); white-space: pre-wrap;">${message}</div>
        <hr style="border: 0; border-top: 1px solid #ffffff1a; margin-top: 32px; margin-bottom: 16px;" />
        <div style="font-size: 10px; color: rgba(248, 250, 252, 0.3); text-align: center; letter-spacing: 0.15em; font-family: monospace;">PORTFOLIO SECURE COMMUNICATIONS HUB</div>
      </div>
    `
  };

  const userMailOptions = {
    from: `"Rudra Patel" <${user}>`,
    to: email,
    subject: `⚡ Connection Established: Rudra Patel Portfolio`,
    html: `
      <div style="background-color: #050510; color: #f8fafc; font-family: 'Bricolage Grotesque', 'Inter', sans-serif; padding: 40px; border-radius: 20px; border: 1px solid #ffffff1a; max-width: 600px; margin: auto;">
        <h2 style="color: #6366f1; margin-bottom: 8px; font-weight: 900; letter-spacing: -0.05em; font-size: 28px;">TRANSMISSION RECEIVED</h2>
        <div style="font-size: 11px; color: #ec4899; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 24px;">Status: Secured</div>
        <p style="font-size: 16px; line-height: 1.6; color: rgba(248, 250, 252, 0.85); margin-bottom: 24px;">
          Hi ${name},<br/><br/>
          Thank you for reaching out! Your submission was successfully transmitted to my secure communications channel. I've received your inquiry regarding <strong>"${subject}"</strong> (${project_type}).
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: rgba(248, 250, 252, 0.85); margin-bottom: 32px;">
          I'll personally review your details and respond as soon as possible.
        </p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://patelrudra.in/artifacts" style="background-color: #f8fafc; color: #050510; padding: 12px 28px; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;">Explore Case Studies</a>
        </div>
        <hr style="border: 0; border-top: 1px solid #ffffff1a; margin-bottom: 16px;" />
        <div style="font-size: 12px; color: rgba(248, 250, 252, 0.4); text-align: center;">
          Rudra Patel — Digital Architect, Frontend & iOS Developer<br/>
          <a href="https://patelrudra.in" style="color: #ec4899; text-decoration: none;">patelrudra.in</a>
        </div>
      </div>
    `
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ]);
  console.log('[Nodemailer] Successfully sent contact emails.');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const user_name = req.body.user_name || req.body.name;
    const user_email = req.body.user_email || req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const project_type = req.body.project_type;

    if (!user_name || !user_email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Please ensure name, email, and message are provided.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format. Please provide a valid email address.'
      });
    }

    let dbSaved = false;
    try {
      await dbConnect();
      const newContact = new Contact({
        name: user_name,
        email: user_email,
        subject: subject || 'No Subject',
        message,
        project_type: project_type || 'General Inquiry'
      });
      await newContact.save();
      dbSaved = true;
    } catch (dbErr) {
      console.warn('⚠️ DB warning on contact submission, proceeding with email alert:', dbErr.message);
    }

    sendNotificationEmails({
      name: user_name,
      email: user_email,
      subject: subject || 'No Subject',
      message,
      project_type: project_type || 'General Inquiry'
    }).catch(err => {
      console.error('[Nodemailer API Error] Email transmission failed:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: dbSaved
        ? 'Transmission received. Data secured in MongoDB.'
        : 'Transmission received. Message dispatched successfully.'
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Transmission failed.'
    });
  }
}
