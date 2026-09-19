import { useListings } from '../features/listings/useListings';
import ListingGrid from '../features/listings/ListingGrid';

export default function HomePage() {
  const { listings, status, error } = useListings();

  return (
    <div>
      <div className="border-b border-gray-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">Find your next stay</h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Search homes, cabins, and apartments around the world.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ListingGrid listings={listings} status={status} error={error} />
      </div>
    </div>
  );
}
