import { useEffect, useRef, useState } from 'react';

const PROPERTY_TYPES = ['Apartment', 'Entire home', 'Private room', 'Cabin', 'Villa'];
const AMENITIES = ['Wifi', 'Kitchen', 'Free parking', 'Air conditioning', 'Pool', 'Washer', 'Pet friendly', 'Workspace'];
const DEBOUNCE_MS = 300;

export default function FilterSidebar({ filters, onChange }) {
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const minTimeoutRef = useRef(null);
  const maxTimeoutRef = useRef(null);

  useEffect(() => setMinPrice(filters.minPrice), [filters.minPrice]);
  useEffect(() => setMaxPrice(filters.maxPrice), [filters.maxPrice]);

  useEffect(() => () => {
    clearTimeout(minTimeoutRef.current);
    clearTimeout(maxTimeoutRef.current);
  }, []);

  function handleMinPriceChange(e) {
    const value = e.target.value;
    setMinPrice(value);
    clearTimeout(minTimeoutRef.current);
    minTimeoutRef.current = setTimeout(() => onChange({ minPrice: value }), DEBOUNCE_MS);
  }

  function handleMaxPriceChange(e) {
    const value = e.target.value;
    setMaxPrice(value);
    clearTimeout(maxTimeoutRef.current);
    maxTimeoutRef.current = setTimeout(() => onChange({ maxPrice: value }), DEBOUNCE_MS);
  }

  function toggleAmenity(amenity) {
    const current = filters.amenities;
    const next = current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity];
    onChange({ amenities: next });
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 font-medium">Price per night</h4>
        <div className="flex items-center gap-2">
          <input
            type="number" placeholder="Min" value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
          <span>–</span>
          <input
            type="number" placeholder="Max" value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Property type</h4>
        <select
          value={filters.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
        >
          <option value="">Any</option>
          {PROPERTY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Amenities</h4>
        <div className="space-y-1">
          {AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
