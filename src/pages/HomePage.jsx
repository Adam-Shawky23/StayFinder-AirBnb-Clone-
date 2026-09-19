import { useListings } from '../features/listings/useListings';
import ListingGrid from '../features/listings/ListingGrid';

export default function HomePage() {
  const { listings, status, error } = useListings();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Find your next stay</h1>
      <p className="mt-2 text-gray-600">Search homes, cabins, and apartments around the world.</p>
      <div className="mt-8">
        <ListingGrid listings={listings} status={status} error={error} />
      </div>
    </div>
  );
}
