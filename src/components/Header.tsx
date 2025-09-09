import { useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize the toggle function to prevent recreation on each render
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-primary flex items-end m-0">
            Ev
            <img src="https://i.ibb.co/HLnWv6Lg/Logo.png" alt="EvoFuse blockchain gaming platform logo" className="w-3 h-3 sm:w-4 sm:h-4 mb-[4px] sm:mb-[6px] ml-[2px] mr-2" />
            Fuse
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/"
            className="font-medium hover:text-primary transition-colors text-sm lg:text-base"
          >
            Home
          </Link>
          <Link
            to="/2048"
            className="font-medium hover:text-primary transition-colors text-sm lg:text-base"
          >
            2048
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-primary transition-colors text-sm lg:text-base"
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 py-2 flex flex-col space-y-2">
            <Link
              to="/"
              className="py-3 font-medium hover:text-primary transition-colors text-white border-b border-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/2048"
              className="py-3 font-medium hover:text-primary transition-colors text-white border-b border-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              2048
            </Link>
            <Link
              to="/about"
              className="py-3 font-medium hover:text-primary transition-colors text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
