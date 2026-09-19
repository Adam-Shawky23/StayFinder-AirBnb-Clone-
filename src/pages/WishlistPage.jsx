import { useWishlist } from '../features/wishlist/WishlistContext';
import ListingGrid from '../features/listings/ListingGrid';

export default function WishlistPage() {
  const { listings } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold">Your wishlist</h1>
      <div className="mt-6">
        <ListingGrid listings={listings} status="success" error={null} />
      </div>
    </div>
  );
}
