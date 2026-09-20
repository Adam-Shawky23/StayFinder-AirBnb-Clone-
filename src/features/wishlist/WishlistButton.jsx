import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useWishlist } from './WishlistContext';
import { useToast } from '../toast/ToastContext';

export default function WishlistButton({ listing }) {
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();
  const { showToast } = useToast();
  const [popping, setPopping] = useState(false);

  if (!user) return null;

  const active = isWishlisted(listing.id);

  return (
    <button
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(listing);
        showToast(active ? 'Removed from wishlist' : 'Saved to wishlist');
        setPopping(true);
      }}
      onAnimationEnd={() => setPopping(false)}
      className={`rounded-full bg-white/90 p-2 text-lg shadow transition-colors hover:bg-white ${
        active ? 'text-brand-500' : 'text-stone-500'
      } ${popping ? 'animate-pop' : ''}`}
    >
      {active ? '♥' : '♡'}
    </button>
  );
}
