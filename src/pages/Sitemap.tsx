import { Link } from 'react-router-dom';
import { Layout } from '../components';
import { FaHome, FaGamepad, FaInfoCircle, FaSitemap, FaFileAlt } from 'react-icons/fa';

const Sitemap = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center pb-12">
          <h1 className="text-4xl font-display font-bold mb-4 text-white">
            Sitemap
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Navigate through all available pages and resources on EvoFuse
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-900/95 relative z-50 rounded-xl shadow-lg p-8">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
              <FaSitemap className="mr-3" /> Main Pages
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center transition-transform hover:translate-x-2">
                <FaHome className="text-white mr-3" />
                <Link to="/" className="text-white hover:text-gray-200 transition font-medium">
                  Home - Play blockchain games on Fuse Network
                </Link>
              </li>
              <li className="flex items-center transition-transform hover:translate-x-2">
                <FaGamepad className="text-white mr-3" />
                <Link to="/2048" className="text-white hover:text-gray-200 transition font-medium">
                  2048 Game - Play 2048 with blockchain rewards
                </Link>
              </li>
              <li className="flex items-center transition-transform hover:translate-x-2">
                <FaInfoCircle className="text-white mr-3" />
                <Link to="/about" className="text-white hover:text-gray-200 transition font-medium">
                  About - Learn about EvoFuse
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
              <FaFileAlt className="mr-3" /> Resources
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center transition-transform hover:translate-x-2">
                <FaSitemap className="text-white mr-3" />
                <a 
                  href="https://www.evofuse.xyz/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition font-medium"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Can't find what you're looking for? Return to the <Link to="/" className="text-white hover:text-gray-200">homepage</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
