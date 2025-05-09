import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks: NavLink[] = [
    {
      href: '/contact',
      icon: Phone,
      label: 'İletişim',
    }
  ];

  return (
    <header className=" top-0 z-50 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            aria-label="Okulda Oyna Homepage"
          >
            <img
              src="/images/nobg.png"
              alt="Okulda Oyna Logo"
              className="w-12 h-12 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = '/images/fallback.png')}
            />
            <h1 className="text-2xl font-bold tracking-tight transition-colors duration-200 group-hover:text-indigo-200">
              Okulda Oyna
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center space-x-1 text-sm font-medium text-white hover:text-indigo-200 transition-colors duration-200 group/nav"
                aria-label={`Visit our ${link.label}`}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
                <span>{link.label}</span>
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/nav:opacity-100 transform -skew-x-12 transition-opacity duration-300 group-hover/nav:animate-shine" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-indigo-900 transition-colors duration-200"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-indigo-900 animate-slide-down"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  rel="noopener noreferrer"
                  className="relative flex items-center space-x-2 text-sm font-medium text-white hover:text-indigo-300 transition-colors duration-200 group/nav"
                  aria-label={`Visit our ${link.label}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                  <span>{link.label}</span>
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/nav:opacity-100 transform -skew-x-12 transition-opacity duration-300 group-hover/nav:animate-shine" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;