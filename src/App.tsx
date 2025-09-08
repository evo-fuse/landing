import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { PageTransition } from './components'

// Import AnimatePresence dynamically to reduce initial bundle size
const AnimatePresence = lazy(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })))

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Game2048 = lazy(() => import('./pages/Game2048'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-[calc(100vh-56px)] w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
)

// Animated Routes component
const AnimatedRoutes = () => {
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
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
