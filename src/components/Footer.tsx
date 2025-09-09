import { Link } from 'react-router-dom';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-display font-bold text-primary">
                Evo<span className="text-secondary">Fuse</span>
              </span>
            </Link>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">
              Classic games reimagined on the Fuse Network blockchain.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/2048" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  2048
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  About
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/evofuse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Twitter"
              >
                <FaTwitter size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a 
                href="https://discord.gg/evofuse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Discord"
              >
                <FaDiscord size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 text-center text-gray-400">
          <p className="text-xs sm:text-sm">© {currentYear} EvoFuse. All rights reserved. Built on Fuse Network.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
