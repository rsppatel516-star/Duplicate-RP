/**
 * devserver.js — Local Development API Server
 * Mirrors the Vercel serverless function routes so that
 * the Vite proxy (/api/*) works during local development.
 *
 * Run with: node --env-file=.env devserver.js
 */

import express from 'express';
import cookieParser from 'cookie-parser';

// Import all API handlers
import authHandler from './api/admin/auth.js';
import messagesHandler from './api/admin/messages.js';
import blogsHandler from './api/admin/blogs.js';
import projectsHandler from './api/admin/projects.js';
import replyHandler from './api/admin/reply.js';
import contactHandler from './api/contact.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Helper to convert Express req/res to a Vercel-compatible interface
function makeHandler(handler) {
  return (req, res) => {
    // Vercel provides req.cookies via the cookie header; Express provides it via cookieParser
    handler(req, res);
  };
}

// --- Admin Routes ---
app.all('/api/admin/auth', makeHandler(authHandler));
app.all('/api/admin/messages', makeHandler(messagesHandler));
app.all('/api/admin/blogs', makeHandler(blogsHandler));
app.all('/api/admin/projects', makeHandler(projectsHandler));
app.all('/api/admin/reply', makeHandler(replyHandler));

// --- Public Routes ---
app.all('/api/contact', makeHandler(contactHandler));

app.listen(PORT, () => {
  console.log(`\n✅ Dev API server running at http://localhost:${PORT}`);
  console.log(`   Vite will proxy /api/* calls here.\n`);
});
