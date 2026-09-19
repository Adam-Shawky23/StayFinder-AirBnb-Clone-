import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium ${isActive ? 'text-brand-600' : 'text-gray-600 hover:text-gray-900'}`;

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-brand-500">
            stayfinder
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <NavLink to="/search" className={navLinkClass}>Explore</NavLink>
            <NavLink to="/wishlist" className={navLinkClass}>Wishlist</NavLink>
            <NavLink to="/trips" className={navLinkClass}>Trips</NavLink>
            {user ? (
              <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Log out ({user.name})
              </button>
            ) : (
              <NavLink to="/login" className={navLinkClass}>Log in</NavLink>
            )}
          </nav>
          <button
            className="sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="block h-0.5 w-6 bg-gray-800 mb-1" />
            <span className="block h-0.5 w-6 bg-gray-800 mb-1" />
            <span className="block h-0.5 w-6 bg-gray-800" />
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:hidden">
            <NavLink to="/search" className={navLinkClass} onClick={() => setMenuOpen(false)}>Explore</NavLink>
            <NavLink to="/wishlist" className={navLinkClass} onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
            <NavLink to="/trips" className={navLinkClass} onClick={() => setMenuOpen(false)}>Trips</NavLink>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
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

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        Built as a portfolio project — not affiliated with Airbnb.
      </footer>
    </div>
  );
}
