import dbConnect from './_lib/db.js';
import { Contact } from './_lib/models.js';
import nodemailer from 'nodemailer';

async function sendNotificationEmails({ name, email, subject, message, project_type }) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || 'patelrudra99098@gmail.com';

  // Safeguard: Check if SMTP details are configured, otherwise log and skip
  if (!user || !pass || user.includes('placeholder') || pass.includes('placeholder')) {
    console.warn('[Nodemailer] SMTP credentials are not configured or still placeholders. Skipping email notifications.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass }
  });

  // 1. Alert to Admin (Rudra)
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

  // 2. Receipt Confirmation to Sender
  const userMailOptions = {
    from: `"Rudra Patel" <${user}>`,
    to: email,
    subject: `⚡ Connection Established: Rudra Patel Portfolio`,
    html: `
      <div style="background-color: #050510; color: #f8fafc; font-family: 'Bricolage Grotesque', 'Inter', sans-serif; padding: 40px; border-radius: 20px; border: 1px solid #ffffff1a; max-width: 600px; margin: auto;">
        <h2 style="color: #6366f1; margin-bottom: 8px; font-weight: 900; letter-spacing: -0.05em; font-size: 28px;">TRANSMISSION RECEIVED</h2>
        <div style="font-size: 11px; color: #ec4899; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 24px;">Status: Secured in Database</div>
        <p style="font-size: 16px; line-height: 1.6; color: rgba(248, 250, 252, 0.85); margin-bottom: 24px;">
          Hi ${name},<br/><br/>
          Thank you for reaching out! Your submission was successfully transmitted to my secure communications channel. I've stored your inquiry under the objective <strong>"${subject}"</strong> (${project_type}).
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: rgba(248, 250, 252, 0.85); margin-bottom: 32px;">
          I'll personally review your details and respond on this frequency as soon as possible. In the meantime, feel free to inspect my technical case studies or read my latest journal entries.
        </p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://patelrudra.in/artifacts" style="background-color: #f8fafc; color: #050510; padding: 12px 28px; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;">Explore Case Studies</a>
        </div>
        <hr style="border: 0; border-top: 1px solid #ffffff1a; margin-bottom: 16px;" />
        <div style="font-size: 12px; color: rgba(248, 250, 252, 0.4); text-align: center;">
          Rudra Patel — Digital Architect & Full-Stack Alchemist<br/>
          <a href="https://patelrudra.in" style="color: #ec4899; text-decoration: none;">patelrudra.in</a>
        </div>
      </div>
    `
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ]);
  console.log('[Nodemailer] Successfully sent contact emails to admin and sender.');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    console.log('Incoming contact request:', { method: req.method, body: req.body });
    
    await dbConnect();
    console.log('Successfully connected to MongoDB');

    const { user_name, user_email, subject, message, project_type } = req.body;

    // Basic validation
    if (!user_name || !user_email || !message) {
      console.warn('Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields. Please ensure name, email, and message are provided.' 
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      console.warn('Validation failed: Invalid email format', user_email);
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format. Please provide a valid email address.' 
      });
    }

    const newContact = new Contact({
      name: user_name,
      email: user_email,
      subject: subject || 'No Subject',
      message,
      project_type: project_type || 'General Inquiry'
    });

    await newContact.save();
    console.log('Successfully saved contact to database');

    // Trigger email alerts asynchronously (using catch to log any transporter issue but not fail the DB transaction response)
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
      message: 'Transmission received. Data secured in MongoDB.' 
    });
  } catch (error) {
    console.error('CRITICAL API Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    // Determine if it's a database connection error or something else
    const isDbError = error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError';
    const clientMessage = isDbError 
      ? 'Database connection failure. Please try again later or contact me directly via email.'
      : 'Internal Server Error. Transmission failed. Our systems are currently undergoing maintenance.';

    return res.status(500).json({ 
      success: false, 
      message: clientMessage 
    });
  }
}

