import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';

function priceIcon(price, active) {
  const base = 'rounded-full border px-2.5 py-1 text-xs font-semibold shadow whitespace-nowrap transition-colors';
  const tone = active
    ? 'bg-brand-500 border-brand-500 text-white'
    : 'bg-white border-stone-200 text-stone-900';
  return L.divIcon({
    className: '',
    html: `<div class="${base} ${tone}">$${price}</div>`,
    iconSize: null,
    iconAnchor: [24, 14],
  });
}

function FitBounds({ listings }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.location.lat, l.location.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
  }, [map, listings]);

  return null;
}

export default function SearchResultsMap({ listings, hoveredId, onHoverListing }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds listings={listings} />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.location.lat, listing.location.lng]}
          icon={priceIcon(listing.pricePerNight, hoveredId === listing.id)}
          eventHandlers={{
            mouseover: () => onHoverListing?.(listing.id),
            mouseout: () => onHoverListing?.(null),
            click: () => onHoverListing?.(listing.id),
          }}
        >
          <Popup>
            <Link to={`/listing/${listing.id}`} className="font-medium text-brand-600 hover:underline">
              {listing.title}
            </Link>
            <div className="text-sm text-stone-600">${listing.pricePerNight} / night</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
