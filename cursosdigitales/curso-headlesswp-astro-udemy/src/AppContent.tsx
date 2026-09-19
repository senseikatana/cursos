import { useState, useRef, useEffect } from 'react';
import { MENU_ITEMS, MUSIC_TRACKS } from './data/menu';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import MenuSection from './components/menu/MenuSection';
import MusicPlayer from './components/music/MusicPlayer';
import AiBarista from './components/chat/AiBarista';
import StoreInfo from './components/location/StoreInfo';
import CartDrawer from './components/cart/CartDrawer';
import CustomizerModal from './components/customizer/CustomizerModal';
import CheckoutSuccess from './components/checkout/CheckoutSuccess';
import Footer from './components/layout/Footer';
import type { MenuItem, CartItem, Message, Customization } from "./types";
import { useAuth } from "./contexts/AuthContext";
export default function AppContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hey! I'm Aura, your CoffeeShop barista assistant. ☕ Tell me how your day is going or what flavors you are craving, and I'll find your perfect cup!",
    },
  ]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const cartItemCount = cart.reduce((acc, x) => acc + x.quantity, 0);

  // Open customizer modal (or add pastry directly to cart)
  const handleOpenCustomizer = (item: MenuItem) => {
    if (item.category === 'pastries') {
      const cartId = `${item.id}-default-default-default`;
      const existing = cart.find((x) => x.cartId === cartId);
      if (existing) {
        setCart(
          cart.map((x) =>
            x.cartId === cartId ? { ...x, quantity: x.quantity + 1 } : x
          )
        );
      } else {
        setCart([
          ...cart,
          {
            cartId,
            id: item.id,
            name: item.name,
            basePrice: item.price,
            totalPrice: item.price,
            quantity: 1,
            size: 'Standard',
            milk: 'None',
            sweetness: 'Standard',
          },
        ]);
      }
      setIsCartOpen(true);
      return;
    }

    setCustomizingItem(item);
  };

  // Add customized item to cart
  const handleConfirmCustomization = (selections: Customization) => {
    const item = customizingItem;
    if (!item) return;

    let sizeModifier = 0;
    if (selections.size === 'Short') sizeModifier = -0.3;
    if (selections.size === 'Grande') sizeModifier = 0.6;

    let milkModifier = 0;
    if (
      selections.milk === 'Oat Milk' ||
      selections.milk === 'Almond Milk' ||
      selections.milk === 'Coconut Milk'
    ) {
      milkModifier = 0.4;
    }

    const itemPrice = parseFloat(
      (item.price + sizeModifier + milkModifier).toFixed(2)
    );

    const cartId = `${item.id}-${selections.size}-${selections.milk}-${selections.sweetness}`
      .replace(/\s+/g, '')
      .toLowerCase();

    const existingItem = cart.find((x) => x.cartId === cartId);
    if (existingItem) {
      setCart(
        cart.map((x) =>
          x.cartId === cartId
            ? {
                ...x,
                quantity: x.quantity + 1,
                totalPrice: parseFloat((x.totalPrice + itemPrice).toFixed(2)),
              }
            : x
        )
      );
    } else {
      setCart([
        ...cart,
        {
          cartId,
          id: item.id,
          name: item.name,
          basePrice: itemPrice,
          totalPrice: itemPrice,
          quantity: 1,
          size: selections.size,
          milk: selections.milk,
          sweetness: selections.sweetness,
        },
      ]);
    }

    setCustomizingItem(null);
    setIsCartOpen(true);
  };

  // Cart quantity controls
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.cartId === cartId) {
          const newQty = Math.max(1, item.quantity + delta);
          const newTotal = parseFloat((item.basePrice * newQty).toFixed(2));
          return { ...item, quantity: newQty, totalPrice: newTotal };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  // Coupon handling
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'COFFEE10') {
      setDiscountPercent(10);
      setCouponCode('');
      setCouponError('');
    } else {
      setCouponError("Invalid coupon code. Try 'COFFEE10'!");
    }
  };

  const { user } = useAuth();
  const [checkoutOrderId, setCheckoutOrderId] = useState<string>('');

  // Checkout handling
  const handleCheckout = async () => {
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = subtotal * (discountPercent / 100);
    const total = parseFloat((subtotal - discount).toFixed(2));

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart,
          userId: user?.id || null,
          total
        })
      });

      if (!res.ok) {
        console.error("Failed to place order");
        return;
      }

      const data = await res.json();
      setCheckoutOrderId(data.orderId);
      
      setCheckoutSuccess(true);
      setCart([]);
      setDiscountPercent(0);
      setCouponCode('');
      setCouponError('');
    } catch (err) {
      console.error("Network error saving order:", err);
    }
  };

  // Barista AI Chatbot response logic
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let aiText = '';
      let recId = '';

      if (
        lower.includes('tired') ||
        lower.includes('sleepy') ||
        lower.includes('exhausted') ||
        lower.includes('energy') ||
        lower.includes('wake')
      ) {
        aiText =
          "A long day calls for serious power! ⚡ I recommend our Nitro Cold Brew or a classic Double Espresso to fuel up. Tap below to select yours!";
        recId = 'cld';
      } else if (
        lower.includes('sweet') ||
        lower.includes('sugar') ||
        lower.includes('chocolate') ||
        lower.includes('mocha')
      ) {
        aiText =
          "Sweet cravings? 🍯 I highly suggest our signature Pistachio Rose Latte or a decadent Spanish Latte. Both pair beautifully with our Cinnamon Swirl Bun!";
        recId = 'pst';
      } else if (
        lower.includes('cold') ||
        lower.includes('iced') ||
        lower.includes('summer') ||
        lower.includes('hot')
      ) {
        aiText =
          "Cool down and chill with our refreshing Iced Vanilla Latte or the Nitro Cold Brew. Or try the Espresso Affogato for a sweet gelat-coffee combo!";
        recId = 'ice';
      } else if (
        lower.includes('food') ||
        lower.includes('pastry') ||
        lower.includes('hungry') ||
        lower.includes('eat') ||
        lower.includes('croissant')
      ) {
        aiText =
          "Baked fresh every morning! 🥐 Our flaky Butter Croissant or warm Cinnamon Swirl Bun is the perfect match for any coffee blend.";
        recId = 'cin';
      } else if (
        lower.includes('healthy') ||
        lower.includes('tea') ||
        lower.includes('vegan') ||
        lower.includes('turmeric')
      ) {
        aiText =
          "Keep it light and anti-inflammatory! 🌱 The Golden Milk Latte made with coconut/oat milk, ginger, and turmeric is fantastic.";
        recId = 'gld';
      } else {
        aiText =
          "That sounds lovely! If you're unsure, I always recommend our signature Pistachio Rose Latte. It's a gorgeous aromatic blend of nuttiness and rosewater.";
        recId = 'pst';
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiText, recommendationId: recId },
      ]);
    }, 700);
  };

  // Add recommended item from chat directly
  const handleAddRecommended = (id: string) => {
    const item = MENU_ITEMS.find((x) => x.id === id);
    if (item) {
      handleOpenCustomizer(item);
    }
  };

  // Music Player logic
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % MUSIC_TRACKS.length);
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Header cartItemCount={cartItemCount} onCartOpen={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* Main Grid Content */}
      <main className="content-layout">
        {/* Menu Section */}
        <MenuSection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onOpenCustomizer={handleOpenCustomizer}
          menuItems={MENU_ITEMS}
        />

        {/* Sidebar / Coffee Hub */}
        <aside className="coffee-hub">
          {/* Lo-Fi Music Player */}
          <MusicPlayer
            isPlaying={isPlaying}
            currentTrackIndex={currentTrackIndex}
            tracks={MUSIC_TRACKS}
            onPlayPause={handlePlayPause}
            onNext={handleNextTrack}
          />

          {/* Barista AI Assistant */}
          <AiBarista
            messages={chatMessages}
            chatEndRef={chatEndRef}
            inputValue={chatInput}
            onInputChange={setChatInput}
            onSendMessage={handleSendMessage}
            onAddRecommendation={handleAddRecommended}
          />

          {/* Location & Contact Info */}
          <StoreInfo />
        </aside>
      </main>

      {/* Customizer Modal */}
      <CustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onConfirm={handleConfirmCustomization}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        discountPercent={discountPercent}
        couponCode={couponCode}
        couponError={couponError}
        onCouponCodeChange={setCouponCode}
        onApplyCoupon={handleApplyCoupon}
        onCheckout={handleCheckout}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Checkout Success Screen Modal */}
      <CheckoutSuccess orderId={checkoutOrderId} isOpen={checkoutSuccess} onClose={() => setCheckoutSuccess(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
