import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
    rollupOptions: {
      output: {
        // Chunk splitting strategy
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            'framer-motion'
          ],
          // Split other large dependencies
          animations: ['gsap', 'react-spring', 'lottie-react'],
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
      'react-router-dom', 
      'framer-motion',
      'gsap',
      'react-spring'
    ]
  }
})
