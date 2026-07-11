import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { blogposts } from './src/data/blogposts.js';
import { caseStudies } from './src/data/caseStudies.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const distDir = path.resolve(__dirname, 'dist');
  const serverBuildFile = path.resolve(__dirname, 'dist-server', 'entry-server.js');
  const templatePath = path.resolve(distDir, 'index.html');

  // Check if build exists
  try {
    await fs.access(templatePath);
  } catch {
    console.error('Error: dist/index.html not found. Run client build first.');
    process.exit(1);
  }

  // Load render function
  const { render } = await import(pathToFileURL(serverBuildFile).toString());
  const template = await fs.readFile(templatePath, 'utf-8');

  // Define routes to prerender
  const routes = [
    '/',
    '/artifacts',
    '/achievements',
    '/contact',
    '/blog',
    ...blogposts.map(post => `/blog/${post.id}`),
    ...caseStudies.map(cs => `/artifacts/${cs.id}`)
  ];

  console.log(`Prerendering ${routes.length} routes...`);

  for (const url of routes) {
    const helmetContext = {};
    const appHtml = render(url, helmetContext);
    const { helmet } = helmetContext;

    // Clean template of default titles/metas/canonicals/structured data to avoid duplicates
    let cleanHtml = template
      .replace(/<title>[^]*?<\/title>/g, '')
      .replace(/<meta name="description"[^]*?>/g, '')
      .replace(/<meta name="keywords"[^]*?>/g, '')
      .replace(/<meta property="og:[^]*?>/g, '')
      .replace(/<meta property="twitter:[^]*?>/g, '')
      .replace(/<link rel="canonical"[^]*?>/g, '')
      .replace(/<script type="application\/ld\+json">[^]*?<\/script>/g, ''); // Clear index.html's hardcoded schema

    // Inject prerendered content and helmet tags
    let html = cleanHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    if (helmet) {
      const helmetTags = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}`;
      html = html.replace('</head>', `${helmetTags}</head>`);
    }

    // Determine output file path
    let filePath;
    if (url === '/') {
      filePath = path.join(distDir, 'index.html');
    } else {
      filePath = path.join(distDir, url, 'index.html');
    }

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, html, 'utf-8');
    console.log(`✓ Generated ${filePath}`);
  }

  // Clean up server build folder
  await fs.rm(path.resolve(__dirname, 'dist-server'), { recursive: true, force: true });
  console.log('SSG Build Complete!');
}

run().catch(console.error);
