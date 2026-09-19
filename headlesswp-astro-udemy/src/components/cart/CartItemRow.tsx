import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
}

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemRowProps) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        {item.size !== 'Standard' && (
          <span className="cart-item-customs">
            {item.size} • {item.milk} • {item.sweetness}
          </span>
        )}
        <div className="cart-item-price-row">
          <span className="cart-item-price">${item.totalPrice.toFixed(2)}</span>
          <div className="qty-control">
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.cartId, -1)}
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="qty-num">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => onUpdateQuantity(item.cartId, 1)}
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
      <button
        className="remove-item-btn"
        onClick={() => onRemoveItem(item.cartId)}
        aria-label="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
