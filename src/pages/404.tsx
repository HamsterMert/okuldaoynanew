import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">

        {/* Error Message */}
        <div className="text-center animate-slide-up">
          <h1 className="text-7xl font-extrabold text-indigo-600 mb-4 tracking-tight animate-shake">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Aradığınız sayfa mevcut değil ya da taşınmış olabilir. Ana sayfaya dönerek veya bir önceki sayfaya geri dönerek devam edebilirsiniz.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300 group"
              aria-label="Return to Homepage"
            >
              <Home className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              Ana Sayfaya Dön
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-all duration-300 group"
              aria-label="Go Back to Previous Page"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              Geri Dön
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Custom404;