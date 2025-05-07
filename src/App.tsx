import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, Gamepad2, Car, GamepadIcon, Book, Puzzle, Clock } from 'lucide-react';

import Header from './components/Header';
import GameCard from './components/GameCard';
import Footer from './components/Footer';
import GameDetail from './pages/GameDetail';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Embed from './pages/Embed';

import Games from './data/Games';

const CATEGORIES = [
  { name: 'Tüm Oyunlar', icon: Gamepad2, color: 'bg-purple-500' },
  { name: 'Araba Oyunları', icon: Car, color: 'bg-blue-500' },
  { name: '2 Kişilik Oyunlar', icon: GamepadIcon, color: 'bg-green-500' },
  { name: 'Gerçekçi Oyunlar', icon: Book, color: 'bg-pink-500' },
  { name: 'Platform Oyunları', icon: Puzzle, color: 'bg-yellow-500' },
  { name: 'Diğer Oyunlar', icon: Clock, color: 'bg-orange-500' },
];

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <main className="flex justify-center relative">

                {/* İçerik */}
                <div className="max-w-6xl flex-1 px-4 py-8">
                  {/* Hero Section */}
                  <section className="relative rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 mb-12">
                    <div className="max-w-2xl">
                      <h1 className="text-4xl font-bold mb-4">Okulda Oyna'ya Hoşgeldin!</h1>
                      <p className="text-lg opacity-90 mb-6">
                        Milli Eğitim Bakanlığının Engellemediği Oyunları Burada Oynayabilirsin.
                      </p>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Oyunları Ara..."
                          className="w-full px-4 py-3 pl-12 rounded-lg text-gray-800 placeholder-gray-500 bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/25"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="absolute right-8 bottom-0 opacity-10">
                      <Gamepad2 className="h-48 w-48" />
                    </div>
                  </section>

                  {/* Kategoriler */}
                  <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Kategoriler</h2>
                      <Link to="/categories" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Tüm Kategorileri Görüntüle
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {CATEGORIES.map((category) => (
                        <Link
                          key={category.name}
                          to="/categories"
                          className={`${category.color} text-white p-6 rounded-xl flex items-center space-x-4 hover:opacity-90 transition-opacity`}
                        >
                          <category.icon className="h-8 w-8" />
                          <span className="text-lg font-semibold">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </section>

                  {/* Oyunlar */}
                  <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Oyunlar</h2>
                      <Link to="/categories" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Tümünü Görüntüle
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Games.map((game) => (
                        <GameCard key={game.id} game={game} />
                      ))}
                    </div>
                  </section>

                  <Footer />
                </div>
              </main>
            }
          />

          <Route path="/categories" element={<Categories games={Games} />} />
          <Route path="/game/:id" element={<GameDetail games={Games} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/embed" element={<Embed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
