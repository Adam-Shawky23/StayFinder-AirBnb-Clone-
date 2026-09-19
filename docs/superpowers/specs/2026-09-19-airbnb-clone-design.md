# Stayfinder — Airbnb-style Clone: Design Spec

Date: 2026-09-19
Status: Approved for planning

## 1. Purpose & Success Criteria

A polished, responsive, portfolio-ready clone of Airbnb's core booking
experience, built with React. It should:

- Look professional and production-quality, not tutorial-grade.
- Work cleanly on mobile, tablet, and desktop.
- Demonstrate real frontend engineering skill: routing, async data
  fetching with loading/error states, forms, state management,
  client-side auth flow, and a booking flow with real calculations.
- Deploy to a public URL (Netlify) suitable for linking from a
  portfolio site.
- Avoid using Airbnb's actual name/logo/trademark — ships under an
  original brand, "Stayfinder," that is clearly an Airbnb-style clone
  in UX/visual language.

Out of scope: real backend/database, real payments, real user
accounts across sessions/devices, admin/host-side listing management,
messaging between guests and hosts, internationalization.

## 2. Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Build tool | Vite | Fast dev server, minimal config |
| UI library | React 18 | Requested |
| Language | JavaScript | Per requirements |
| Routing | React Router v6 | Standard for SPA routing |
| Styling | Tailwind CSS | Fast, consistent, responsive-first |
| Mock API | MSW (Mock Service Worker) | Intercepts `fetch` in-browser; real async/loading/error code with zero server to deploy |
| Map | Leaflet + react-leaflet (OpenStreetMap tiles) | Free, no API key, professional look |
| Date picker | react-day-picker | Lightweight, accessible range picker |
| State | React Context + custom hooks | App is small enough that Redux/Zustand would be over-engineering |
| Persistence | localStorage | Survives refresh for wishlist + mock session |
| Testing | Vitest + React Testing Library | Fast, Vite-native |
| Deployment | Netlify | Static hosting, zero-config for Vite apps |

## 3. Branding

Product name: **Stayfinder**. Original logo/wordmark, own color
palette inspired by (but not copying) Airbnb's — warm accent color,
clean neutral backgrounds, rounded cards. No use of Airbnb's name,
logo, or trademarked assets anywhere in code, copy, or mock data.

## 4. Routes

| Path | Purpose | Auth required |
|---|---|---|
| `/` | Home: hero search bar + grid of listings | No |
| `/search` | Filtered results grid (query params: location, checkIn, checkOut, guests, price range, type, amenities) | No |
| `/listing/:id` | Listing detail: gallery, description, amenities, host, map, reviews, booking widget | No |
| `/login` | Mock login form | No |
| `/signup` | Mock signup form | No |
| `/wishlist` | Saved listings | Yes |
| `/trips` | Mock "your bookings" | Yes |
| `*` | 404 | No |

Booking confirmation is a modal/step flow launched from
`/listing/:id`, not a separate route, to keep the flow contextual.

## 5. Data Model (mock, served by MSW)

```
Listing {
  id, title, description, images: string[],
  location: { city, country, lat, lng },
  pricePerNight, rating, reviewCount,
  host: { name, avatar, joinedYear },
  amenities: string[], propertyType, maxGuests
}

Review {
  id, listingId, author, rating, comment, date
}

User (mock) {
  id, name, email, avatar
}

Booking (mock) {
  id, listingId, userId, checkIn, checkOut, guests, totalPrice
}
```

Seed data: ~24-36 hand-curated listings across several cities, with
free-to-use stock images (Unsplash), realistic descriptions, and 3-6
reviews each. Enough variety to make search/filter meaningful without
needing hundreds of entries.

### Mock API endpoints (MSW handlers)

- `GET /api/listings` — supports query params for search/filter
- `GET /api/listings/:id`
- `GET /api/listings/:id/reviews`
- `POST /api/auth/login`, `POST /api/auth/signup` — validate against
  mock user store, return a fake token
- `GET /api/bookings?userId=` , `POST /api/bookings`
- `GET /api/wishlist?userId=`, `POST /api/wishlist`, `DELETE /api/wishlist/:id`

All handlers simulate realistic network latency (e.g. 300-800ms) so
loading states are visibly exercised.

## 6. Core Flows

**Search/filter** — `/search` reads/writes URL query params so
results are shareable and back-button-safe. Filtering happens against
the MSW-served dataset. Sidebar filters: price range, property type,
amenities; debounced text/location input.

**Auth (mock)** — `AuthContext` holds `{ user, token }`, backed by
localStorage. Login/signup call the mock endpoints; a fake token is
stored and attached to subsequent mock requests. `/wishlist` and
`/trips` redirect to `/login` when logged out.

**Booking** — On `/listing/:id`, a date-range picker blocks dates
already present in that listing's mock bookings. Price breakdown =
nights × pricePerNight + fixed service fee, computed live as dates
change. "Reserve" posts to the mock `/bookings` endpoint and shows a
success confirmation screen with a summary.

**Wishlist** — Heart icon on listing cards and the detail page toggles
membership in `WishlistContext`, persisted to localStorage and
reflected instantly across the UI (grid, detail, `/wishlist` page).

## 7. Component Architecture

Feature-folder structure:

```
src/
  features/
    listings/    (ListingCard, ListingGrid, ListingGallery, ListingDetail, api)
    search/      (SearchBar, FilterSidebar, useSearchParamsState, api)
    auth/        (LoginForm, SignupForm, AuthContext, api)
    booking/     (DateRangePicker, PriceBreakdown, BookingModal, api)
    wishlist/    (WishlistButton, WishlistContext, WishlistPage)
  components/ui/ (Button, Modal, Rating, Skeleton, Avatar, Badge)
  mocks/         (browser.js, handlers.js, seedData.js)
  layouts/       (RootLayout with nav/footer)
  pages/         (thin route components composing features)
  App.jsx, main.jsx
```

Each feature folder owns its components, hooks, and API calls;
`components/ui` holds only generic, feature-agnostic primitives.

## 8. Responsiveness & Visual Polish

- Mobile-first Tailwind layout: listing grid collapses 4 → 2 → 1
  columns by breakpoint; filter sidebar becomes a slide-over/modal on
  mobile.
- Sticky, condensing search bar on scroll (Airbnb-signature detail).
- Skeleton loaders while MSW "fetches" data; explicit empty states
  (no results) and error states (failed mock request).
- Subtle hover/transition states on cards and buttons; image gallery
  with a lightbox/carousel on the detail page.
- Accessible color contrast and focus states throughout.

## 9. Testing

Vitest + React Testing Library covering:
- Search/filter logic (pure functions over the mock dataset)
- Price breakdown calculation
- Wishlist toggle behavior (Context + localStorage)
- One integration test: search → detail → booking happy path

Not aiming for full coverage — enough to demonstrate testing
discipline.

## 10. Deployment

Vite production build deployed to Netlify. Since MSW handles all data
client-side, no server/build-time API config is needed — the same
static bundle works in production as in dev. `netlify.toml` configures
SPA redirect (`/*` → `/index.html`) so client-side routes work on
refresh/direct link.

## 11. Explicit Non-Goals

- No real backend, database, or payments.
- No cross-device persistence (data lives in the browser only).
- No host/admin-side listing management.
- No messaging/chat between users.
- No i18n/l10n.
