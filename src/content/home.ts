export type Locale = 'en' | 'pl';

export const homeCopy = {
  en: {
    nav: [
      ['Drinks', 'drinks'],
      ['The Science', 'science'],
      ['Culture', 'culture'],
      ['My Menu', 'my-menu'],
    ],
    eyebrow: 'A field guide to the hours after midnight',
    title: 'Good drinks.\nLong nights.',
    intro: 'A little ritual for the dance floor, the kitchen at 4am, and everything in between.',
    explore: 'Meet the drinks',
    issue: '01 / In good spirits',
    featured: 'A few favourites',
    featuredNote: 'Made for the part of the night that has no name.',
    footer: 'Stay curious. Drink thoughtfully.',
    drinks: [
      { name: 'Velvet Underground', type: 'BITTER · BRIGHT · COMPLEX', description: 'Gin, cherry, dry vermouth, a little dark magic.', image: 'photo-1514362545857-3bc16c4c7d1b', alt: 'A deep red cocktail in a coupe glass' },
      { name: 'Soft Focus', type: 'FLORAL · DRY · QUIET', description: 'Elderflower, citrus, bubbles and a pause.', image: 'photo-1754490855563-80a5c77ae82d', alt: 'A pale cocktail in a coupe glass on a softly lit bar' },
      { name: 'After Image', type: 'SMOKY · WARM · SLOW', description: 'Dark rum, roasted pineapple, a pinch of salt.', image: 'photo-1551538827-9c037cb4f32a', alt: 'A warmly lit amber cocktail' },
    ],
  },
  pl: {
    nav: [
      ['Koktajle', 'drinks'],
      ['Nauka', 'science'],
      ['Kultura', 'culture'],
      ['Moja karta', 'my-menu'],
    ],
    eyebrow: 'Przewodnik po godzinach po północy',
    title: 'Dobre drinki.\nDługie noce.',
    intro: 'Mały rytuał na parkiet, do kuchni o czwartej rano i na wszystkie chwile pomiędzy.',
    explore: 'Poznaj koktajle',
    issue: '01 / Dobry nastrój',
    featured: 'Kilka ulubionych',
    featuredNote: 'Na tę część nocy, która nie ma jeszcze nazwy.',
    footer: 'Bądź ciekawa. Pij świadomie.',
    drinks: [
      { name: 'Velvet Underground', type: 'GORYCZ · WIŚNIA · GŁĘBIA', description: 'Gin, wiśnia, wytrawny wermut i odrobina magii.', image: 'photo-1514362545857-3bc16c4c7d1b', alt: 'Ciemnoczerwony koktajl w kieliszku coupe' },
      { name: 'Soft Focus', type: 'KWIATY · WYTRAWNOŚĆ · LEKKOŚĆ', description: 'Czarny bez, cytrusy, bąbelki i chwila oddechu.', image: 'photo-1754490855563-80a5c77ae82d', alt: 'Jasny koktajl w kieliszku coupe na nastrojowo oświetlonym barze' },
      { name: 'After Image', type: 'DYM · CIEPŁO · SPOKÓJ', description: 'Ciemny rum, pieczony ananas i szczypta soli.', image: 'photo-1551538827-9c037cb4f32a', alt: 'Bursztynowy koktajl w ciepłym świetle' },
    ],
  },
} satisfies Record<Locale, {
  nav: [string, string][];
  eyebrow: string;
  title: string;
  intro: string;
  explore: string;
  issue: string;
  featured: string;
  featuredNote: string;
  footer: string;
  drinks: { name: string; type: string; description: string; image: string; alt: string }[];
}>;
