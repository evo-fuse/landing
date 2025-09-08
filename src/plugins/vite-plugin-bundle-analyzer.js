// Bundle analyzer plugin for Vite
import { visualizer } from 'rollup-plugin-visualizer';
import { gzipSync } from 'zlib';
import { compress } from 'brotli';

/**
 * Custom plugin to analyze bundle size and optimize it
 * @param {Object} options - Plugin options
 * @returns {Object} - Rollup plugin
 */
export function bundleAnalyzer(options = {}) {
  const defaultOptions = {
    open: false,
    gzipSize: true,
    brotliSize: true,
    filename: 'stats.html',
  };

  const resolvedOptions = { ...defaultOptions, ...options };

  return visualizer({
    ...resolvedOptions,
    // Custom size calculation to include brotli compression
    transformBundle: (bundle) => {
      if (!resolvedOptions.brotliSize) return bundle;

      // Add brotli size to the bundle
      Object.keys(bundle).forEach((key) => {
        const asset = bundle[key];
        if (asset.code) {
          const brotliCompressed = compress(Buffer.from(asset.code));
          asset.brotliSize = brotliCompressed ? brotliCompressed.length : 0;
        }
      });

      return bundle;
    },
  });
}

/**
 * Plugin to remove console.log statements in production
 * @returns {Object} - Rollup plugin
 */
export function removeConsolePlugin() {
  return {
    name: 'remove-console',
    transform(code, id) {
      if (id.includes('node_modules')) return;

      // Skip non-JavaScript files
      if (!id.match(/\.[jt]sx?$/)) return;

      // Replace console.log statements
      let result = code.replace(/console\.log\([^)]*\);?/g, '');
      
      // Replace console.debug statements
      result = result.replace(/console\.debug\([^)]*\);?/g, '');
      
      // Replace console.info statements in production
      if (process.env.NODE_ENV === 'production') {
        result = result.replace(/console\.info\([^)]*\);?/g, '');
      }
      
      return {
        code: result,
        map: null,
      };
    },
  };
}

/**
 * Plugin to inline critical CSS
 * @param {Object} options - Plugin options
 * @returns {Object} - Rollup plugin
 */
export function inlineCriticalCssPlugin(options = {}) {
  const defaultOptions = {
    cssFiles: ['index.css'],
    minifyCriticalCss: true
  };

  const resolvedOptions = { ...defaultOptions, ...options };

  return {
    name: 'inline-critical-css',
    transformIndexHtml(html, ctx) {
      // Only run in build mode
      if (!ctx || !ctx.bundle) return html;

      // Find CSS chunks
      const cssChunks = Object.keys(ctx.bundle)
        .filter(key => key.endsWith('.css'))
        .map(key => ctx.bundle[key]);

      // Find critical CSS files
      const criticalCssChunks = cssChunks.filter(chunk => 
        resolvedOptions.cssFiles.some(file => chunk.fileName.includes(file))
      );

      // If no critical CSS found, return unchanged HTML
      if (criticalCssChunks.length === 0) return html;

      // Extract CSS content
      let criticalCss = criticalCssChunks
        .map(chunk => chunk.source)
        .join('\n');

      // Basic CSS minification for critical CSS
      if (resolvedOptions.minifyCriticalCss) {
        criticalCss = criticalCss
          // Remove comments
          .replace(/\/\*[\s\S]*?\*\//g, '')
          // Remove whitespace
          .replace(/\s+/g, ' ')
          // Remove spaces around selectors
          .replace(/\s*([{}:;,])\s*/g, '$1')
          // Remove unnecessary semicolons
          .replace(/;}/g, '}')
          // Remove trailing whitespace
          .trim();
      }

      // Extract only the most critical CSS rules for above-the-fold content
      // Focus on layout, typography, and header styles
      const aboveFoldCss = extractAboveFoldCss(criticalCss);

      // Inject critical CSS inline
      const modifiedHtml = html.replace(
        '</head>',
        `<style id="critical-css">${aboveFoldCss}</style></head>`
      );

      // Add preload for the rest of the CSS
      const cssLinks = cssChunks
        .filter(chunk => !resolvedOptions.cssFiles.some(file => chunk.fileName.includes(file)))
        .map(chunk => {
          const href = chunk.fileName.startsWith('/') ? chunk.fileName : `/${chunk.fileName}`;
          return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
        })
        .join('');

      return modifiedHtml.replace(
        '</head>',
        `${cssLinks}</head>`
      );
    },
  };
}

/**
 * Extract the most critical CSS for above-the-fold content
 * @param {string} css - Full CSS content
 * @returns {string} - Critical CSS for above-the-fold content
 */
function extractAboveFoldCss(css) {
  // Define patterns for critical selectors
  const criticalPatterns = [
    // Layout and container styles
    /body\s*{[^}]*}/g,
    /html\s*{[^}]*}/g,
    /\.container\s*{[^}]*}/g,
    // Header styles
    /header\s*{[^}]*}/g,
    /\.header\s*{[^}]*}/g,
    /#header\s*{[^}]*}/g,
    // Navigation
    /nav\s*{[^}]*}/g,
    /\.nav\s*{[^}]*}/g,
    // Typography
    /h1\s*{[^}]*}/g,
    /h2\s*{[^}]*}/g,
    /p\s*{[^}]*}/g,
    // Critical tailwind utilities
    /\.flex\s*{[^}]*}/g,
    /\.grid\s*{[^}]*}/g,
    /\.hidden\s*{[^}]*}/g,
    /\.block\s*{[^}]*}/g,
    /\.text-\w+\s*{[^}]*}/g,
    /\.bg-\w+\s*{[^}]*}/g,
    /\.font-\w+\s*{[^}]*}/g,
    // Animation classes for initial render
    /\.animate-\w+\s*{[^}]*}/g
  ];

  // Extract critical CSS
  let criticalCss = '';
  criticalPatterns.forEach(pattern => {
    const matches = css.match(pattern);
    if (matches) {
      criticalCss += matches.join('');
    }
  });

  return criticalCss;
}

export default {
  bundleAnalyzer,
  removeConsolePlugin,
  inlineCriticalCssPlugin,
};
