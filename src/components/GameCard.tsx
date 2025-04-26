import React from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
            {/* <span className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              {game.rating}
            </span> */}
          </div>
          <p className="text-sm text-gray-600 mt-2">{game.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {game.category}
            </span>
            {game.teacherRecommended && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Önerilen Oyunlar
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;