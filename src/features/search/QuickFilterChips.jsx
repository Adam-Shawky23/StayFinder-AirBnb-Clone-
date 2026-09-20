const AMENITY_CHIPS = ['Pool', 'Pet friendly', 'Wifi', 'Free parking'];
const PRICE_CHIPS = [
  { label: 'Under $100', maxPrice: '100' },
  { label: 'Under $200', maxPrice: '200' },
];

export default function QuickFilterChips({ filters, onChange }) {
  function toggleAmenity(amenity) {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ amenities: next });
  }

  function togglePrice(maxPrice) {
    onChange({ maxPrice: filters.maxPrice === maxPrice ? '' : maxPrice });
  }

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {AMENITY_CHIPS.map((amenity) => {
        const active = filters.amenities.includes(amenity);
        return (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            aria-pressed={active}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            {amenity}
          </button>
        );
      })}
      {PRICE_CHIPS.map(({ label, maxPrice }) => {
        const active = filters.maxPrice === maxPrice;
        return (
          <button
            key={label}
            type="button"
            onClick={() => togglePrice(maxPrice)}
            aria-pressed={active}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
