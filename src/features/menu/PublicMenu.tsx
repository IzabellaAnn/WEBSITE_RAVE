import { useState } from 'react';
import { cocktailById } from '../../content/cocktails';
import type { Locale } from '../../content/home';
import { buildPublicMenuUrl, decodeMenuPayload } from './menuState';
import { MenuQr } from './MenuQr';

const labels = {
  en: { eyebrow: 'DR.RAVE / COCKTAIL MENU', invalidTitle: 'This menu is unavailable.', invalid: 'The link may be incomplete or out of date. Ask the venue for a fresh menu link.', print: 'Print / Save as PDF', qr: 'Scan to open this menu', qrError: 'The QR code could not be created or this link is too long to scan reliably. Share the menu link from the builder instead.' },
  pl: { eyebrow: 'DR.RAVE / KARTA KOKTAJLI', invalidTitle: 'Ta karta jest niedostępna.', invalid: 'Link może być niekompletny lub nieaktualny. Poproś lokal o nowy link do karty.', print: 'Drukuj / Zapisz jako PDF', qr: 'Zeskanuj, aby otworzyć kartę', qrError: 'Nie udało się utworzyć QR lub link jest zbyt długi do niezawodnego zeskanowania. Udostępnij link z kreatora.' },
} as const;

export function PublicMenu({ locale, encodedMenu }: { locale: Locale; encodedMenu: string | null }) {
  const payload = encodedMenu ? decodeMenuPayload(encodedMenu) : null;
  const [printError, setPrintError] = useState(false);
  const text = labels[locale];
  if (!payload) return <section className="menu-page public-menu invalid-menu"><p className="eyebrow"><span className="red-mark" />{text.eyebrow}</p><h1>{text.invalidTitle}</h1><p>{text.invalid}</p></section>;
  const contentLocale = payload.locale;
  const canonicalUrl = buildPublicMenuUrl(payload, window.location.origin);
  const priceFormat = new Intl.NumberFormat(contentLocale === 'pl' ? 'pl-PL' : 'en-GB', { style: 'currency', currency: payload.currency });

  return <section className="menu-page public-menu" aria-labelledby="public-menu-title">
    <div className="public-menu-heading"><p className="eyebrow"><span className="red-mark" />{labels[contentLocale].eyebrow}</p><h1 id="public-menu-title">{payload.venueName}</h1><p className="menu-intro">{contentLocale === 'en' ? 'Cocktails for the hours after midnight.' : 'Koktajle na godziny po północy.'}</p></div>
    <div className="public-drink-list">
      {payload.items.map(({ cocktailId, priceMinor }, index) => {
        const cocktail = cocktailById.get(cocktailId)!;
        return <article className="public-drink" key={cocktailId}><img className="public-drink-image" src={cocktail.image.src} alt={cocktail.image.alt[contentLocale]} /><div className="public-drink-copy"><p className="drink-type">DR.RAVE / 0{index + 1}</p><h2>{cocktail.name[contentLocale]}</h2><p>{cocktail.description[contentLocale]}</p></div><strong>{priceFormat.format(priceMinor / 100)}</strong></article>;
      })}
    </div>
    <div className="public-menu-actions"><button className="primary-button" type="button" onClick={() => { setPrintError(false); try { window.print(); } catch { setPrintError(true); } }}>{labels[contentLocale].print}<span aria-hidden="true">↗</span></button>{printError && <p className="form-error" role="alert">{contentLocale === 'en' ? 'Printing could not be opened. Use your browser menu to print this page.' : 'Nie udało się otworzyć drukowania. Wybierz drukowanie z menu przeglądarki.'}</p>}</div>
    <MenuQr value={canonicalUrl} label={labels[contentLocale].qr} recoveryMessage={labels[contentLocale].qrError} />
  </section>;
}
