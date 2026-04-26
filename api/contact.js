import dbConnect from './_lib/db.js';
import mongoose from 'mongoose';

// Define the Contact schema if it hasn't been defined yet
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();

    const { user_name, user_email, subject, message } = req.body;

    if (!user_name || !user_email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = new Contact({
      name: user_name,
      email: user_email,
      subject: subject || 'No Subject',
      message
    });

    await newContact.save();

    return res.status(201).json({ 
      success: true, 
      message: 'Transmission received. Data secured in MongoDB.' 
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error. Transmission failed.' 
    });
  }
}
