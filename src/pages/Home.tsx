import { Layout } from "../components";
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Lazy load DiscoverGames component
const DiscoverGames = lazy(() => import("../components/DiscoverGames"));

// Use local image instead of external URL
const darklogo = "https://i.ibb.co/HLnWv6Lg/Logo.png";

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["P2E Games", "Innovative Fuse", "Casual Gamers"];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // No background bubbles needed for simple black background
  
  // Simplified scroll animation with reduced overhead
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Use simpler transform without spring for better performance
  const springY2 = useTransform(y2, value => Math.round(value));

  useEffect(() => {
    // Use a more efficient approach with requestAnimationFrame
    let timeoutId: number;
    
    const changeWord = () => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      timeoutId = window.setTimeout(changeWord, 2000); // Change word every 2 seconds
    };
    
    timeoutId = window.setTimeout(changeWord, 2000);
    
    return () => window.clearTimeout(timeoutId);
  }, [words.length]);

  const scrollToGames = useCallback(() => {
    const gamesSection = document.getElementById("games");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section with Simple Black Background */}
      <div ref={containerRef} className="h-[calc(100vh-56px)] w-full relative overflow-hidden flex justify-center bg-transparent">
        <motion.div 
          className="w-[80vw] h-full max-w-[1280px] flex flex-col justify-center z-10"
          style={{ y: springY2 }}
          layoutId="content-container"
        >
          <div className="w-full flex items-center justify-between bg-transparent p-10 rounded-2xl border border-gray-800 shadow-xl will-change-transform will-change-opacity">
            <h1 className="text-7xl text-white font-bold flex flex-col gap-6">
              <motion.span 
                className="flex items-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Ev
                <img 
                  src={darklogo} 
                  className="w-9 h-auto pt-5 ml-1 mr-2"
                  loading="eager"
                /> Fuse is
                a
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Ecosystem for
              </motion.span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.5,
                    type: "tween", // Use tween instead of spring for better performance
                    ease: "easeOut"
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
                  style={{ willChange: "transform, opacity" }}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </h1>
            <ul className="flex flex-col gap-6 text-white text-4xl bg-transparent p-6 rounded-xl border border-gray-800 shadow-lg">
              <li className="flex items-center gap-4 hover:scale-105 transition-all duration-300">
                <img 
                  src={darklogo} 
                  className="w-8 hover:rotate-12 transition-transform duration-300"
                  loading="eager"
                />
                <p>Challenging Games</p>
              </li>
              <li className="flex items-center gap-4 hover:scale-105 transition-all duration-300">
                <img 
                  src={darklogo} 
                  className="w-8 hover:rotate-12 transition-transform duration-300"
                  loading="eager"
                />
                <p>Innovative Features</p>
              </li>
              <li className="flex items-center gap-4 hover:scale-105 transition-all duration-300">
                <img 
                  src={darklogo} 
                  className="w-8 hover:rotate-12 transition-transform duration-300"
                  loading="eager"
                />
                <p>Fuse Reward</p>
              </li>
              <li className="flex items-center gap-4 hover:scale-105 transition-all duration-300">
                <img 
                  src={darklogo} 
                  className="w-8 hover:rotate-12 transition-transform duration-300"
                  loading="eager"
                />
                <p>Always Free</p>
              </li>
            </ul>
          </div>
          <div className="w-full flex items-center justify-center pt-24 opacity-0 animate-fadeIn" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
            <button 
              onClick={scrollToGames} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-2xl font-bold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Explore EcoSystem
            </button>
          </div>
        </motion.div>
      </div>
      <Suspense fallback={<div className="min-h-[100vh] w-full flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>}>
        <DiscoverGames />
      </Suspense>
    </Layout>
  );
};

export default Home;