import dbConnect from './_lib/db.js';
import { Blog } from './_lib/models.js';

// Simple helper to clean up XML-invalid characters
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Fetch blogs, latest first
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

    const baseUrl = 'https://patelrudra.in';
    const lastBuildDate = new Date().toUTCString();

    let xml = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
    xml += '  <channel>\n';
    xml += `    <title>${escapeXml('Insights & Thoughts | Rudra Patel')}</title>\n`;
    xml += `    <link>${baseUrl}/blog</link>\n`;
    xml += `    <description>${escapeXml('Deep dives into AI, full-stack development, and modern design principles.')}</description>\n`;
    xml += '    <language>en-us</language>\n';
    xml += `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`;
    xml += `    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />\n`;

    blogs.forEach((post) => {
      const identifier = post.id || post._id;
      const postUrl = `${baseUrl}/blog/${identifier}`;
      
      // Parse the date (try post.date string first, then post.createdAt, fallback to current time)
      let pubDate = new Date().toUTCString();
      if (post.date) {
        const parsed = Date.parse(post.date);
        if (!isNaN(parsed)) {
          pubDate = new Date(parsed).toUTCString();
        }
      } else if (post.createdAt) {
        pubDate = new Date(post.createdAt).toUTCString();
      }

      xml += '    <item>\n';
      xml += `      <title>${escapeXml(post.title)}</title>\n`;
      xml += `      <link>${postUrl}</link>\n`;
      xml += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
      xml += `      <pubDate>${pubDate}</pubDate>\n`;
      xml += `      <description>${escapeXml(post.excerpt || post.seo?.metaDescription)}</description>\n`;
      if (post.category) {
        xml += `      <category>${escapeXml(post.category)}</category>\n`;
      }
      xml += '    </item>\n';
    });

    xml += '  </channel>\n';
    xml += '</rss>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache on Edge CDN for 1 day
    return res.status(200).send(xml);
  } catch (error) {
    console.error('RSS Feed API Error:', error);
    return res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}
