import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Önce React uygulamasını başlatıyoruz
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Sonra loading ekranını kaldırıyoruz
const loadingScreen = document.getElementById('loading');
if (loadingScreen) {
  loadingScreen.classList.add('fade-out');

  // 0.5 saniye sonra tamamen DOM'dan kaldır
  setTimeout(() => {
    loadingScreen.remove();
  }, 500); 
}
