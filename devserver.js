/**
 * devserver.js — Local Development API Server
 * Mirrors the Vercel serverless function routes so that
 * the Vite proxy (/api/*) works during local development.
 *
 * Run with: node --env-file=.env devserver.js
 */

import express from 'express';
import cookieParser from 'cookie-parser';

// Import public API handlers
import blogsHandler from './api/blogs.js';
import projectsHandler from './api/projects.js';
import contactHandler from './api/contact.js';
import sitemapHandler from './api/sitemap.js';
import feedHandler from './api/feed.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Helper to convert Express req/res to a Vercel-compatible interface
function makeHandler(handler) {
  return (req, res) => {
    handler(req, res);
  };
}

// --- Public Routes ---
app.all('/api/blogs', makeHandler(blogsHandler));
app.all('/api/projects', makeHandler(projectsHandler));
app.all('/api/contact', makeHandler(contactHandler));
app.all('/sitemap.xml', makeHandler(sitemapHandler));
app.all('/feed.xml', makeHandler(feedHandler));

app.listen(PORT, () => {
  console.log(`\n✅ Dev API server running at http://localhost:${PORT}`);
  console.log(`   Vite will proxy /api/* calls here.\n`);
});
