import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// @ts-ignore
import { bundleAnalyzer, removeConsolePlugin, inlineCriticalCssPlugin } from './src/plugins/vite-plugin-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsolePlugin(),
    inlineCriticalCssPlugin({
      cssFiles: ['index']
    }),
    // Only use bundle analyzer when needed (disabled by default)
    process.env.ANALYZE === 'true' && bundleAnalyzer({
      open: true,
      filename: 'bundle-stats.html'
    })
  ].filter(Boolean),
  server: {
    host: "0.0.0.0"
  },
  build: {
    // Optimize build output
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    assetsInlineLimit: 4096, // 4kb - inline small assets
    chunkSizeWarningLimit: 1000, // 1000kb warning limit
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true,
        // More aggressive optimizations
        passes: 3,
      },
    },
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Chunk splitting strategy
        manualChunks: (id) => {
          // Critical path - keep these minimal and optimize for First Contentful Paint
          if (id.includes('src/components/Layout.tsx') || 
              id.includes('src/components/Header.tsx') ||
              id.includes('src/App.tsx')) {
            return 'critical';
          }
          
          // Core React dependencies - essential for initial render
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }

          // Scheduler - separate from react core to reduce critical path size
          if (id.includes('node_modules/scheduler/')) {
            return 'react-scheduler';
          }
          
          // React Router - needed early but not in critical path
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/@remix-run')) {
            return 'routing';
          }
          
          // Animation libraries - defer loading these
          if (id.includes('node_modules/framer-motion') || 
              id.includes('node_modules/@motionone')) {
            return 'animations';
          }
          
          // Other animation libraries - lowest priority
          if (id.includes('node_modules/gsap') || 
              id.includes('node_modules/react-spring') || 
              id.includes('node_modules/lottie-react')) {
            return 'animations-extra';
          }

          // Icons - separate chunk for better caching
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          
          // Remaining vendor code
          if (id.includes('node_modules/')) {
            return 'vendor';
          }

          // Route-based code splitting
          if (id.includes('src/pages/Home')) {
            return 'page-home';
          }
          if (id.includes('src/pages/Game2048')) {
            return 'page-2048';
          }
          if (id.includes('src/pages/About')) {
            return 'page-about';
          }
        }
      }
    },
    // Enable source maps for production
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom'
    ],
    // Exclude heavy libraries from initial bundle
    exclude: [
      'framer-motion',
      'gsap',
      'react-spring',
      'lottie-react'
    ]
  }
})
