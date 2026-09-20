import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import ScrollToTop from '../components/ScrollToTop';
import BackToTop from '../components/ui/BackToTop';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-600' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
  }`;

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-full flex-col">
      <ScrollToTop />
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-brand-500">
            stayfinder
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink to="/search" className={navLinkClass}>Explore</NavLink>
            <NavLink to="/wishlist" className={navLinkClass}>Wishlist</NavLink>
            <NavLink to="/trips" className={navLinkClass}>Trips</NavLink>
            {user ? (
              <button onClick={logout} className="rounded-full px-3 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900">
                Log out ({user.name})
              </button>
            ) : (
              <NavLink to="/login" className={navLinkClass}>Log in</NavLink>
            )}
          </nav>
          <button
            type="button"
            className="-m-3 flex h-11 w-11 flex-col items-center justify-center gap-1.5 p-3 sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`block h-0.5 w-6 bg-stone-800 transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-stone-800 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-stone-800 transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="flex animate-fade-slide-up flex-col gap-1 border-t border-stone-100 px-4 py-3 sm:hidden">
            <NavLink to="/search" className={navLinkClass} onClick={() => setMenuOpen(false)}>Explore</NavLink>
            <NavLink to="/wishlist" className={navLinkClass} onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
            <NavLink to="/trips" className={navLinkClass} onClick={() => setMenuOpen(false)}>Trips</NavLink>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="rounded-full px-3 py-1.5 text-left text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
              >
                Log out ({user.name})
              </button>
            ) : (
              <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>Log in</NavLink>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-500">
        Built as a portfolio project — not affiliated with Airbnb.
      </footer>

      <BackToTop />
    </div>
  );
}
