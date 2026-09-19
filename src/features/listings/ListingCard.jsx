import { Link } from 'react-router-dom';
import Rating from '../../components/ui/Rating';

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{listing.location.city}, {listing.location.country}</p>
        <h3 className="truncate font-medium text-gray-900">{listing.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <Rating value={listing.rating} />
          <p className="font-semibold">${listing.pricePerNight} <span className="font-normal text-gray-500">/ night</span></p>
        </div>
      </div>
    </Link>
  );
}
