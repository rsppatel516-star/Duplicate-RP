import dbConnect from '../_lib/db.js';
import { Project } from '../_lib/models.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only_change_in_prod';

function authenticate(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
  if (!tokenMatch) return null;
  try { return jwt.verify(tokenMatch[1], JWT_SECRET); } catch (e) { return null; }
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const projects = await Project.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  }

  const user = authenticate(req);
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  if (req.method === 'POST') {
    try {
      const newProject = await Project.create(req.body);
      return res.status(201).json({ success: true, data: newProject });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, ...updateData } = req.body;
      if (!id) return res.status(400).json({ success: false, message: 'ID required' });
      const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
      if (!project) return res.status(404).json({ success: false, message: 'Not found' });
      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: 'ID required' });
      const project = await Project.findByIdAndDelete(id);
      if (!project) return res.status(404).json({ success: false, message: 'Not found' });
      return res.status(200).json({ success: true, data: {} });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
