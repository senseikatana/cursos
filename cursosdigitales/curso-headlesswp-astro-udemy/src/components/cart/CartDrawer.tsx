import { ShoppingBag, X } from 'lucide-react';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import type { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  discountPercent: number;
  couponCode: string;
  couponError: string;
  onCouponCodeChange: (value: string) => void;
  onApplyCoupon: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  discountPercent,
  couponCode,
  couponError,
  onCouponCodeChange,
  onApplyCoupon,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3 className="cart-title">Your Order</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>Your bag is empty.</p>
            <button
              className="category-btn empty-cart-action"
              onClick={onClose}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItemRow
                  key={item.cartId}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>

            <CartSummary
              cart={cart}
              discountPercent={discountPercent}
              couponCode={couponCode}
              couponError={couponError}
              onCouponCodeChange={onCouponCodeChange}
              onApplyCoupon={onApplyCoupon}
              onCheckout={onCheckout}
            />
          </>
        )}
      </div>
    </div>
  );
}
