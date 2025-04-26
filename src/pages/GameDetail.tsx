import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, X } from 'lucide-react';

interface GameDetailProps {
  games: Array<any>;
}

const GameDetail: React.FC<GameDetailProps> = ({ games }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const game = games.find(g => g.id === id);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800">Oyun Bulunamadı</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Ana Sayfaya Dön
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{game.title}</h1>
              <div className="flex items-center space-x-4">
                {/* <span className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current mr-1" />
                  {game.rating}
                </span>
                <span className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-1" />
                  {game.ageRange.min}-{game.ageRange.max} years
                </span> */}
              </div>
            </div>

            <p className="text-gray-600 mb-6">{game.description}</p>

            <div className="aspect-[16/9] w-full bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/5">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Maximize2 className="h-5 w-5" />
                  <span>Tam Ekranda Oyna</span>
                </button>
              </div>
              <img 
                src={game.thumbnail} 
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                {game.category}
              </span>
              {game.subject && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                  {game.subject}
                </span>
              )}
              {game.teacherRecommended && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  Tavsiye Edilen Oyunlar
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <iframe
            src={game.gameUrl}
            className="w-full h-full border-0"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};

export default GameDetail;