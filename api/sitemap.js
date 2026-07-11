import dbConnect from './_lib/db.js';
import { Blog, Project } from './_lib/models.js';

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Fetch all active/published blogs and projects
    const [blogs, projects] = await Promise.all([
      Blog.find({}).select('id createdAt date').lean(),
      Project.find({}).select('id createdAt').lean()
    ]);

    const baseUrl = 'https://patelrudra.in';

    // Static pages list
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/artifacts', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' },
      { url: '/achievements', priority: '0.7', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' }
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // 1. Add static pages
    staticPages.forEach((page) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // 2. Add dynamic project case studies
    projects.forEach((proj) => {
      const identifier = proj.id || proj._id;
      const lastMod = proj.createdAt ? new Date(proj.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/artifacts/${identifier}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });

    // 3. Add dynamic blog posts
    blogs.forEach((post) => {
      const identifier = post.id || post._id;
      const lastMod = post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${identifier}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache on Edge CDN for 1 day
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap API Error:', error);
    return res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
