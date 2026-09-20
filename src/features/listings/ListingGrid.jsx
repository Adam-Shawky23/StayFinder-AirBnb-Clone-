import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import ListingCard from './ListingCard';

const GRID_COLS = {
  default: 'sm:grid-cols-2 lg:grid-cols-4',
  compact: 'sm:grid-cols-2 xl:grid-cols-3',
};

export default function ListingGrid({
  listings,
  status,
  error,
  onRetry,
  emptyTitle = 'No listings found',
  emptyDescription = 'Try adjusting your search or filters.',
  variant = 'default',
  highlightedId,
  onHoverListing,
}) {
  const colsClass = GRID_COLS[variant] || GRID_COLS.default;

  if (status === 'loading') {
    return (
      <div className={`grid grid-cols-1 gap-6 ${colsClass}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[4/3] w-full" data-testid="listing-skeleton" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <Skeleton className="mt-1 h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (status === 'success' && listings.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={`grid animate-fade-in grid-cols-1 gap-6 ${colsClass}`}>
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          highlighted={highlightedId === listing.id}
          onMouseEnter={onHoverListing ? () => onHoverListing(listing.id) : undefined}
          onMouseLeave={onHoverListing ? () => onHoverListing(null) : undefined}
        />
      ))}
    </div>
  );
}
