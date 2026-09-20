import { useEffect, useState } from 'react';
import { useListings } from '../features/listings/useListings';
import ListingGrid from '../features/listings/ListingGrid';
import { useSearchParamsState } from '../features/search/useSearchParamsState';
import SearchBar from '../features/search/SearchBar';
import FilterSidebar from '../features/search/FilterSidebar';
import QuickFilterChips from '../features/search/QuickFilterChips';
import SearchResultsMap from '../features/map/SearchResultsMap';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Breadcrumbs from '../components/ui/Breadcrumbs';

export default function SearchPage() {
  const [filters, setFilters] = useSearchParamsState();
  const { listings, status, error } = useListings(filters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (!mapOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') setMapOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mapOpen]);

  function handleSearch(newFilters) {
    setFilters(newFilters, { replace: false });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />

      <SearchBar initialValues={filters} onSearch={handleSearch} />

      <div className="mt-6">
        <QuickFilterChips filters={filters} onChange={setFilters} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {status !== 'error' && (
          <p className="text-sm text-stone-500">
            {status === 'success' ? `${listings.length} ${listings.length === 1 ? 'stay' : 'stays'}` : 'Searching…'}
          </p>
        )}
        <div className="ml-auto flex gap-2">
          <Button type="button" variant="secondary" onClick={() => setFiltersOpen(true)}>
            More filters
          </Button>
          <Button type="button" variant="secondary" className="lg:hidden" onClick={() => setMapOpen(true)}>
            Map
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
        <ListingGrid
          listings={listings}
          status={status}
          error={error}
          variant="compact"
          highlightedId={hoveredId}
          onHoverListing={setHoveredId}
        />
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[calc(100vh-7rem)] overflow-hidden rounded-3xl shadow-soft">
            <SearchResultsMap listings={listings} hoveredId={hoveredId} onHoverListing={setHoveredId} />
          </div>
        </div>
      </div>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <FilterSidebar filters={filters} onChange={setFilters} />
        <Button type="button" className="mt-4 w-full" onClick={() => setFiltersOpen(false)}>
          Show results
        </Button>
      </Modal>

      {mapOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-stone-200 p-4">
            <p className="font-semibold">Map</p>
            <button
              type="button"
              aria-label="Close map"
              onClick={() => setMapOpen(false)}
              className="-m-2 rounded-full p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700"
            >
              ✕
            </button>
          </div>
          <div className="flex-1">
            <SearchResultsMap listings={listings} hoveredId={hoveredId} onHoverListing={setHoveredId} />
          </div>
        </div>
      )}
    </div>
  );
}
