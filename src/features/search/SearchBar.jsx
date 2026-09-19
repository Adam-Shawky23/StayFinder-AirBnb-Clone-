import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';

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
      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:gap-4"
    >
      <label className="flex-1 text-sm">
        <span className="block text-gray-500">Where</span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search destinations"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </label>
      <label className="text-sm">
        <span className="block text-gray-500">Check in</span>
        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 rounded-md border border-gray-300 px-3 py-2" />
      </label>
      <label className="text-sm">
        <span className="block text-gray-500">Check out</span>
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 rounded-md border border-gray-300 px-3 py-2" />
      </label>
      <label className="text-sm">
        <span className="block text-gray-500">Guests</span>
        <input
          type="number" min="1" value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="mt-1 w-20 rounded-md border border-gray-300 px-3 py-2"
        />
      </label>
      <Button type="submit">Search</Button>
    </form>
  );
}
