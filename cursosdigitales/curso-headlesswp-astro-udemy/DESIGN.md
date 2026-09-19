# DESIGN.md — CoffeeShop

Dark, glass-morphism coffee-shop UI built with Vite + React 19 + TypeScript.
Theme: warm coffee amber on deep charcoal. Two-page auth flow (Firebase) guards a
single interactive home surface (menu, cart, Aura the Barista AI chatbot, ambient
lo-fi player).

## 1. Brand

- **Name / app**: `CoffeeShop`
- **Tagline**: "A Space for Coffee & Craft"
- **Barista AI persona**: "Aura" (assistant name; kept as a persona, not a brand token)
- **Promo code**: `COFFEE10` (10% off)
- **Tone**: warm, artisanal, friendly. Microcopy is Spanish (`Iniciar Sesión`,
  `Crear Cuenta`) while `index.html` is `lang="en"` — known mismatch, see §8.
- **Asset**: hero photo `public/coffee_shop_hero.png`.

## 2. Visual language

### Color palette (HSL) — defined in `src/index.css` `:root`
| Token | Value | Use |
|---|---|---|
| `--primary` | `hsl(34, 44%, 60%)` | primary amber (buttons, accents) |
| `--primary-hover` | `hsl(34, 44%, 50%)` | hover |
| `--primary-glow` | `hsla(34,44%,60%,.35)` | glow |
| `--bg-page` | `hsl(15, 20%, 5%)` | page background |
| `--bg-glass` | `hsla(15,15%,10%,.75)` | glass panels |
| `--bg-panel` | `hsl(15, 15%, 8%)` | drawer/panel surfaces |
| `--text-primary` | `hsl(30,30%,96%)` | body text |
| `--text-secondary` | `hsl(30,15%,70%)` | secondary text |
| `--border-color` | `hsla(34,20%,20%,.6)` | borders |
| `--success` | `hsl(142,70%,45%)` | success (checkout) |
| `--danger` | `hsl(354,70%,54%)` | errors |

### Gradients / textures
- Page: radial gradients at opposite corners (`--bg-page` tinted).
- Hero image: `opacity:.35` + `saturate(.8) contrast(1.1) brightness(.8)`; text sits
  over a radial-to-bottom overlay (`--bg-page`). New: `text-shadow` on `.hero-title`.
- Glass: `.glass-panel` = `backdrop-filter: blur(12px)` + border + `--shadow-lg`.

### Typography
- **Sans**: `Inter` (300/400/500/600/700) — body, UI, forms.
- **Serif**: `Playfair Display` (`--font-serif`) — titles (`logo-text`, `card-title`,
  `cart-title`, `modal-title`, `footer-brand`).
- Utility classes: `.font-serif`, `.text-gold` (=`color:var(--primary)`).

