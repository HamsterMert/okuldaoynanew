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

const loadingScreen = document.getElementById('loading');
if (loadingScreen) {
  loadingScreen.classList.add('fade-out');

  setTimeout(() => {
    loadingScreen.remove();
  }, 500); 
}
