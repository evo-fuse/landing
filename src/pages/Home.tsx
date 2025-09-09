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
      {/* Hero Section with Responsive Design */}
      <div ref={containerRef} className="w-full relative overflow-hidden flex justify-center bg-transparent px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="w-full max-w-7xl h-full flex flex-col justify-center z-10 py-8 sm:py-12 lg:py-16"
          style={{ y: springY2 }}
          layoutId="content-container"
        >
          {/* Main Content Container - Responsive Layout */}
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between bg-transparent p-4 sm:p-6 lg:p-10 rounded-2xl border border-gray-800 shadow-xl will-change-transform will-change-opacity gap-8 lg:gap-12">
            
            {/* Hero Text Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold flex flex-col gap-2 sm:gap-4 lg:gap-6 leading-tight">
                <motion.span 
                  className="flex items-center flex-wrap"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Ev
                  <img 
                    src={darklogo} 
                    className="w-6 h-auto sm:w-7 md:w-8 lg:w-9 pt-1 sm:pt-2 md:pt-3 lg:pt-5 ml-1 mr-2"
                    loading="eager"
                    alt="EvoFuse blockchain gaming platform logo"
                  /> Fuse is
                  <span className="block sm:inline">&nbsp;a</span>
                </motion.span>
                <motion.span
                  className="block"
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
                      type: "tween",
                      ease: "easeOut"
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text block"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>

            {/* Features List Section */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <ul className="flex flex-col gap-3 sm:gap-4 lg:gap-6 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl bg-transparent p-4 sm:p-6 rounded-xl border border-gray-800 shadow-lg w-full max-w-md lg:max-w-none">
                <li className="flex items-center gap-3 sm:gap-4 hover:scale-105 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/30">
                  <img 
                    src={darklogo} 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                    loading="eager"
                    alt="EvoFuse challenging games feature icon"
                  />
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl">Challenging Games</p>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 hover:scale-105 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/30">
                  <img 
                    src={darklogo} 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                    loading="eager"
                    alt="EvoFuse innovative features icon"
                  />
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl">Innovative Features</p>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 hover:scale-105 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/30">
                  <img 
                    src={darklogo} 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                    loading="eager"
                    alt="EvoFuse blockchain rewards icon"
                  />
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl">Fuse Reward</p>
                </li>
                <li className="flex items-center gap-3 sm:gap-4 hover:scale-105 transition-all duration-300 p-2 rounded-lg hover:bg-gray-800/30">
                  <img 
                    src={darklogo} 
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                    loading="eager"
                    alt="EvoFuse free gaming platform icon"
                  />
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl">Always Free</p>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Button Section */}
          <div className="w-full flex items-center justify-center pt-8 sm:pt-12 lg:pt-16 xl:pt-24 opacity-0 animate-fadeIn" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
            <button 
              onClick={scrollToGames} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-4 rounded-full text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-xl active:scale-95 w-full max-w-xs sm:max-w-sm lg:max-w-none"
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