### Spacing
Rem scale anchored on `0.25rem` increments (0.25/0.5/0.75/1/1.25/1.5/2/...).
Grids use `gap` and `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
for menu cards.

## 3. Layout

- `.app-container`: flex column, min-height 100vh, page background + corner radials.
- `main.content-layout`: two-column grid `1fr 340px`, max 1400px, centered; on
  `<1024px` collapses to one column.
- Right rail `.coffee-hub` (was `.vibe-hub`): `position: sticky; top:90px; height:fit-content`.
- Overlays/modals use `position: fixed; inset:0` with `z-index` layering
  (`cart-drawer-overlay` 1000, `modal-overlay` 2000).
- `.cart-drawer`: slide-in from right (`slideInRight`), full height, 420px wide (100%
  on `<480px`).
- Auth pages: `.auth-page` centers a `.auth-card` (glass) in the viewport.

## 4. Motion (keyframes, defined in `src/index.css`)
| Animation | What |
|---|---|
| `fadeInUp` | hero content, modal entrance |
| `pulse-glow` | live/active indicators (`.pulse-indicator.playing`, success icon) |
| `slideInRight` | cart drawer |
| `wave` | lo-fi visualizer bars (7 bars, staggered `animation-delay`) |
| `fadeIn` | modal/cart overlays (added to fix missing keyframe) |

## 5. Component catalog (states & variants)
- **Buttons**: `category-btn` (toggle: `.active` = primary fill), `cart-toggle-btn`
  (pill, hover lift), `add-to-cart-btn` (primary, `+icon`), `option-select-card`
  (`.selected`), `control-btn`/`play-btn` (circular), `checkout-btn`,
  `success-action-btn`, `auth-submit`.
- **Cards**: `.menu-card` (hover: `translateY(-6px)` + glow), `.glass-panel` surface.
- **Form inputs**: `.auth-input` (focus ring `var(--primary)`), `.coupon-input`.
- **Chat**: `.chat-bubble.ai` (surface) vs `.chat-bubble.user` (primary fill),
  `.chat-rec-btn` recommendation CTA.
- **Customizer modal**: option groups with `.selected` highlight + price deltas.
- **Cart summary**: `.summary-row` (+`.total`), `.summary-discount` color via inline.

## 6. Component architecture & data flow

```
src/
├── main.tsx            # createRoot -> <App />; imports index.css
├── App.tsx             # BrowserRouter + AuthProvider; routes /signin /signup /*
├── AppContent.tsx      # STATE SHELL: owns all UI state + handlers; composes components
├── App.css             # component styles + design-system classes (global)
├── index.css           # tokens, base, keyframes
├── lib/firebase.ts     # initializeApp(getApps guard) + getAuth
├── contexts/AuthContext.tsx  # onAuthStateChanged -> signIn/signUp/signOut/resetPassword
├── data/menu.ts        # MENU_ITEMS, MUSIC_TRACKS
├── types.ts            # MenuItem, CartItem, Message, Customization, MusicTrack
├── pages/
│   ├── SignIn.tsx      # /signin  (AuthContext.signIn; full-reload redirect to "/")
│   └── SignUp.tsx      # /signup  (AuthContext.signUp; password >=6, match check)
└── components/
    ├── layout/    Header  Hero  Footer
    ├── menu/      MenuSection  MenuItemCard
    ├── cart/      CartDrawer  CartItemRow  CartSummary
    ├── customizer/ CustomizerModal
    ├── chat/      AiBarista  ChatBubble
    ├── music/     MusicPlayer
    ├── location/  StoreInfo
    └── checkout/  CheckoutSuccess
```

- **Routing**: `react-router-dom` v7. `/signin` & `/signup` are auth flows; `/*` is the
  shop UI (AppContent). AuthProvider wraps all routes.
- **State ownership**: `AppContent` is the single source of truth for cart,
  customizations, checkout, chat, and music-player state. All child components are
  presentational/props-driven (no extra context — keeps behavior identical and
  avoids over-engineering for a single view). Auth state lives in `AuthContext`.
- **Data**: menu/music are static arrays in `data/menu.ts`. No backend product
  data; cart/checkout are client-only (checkout just clears the cart + shows a
  success toast with a random order id).
- **Firebase**: only used for auth (email/password). Config read from
  `import.meta.env.VITE_FIREBASE_*`.

## 7. Key user flows
1. **Order**: menu card → "Customize" → modal (size/milk/sweetness) → confirm →
   cart drawer. Pastries skip the modal (added directly). `cartId` keys items by
   customization so duplicates stack.
2. **Checkout**: cart → "COFFEE10" promo → "Place Order" → success modal → clear.
3. **Chat**: type message → Aura replies after 700ms; recommended items expose a
   "Configure Recommendation" button that opens the customizer.
4. **Auth**: `/signin`↔`/signup` links; on success `window.location.href='/'`
   (full reload).

## 8. Known limitations & future work
- **No route guarding**: `AuthProvider` exposes `user` but nothing protects `/*`;
  the shop UI loads at `/` unauthenticated. Add an auth-redirect wrapper if
  gated access is desired.
- **Spanish/English mix**: UI text is Spanish but `index.html` is `lang="en"`.
  Decide on one locale (or add i18n) before launch.
- **Lo-fi player is UI-only**: play/pause toggles the visualizer animation; there is
  no `<audio>` element and tracks do not actually play. (Out of scope for this pass.)
- **Cart/checkout is mock**: `handleCheckout` clears state + shows success; no
  real payment/order persistence.
- **Hero asset**: `coffee_shop_hero.png` (~935 KB). Convert to WebP with a
  `<picture type="image/webp">` fallback to cut payload.
- **CSS**: a few inline styles remain (e.g., discount-row color); candidates for
  full extraction into token classes.
- **Linting**: `bun run lint` is currently non-functional (typescript-eslint@8.x
  does not support `typescript@7`); use `bun run build` (`tsc -b`) as the type gate.
