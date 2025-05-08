import React from 'react';

const Custom404: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sayfa Bulunamadı</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Aradığınız sayfa mevcut değil ya da taşınmış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
      </p>
        <a href='/' className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
          Ana Sayfaya Dön
        </a>
    </div>
  );
};

export default Custom404;
