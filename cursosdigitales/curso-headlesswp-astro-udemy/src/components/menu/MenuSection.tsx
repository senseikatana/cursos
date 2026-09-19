import MenuItemCard from './MenuItemCard';
import type { MenuItem } from '../../types';

interface MenuSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onOpenCustomizer: (item: MenuItem) => void;
  menuItems: MenuItem[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'hot', label: 'Espresso & Hot' },
  { id: 'cold', label: 'Cold Brews & Iced' },
  { id: 'specialties', label: 'Specialties' },
  { id: 'pastries', label: 'Pastries & Sweets' },
];

export default function MenuSection({
  activeCategory,
  setActiveCategory,
  onOpenCustomizer,
  menuItems,
}: MenuSectionProps) {
  const filteredMenu = menuItems.filter(
    (item) => (activeCategory === 'all' ? true : item.category === activeCategory)
  );

  return (
    <section className="menu-section">
      <nav className="category-nav" aria-label="Menu Categories">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`category-btn ${activeCategory === c.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </nav>

      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onOpen={onOpenCustomizer}
          />
        ))}
      </div>
    </section>
  );
}
