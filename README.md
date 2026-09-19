# Stayfinder

A responsive, Airbnb-style stay-booking app built with React — a portfolio project demonstrating
frontend architecture, mock API integration, and end-to-end user flows without a real backend.

**[Live demo](#)** — replace with your deployed Netlify URL.

## Features

- Search and filter listings by location, guest count, price range, property type, and amenities
- Listing detail pages with an image gallery, host info, reviews, and an interactive map (Leaflet)
- Mock authentication (sign up / log in), persisted per browser
- Wishlist saving, persisted per account
- Full booking flow: date range selection with availability blocking, live price breakdown, and a trips history page

## Tech stack

React 19 · Vite · React Router · Tailwind CSS · Mock Service Worker (MSW) · Leaflet · react-day-picker · Vitest · React Testing Library

## Why a mocked backend?

There's no real server here on purpose. [MSW](https://mswjs.io/) intercepts network requests directly
in the browser — including in the production build — so the app behaves exactly like it's talking to a
real REST API (real `fetch` calls, loading states, error handling) while deploying as a single static
site. Data (users, wishlists, bookings) persists in the browser's `localStorage`, scoped per visitor.

## Running locally

```bash
npm install
npm run dev
```

Log in with the seeded demo account: `demo@stayfinder.com` / `password123`, or sign up as a new user.

## Testing

```bash
npm test
```

## Project structure

Feature-folder layout under `src/features/` (listings, search, auth, wishlist, booking, reviews, map),
shared UI primitives under `src/components/ui/`, and the mock API layer under `src/mocks/`.
