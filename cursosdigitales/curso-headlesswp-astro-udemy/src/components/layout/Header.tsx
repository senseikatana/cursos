import { ShoppingBag, Coffee } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartOpen: () => void;
}

export default function Header({ cartItemCount, onCartOpen }: HeaderProps) {
  return (
    <header className="main-header">
      <div className="logo-container">
        <Coffee className="text-gold" size={28} />
        <h1 className="logo-text">CoffeeShop</h1>
      </div>

      <div className="nav-actions">
        <button
          className="cart-toggle-btn"
          onClick={onCartOpen}
          aria-label="View Shopping Cart"
        >
          <ShoppingBag size={20} className="text-gold" />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
