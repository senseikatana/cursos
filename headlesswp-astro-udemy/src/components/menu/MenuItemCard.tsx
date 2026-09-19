import { Coffee, Star, Plus } from 'lucide-react';
import type { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onOpen }: MenuItemCardProps) {
  return (
    <article className="menu-card glass-panel">
      <div className="card-image-container">
        {item.tag && <span className="card-tag">{item.tag}</span>}
        <div className="card-image-placeholder">
          <Coffee size={48} strokeWidth={1} />
        </div>
      </div>

      <div className="card-content">
        <div className="card-title-row">
          <h3 className="card-title font-serif">{item.name}</h3>
          <span className="card-price">${item.price.toFixed(2)}</span>
        </div>
        <p className="card-desc">{item.desc}</p>

        <div className="card-actions">
          <span className="rating-badge">
            <Star size={14} fill="var(--primary)" className="text-gold" />
            <span>{item.rating.toFixed(1)}</span>
          </span>
          <button
            className="add-to-cart-btn"
            onClick={() => onOpen(item)}
          >
            <Plus size={16} />
            <span>{item.category === 'pastries' ? 'Add' : 'Customize'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
