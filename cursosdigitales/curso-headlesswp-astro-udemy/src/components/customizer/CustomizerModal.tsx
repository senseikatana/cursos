import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { MenuItem, Customization } from '../../types';

interface CustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (selections: Customization) => void;
}

const SIZE_OPTIONS = ['Short', 'Tall', 'Grande'];
const MILK_OPTIONS = ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk'];
const SWEETNESS_OPTIONS = ['No Sugar', 'Half Sweet', 'Extra Sweet'];

function sizeModifier(size: string): number {
  if (size === 'Short') return -0.3;
  if (size === 'Grande') return 0.6;
  return 0;
}

function milkModifier(milk: string): number {
  if (milk === 'Oat Milk' || milk === 'Almond Milk' || milk === 'Coconut Milk') {
    return 0.4;
  }
  return 0;
}

export default function CustomizerModal({
  item,
  onClose,
  onConfirm,
}: CustomizerModalProps) {
  const [selectedSize, setSelectedSize] = useState('Tall');
  const [selectedMilk, setSelectedMilk] = useState('Oat Milk');
  const [selectedSweetness, setSelectedSweetness] = useState('Half Sweet');

  if (!item) return null;

  const totalPrice = item.price + sizeModifier(selectedSize) + milkModifier(selectedMilk);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="option-group-title" style={{ margin: 0 }}>
              Handcrafting
            </span>
            <h3 className="modal-title">{item.name}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close customizer">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div>
            <h4 className="option-group-title">Size</h4>
            <div className="options-grid">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  className={`option-select-card ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.15rem',
                    }}
                  >
                    {size === 'Short' ? '-$0.30' : size === 'Grande' ? '+$0.60' : 'Standard'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="option-group-title">Milk Selection</h4>
            <div className="options-grid-milk">
              {MILK_OPTIONS.map((milk) => (
                <button
                  key={milk}
                  className={`option-select-card ${selectedMilk === milk ? 'selected' : ''}`}
                  onClick={() => setSelectedMilk(milk)}
                >
                  {milk}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      color: 'var(--text-secondary)',
                      marginTop: '0.15rem',
                    }}
                  >
                    {milk === 'Whole Milk' ? 'Free' : '+$0.40'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="option-group-title">Sweetness Level</h4>
            <div className="options-grid">
              {SWEETNESS_OPTIONS.map((sweetness) => (
                <button
                  key={sweetness}
                  className={`option-select-card ${selectedSweetness === sweetness ? 'selected' : ''}`}
                  onClick={() => setSelectedSweetness(sweetness)}
                >
                  {sweetness}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-total-col">
            <span className="modal-total-label">Total Price</span>
            <span className="modal-total-price">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="modal-confirm-btn"
            onClick={() =>
              onConfirm({
                size: selectedSize,
                milk: selectedMilk,
                sweetness: selectedSweetness,
              })
            }
          >
            <Plus size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
