import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/game/${game.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Link
      to={`/game/${game.id}`}
      className="block group relative"
      aria-label={`Play ${game.title}`}
    >
      <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 animate-slide-up">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 p-px">
          <div className="bg-white rounded-xl h-full w-full" />
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 transition-opacity duration-500 group-hover:animate-shine" />
        </div>

        {/* Thumbnail with Skeleton Loader */}
        <div className="relative aspect-w-16 aspect-h-9">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl" />
          )}
          <img
            src={game.thumbnail}
            alt={`${game.title} thumbnail`}
            className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = '/images/fallback.png';
              setIsImageLoaded(true);
            }}
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 relative z-10">
          <div className="flex items-center justify-between mb-3">
            {/* Title with Tooltip */}
            <div className="relative group/title">
              <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[180px]">
                {game.title}
              </h3>
              <span className="absolute left-0 top-full mt-2 hidden group-hover/title:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-20 shadow-lg">
                {game.title}
              </span>
            </div>
            {/* Share Button Moved Here */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="relative flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200"
              aria-label={isCopied ? 'Link copied!' : 'Share game link'}
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              {isCopied && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-2">
                  Kopyalandı!
                </span>
              )}
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {game.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-3 py-1 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full font-medium">
              {game.category}
            </span>
            {game.teacherRecommended && (
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full font-medium">
                Önerilen Oyunlar
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;