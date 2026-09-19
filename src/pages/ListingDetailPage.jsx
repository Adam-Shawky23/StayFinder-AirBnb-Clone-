import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListing } from '../features/listings/listingsApi';
import ListingGallery from '../features/listings/ListingGallery';
import Rating from '../components/ui/Rating';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import Button from '../components/ui/Button';
import ReviewList from '../features/reviews/ReviewList';
import ListingMap from '../features/map/ListingMap';
import WishlistButton from '../features/wishlist/WishlistButton';
import BookingModal from '../features/booking/BookingModal';
import { useAuth } from '../features/auth/AuthContext';

export default function ListingDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [state, setState] = useState({ status: 'loading', listing: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', listing: null, error: null });
    getListing(id)
      .then((listing) => {
        if (cancelled) return;
        if (!listing) setState({ status: 'not-found', listing: null, error: null });
        else setState({ status: 'success', listing, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', listing: null, error: err.message });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state.status === 'loading') {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Skeleton className="aspect-[16/9] w-full" />
        <Skeleton className="mt-4 h-8 w-1/2" />
        <Skeleton className="mt-2 h-4 w-1/3" />
      </div>
    );
  }

  if (state.status === 'not-found') {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-gray-600">Listing not found.</div>;
  }

  if (state.status === 'error') {
    return <ErrorState message={state.error} />;
  }

  const { listing } = state;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">{listing.title}</h1>
      <p className="mt-1 text-gray-500">{listing.location.city}, {listing.location.country}</p>

      <div className="mt-4">
        <ListingGallery images={listing.images} title={listing.title} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-center gap-3">
            <Avatar src={listing.host.avatar} alt={listing.host.name} />
            <div>
              <p className="font-medium">Hosted by {listing.host.name}</p>
              <p className="text-sm text-gray-500">Joined in {listing.host.joinedYear}</p>
            </div>
          </div>

          <p className="mt-6 text-gray-700">{listing.description}</p>

          <Rating value={listing.rating} reviewCount={listing.reviewCount} />

          <div className="mt-6">
            <h2 className="font-semibold">Amenities</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {listing.amenities.map((a) => <Badge key={a}>{a}</Badge>)}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 font-semibold">Reviews</h2>
            <ReviewList listingId={listing.id} />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 font-semibold">Where you'll be</h2>
            <ListingMap lat={listing.location.lat} lng={listing.location.lng} title={listing.title} />
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">${listing.pricePerNight} <span className="text-sm font-normal text-gray-500">/ night</span></p>
            <WishlistButton listing={listing} />
          </div>
          <p className="mt-1 text-sm text-gray-500">Up to {listing.maxGuests} guests</p>
          {user ? (
            <Button onClick={() => setBookingOpen(true)} className="mt-4 w-full">Reserve</Button>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              <Link to="/login" className="text-brand-600">Log in</Link> to book this stay.
            </p>
          )}
          <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} listing={listing} />
        </aside>
      </div>
    </div>
  );
}
