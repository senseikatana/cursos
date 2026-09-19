export interface MenuItem {
  id: string;
  name: string;
  category: 'hot' | 'cold' | 'specialties' | 'pastries';
  price: number;
  rating: number;
  desc: string;
  tag?: string;
}

export interface CartItem {
  cartId: string;
  id: string;
  name: string;
  basePrice: number;
  totalPrice: number;
  quantity: number;
  size: string;
  milk: string;
  sweetness: string;
}

export interface Message {
  sender: 'ai' | 'user';
  text: string;
  recommendationId?: string;
}

export interface Customization {
  size: string;
  milk: string;
  sweetness: string;
}

export interface MusicTrack {
  name: string;
  artist: string;
}
