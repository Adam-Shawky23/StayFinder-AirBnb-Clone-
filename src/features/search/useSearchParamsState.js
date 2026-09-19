import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export function useSearchParamsState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const amenities = searchParams.get('amenities');
    return {
      location: searchParams.get('location') || '',
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: searchParams.get('guests') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      propertyType: searchParams.get('propertyType') || '',
      amenities: amenities ? amenities.split(',') : [],
    };
  }, [searchParams]);

  function setFilters(partial, { replace = true } = {}) {
    const next = new URLSearchParams(searchParams);
    Object.entries(partial).forEach(([key, value]) => {
      const isEmpty = value === '' || value === undefined || (Array.isArray(value) && value.length === 0);
      if (isEmpty) {
        next.delete(key);
      } else {
        next.set(key, Array.isArray(value) ? value.join(',') : String(value));
      }
    });
    setSearchParams(next, { replace });
  }

  return [filters, setFilters];
}
