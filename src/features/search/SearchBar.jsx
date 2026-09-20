import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';

const FIELD_CLASS =
  'mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100';

export default function SearchBar({ initialValues, onSearch }) {
  const [location, setLocation] = useState(initialValues.location);
  const [checkIn, setCheckIn] = useState(initialValues.checkIn);
  const [checkOut, setCheckOut] = useState(initialValues.checkOut);
  const [guests, setGuests] = useState(initialValues.guests);

  useEffect(() => {
    setLocation(initialValues.location);
    setCheckIn(initialValues.checkIn);
    setCheckOut(initialValues.checkOut);
    setGuests(initialValues.guests);
  }, [initialValues.location, initialValues.checkIn, initialValues.checkOut, initialValues.guests]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ location, checkIn, checkOut, guests });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-soft sm:flex-row sm:items-end sm:gap-4"
    >
      <label className="flex-1 text-sm">
        <span className="block text-stone-500">Where</span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search destinations"
          className={FIELD_CLASS}
        />
      </label>
      <label className="text-sm">
        <span className="block text-stone-500">Check in</span>
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={FIELD_CLASS} />
      </label>
      <label className="text-sm">
        <span className="block text-stone-500">Check out</span>
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={FIELD_CLASS} />
      </label>
      <label className="text-sm">
        <span className="block text-stone-500">Guests</span>
        <input
          type="number" min="1" value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className={`${FIELD_CLASS} w-20`}
        />
      </label>
      <Button type="submit">Search</Button>
    </form>
  );
}
