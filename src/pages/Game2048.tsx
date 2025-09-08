import { Layout } from "../components";

const Game2048 = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-56px)] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="w-[90vw] h-full max-w-[1600px] mx-auto py-12 flex flex-col justify-center items-center">
          <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-12 items-center">
            <div className="flex flex-col gap-6 max-w-lg backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-gray-700/50 shadow-xl">
              <div className="inline-block mb-2">
                <span className="bg-main-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED GAME
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl text-white font-bold bg-gradient-to-r from-main-400 to-purple-400 bg-clip-text text-transparent">
                EvoFuse 2048
              </h1>
              <p className="text-gray-200 text-2xl">
                Experience our blockchain-powered 2048 game with unique features
              </p>
              <ul className="list-none space-y-3 text-gray-200 text-xl">
                {[
                  "Earn Cryptocurrency Rewards Based on Performance",
                  "Share and Trade Customized Themes",
                  "Utilize Power-Up Items",
                  "Flexible Grid Size",
                  "Seamless Wallet Management",
                  "Uninterrupted Core Gameplay",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="min-w-6 min-h-6 max-w-6 max-h-6 mr-3 bg-main-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://2048.evofuse.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 max-w-min text-nowrap items-center px-8 py-4 bg-gradient-to-r from-main-500 to-main-700 text-white font-bold rounded-lg hover:from-main-600 hover:to-main-800 transition-all duration-300 shadow-lg shadow-main-500/30 flex gap-2"
              >
                Play Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-main-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="https://i.ibb.co/m5TWdRCd/2048preview.png"
                alt="2048"
                className="relative rounded-2xl shadow-2xl border-[24px] border-[rgb(16,20,28)] transform transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game2048;
