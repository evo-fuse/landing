import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Game {
  image?: string;
  title: string;
  description: string;
  status: boolean;
  url?: string;
}

const games: Game[] = [
  {
    image: "https://i.ibb.co/ymz62G4V/2048.png",
    title: "2048",
    description:
      "Merge tiles to create the 2048 tile in this addictive mathematical puzzle game. Earn crypto rewards while playing one of the best crypto games online.",
    status: true,
    url: "/2048"
  },
  {
    image: "https://i.ibb.co/jvStTStZ/sudoku.png",
    title: "Sudoku",
    description:
      "Fill the 9x9 grid with numbers so each column, row, and box contains digits 1-9. Coming soon - earn games online with crypto rewards.",
    status: false,
  },
  {
    image: "https://i.ibb.co/r2jp7TYx/othello.png",
    title: "Othello",
    description:
      "Strategic board game where players capture opponent's discs by flanking them. One of the best crypto games coming soon with earning potential.",
    status: false,
  },
  {
    image: "https://i.ibb.co/rRKx1cMp/connectfour.png",
    title: "Connect Four",
    description:
      "Drop colored discs to connect four in a row before your opponent does. Earn games online with this classic crypto game.",
    status: false,
  },
  {
    image: "https://i.ibb.co/MxDwTkT1/flappybird.png",
    title: "Flappy Bird",
    description:
      "Navigate a bird through obstacles by tapping to fly in this addictive side-scrolling game. Play the best crypto games online and earn rewards.",
    status: false,
  },
];

const DiscoverGames = () => {
  const navigate = useNavigate();

  return (
    <div id="games" className="min-h-[100vh] w-full relative overflow-hidden bg-gradient-to-b from-gray-900/80 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(128,90,213,0.1)_0%,_rgba(0,0,0,0)_50%)]"></div>
      
      {/* Main content grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 z-10">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Best Crypto Games Online
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Play the best crypto games online and earn real rewards! Explore our collection of blockchain-powered games designed to test your skills and provide cryptocurrency rewards
          </motion.p>
        </div>
        
        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-center items-stretch">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              className="bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:translate-y-[-5px] flex flex-col h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={game.image}
                  alt={`EvoFuse ${game.title} blockchain game`}
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Status badge */}
                <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                  game.status 
                    ? "bg-green-500/80 text-white" 
                    : "bg-gray-600/80 text-gray-300"
                }`}>
                  {game.status ? "Available" : "Coming Soon"}
                </div>
              </motion.div>
              
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <motion.h3 
                  className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {game.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4 flex-grow text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {game.description}
                </motion.p>
                <div className="w-full flex justify-end mt-auto pt-2 sm:pt-4">
                  <motion.button
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold shadow-lg transition-all text-sm sm:text-base ${
                      game.status
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50"
                        : "bg-gray-700 text-gray-50 border border-gray-600"
                    }`}
                    onClick={() => {
                      if (game.url) {
                        navigate(game.url);
                      }
                    }}
                    whileHover={game.status ? { 
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)"
                    } : {}}
                    whileTap={game.status ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {game.status ? "Play Now" : "Coming Soon"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom decoration */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <motion.div 
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverGames;
