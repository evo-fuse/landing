import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Enable fast refresh with optimized settings
      fastRefresh: true,
      // Improve JSX runtime performance
      jsxRuntime: 'automatic',
      // Use babel for production builds only
      babel: mode === 'production' ? {
        plugins: [
          // Remove prop types in production
          ['transform-react-remove-prop-types', { removeImport: true }]
        ],
        // Optimize production builds
        presets: [
          ['@babel/preset-env', { targets: { browsers: 'defaults' } }]
        ]
      } : false
    }),
    // Only use bundle analyzer when needed (disabled by default)
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  
  // Esbuild optimizations
  esbuild: {
    // Remove console.log in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Minify with better settings
    minifyIdentifiers: mode === 'production',
    minifySyntax: mode === 'production',
    minifyWhitespace: mode === 'production',
    // Target modern browsers
    target: 'es2020',
    // Improve tree-shaking
    treeShaking: true
  },
  
  server: {
    host: "0.0.0.0"
  },
  
  build: {
    // Optimize build output
    target: 'es2020', // Target modern browsers for better performance
    minify: 'terser',
    cssMinify: true,
    assetsInlineLimit: 4096, // 4kb - inline small assets
    chunkSizeWarningLimit: 1000, // 1000kb warning limit
    // Enable module concatenation for better tree-shaking
    modulePreload: true,
    // Report on performance
    reportCompressedSize: true,
    // Improve CSS handling
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true,
        // More aggressive optimizations
        passes: 3,
        // Additional optimizations
        ecma: 2020,
        toplevel: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        pure_getters: true
      },
      format: {
        // Improve output size
        comments: false,
        ecma: 2020
      },
      // Improve minification
      module: true,
      toplevel: true
    },
    // Generate sourcemaps only for development, not for production
    sourcemap: mode !== 'production',
    
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
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    // Force include critical dependencies
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-icons/fa'
    ],
    // Exclude heavy libraries from initial bundle
    exclude: [
      'framer-motion',
      'gsap',
      'react-spring',
      'lottie-react'
    ],
    // Improve dependency optimization
    esbuildOptions: {
      target: 'es2020',
      // Better tree shaking
      treeShaking: true,
      // Optimize for modern browsers
      supported: {
        'async-await': true,
        'dynamic-import': true,
        'import-meta': true
      }
    }
  }
}))