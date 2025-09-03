import { Layout, DiscoverGames } from "../components";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import darklogo from "../assets/Logo.png";
const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["P2E Games", "Innovative Fuse", "Casual Gamers"];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // No background bubbles needed for simple black background
  
  // Smoother scroll-based animations
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Smoother springs with higher damping
  const springY2 = useSpring(y2, { stiffness: 50, damping: 40 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToGames = () => {
    const gamesSection = document.getElementById("games");
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout>
      {/* Hero Section with Simple Black Background */}
      <div ref={containerRef} className="h-[calc(100vh-56px)] w-full relative overflow-hidden flex justify-center bg-transparent"
      >

        <motion.div 
          className="w-[80vw] h-full max-w-[1280px] flex flex-col justify-center z-10"
          style={{ y: springY2 }}
          layoutId="content-container"
        >
          <div className="w-full flex items-center justify-between bg-transparent p-10 rounded-2xl border border-gray-800 shadow-xl">
            <div className="text-7xl text-white font-bold flex flex-col gap-6">
              <motion.p 
                className="flex items-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Ev
                <motion.img 
                  src={darklogo} 
                  className="w-9 h-auto pt-3 mr-2"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                /> Fuse is
                a
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Ecosystem for
              </motion.p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentWordIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
                >
                  {words[currentWordIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <ul className="flex flex-col gap-6 text-white text-4xl bg-transparent p-6 rounded-xl border border-gray-800 shadow-lg">
              <motion.li 
                className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img 
                  src={darklogo} 
                  className="w-8"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <p>Challenging Games</p>
              </motion.li>
              <motion.li 
                className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img 
                  src={darklogo} 
                  className="w-8"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <p>Innovative Features</p>
              </motion.li>
              <motion.li 
                className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img 
                  src={darklogo} 
                  className="w-8"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <p>Fuse Reward</p>
              </motion.li>
              <motion.li 
                className="flex items-center gap-4 hover:translate-x-2 transition-transform"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img 
                  src={darklogo} 
                  className="w-8"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <p>Always Free</p>
              </motion.li>
            </ul>
          </div>
          <motion.div 
            className="w-full flex items-center justify-center pt-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              onClick={scrollToGames} 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-2xl font-bold transition-all duration-300 shadow-lg shadow-purple-500/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore EcoSystem
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <DiscoverGames />
    </Layout>
  );
};

export default Home;
