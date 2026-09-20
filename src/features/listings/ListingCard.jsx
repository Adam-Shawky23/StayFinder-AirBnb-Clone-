import { Link } from 'react-router-dom';
import Rating from '../../components/ui/Rating';
import WishlistButton from '../wishlist/WishlistButton';

export default function ListingCard({ listing, highlighted = false, onMouseEnter, onMouseLeave }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100 shadow-soft ring-2 transition-all duration-200 ${
          highlighted ? 'ring-brand-400' : 'ring-transparent'
        }`}
      >
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <WishlistButton listing={listing} />
        </div>
      </div>
      <div className="mt-2.5">
        <p className="text-sm text-stone-500">{listing.location.city}, {listing.location.country}</p>
        <h3 className="truncate font-medium text-stone-900">{listing.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <Rating value={listing.rating} reviewCount={listing.reviewCount} />
          <p className="font-semibold">${listing.pricePerNight} <span className="font-normal text-stone-500">/ night</span></p>
        </div>
      </div>
    </Link>
  );
}
