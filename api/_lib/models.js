import mongoose from 'mongoose';

// --- Admin User Schema ---
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Will store hashed password
  createdAt: { type: Date, default: Date.now }
});

// --- Blog Post Schema ---
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String }, // HTML or Markdown content
  image: { type: String }, // URL or path
  category: { type: String, default: 'General' },
  author: { type: String, default: 'Rudra Patel' },
  readTime: { type: String },
  date: { type: String }, // e.g. "May 20, 2026"
  tags: [{ type: String }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    canonical: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

// --- Project / Artifact Schema ---
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  problem: { type: String },
  solution: { type: String },
  results: { type: String },
  image: { type: String },
  category: { type: String },
  role: { type: String },
  tags: [{ type: String }],
  keyFeatures: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// --- Contact Schema (Already in contact.js, but good to centralize) ---
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  project_type: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
