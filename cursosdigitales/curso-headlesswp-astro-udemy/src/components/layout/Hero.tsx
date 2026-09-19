import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-wrapper">
        <img
          src="/coffee_shop_hero.png"
          alt="Cozy Coffee Shop Interior"
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Barista AI and Ambient Lo-Fi Onboard</span>
        </div>
        <h2 className="hero-title font-serif">A Space for Coffee &amp; Craft</h2>
        <p className="hero-subtitle">
          Indulge in artisanal organic brews, handcrafted pastries, and customize
          your orders with our interactive assistant while enjoying custom lo-fi
          beats.
        </p>
      </div>
    </section>
  );
}
