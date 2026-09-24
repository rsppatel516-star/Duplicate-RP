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
    let appHtml = render(url, helmetContext);
    const { helmet } = helmetContext;

    // 1. Extract title tag from helmet context OR React 19's rendered appHtml
    let pageTitle = '';
    if (helmet && helmet.title) {
      const hTitle = helmet.title.toString();
      const match = hTitle.match(/<title[^>]*>([^]*?)<\/title>/i);
      if (match && match[1] && match[1].trim()) {
        pageTitle = match[1].trim();
      }
    }
    if (!pageTitle) {
      const match = appHtml.match(/<title[^>]*>([^]*?)<\/title>/i);
      if (match && match[1]) {
        pageTitle = match[1].trim();
      }
    }

    // Strip any <title> tag out of appHtml so it doesn't stay inside <div id="root">
    appHtml = appHtml.replace(/<title[^>]*>[^]*?<\/title>/gi, '');

    if (!pageTitle) {
      pageTitle = 'Rudra Patel — Digital Architect & Full-Stack Engineer';
    }

    // 2. Extract SEO elements (meta, canonical, alternate, schema script) rendered by React 19 inside appHtml
    const extractedHeadTags = [];

    // Extract metas
    const metaMatches = appHtml.match(/<meta\s+[^>]*\/?>/gi) || [];
    for (const m of metaMatches) {
      extractedHeadTags.push(m);
    }
    appHtml = appHtml.replace(/<meta\s+[^>]*\/?>/gi, '');

    // Extract links (canonical, alternate, image_src, preload)
    const linkMatches = appHtml.match(/<link\s+rel="(canonical|alternate|image_src|preload)"[^>]*\/?>/gi) || [];
    for (const l of linkMatches) {
      extractedHeadTags.push(l);
    }
    appHtml = appHtml.replace(/<link\s+rel="(canonical|alternate|image_src|preload)"[^>]*\/?>/gi, '');

    // Extract JSON-LD schema scripts
    const schemaMatches = appHtml.match(/<script type="application\/ld\+json">[^]*?<\/script>/gi) || [];
    for (const s of schemaMatches) {
      extractedHeadTags.push(s);
    }
    appHtml = appHtml.replace(/<script type="application\/ld\+json">[^]*?<\/script>/gi, '');

    // Add any helmet tags if present
    if (helmet) {
      if (helmet.meta && helmet.meta.toString()) extractedHeadTags.push(helmet.meta.toString());
      if (helmet.link && helmet.link.toString()) extractedHeadTags.push(helmet.link.toString());
      if (helmet.script && helmet.script.toString()) extractedHeadTags.push(helmet.script.toString());
    }

    // Clean template of default titles/metas/canonicals/structured data to avoid duplicates in <head>
    let cleanHtml = template
      .replace(/<title>[^]*?<\/title>/gi, '')
      .replace(/<meta name="description"[^]*?>/gi, '')
      .replace(/<meta name="keywords"[^]*?>/gi, '')
      .replace(/<meta property="og:[^]*?>/gi, '')
      .replace(/<meta name="twitter:[^]*?>/gi, '')
      .replace(/<link rel="canonical"[^]*?>/gi, '')
      .replace(/<script type="application\/ld\+json">[^]*?<\/script>/gi, '');

    // Build head injection string: <title> tag FIRST, followed by all SEO metas and scripts
    const headInjection = [
      `<title>${pageTitle}</title>`,
      ...extractedHeadTags
    ].filter(Boolean).join('\n    ');

    // Inject into <head>
    let html = cleanHtml.replace('</head>', `    ${headInjection}\n  </head>`);

    // Inject clean appHtml into <div id="root">
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

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
