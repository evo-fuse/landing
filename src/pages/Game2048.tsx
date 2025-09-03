import { Game, Layout } from "../components";

const Game2048 = () => {

  return (
    <Layout>
      <div className="h-[calc(100vh-56px)] w-full relative overflow-hidden flex justify-center">
        <div className="w-[80vw] h-full max-w-[1280px] flex flex-col justify-center items-center">
          <div className="w-full flex justify-center items-center gap-10">
            <div className="flex flex-col gap-4 max-w-lg">
              <h2 className="text-6xl text-white font-bold">EvoFuse 2048</h2>
              <p className="text-gray-200 text-3xl">
                Experience our blockchain-powered 2048 game with unique features
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-200 text-xl">
                <li>Earn Cryptocurrency Rewards Based on Performance</li>
                <li>Share and Trade Customized Themes</li>
                <li>Utilize Power-Up Items</li>
                <li>Flexible Grid Size</li>
                <li>Seamless Wallet Management</li>
                <li>Uninterrupted Core Gameplay</li>
              </ul>
              <a 
                href="https://2048.evofuse.xyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 max-w-min text-nowrap items-center px-6 py-3 bg-main-500 text-white font-bold rounded-lg hover:bg-main-700 transition-colors"
              >
                Play Now
              </a>
            </div>
          <Game />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game2048;
