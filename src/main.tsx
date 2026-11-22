import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/global.css';

if (window.location.pathname === '/') {
  window.history.replaceState(null, '', '/en/');
}

const locale = window.location.pathname.split('/').filter(Boolean)[0] === 'pl' ? 'pl' : 'en';
document.documentElement.lang = locale;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App locale={locale} />
  </React.StrictMode>,
);
