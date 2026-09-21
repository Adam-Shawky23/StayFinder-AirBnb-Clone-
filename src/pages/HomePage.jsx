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
      <div className="border-b border-stone-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="animate-fade-slide-up text-3xl font-extrabold tracking-tight sm:text-5xl">
            Find your next stay
          </h1>
          <p className="mx-auto mt-3 max-w-xl animate-fade-slide-up text-stone-600 [animation-delay:100ms]">
            Search homes, cabins, and villas in more than a dozen cities around the world.
          </p>
          <div className="mx-auto mt-8 max-w-4xl animate-fade-slide-up text-left [animation-delay:200ms]">
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
