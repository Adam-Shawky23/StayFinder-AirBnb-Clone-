import { useNavigate } from 'react-router-dom';
import { useListings } from '../features/listings/useListings';
import ListingGrid from '../features/listings/ListingGrid';
import SearchBar from '../features/search/SearchBar';

export default function HomePage() {
  const { listings, status, error } = useListings();
  const navigate = useNavigate();

  function handleSearch(filters) {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined && v !== ''))
    );
    navigate(`/search${params.toString() ? `?${params}` : ''}`);
  }

  return (
    <div>
      <div className="border-b border-gray-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">Find your next stay</h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Search homes, cabins, and apartments around the world.
          </p>
          <div className="mx-auto mt-8 max-w-2xl text-left">
            <SearchBar initialValues={{ location: '', checkIn: '', checkOut: '', guests: '' }} onSearch={handleSearch} />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ListingGrid listings={listings} status={status} error={error} />
      </div>
    </div>
  );
}
