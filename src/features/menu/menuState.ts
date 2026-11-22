import { cocktails } from '../../content/cocktails';
import type { MenuPayload } from './types';

const maxEncodedLength = 1800;
const knownCocktailIds = new Set(cocktails.map(({ id }) => id));

function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): string | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value) || value.length % 4 === 1) return null;
  try {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

export function encodeMenuPayload(payload: MenuPayload): string {
  return toBase64Url(JSON.stringify([1, payload.venueName, payload.locale, payload.currency, payload.items.map(({ cocktailId, priceMinor }) => [cocktailId, priceMinor])]));
}

export function decodeMenuPayload(encoded: string): MenuPayload | null {
  if (!encoded || encoded.length > maxEncodedLength) return null;
  const json = fromBase64Url(encoded);
  if (!json) return null;
  try {
    const value: unknown = JSON.parse(json);
    if (!Array.isArray(value) || value.length !== 5 || value[0] !== 1 || typeof value[1] !== 'string' || !value[1].trim() || value[1].length > 100 || (value[2] !== 'en' && value[2] !== 'pl') || (value[3] !== 'PLN' && value[3] !== 'EUR') || !Array.isArray(value[4]) || value[4].length === 0 || value[4].length > cocktails.length) return null;
    const seen = new Set<string>();
    const items: MenuPayload['items'] = [];
    for (const item of value[4]) {
      if (!Array.isArray(item) || item.length !== 2 || typeof item[0] !== 'string' || !knownCocktailIds.has(item[0]) || seen.has(item[0]) || !Number.isSafeInteger(item[1]) || item[1] < 0 || item[1] > 100_000_000) return null;
      seen.add(item[0]);
      items.push({ cocktailId: item[0], priceMinor: item[1] });
    }
    return { version: 1, venueName: value[1], locale: value[2], currency: value[3], items };
  } catch {
    return null;
  }
}

export function buildPublicMenuUrl(payload: MenuPayload, origin: string): string {
  const encoded = encodeMenuPayload(payload);
  if (encoded.length > maxEncodedLength) throw new Error('Menu link is too long to share reliably.');
  return `${origin.replace(/\/$/, '')}/${payload.locale}/menu/view/?m=${encoded}`;
}
