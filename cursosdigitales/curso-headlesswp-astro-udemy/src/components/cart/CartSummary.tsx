import { CheckCircle } from 'lucide-react';
import type { CartItem } from '../../types';

interface CartSummaryProps {
  cart: CartItem[];
  discountPercent: number;
  couponCode: string;
  couponError: string;
  onCouponCodeChange: (value: string) => void;
  onApplyCoupon: () => void;
  onCheckout: () => void;
}

export default function CartSummary({
  cart,
  discountPercent,
  couponCode,
  couponError,
  onCouponCodeChange,
  onApplyCoupon,
  onCheckout,
}: CartSummaryProps) {
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = (subtotal - discount) * 0.08;
  const deliveryFee = subtotal > 0 ? 1.5 : 0;
  const grandTotal = subtotal > 0 ? subtotal - discount + tax + deliveryFee : 0;

  return (
    <div className="cart-summary">
      <div className="coupon-row">
        <input
          type="text"
          className="coupon-input"
          placeholder="Promo Code (e.g. COFFEE10)"
          value={couponCode}
          onChange={(e) => onCouponCodeChange(e.target.value)}
        />
        <button className="coupon-btn" onClick={onApplyCoupon}>
          Apply
        </button>
      </div>

      {couponError && (
        <div className="coupon-error" role="alert">
          {couponError}
        </div>
      )}

      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {discountPercent > 0 && (
        <div className="summary-row" style={{ color: 'var(--success)' }}>
          <span>Discount ({discountPercent}%)</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Service Fee</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>

      <div className="summary-row total">
        <span>Total</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>

      <button className="checkout-btn" onClick={onCheckout} style={{ marginTop: '1.25rem' }}>
        <CheckCircle size={18} />
        <span>Place Order</span>
      </button>
    </div>
  );
}
