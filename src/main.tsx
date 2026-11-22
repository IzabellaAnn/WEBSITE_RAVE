import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/global.css';
import { decodeMenuPayload } from './features/menu/menuState';

if (window.location.pathname === '/') {
  window.history.replaceState(null, '', '/en/');
}

const pathLocale = window.location.pathname.split('/').filter(Boolean)[0] === 'pl' ? 'pl' : 'en';
const isPublicMenu = /^\/(?:en|pl)\/menu\/view\/?$/.test(window.location.pathname);
const menuPayload = isPublicMenu ? decodeMenuPayload(new URLSearchParams(window.location.search).get('m') ?? '') : null;
const locale = menuPayload?.locale ?? pathLocale;
document.documentElement.lang = locale;

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App locale={locale} />
  </React.StrictMode>,
);
