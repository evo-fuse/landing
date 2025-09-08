import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, memo } from 'react'
import { PageTransition } from './components'

// Import AnimatePresence dynamically to reduce initial bundle size
// Use dynamic import with prefetch to improve loading performance
const AnimatePresence = lazy(() => {
  // Prefetch the module
  const prefetchPromise = import('framer-motion')
  
  // Return the module with the specific component
  return prefetchPromise.then(mod => ({ default: mod.AnimatePresence }))
})

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Game2048 = lazy(() => import('./pages/Game2048'))
const About = lazy(() => import('./pages/About'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component - memoized to prevent unnecessary re-renders
const LoadingFallback = memo(() => (
  <div className="flex items-center justify-center h-[calc(100vh-56px)] w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
))

// Animated Routes component - memoized to prevent unnecessary re-renders
const AnimatedRoutes = memo(() => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/2048" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Game2048 />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <About />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/sitemap" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Sitemap />
            </Suspense>
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
});

// Use React.memo for the App component to prevent unnecessary re-renders
const App = memo(function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
})

export default App
