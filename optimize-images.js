import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TARGET_DIRS = [
  './public/images',
  './public/images/blog',
  './public/project img',
  './public/certificate img',
  './public/case img'
];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const outPath = path.join(dirName, `${baseName}.webp`);

  try {
    const metadata = await sharp(filePath).metadata();
    let transformer = sharp(filePath).rotate();
    
    // Scale down if width is too large (e.g. > 1920) to save space
    if (metadata.width && metadata.width > 1920) {
      transformer = transformer.resize({ width: 1920, withoutEnlargement: true });
    }

    await transformer
      .webp({ quality: 80 }) // 80% is the industry standard sweet spot
      .toFile(outPath);

    const origStats = fs.statSync(filePath);
    const newStats = fs.statSync(outPath);
    const savings = ((origStats.size - newStats.size) / origStats.size * 100).toFixed(2);
    
    console.log(`✅ Converted: ${path.basename(filePath)} -> ${baseName}.webp`);
    console.log(`   Original: ${(origStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized: ${(newStats.size / 1024).toFixed(2)} KB (${savings}% savings)`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

async function run() {
  console.log('🚀 Starting comprehensive image optimization and WebP migration...\n');
  
  for (const dir of TARGET_DIRS) {
    if (fs.existsSync(dir)) {
      console.log(`📂 Scanning directory: ${dir}`);
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isFile()) {
          await optimizeImage(fullPath);
        }
      }
      console.log('');
    }
  }
  
  console.log('🎉 Image optimization pass completed!');
}

run();
