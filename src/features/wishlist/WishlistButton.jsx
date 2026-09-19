import { useAuth } from '../auth/AuthContext';
import { useWishlist } from './WishlistContext';

export default function WishlistButton({ listing }) {
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();

  if (!user) return null;

  const active = isWishlisted(listing.id);

  return (
    <button
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(listing);
      }}
      className={`rounded-full bg-white/90 p-2 shadow ${active ? 'text-brand-500' : 'text-gray-500'}`}
    >
      {active ? '♥' : '♡'}
    </button>
  );
}
