import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2, X } from 'lucide-react';
import Footer from '../components/Footer';

const Embed: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const params = new URLSearchParams(location.search);
  const initialEmbedUrl = params.get('embed') || '';
  const [inputValue, setInputValue] = useState('');
  const [embedUrl, setEmbedUrl] = useState(initialEmbedUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const encoded = encodeURIComponent(inputValue.trim());
      navigate(`/embed?embed=${encoded}`);
      setEmbedUrl(inputValue.trim());
    }
  };

  if (!embedUrl) {
    return (
      <div className="container mx-auto px-4 py-12">
        <center>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Özel Linki Gir</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Örnek: https://example.com"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Göster
          </button>
        </form>
        </center>
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
          Geri Dön
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Gömülü İçerik</h1>
            </div>

            <div className="aspect-[16/9] w-full bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/5">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Maximize2 className="h-5 w-5" />
                  <span>Tam Ekranda Aç</span>
                </button>
              </div>
              {/* iframe burada artık görünmüyor */}
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
            src={decodeURIComponent(embedUrl)}
            className="w-full h-full border-0"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Tam Ekran Embed"
          />
        <Footer />
        </div>
        
      )}
    </>
    
  );
};

export default Embed;
