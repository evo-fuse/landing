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
      const criticalCss = criticalCssChunks
        .map(chunk => chunk.source)
        .join('\n');

      // Inject critical CSS inline
      return html.replace(
        '</head>',
        `<style id="critical-css">${criticalCss}</style></head>`
      );
    },
  };
}

export default {
  bundleAnalyzer,
  removeConsolePlugin,
  inlineCriticalCssPlugin,
};
