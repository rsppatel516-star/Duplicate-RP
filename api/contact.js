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
    console.log('Incoming contact request:', { method: req.method, body: req.body });
    
    await dbConnect();
    console.log('Successfully connected to MongoDB');

    const { user_name, user_email, subject, message } = req.body;

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
        message: 'Invalid email format. Please provide a valid communication frequency.' 
      });
    }

    const newContact = new Contact({
      name: user_name,
      email: user_email,
      subject: subject || 'No Subject',
      message
    });

    await newContact.save();
    console.log('Successfully saved contact to database');

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
