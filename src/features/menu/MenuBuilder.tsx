import { useState } from 'react';
import { cocktails } from '../../content/cocktails';
import type { Locale } from '../../content/home';
import { buildPublicMenuUrl } from './menuState';
import { MenuQr } from './MenuQr';
import type { Currency, MenuPayload } from './types';

const copy = {
  en: { eyebrow: 'DR.RAVE / YOUR MENU', title: 'Make it yours.', intro: 'Choose the drinks, set your prices and share a menu link.', venue: 'Venue name', venuePlaceholder: 'e.g. The Night Shift', currency: 'Currency', choose: 'Choose drinks', source: 'IBA recipe', price: 'Price', generate: 'Generate menu link', errors: 'Please enter a venue name, choose at least one drink and add a valid price for each selected drink.', url: 'Your public menu link', copy: 'Copy link', copied: 'Copied', open: 'Open menu', tooLong: 'This menu link is too long to share reliably. Try a shorter venue name or fewer drinks.', qrLabel: 'Scan to open this menu', qrError: 'The QR code could not be created or this link is too long to scan reliably. Share the menu link above instead.' },
  pl: { eyebrow: 'DR.RAVE / TWOJA KARTA', title: 'Stwórz ją po swojemu.', intro: 'Wybierz koktajle, ustal ceny i udostępnij link do karty.', venue: 'Nazwa lokalu', venuePlaceholder: 'np. Nocna Zmiana', currency: 'Waluta', choose: 'Wybierz koktajle', source: 'Przepis IBA', price: 'Cena', generate: 'Utwórz link do karty', errors: 'Wpisz nazwę lokalu, wybierz co najmniej jeden koktajl i podaj prawidłową cenę dla każdej wybranej pozycji.', url: 'Link do publicznej karty', copy: 'Kopiuj link', copied: 'Skopiowano', open: 'Otwórz kartę', tooLong: 'Link do karty jest zbyt długi do niezawodnego udostępnienia. Skróć nazwę lokalu lub wybierz mniej koktajli.', qrLabel: 'Zeskanuj, aby otworzyć kartę', qrError: 'Nie udało się utworzyć QR lub link jest zbyt długi do niezawodnego zeskanowania. Udostępnij powyższy link.' },
} as const;

export function MenuBuilder({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [venueName, setVenueName] = useState('');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [selected, setSelected] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [copied, setCopied] = useState(false);

  function toggle(id: string, checked: boolean) {
    setSelected((current) => checked ? [...current, id] : current.filter((item) => item !== id));
    setMenuUrl('');
  }

  function generate() {
    const validPrices = selected.map((cocktailId) => ({ cocktailId, priceMinor: Math.round(Number(prices[cocktailId]) * 100) }));
    if (!venueName.trim() || venueName.length > 100 || !validPrices.length || validPrices.some(({ cocktailId, priceMinor }) => !prices[cocktailId]?.trim() || !Number.isFinite(priceMinor) || priceMinor < 0 || priceMinor > 100_000_000)) {
      setError(text.errors);
      setMenuUrl('');
      return;
    }
    const payload: MenuPayload = { version: 1, venueName: venueName.trim(), locale, currency, items: validPrices };
    try {
      setMenuUrl(buildPublicMenuUrl(payload, window.location.origin));
      setError('');
    } catch {
      setError(text.tooLong);
      setMenuUrl('');
    }
  }

  return (
    <section className="menu-page builder-page" aria-labelledby="menu-title">
      <div className="menu-heading">
        <p className="eyebrow"><span className="red-mark" />{text.eyebrow}</p>
        <h1 id="menu-title">{text.title}</h1>
        <p className="menu-intro">{text.intro}</p>
      </div>
      <div className="venue-fields">
        <label>{text.venue}<input value={venueName} maxLength={100} onChange={(event) => { setVenueName(event.target.value); setMenuUrl(''); }} placeholder={text.venuePlaceholder} /></label>
        <label>{text.currency}<select value={currency} onChange={(event) => { setCurrency(event.target.value as Currency); setMenuUrl(''); }}><option value="EUR">EUR €</option><option value="PLN">PLN zł</option></select></label>
      </div>
      <h2 className="menu-section-title">{text.choose}</h2>
      <div className="builder-list">
        {cocktails.map((cocktail, index) => {
          const checked = selected.includes(cocktail.id);
          return <article className={`builder-card${checked ? ' is-selected' : ''}`} key={cocktail.id}>
            <div className="builder-card-layout">
              <div className="builder-card-content">
                <div className="builder-card-top">
                  <label className="cocktail-choice"><input type="checkbox" checked={checked} onChange={(event) => toggle(cocktail.id, event.target.checked)} /><span className="builder-number">0{index + 1}</span><span className="builder-name">{cocktail.name[locale]}</span></label>
                  {cocktail.sourceUrl && <a className="recipe-source" href={cocktail.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${text.source}: ${cocktail.name[locale]}`}>↗</a>}
                </div>
                <p className="builder-description">{cocktail.description[locale]}</p>
                <ul className="ingredient-list">{cocktail.ingredients[locale].map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
                <p className="builder-method">{cocktail.method[locale]}</p>
                {checked && <label className="price-field">{text.price} ({currency})<input type="number" min="0" step="0.01" inputMode="decimal" value={prices[cocktail.id] ?? ''} onChange={(event) => { setPrices((current) => ({ ...current, [cocktail.id]: event.target.value })); setMenuUrl(''); }} placeholder="0.00" /></label>}
              </div>
              <img className="builder-cocktail-image" src={cocktail.image.src} alt={cocktail.image.alt[locale]} loading="lazy" />
            </div>
          </article>;
        })}
      </div>
      <button className="primary-button" type="button" onClick={generate}>{text.generate}<span aria-hidden="true">↗</span></button>
      {error && <p className="form-error" role="alert">{error}</p>}
      {menuUrl && <section className="generated-menu" aria-live="polite"><h2>{text.url}</h2><p className="generated-url">{menuUrl}</p><div className="generated-actions"><button className="secondary-button" type="button" onClick={async () => { await navigator.clipboard.writeText(menuUrl); setCopied(true); }}>{copied ? text.copied : text.copy}</button><a className="secondary-button" href={menuUrl} target="_blank" rel="noreferrer">{text.open} ↗</a></div><MenuQr value={menuUrl} label={text.qrLabel} recoveryMessage={text.qrError} /></section>}
    </section>
  );
}
