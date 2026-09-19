import { MapPin, Clock } from 'lucide-react';

export default function StoreInfo() {
  return (
    <section className="store-info-card glass-panel" aria-label="Store details">
      <div className="store-info-row store-info-row--title">
        <MapPin size={16} className="text-gold" />
        <span>Location &amp; Hours</span>
      </div>
      <p className="store-info-text">45 Coffee Street, Suite B, Coffee District</p>
      <div className="store-info-row">
        <Clock size={14} />
        <span>Mon - Sun: 7:00 AM - 8:00 PM</span>
      </div>
    </section>
  );
}
