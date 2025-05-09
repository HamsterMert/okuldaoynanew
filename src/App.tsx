import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, Gamepad2, Car, GamepadIcon, Book, Puzzle, Clock } from 'lucide-react';

import Header from './components/Header';
import GameCard from './components/GameCard';
import Footer from './components/Footer';
import GameDetail from './pages/GameDetail';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Embed from './pages/Embed';
import About from './pages/About';
import NotFound from './pages/404';
import Admin from './pages/Admin';

import Games from './data/Games';

const CATEGORIES = [
  { name: 'Tüm Oyunlar', icon: Gamepad2, color: 'bg-gradient-to-r from-purple-500 to-purple-700' },
  { name: 'Araba Oyunları', icon: Car, color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
  { name: '2 Kişilik Oyunlar', icon: GamepadIcon, color: 'bg-gradient-to-r from-green-500 to-green-700' },
  { name: 'Gerçekçi Oyunlar', icon: Book, color: 'bg-gradient-to-r from-pink-500 to-pink-700' },
  { name: 'Platform Oyunları', icon: Puzzle, color: 'bg-gradient-to-r from-yellow-500 to-yellow-700' },
  { name: 'Diğer Oyunlar', icon: Clock, color: 'bg-gradient-to-r from-orange-500 to-orange-700' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = Games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-6xl mx-auto">
                  {/* Hero Section */}
                  <section className="relative rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 mb-12 shadow-lg animate-slide-up">
                    <div className="max-w-2xl">
                      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Okulda Oyna'ya Hoşgeldin!
                      </h1>
                      <p className="text-lg opacity-90 mb-6 leading-relaxed">
                        Milli Eğitim Bakanlığının Engellemediği Oyunları Burada Oynayabilirsin.
                      </p>
                      <div className="relative group">
                        <input
                          type="text"
                          placeholder="Oyunları Ara..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-3 pl-12 rounded-lg text-gray-800 placeholder-gray-500 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                          aria-label="Search Games"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="absolute right-8 bottom-0 opacity-10 pointer-events-none">
                      <Gamepad2 className="h-48 w-48" aria-hidden="true" />
                    </div>
                  </section>

                  {/* Kategoriler */}
                  <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Kategoriler</h2>
                      <Link
                        to="/categories"
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                        aria-label="View All Categories"
                      >
                        Tüm Kategorileri Görüntüle
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                      {CATEGORIES.map((category) => (
                        <Link
                          key={category.name}
                          to="/categories"
                          className={`${category.color} text-white p-4 rounded-xl flex flex-col items-center justify-center space-y-2 hover:opacity-90 transition-all duration-300 group shadow-md`}
                          aria-label={`View ${category.name}`}
                        >
                          <category.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                          <span className="text-sm font-semibold text-center">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </section>

                  {/* Oyunlar */}
                  <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Oyunlar</h2>
                      <Link
                        to="/categories"
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                        aria-label="View All Games"
                      >
                        Tümünü Görüntüle
                      </Link>
                    </div>
                    {filteredGames.length === 0 ? (
                      <p className="text-center text-gray-600 text-lg animate-slide-up">
                        Aramanıza uygun oyun bulunamadı.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGames.map((game) => (
                          <GameCard key={game.id} game={game} />
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              }
            />
            <Route path="/categories" element={<Categories games={Games} />} />
            <Route path="/game/:id" element={<GameDetail games={Games} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/embed" element={<Embed />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;