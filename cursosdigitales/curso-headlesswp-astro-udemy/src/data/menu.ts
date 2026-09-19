import type { MenuItem, MusicTrack } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  { id: 'esp', name: 'Signature Espresso', category: 'hot', price: 3.20, rating: 4.8, desc: 'Rich espresso shot pulled from our freshly roasted house blend beans.', tag: 'Popular' },
  { id: 'cap', name: 'Classic Cappuccino', category: 'hot', price: 4.50, rating: 4.7, desc: 'Equal parts double shot espresso, steamed milk, and silky wet foam.', tag: 'Barista Choice' },
  { id: 'lat', name: 'Caffè Latte', category: 'hot', price: 4.50, rating: 4.6, desc: 'Double espresso with smooth steamed milk and a thin layer of foam.' },
  { id: 'flw', name: 'Flat White', category: 'hot', price: 4.30, rating: 4.8, desc: 'Velvety micro-foam milk poured over double ristretto shots.' },
  { id: 'cld', name: 'Nitro Cold Brew', category: 'cold', price: 4.90, rating: 4.9, desc: 'Infused with nitrogen for a creamy head and naturally sweet flavor.', tag: 'New' },
  { id: 'ice', name: 'Iced Vanilla Latte', category: 'cold', price: 4.80, rating: 4.6, desc: 'House-made vanilla syrup, double espresso, chilled milk, over ice.' },
  { id: 'aff', name: 'Espresso Affogato', category: 'cold', price: 5.50, rating: 4.9, desc: 'Double shot of hot espresso poured over a scoop of premium vanilla bean gelato.' },
  { id: 'gld', name: 'Golden Milk Latte', category: 'specialties', price: 5.20, rating: 4.5, desc: 'Anti-inflammatory blend of turmeric, ginger, black pepper, and steamed oat milk.' },
  { id: 'pst', name: 'Pistachio Rose Latte', category: 'specialties', price: 5.80, rating: 4.8, desc: 'Creamy espresso infused with sweet pistachio cream and a hint of organic rosewater.', tag: 'Signature' },
  { id: 'spn', name: 'Spanish Latte', category: 'specialties', price: 5.40, rating: 4.7, desc: 'Espresso combined with sweetened condensed milk and steamed textured milk.' },
  { id: 'cro', name: 'Butter Croissant', category: 'pastries', price: 3.80, rating: 4.8, desc: 'Flaky, buttery multi-layered pastry baked fresh daily in our ovens.' },
  { id: 'cin', name: 'Cinnamon Swirl Bun', category: 'pastries', price: 4.20, rating: 4.7, desc: 'Warm soft pastry rolled with Ceylon cinnamon and topped with cream cheese glaze.', tag: 'Best Seller' }
];

export const MUSIC_TRACKS: MusicTrack[] = [
  { name: 'Warm Mocha Beats', artist: 'Lo-Fi Barista' },
  { name: 'Rainy Day Espresso', artist: 'Chilled Cow' },
  { name: 'Cinnamon Swirl Session', artist: 'CoffeeShop' },
  { name: 'Midnight Cold Brew', artist: 'Beat Lounge' }
];
