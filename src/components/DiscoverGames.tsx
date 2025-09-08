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
      "Merge tiles to create the 2048 tile in this addictive mathematical puzzle game.",
    status: true,
    url: "/2048"
  },
  {
    image: "https://i.ibb.co/jvStTStZ/sudoku.png",
    title: "Sudoku",
    description:
      "Fill the 9x9 grid with numbers so each column, row, and box contains digits 1-9.",
    status: false,
  },
  {
    image: "https://i.ibb.co/r2jp7TYx/othello.png",
    title: "Othello",
    description:
      "Strategic board game where players capture opponent's discs by flanking them.",
    status: false,
  },
  {
    image: "https://i.ibb.co/rRKx1cMp/connectfour.png",
    title: "Connect Four",
    description:
      "Drop colored discs to connect four in a row before your opponent does.",
    status: false,
  },
  {
    image: "https://i.ibb.co/MxDwTkT1/flappybird.png",
    title: "Flappy Bird",
    description:
      "Navigate a bird through obstacles by tapping to fly in this addictive side-scrolling game.",
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
      <div className="grid grid-cols-1 w-[80vw] max-w-[1280px] mx-auto py-16 z-10 gap-12">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-4">
          <motion.h2 
            className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Discover Our Games
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore our collection of challenging games designed to test your skills and provide hours of entertainment
          </motion.p>
        </div>
        {/* Games grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:translate-y-[-5px] flex flex-col h-full"
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
                  className="w-full h-56 object-cover"
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
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  game.status 
                    ? "bg-green-500/80 text-white" 
                    : "bg-gray-600/80 text-gray-300"
                }`}>
                  {game.status ? "Available" : "Coming Soon"}
                </div>
              </motion.div>
              
              <div className="p-6 flex flex-col flex-grow">
                <motion.h3 
                  className="text-2xl font-bold mb-2 text-white"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {game.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4 flex-grow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {game.description}
                </motion.p>
                <div className="w-full flex justify-end mt-auto pt-4">
                  <motion.button
                    className={`px-6 py-3 rounded-lg font-bold shadow-lg transition-all ${
                      game.status
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50"
                        : "bg-gray-700 text-gray-400 border border-gray-600"
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
        <div className="flex justify-center mt-8">
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverGames;
