import { useState } from 'react';
import { useListings } from '../features/listings/useListings';
import ListingGrid from '../features/listings/ListingGrid';
import { useSearchParamsState } from '../features/search/useSearchParamsState';
import SearchBar from '../features/search/SearchBar';
import FilterSidebar from '../features/search/FilterSidebar';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function SearchPage() {
  const [filters, setFilters] = useSearchParamsState();
  const { listings, status, error } = useListings(filters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function handleSearch(newFilters) {
    setFilters(newFilters, { replace: false });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <SearchBar initialValues={filters} onSearch={handleSearch} />

      <div className="mt-8 md:hidden">
        <Button type="button" variant="secondary" onClick={() => setFiltersOpen(true)}>
          Filters
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 md:mt-8 md:grid-cols-[240px_1fr]">
        <div className="hidden md:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>
        <ListingGrid listings={listings} status={status} error={error} />
      </div>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <Button type="button" className="mt-4 w-full" onClick={() => setFiltersOpen(false)}>
          Show results
        </Button>
      </Modal>
    </div>
  );
}
