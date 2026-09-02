import dbConnect from './_lib/db.js';
import { Project } from './_lib/models.js';
import { featuredArtifacts } from '../src/data/featuredArtifacts.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    if (projects.length > 0) {
      return res.status(200).json({ success: true, data: projects });
    }
    return res.status(200).json({ success: true, data: featuredArtifacts });
  } catch (_error) {
    return res.status(200).json({ success: true, data: featuredArtifacts });
  }
}
