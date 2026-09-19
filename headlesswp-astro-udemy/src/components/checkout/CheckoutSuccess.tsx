import { CheckCircle } from 'lucide-react';

interface CheckoutSuccessProps {
  isOpen: boolean;
  orderId?: string;
  onClose: () => void;
}

export default function CheckoutSuccess({ isOpen, orderId, onClose }: CheckoutSuccessProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content glass-panel success-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="success-icon-wrapper">
          <CheckCircle size={48} />
        </div>
        <h3 className="modal-title font-serif success-title">Order Received!</h3>
        <p className="success-message">
          Your coffee and pastries are being prepared by our barista. Please pick
          them up from the counter in 5-10 minutes.
        </p>
        <div className="success-order-id">
          <span>
            Order ID: #{orderId || `VB-${Math.floor(1000 + Math.random() * 9000)}`}
          </span>
        </div>
        <button className="success-action-btn" onClick={onClose}>
          Order Something Else
        </button>
      </div>
    </div>
  );
}
