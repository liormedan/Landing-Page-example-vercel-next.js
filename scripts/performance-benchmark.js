#!/usr/bin/env node

/**
 * Performance benchmark script for the landing page
 * Measures build output sizes and performance metrics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Performance thresholds
const THRESHOLDS = {
  // Bundle sizes (in bytes)
  initialJS: 200 * 1024, // 200KB
  totalJS: 500 * 1024,   // 500KB
  css: 50 * 1024,        // 50KB
  
  // Core Web Vitals targets
  LCP: 2500,  // ms
  FID: 100,   // ms
  CLS: 0.1,   // score
  FCP: 1800,  // ms
  TTFB: 800,  // ms
  INP: 200,   // ms
};

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Get directory size recursively
 */
function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }
  
  return totalSize;
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Analyze build output
 */
function analyzeBuildOutput() {
  const buildDir = path.join(__dirname, '../.next');
  const staticDir = path.join(buildDir, 'static');
  
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  const results = {
    totalSize: getDirectorySize(buildDir),
    staticSize: getDirectorySize(staticDir),
    jsSize: 0,
    cssSize: 0,
    chunks: [],
  };
  
  // Analyze JS chunks
  const chunksDir = path.join(staticDir, 'chunks');
  if (fs.existsSync(chunksDir)) {
    const chunks = fs.readdirSync(chunksDir);
    
    for (const chunk of chunks) {
      if (chunk.endsWith('.js')) {
        const chunkPath = path.join(chunksDir, chunk);
        const size = getFileSize(chunkPath);
        results.jsSize += size;
        results.chunks.push({ name: chunk, size, type: 'js' });
      }
    }
  }
  
  // Analyze CSS files
  const cssDir = path.join(staticDir, 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir);
    
    for (const cssFile of cssFiles) {
      if (cssFile.endsWith('.css')) {
        const cssPath = path.join(cssDir, cssFile);
        const size = getFileSize(cssPath);
        results.cssSize += size;
        results.chunks.push({ name: cssFile, size, type: 'css' });
      }
    }
  }
  
  return results;
}

/**
 * Check if values meet thresholds
 */
function checkThreshold(value, threshold, name, unit = '') {
  const passes = value <= threshold;
  const status = passes ? '✅' : '❌';
  const percentage = ((value / threshold) * 100).toFixed(1);
  
  console.log(`${status} ${name}: ${formatBytes ? formatBytes(value) : value}${unit} (${percentage}% of threshold)`);
  
  return passes;
}

/**
 * Run performance benchmark
 */
function runBenchmark() {
  console.log('🚀 Running Performance Benchmark\n');
  
  // Build the project first
  console.log('📦 Building project...');
  try {
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Build completed\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
  
  // Analyze build output
  console.log('📊 Analyzing build output...\n');
  const buildResults = analyzeBuildOutput();
  
  console.log('Bundle Size Analysis:');
  console.log('====================');
  
  let allPassed = true;
  
  // Check bundle size thresholds
  allPassed &= checkThreshold(buildResults.jsSize, THRESHOLDS.totalJS, 'Total JavaScript');
  allPassed &= checkThreshold(buildResults.cssSize, THRESHOLDS.css, 'Total CSS');
  
  console.log(`\nTotal build size: ${formatBytes(buildResults.totalSize)}`);
  console.log(`Static assets size: ${formatBytes(buildResults.staticSize)}\n`);
  
  // Show largest chunks
  const sortedChunks = buildResults.chunks
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);
  
  if (sortedChunks.length > 0) {
    console.log('Largest chunks:');
    console.log('===============');
    sortedChunks.forEach(chunk => {
      console.log(`${chunk.type.toUpperCase()}: ${chunk.name} - ${formatBytes(chunk.size)}`);
    });
    console.log('');
  }
  
  // Performance targets
  console.log('Core Web Vitals Targets:');
  console.log('========================');
  console.log(`🎯 LCP (Largest Contentful Paint): ≤ ${THRESHOLDS.LCP}ms`);
  console.log(`🎯 FID (First Input Delay): ≤ ${THRESHOLDS.FID}ms`);
  console.log(`🎯 CLS (Cumulative Layout Shift): ≤ ${THRESHOLDS.CLS}`);
  console.log(`🎯 FCP (First Contentful Paint): ≤ ${THRESHOLDS.FCP}ms`);
  console.log(`🎯 TTFB (Time to First Byte): ≤ ${THRESHOLDS.TTFB}ms`);
  console.log(`🎯 INP (Interaction to Next Paint): ≤ ${THRESHOLDS.INP}ms\n`);
  
  // Recommendations
  console.log('Performance Recommendations:');
  console.log('============================');
  
  if (buildResults.jsSize > THRESHOLDS.totalJS) {
    console.log('📝 JavaScript bundle is large. Consider:');
    console.log('   - Code splitting with dynamic imports');
    console.log('   - Tree shaking unused dependencies');
    console.log('   - Using lighter alternatives for heavy libraries');
  }
  
  if (buildResults.cssSize > THRESHOLDS.css) {
    console.log('📝 CSS bundle is large. Consider:');
    console.log('   - Purging unused CSS with Tailwind');
    console.log('   - Critical CSS extraction');
    console.log('   - CSS minification');
  }
  
  console.log('📝 General recommendations:');
  console.log('   - Use Next.js Image component for all images');
  console.log('   - Implement lazy loading for below-the-fold content');
  console.log('   - Enable compression (gzip/brotli) on server');
  console.log('   - Use CDN for static assets');
  console.log('   - Monitor real user metrics with Web Vitals');
  
  console.log('\n' + (allPassed ? '🎉 All bundle size thresholds passed!' : '⚠️  Some thresholds exceeded'));
  
  return allPassed;
}

// Run if called directly
if (require.main === module) {
  const success = runBenchmark();
  process.exit(success ? 0 : 1);
}

module.exports = { runBenchmark, analyzeBuildOutput, THRESHOLDS };