import { Layout } from "../components";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import darklogo from "../assets/DarkLogo.png";
import Game1 from "../assets/2048.png";
import Game2 from "../assets/sudoku.png";
import Game3 from "../assets/othello.png";
import Game4 from "../assets/connectfour.png";
import Game5 from "../assets/flappybird.png";
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
    image: Game1,
    title: "2048",
    description:
      "Merge tiles to create the 2048 tile in this addictive mathematical puzzle game.",
    status: true,
    url: "/2048"
  },
  {
    image: Game2,
    title: "Sudoku",
    description:
      "Fill the 9x9 grid with numbers so each column, row, and box contains digits 1-9.",
    status: false,
  },
  {
    image: Game3,
    title: "Othello",
    description:
      "Strategic board game where players capture opponent's discs by flanking them.",
    status: false,
  },
  {
    image: Game4,
    title: "Connect Four",
    description:
      "Drop colored discs to connect four in a row before your opponent does.",
    status: false,
  },
  {
    image: Game5,
    title: "Flappy Bird",
    description:
      "Navigate a bird through obstacles by tapping to fly in this addictive side-scrolling game.",
    status: false,
  },
];
const Home = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["P2E Games", "Innovative Fuse", "Casual Gamers"];

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
      {/* Hero Section with Animated Background */}
      <div className="h-[calc(100vh-56px)] w-full relative overflow-hidden flex justify-center">
        <div className="w-[80vw] h-full max-w-[1280px] flex flex-col justify-center">
          <div className="w-full flex items-center justify-between">
            <div className="text-7xl text-black font-bold flex flex-col gap-6">
              <p className="flex items-center">
                Ev
                <img src={darklogo} className="w-9 h-auto pt-3 mr-2" /> Fuse is
                a
              </p>
              <p>Ecosystem for</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentWordIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {words[currentWordIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <ul className="flex flex-col gap-6 text-black text-4xl">
              <li className="flex items-center gap-4">
                <img src={darklogo} className="w-8" />
                <p>Challenging Games</p>
              </li>
              <li className="flex items-center gap-4">
                <img src={darklogo} className="w-8" />
                <p>Innovative Features</p>
              </li>
              <li className="flex items-center gap-4">
                <img src={darklogo} className="w-8" />
                <p>Fuse Reward</p>
              </li>
              <li className="flex items-center gap-4">
                <img src={darklogo} className="w-8" />
                <p>Always Free</p>
              </li>
            </ul>
          </div>
          <div className="w-full flex items-center justify-center pt-24">
            <button 
              onClick={scrollToGames} 
              className="bg-black text-white px-12 py-4 rounded-full text-2xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore EcoSystem
            </button>
          </div>
        </div>
      </div>
      <div id="games" className="h-[100vh] pt-14 w-full relative overflow-hidden flex justify-center bg-white">
        <div className="w-[80vw] h-full max-w-[1280px] grid grid-cols-3 gap-4 justify-center items-center">
          {games.map((game) => (
            <div
              key={game.title}
              className="max-h-min bg-gray-100 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={game.image}
                alt="Game 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-main">
                <h3 className="text-xl font-bold mb-2 text-black">
                  {game.title}
                </h3>
                <p className="text-gray-700">{game.description}</p>
                <div className="w-full flex justify-end">
                  <button
                    className={`mt-4 px-4 py-2 rounded hover:bg-opacity-90 transition-colors ${
                      game.status
                        ? "bg-main-600 text-black hover:bg-main-700"
                        : "bg-gray-300 text-gray-500"
                    }`}
                    onClick={() => {
                      if (game.url) {
                        navigate(game.url);
                      }
                    }}
                  >
                    {game.status ? "Play Now" : "Coming Soon"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
