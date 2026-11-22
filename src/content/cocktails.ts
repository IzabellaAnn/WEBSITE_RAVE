import type { Cocktail } from '../features/menu/types';

export const cocktails: Cocktail[] = [
  {
    id: 'velvet-underground', demoRecipe: true,
    image: { src: '/images/cocktails/velvet-underground.jpg', alt: { en: 'Dark amber cocktail in a rocks glass', pl: 'Bursztynowy koktajl w niskiej szklance' } },
    name: { en: 'Velvet Underground', pl: 'Velvet Underground' },
    description: { en: 'Gin, cherry, dry vermouth, a little dark magic.', pl: 'Gin, wiśnia, wytrawny wermut i odrobina magii.' },
    ingredients: {
      en: ['Gin — 45 ml', 'Cherry liqueur — 20 ml', 'Dry vermouth — 20 ml', 'Orange bitters — 2 dashes'],
      pl: ['Gin — 45 ml', 'Likier wiśniowy — 20 ml', 'Wytrawny wermut — 20 ml', 'Bitters pomarańczowy — 2 dash'],
    },
    method: { en: 'Stir with ice until cold. Strain into a chilled coupe.', pl: 'Mieszaj z lodem do schłodzenia. Przelej do schłodzonego kieliszka coupe.' },
  },
  {
    id: 'soft-focus', demoRecipe: true,
    image: { src: '/images/cocktails/soft-focus.jpg', alt: { en: 'Pale cocktail in a coupe glass at a bar', pl: 'Jasny koktajl w kieliszku coupe przy barze' } },
    name: { en: 'Soft Focus', pl: 'Soft Focus' },
    description: { en: 'Elderflower, citrus, bubbles and a pause.', pl: 'Czarny bez, cytrusy, bąbelki i chwila oddechu.' },
    ingredients: {
      en: ['Gin — 25 ml', 'Elderflower liqueur — 20 ml', 'Lemon juice — 15 ml', 'Sparkling wine — 60 ml'],
      pl: ['Gin — 25 ml', 'Likier z czarnego bzu — 20 ml', 'Sok z cytryny — 15 ml', 'Wino musujące — 60 ml'],
    },
    method: { en: 'Shake the gin, liqueur and lemon with ice. Strain and top with sparkling wine.', pl: 'Wstrząśnij gin, likier i cytrynę z lodem. Przelej i dopełnij winem musującym.' },
  },
  {
    id: 'after-image', demoRecipe: true,
    image: { src: '/images/cocktails/after-image.jpg', alt: { en: 'A dark cocktail in a candlelit coupe', pl: 'Ciemny koktajl w kieliszku coupe przy świecy' } },
    name: { en: 'After Image', pl: 'After Image' },
    description: { en: 'Dark rum, roasted pineapple, a pinch of salt.', pl: 'Ciemny rum, pieczony ananas i szczypta soli.' },
    ingredients: {
      en: ['Dark rum — 45 ml', 'Roasted pineapple juice — 60 ml', 'Lime juice — 15 ml', 'Simple syrup — 10 ml', 'Salt — a pinch'],
      pl: ['Ciemny rum — 45 ml', 'Sok z pieczonego ananasa — 60 ml', 'Sok z limonki — 15 ml', 'Syrop cukrowy — 10 ml', 'Sól — szczypta'],
    },
    method: { en: 'Shake all ingredients with ice and strain over fresh ice.', pl: 'Wstrząśnij wszystkie składniki z lodem i przelej na świeży lód.' },
  },
  {
    id: 'mojito', demoRecipe: false,
    image: { src: '/images/cocktails/mojito.jpg', alt: { en: 'Fresh mojito with mint and lime', pl: 'Świeże mojito z miętą i limonką' } },
    name: { en: 'Mojito', pl: 'Mojito' },
    description: { en: 'White rum, mint, lime, sugar and soda.', pl: 'Biały rum, mięta, limonka, cukier i soda.' },
    ingredients: {
      en: ['White rum — 45 ml', 'Fresh lime juice — 20 ml', 'Mint — 6 sprigs', 'Cane sugar — 2 tsp', 'Soda water — top up'],
      pl: ['Biały rum — 45 ml', 'Świeży sok z limonki — 20 ml', 'Mięta — 6 gałązek', 'Cukier trzcinowy — 2 łyżeczki', 'Woda sodowa — dopełnienie'],
    },
    method: { en: 'Muddle mint with sugar and lime. Add rum, fill with ice and soda, then stir.', pl: 'Ugnieć miętę z cukrem i limonką. Dodaj rum, lód i sodę, a następnie wymieszaj.' },
    sourceUrl: 'https://iba-world.com/mojito/',
  },
  {
    id: 'french-75', demoRecipe: false,
    image: { src: '/images/cocktails/french-75.jpg', alt: { en: 'Pale lemon cocktail in a coupe glass', pl: 'Jasny cytrynowy koktajl w kieliszku coupe' } },
    name: { en: 'French 75', pl: 'French 75' },
    description: { en: 'Gin, lemon and sugar lifted with Champagne.', pl: 'Gin, cytryna i cukier połączone z szampanem.' },
    ingredients: {
      en: ['Gin — 30 ml', 'Lemon juice — 15 ml', 'Sugar syrup — 15 ml', 'Champagne — 60 ml'],
      pl: ['Gin — 30 ml', 'Sok z cytryny — 15 ml', 'Syrop cukrowy — 15 ml', 'Szampan — 60 ml'],
    },
    method: { en: 'Shake gin, lemon and syrup with ice. Strain into a flute and top with Champagne.', pl: 'Wstrząśnij gin, cytrynę i syrop z lodem. Przelej do fletu i dopełnij szampanem.' },
    sourceUrl: 'https://iba-world.com/french-75/',
  },
];

export const cocktailById = new Map(cocktails.map((cocktail) => [cocktail.id, cocktail]));
