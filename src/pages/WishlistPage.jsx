import { useWishlist } from '../features/wishlist/WishlistContext';
import ListingGrid from '../features/listings/ListingGrid';

export default function WishlistPage() {
  const { listings, status } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-bold">Your wishlist</h1>
      <div className="mt-6">
        <ListingGrid
          listings={listings}
          status={status}
          error={null}
          emptyTitle="No saved stays yet"
          emptyDescription="Tap the heart on a listing to save it here."
        />
      </div>
    </div>
  );
}
