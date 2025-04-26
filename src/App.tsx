import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, Gamepad2, Car, GamepadIcon } from 'lucide-react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GameDetail from './pages/GameDetail';
import Categories from './pages/Categories';

const SAMPLE_GAMES = [
  {
    id: '1',
    title: 'Snow Rider 3D',
    description: 'Kızak ile engellere çarpmadan sona ulaşmaya çalış.',
    category: 'car',
    subject: 'parkour',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://www.hoodamath.com/mobile/games/snow-rider-3d/game.html?nocheckorient=1',
    rating: 0.0,
    teacherRecommended: false,
    ageRange: { min: 8, max: 12 }
  },
  {
    id: '2',
    title: 'Retro Ping Pong',
    description: 'Klasik ping pong oyunudur. Botlarla veya arkadaşlarınızla oynayabilirsiniz.',
    category: 'platform',
    subject: 'old',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://science-explorer-demo.example.com',
    rating: 4.8,
    teacherRecommended: true,
    ageRange: { min: 10, max: 14 }
  },
  {
    id: '3',
    title: 'Drift Hunters',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: false,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '4',
    title: 'Drift Boss',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar 2.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '5',
    title: 'OvO',
    description: 'Basit bir platform oyunu',
    category: 'platform',
    subject: 'platform',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: false,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '6',
    title: 'Minecraft',
    description: 'Eski sürüm minecraft.',
    category: 'reality',
    subject: 'reality',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '7',
    title: 'Drift Boss',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar 2.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '4',
    title: 'Drift Boss',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar 2.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '4',
    title: 'Drift Boss',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar 2.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '4',
    title: 'Drift Boss',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar 2.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  },
  {
    id: '4',
    title: 'Drift Boss',
    description: 'Yan yan virajda koptu kayışlar, göz kamaştırıyor bizim tofaşlar 2.',
    category: 'car',
    subject: 'car',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    gameUrl: 'https://word-wizard-demo.example.com',
    rating: 4.3,
    teacherRecommended: true,
    ageRange: { min: 7, max: 11 }
  }
] as const;

const CATEGORIES = [
  { name: 'Tüm Oyunlar', icon: Gamepad2, color: 'bg-purple-500' },
  { name: 'Araba Oyunları', icon: Car, color: 'bg-blue-500' },
  { name: '2 Kişilik Oyunlar', icon: GamepadIcon, color: 'bg-orange-500' },
  
];

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <Routes>
          <Route path="/" element={
            <main className="container mx-auto px-4 py-8">
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

              {/* Categories */}
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

              {/* Featured Games */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Oyunlar</h2>
                  <Link to="/categories" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Tümünü Görüntüle
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SAMPLE_GAMES.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </section>

              {/* Teacher teacherRecommended */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Önerilen Oyunlar</h2>
                  <Link to="/categories" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Tümünü Görüntüle
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SAMPLE_GAMES.filter(game => game.teacherRecommended).map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </section>
            </main>
          } />
          <Route path="/categories" element={<Categories games={SAMPLE_GAMES} />} />
          <Route path="/game/:id" element={<GameDetail games={SAMPLE_GAMES} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;