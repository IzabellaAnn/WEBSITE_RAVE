import type { Locale } from '../../content/home';

export type Currency = 'PLN' | 'EUR';

export type LocalizedText = Record<Locale, string>;

export type Cocktail = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  ingredients: Record<Locale, string[]>;
  method: LocalizedText;
  demoRecipe: boolean;
  image: { src: string; alt: LocalizedText };
  sourceUrl?: string;
};

export type MenuPayload = {
  version: 1;
  venueName: string;
  locale: Locale;
  currency: Currency;
  items: { cocktailId: string; priceMinor: number }[];
};
