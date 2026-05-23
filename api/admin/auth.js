import dbConnect from '../_lib/db.js';
import { Admin } from '../_lib/models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only_change_in_prod';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();

    const { username, password, action } = req.body;

    if (action === 'register') {
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password required' });
      }
      // Very basic security: check if an admin already exists to prevent open registration
      const existingAdminsCount = await Admin.countDocuments();
      if (existingAdminsCount > 0) {
        return res.status(403).json({ success: false, message: 'Admin registration is closed' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();
      
      return res.status(201).json({ success: true, message: 'Admin user created successfully. Please log in.' });
    }

    if (action === 'login') {
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password required' });
      }
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });

      // Set cookie
      const cookie = serialize('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict'
      });

      res.setHeader('Set-Cookie', cookie);

      return res.status(200).json({ success: true, message: 'Login successful' });
    }

    if (action === 'logout') {
      const cookie = serialize('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        path: '/',
        sameSite: 'strict'
      });

      res.setHeader('Set-Cookie', cookie);
      return res.status(200).json({ success: true, message: 'Logged out successfully' });
    }

    if (action === 'check') {
      const token = req.cookies?.admin_token;
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ success: true, user: { id: decoded.id, username: decoded.username } });
      } catch (e) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });

  } catch (error) {
    console.error('Auth API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
