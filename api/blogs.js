import dbConnect from './_lib/db.js';
import { Blog } from './_lib/models.js';
import { blogposts } from '../src/data/blogposts.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    if (blogs.length > 0) {
      return res.status(200).json({ success: true, data: blogs });
    }
    return res.status(200).json({ success: true, data: blogposts });
  } catch (_error) {
    return res.status(200).json({ success: true, data: blogposts });
  }
}
