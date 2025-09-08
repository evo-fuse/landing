import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h2 className="text-2xl font-display font-bold text-primary flex items-end m-0">
            Ev
            <img src="https://i.ibb.co/HLnWv6Lg/Logo.png" alt="Logo" className="w-4 h-4 mb-[6px] ml-[2px] mr-2" />
            Fuse
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/2048"
            className="font-medium hover:text-primary transition-colors"
          >
            2048
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link
              to="/"
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/2048"
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              2048
            </Link>
            <Link
              to="/about"
              className="py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
