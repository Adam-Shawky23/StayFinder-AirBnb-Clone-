import { useListings } from '../features/listings/useListings';
import ListingGrid from '../features/listings/ListingGrid';
import { useSearchParamsState } from '../features/search/useSearchParamsState';
import SearchBar from '../features/search/SearchBar';
import FilterSidebar from '../features/search/FilterSidebar';

export default function SearchPage() {
  const [filters, setFilters] = useSearchParamsState();
  const { listings, status, error } = useListings(filters);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SearchBar initialValues={filters} onSearch={setFilters} />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <ListingGrid listings={listings} status={status} error={error} />
      </div>
    </div>
  );
}
