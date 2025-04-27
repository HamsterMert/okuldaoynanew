import React from 'react';
import { GithubIcon, InstagramIcon, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="logos/nobg.png" alt="Logo" className="w-12 h-12" />
            <a href="https://okuldaoyna.vercel.app/"><h1 className="text-2xl font-bold">Okulda Oyna</h1></a>
</div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="https://instagram.com/sagokajmert" className="flex items-center space-x-1 hover:text-indigo-200 transition">
            <InstagramIcon className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a href="https://github.com/HamsterMert" className="flex items-center space-x-1 hover:text-indigo-200 transition">
              <GithubIcon className="h-5 w-5" />
              <span>Github</span>
            </a>
          </nav>

          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;