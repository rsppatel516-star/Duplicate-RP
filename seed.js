import dbConnect from './api/_lib/db.js';
import { Blog, Project } from './api/_lib/models.js';
import { blogposts } from './src/data/blogposts.js';
import { featuredArtifacts } from './src/data/featuredArtifacts.js';
import * as dotenv from 'dotenv';
dotenv.config();

async function seed() {
  try {
    console.log('Connecting to DB...');
    await dbConnect();
    console.log('Connected.');

    console.log('Seeding blogs...');
    for (const blog of blogposts) {
      const exists = await Blog.findOne({ title: blog.title });
      if (!exists) {
        await Blog.create({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          image: blog.image,
          category: blog.category,
          author: blog.author,
          readTime: blog.readTime,
          date: blog.date,
          tags: blog.tags,
          seo: blog.seo
        });
        console.log(`Added blog: ${blog.title}`);
      }
    }

    console.log('Seeding projects...');
    for (const project of featuredArtifacts) {
      const exists = await Project.findOne({ title: project.title });
      if (!exists) {
        await Project.create({
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          problem: project.problem,
          solution: project.solution,
          results: project.results,
          image: project.image,
          category: project.category,
          role: project.role,
          tags: project.tags,
          keyFeatures: project.keyFeatures,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          featured: project.featured,
          status: project.status
        });
        console.log(`Added project: ${project.title}`);
      }
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
}

seed();
