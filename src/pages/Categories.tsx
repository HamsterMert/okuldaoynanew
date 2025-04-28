import React from 'react';
import { Gamepad2, GamepadIcon, BookOpen, Puzzle, Car, Clock } from 'lucide-react';
import GameCard from '../components/GameCard';
import Footer from '../components/Footer';
import type { Game } from '../types';

interface CategoriesProps {
  games: Array<Game>;
}

const CATEGORIES = [
  { 
    id: 'all',
    name: 'Tüm Oyunlar', 
    icon: Gamepad2, 
    color: 'bg-purple-500',
    description: 'Sitedeki tüm oyunları görüntüleyin.'
  },
  { 
    id: 'car',
    name: 'Araba Oyunları', 
    icon: Car, 
    color: 'bg-blue-500',
    description: 'Araba oyunlarını görüntüleyin.'
  },
  { 
    id: 'twoplayers',
    name: '2 Kişilik Oyunlar', 
    icon: GamepadIcon, 
    color: 'bg-green-500',
    description: '2 kişilik oyunları görüntüleyin.'
  },
  { 
    id: 'reality',
    name: 'Gerçekçi Oyunlar', 
    icon: BookOpen, 
    color: 'bg-pink-500',
    description: 'Gerçekçi oyunları görüntüleyin.'
  },
  { 
    id: 'platform',
    name: 'Platform Oyunları', 
    icon: Puzzle, 
    color: 'bg-yellow-500',
    description: 'Platform oyunlarını görüntüleyin.'
  },
  { 
    id: 'others',
    name: 'Diğer Oyunlar', 
    icon: Clock, 
    color: 'bg-orange-500',
    description: 'Diğer oyunları görüntüleyin.'
  }
];

const Categories: React.FC<CategoriesProps> = ({ games }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredGames = React.useMemo(() => {
    if (selectedCategory === 'all') return games;
    return games.filter(game => 
      game.subject === selectedCategory || game.category === selectedCategory
    );
  }, [games, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories Grid */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Kategoriler</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${category.color} text-white p-6 rounded-xl flex items-center space-x-4 hover:opacity-90 transition-all ${
                selectedCategory === category.id ? 'ring-4 ring-offset-2 ring-offset-gray-50' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <category.icon className="h-8 w-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Games Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {CATEGORIES.find(c => c.id === selectedCategory)?.name || 'All Games'}
          </h2>
          <span className="text-gray-600">
            {filteredGames.length} {filteredGames.length === 1 ? 'oyun' : 'oyun'} bulundu
          </span>
        </div>
        
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Oyun Bulunamadı</h3>
            <p className="text-gray-600">
              Bu kategoride oyun bulunamadı.
            </p>
          </div>
          
        )}
      </section>
      <br></br>
      <Footer />
    </div>
    
  );
};

export default Categories;