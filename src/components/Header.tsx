import React, { useState } from 'react';
import { GithubIcon, InstagramIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="../../../public/images/nobg.png" alt="Logo" className="w-12 h-12" />
            
            {/* Link ile yönlendirme */}
            <Link to="/">
              <h1 className="text-2xl font-bold">Okulda Oyna</h1>
            </Link>
          </div>

          {/* Normal Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="https://instagram.com/sagokajmert"
              className="flex items-center space-x-1 hover:text-indigo-200 transition"
            >
              <InstagramIcon className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/HamsterMert"
              className="flex items-center space-x-1 hover:text-indigo-200 transition"
            >
              <GithubIcon className="h-5 w-5" />
              <span>Github</span>
            </a>
          </nav>

          {/* Hamburger Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a
              href="https://instagram.com/sagokajmert"
              className="flex items-center space-x-1 hover:text-indigo-300 transition"
            >
              <InstagramIcon className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/HamsterMert"
              className="flex items-center space-x-1 hover:text-indigo-300 transition"
            >
              <GithubIcon className="h-5 w-5" />
              <span>Github</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
