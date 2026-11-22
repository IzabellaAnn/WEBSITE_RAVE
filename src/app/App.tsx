import type { Locale } from '../content/home';
import { homeCopy } from '../content/home';
import { MenuBuilder } from '../features/menu/MenuBuilder';
import { PublicMenu } from '../features/menu/PublicMenu';
import { buildPublicMenuUrl, decodeMenuPayload } from '../features/menu/menuState';

type AppProps = { locale: Locale };

const sections = [
  { en: 'Home', pl: 'Start', slug: '' },
  { en: 'Drinks', pl: 'Koktajle', slug: 'drinks' },
  { en: 'The Science', pl: 'Nauka', slug: 'science' },
  { en: 'Culture', pl: 'Kultura', slug: 'culture' },
  { en: 'My Menu', pl: 'Moja karta', slug: 'menu' },
];

export function App({ locale }: AppProps) {
  const path = window.location.pathname.replace(/\/$/, '');
  const isBuilder = /^\/(?:en|pl)\/menu$/.test(path);
  const isPublicMenu = /^\/(?:en|pl)\/menu\/view$/.test(path);
  const encodedMenu = new URLSearchParams(window.location.search).get('m');
  const payload = isPublicMenu && encodedMenu ? decodeMenuPayload(encodedMenu) : null;
  const activeLocale = payload?.locale ?? locale;
  const copy = homeCopy[activeLocale];
  const otherLocale = activeLocale === 'en' ? 'pl' : 'en';
  const languageHref = isPublicMenu && payload
    ? buildPublicMenuUrl({ ...payload, locale: otherLocale }, window.location.origin)
    : `/${otherLocale}/${isBuilder ? 'menu/' : ''}${isPublicMenu ? `menu/view/${window.location.search}` : ''}`;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href={`/${activeLocale}/`} aria-label="DR.RAVE home">DR<span>.</span>RAVE</a>
        <nav className="main-nav" aria-label={activeLocale === 'en' ? 'Main navigation' : 'Nawigacja główna'}>
          {sections.map((section) => (
            <a key={section.slug || 'home'} href={`/${activeLocale}/${section.slug ? `${section.slug}/` : ''}`}>
              {section[activeLocale]}
            </a>
          ))}
        </nav>
        <a className="language-switch" href={languageHref} lang={otherLocale}>
          {otherLocale.toUpperCase()} <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        {isBuilder ? <MenuBuilder locale={activeLocale} /> : isPublicMenu ? <PublicMenu locale={activeLocale} encodedMenu={encodedMenu} /> : <>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="red-mark" />{copy.eyebrow}</p>
            <h1 id="hero-title">{copy.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
            <p className="hero-intro">{copy.intro}</p>
            <a className="text-link" href={`/${locale}/drinks/`}>
              {copy.explore}<span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1500&q=85"
              alt={activeLocale === 'en' ? 'A ruby cocktail on a dark bar' : 'Rubinowy koktajl na ciemnym barze'}
            />
            <span className="image-caption">BERLIN · 52°31′ N 13°24′ E</span>
            <span className="image-index">{copy.issue}</span>
          </div>
          <span className="hero-side-note" aria-hidden="true">NIGHT CULTURE / DRINKS / PEOPLE</span>
        </section>

        <section className="featured" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="red-mark" />DR.RAVE / 001—003</p>
              <h2 id="featured-title">{copy.featured}</h2>
            </div>
            <p className="section-note">{copy.featuredNote}</p>
          </div>
          <div className="drink-grid">
            {copy.drinks.map((drink, index) => (
              <article className="drink-card" key={drink.name}>
                <div className="drink-image-wrap">
                  <img
                    src={`https://images.unsplash.com/${drink.image}?auto=format&fit=crop&w=900&q=80`}
                    alt={drink.alt}
                    loading="lazy"
                  />
                  <span className="drink-number">0{index + 1}</span>
                </div>
                <div className="drink-details">
                  <p className="drink-type">{drink.type}</p>
                  <h3>{drink.name}</h3>
                  <p className="drink-description">{drink.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        </>}
      </main>

      <footer className="site-footer">
        <a className="wordmark" href={`/${locale}/`}>DR<span>.</span>RAVE</a>
        <p>{copy.footer}</p>
        <span>© DR.RAVE 2026</span>
      </footer>
    </div>
  );
}
