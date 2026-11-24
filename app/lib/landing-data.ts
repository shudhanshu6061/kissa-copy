export interface Perfume {
  id: string;
  handle: string;
  number: string;
  title: string;
  place: string;
  category: 'botanical' | 'aquatic' | 'amber' | 'oud' | 'gourmand' | 'floral';
  family: string;
  tagline: string;
  price: number;
  concentration: string;
  file: string;
  productImg: string;
  bottleImg: string;
  badge: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  sillage: string;
  longevity: string;
  url: string;
}

export interface CartItem {
  perfumeId: string;
  title: string;
  subtitle: string;
  size: string;
  qty: number;
  price: number;
  img: string;
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'SGD' | 'GBP';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  SGD: 'S$',
  GBP: '£',
};

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 1 / 83,
  EUR: 0.92 / 83,
  SGD: 1.34 / 83,
  GBP: 0.79 / 83,
};

export function formatPrice(amt: number, currency: CurrencyCode = 'INR'): string {
  const sym = CURRENCY_SYMBOLS[currency] || '₹';
  const rate = CURRENCY_RATES[currency] || 1;
  const val = Math.round(amt * (currency === 'INR' ? 1 : rate));
  return `${sym}${val.toLocaleString('en-IN')}`;
}

const ASSET_DIR = '/landing-pages/meng-to-sketchbook/';

export const PERFUMES: Perfume[] = [
  {
    id: 'naya-panna',
    handle: 'naya-panna-eau-de-parfum-50ml',
    number: 'N° 01',
    title: 'NAYA PANNA',
    place: 'Chapter 01 · A New Beginning',
    category: 'botanical',
    family: 'Fresh Spiced & Creamy Woods',
    tagline: 'Fresh Spices, Airy White Tea & Creamy Woods',
    price: 1599,
    concentration: '35% Eau de Parfum · Unisex',
    file: 'gardens-by-the-bay.png',
    productImg: ASSET_DIR + 'naya-panna.png',
    bottleImg: ASSET_DIR + 'bottle-velvet-oud.svg',
    badge: 'Bestseller',
    topNotes: ['Fresh Spices', 'Airy White Tea', 'Crisp Bergamot'],
    heartNotes: ['White Tea Blossom', 'Cardamom Pods', 'Linen Accord'],
    baseNotes: ['Creamy Woods', 'Clean Musks', 'Soft Amber'],
    description: "Every new beginning deserves a story. NAYA PANNA by KISSA is a unisex 35% Eau de Parfum inspired by fresh starts, new dreams and life's unforgettable moments. A premium hardcover book presentation box with five written story pages. Read. Wear. Write. KISSA – Har nayi shuruaat, ek naya kissa.",
    sillage: 'Radiant & Memorable',
    longevity: '14+ Hours',
    url: ASSET_DIR + 'gardens-by-the-bay.png',
  },
  {
    id: 'blue-amber',
    handle: 'blue-amber-perfume',
    number: 'N° 02',
    title: 'KISSA BLUE AMBER',
    place: 'Open Horizons · Fresh Coast',
    category: 'aquatic',
    family: 'Fresh Woody Aquatic',
    tagline: 'Cool Mint, Marine Accord, Lavender & Warm Amber',
    price: 799,
    concentration: 'Extrait de Parfum · Fresh Edition',
    file: 'marina-bay-skyline.png',
    productImg: ASSET_DIR + 'blue-amber.png',
    bottleImg: ASSET_DIR + 'bottle-love-drunk.svg',
    badge: 'Fresh Edition',
    topNotes: ['Cool Mint', 'Lavender', 'Marine Accord'],
    heartNotes: ['Geranium', 'Neroli Petals', 'Jasmine'],
    baseNotes: ['Warm Amber', 'Cedarwood', 'White Musk'],
    description: "An invigorating blend of fresh mint, aromatic lavender and marine accords, grounded by warm amber, cedarwood and white musk. BLUE AMBER captures the essence of effortless confidence with a refreshing opening and a sophisticated woody finish. Wear your presence. Leave your story.",
    sillage: 'Crisp & Revitalising',
    longevity: '10+ Hours',
    url: ASSET_DIR + 'marina-bay-skyline.png',
  },
  {
    id: 'midnight-guava',
    handle: 'midnight-guava-perfume',
    number: 'N° 03',
    title: 'KISSA MIDNIGHT GUAVA',
    place: 'Nocturnal Orchards · Midnight',
    category: 'amber',
    family: 'Fruity Spicy & Deep Woody',
    tagline: 'Juicy Guava, Cardamom, Rich Oud & Grey Amber',
    price: 799,
    concentration: 'Extrait de Parfum · After-Dark Edition',
    file: 'botanic-gardens.png',
    productImg: ASSET_DIR + 'midnight-guava.png',
    bottleImg: ASSET_DIR + 'bottle-sandal-muse.svg',
    badge: 'After-Dark Elegance',
    topNotes: ['Juicy Guava', 'Cardamom', 'Madagascar Mandarin'],
    heartNotes: ['Rich Oud', 'Madagascar Geranium', 'Peony'],
    baseNotes: ['Cypriol', 'Madagascar Patchouli', 'Grey Amber'],
    description: "An expressive fragrance inspired by the mystery of the night and the irresistible character of tropical fruits. Juicy guava and mandarin opening into rich oud, geranium, and deep earthy patchouli. Created for those who embrace individuality and aren't afraid to stand out. Make the night yours.",
    sillage: 'Deep & Magnetic',
    longevity: '12+ Hours',
    url: ASSET_DIR + 'botanic-gardens.png',
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    perfumeId: 'naya-panna',
    title: 'NAYA PANNA',
    subtitle: 'A Fragrance for Your Next Chapter · 50 ml',
    size: '50ml',
    qty: 1,
    price: 1599,
    img: ASSET_DIR + 'naya-panna.png',
  },
];
