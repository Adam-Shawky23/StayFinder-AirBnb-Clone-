import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import DateRangePicker from './DateRangePicker';
import PriceBreakdown from './PriceBreakdown';
import BookingSummaryCard from './BookingSummaryCard';
import { getBookedRanges, createBooking } from './bookingApi';

function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

export default function BookingModal({ open, onClose, listing }) {
  const { user } = useAuth();
  const [bookedRanges, setBookedRanges] = useState([]);
  const [range, setRange] = useState();
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (!open) return;
    getBookedRanges(listing.id).then(setBookedRanges).catch(() => setBookedRanges([]));
  }, [open, listing.id]);

  const checkIn = range?.from ? toISODate(range.from) : '';
  const checkOut = range?.to ? toISODate(range.to) : '';
  const canReserve = checkIn && checkOut && guests >= 1 && guests <= listing.maxGuests;

  async function handleReserve() {
    setStatus('loading');
    setError(null);
    try {
      const booking = await createBooking({ listingId: listing.id, userId: user.id, checkIn, checkOut, guests });
      setConfirmedBooking(booking);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  function handleClose() {
    setRange(undefined);
    setGuests(1);
    setStatus('idle');
    setConfirmedBooking(null);
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title={status === 'success' ? 'Booking confirmed' : `Reserve ${listing.title}`}>
      {status === 'success' ? (
        <div className="space-y-4">
          <p className="text-gray-700">Your stay is booked. Details below.</p>
          <BookingSummaryCard booking={confirmedBooking} />
          <div className="flex gap-2">
            <Link to="/trips"><Button variant="secondary">View my trips</Button></Link>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <DateRangePicker bookedRanges={bookedRanges} value={range} onChange={setRange} />
          <label className="block text-sm">
            <span className="text-gray-600">Guests</span>
            <input
              type="number" min={1} max={listing.maxGuests} value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 w-20 rounded-md border border-gray-300 px-3 py-2"
            />
          </label>
          <PriceBreakdown pricePerNight={listing.pricePerNight} checkIn={checkIn} checkOut={checkOut} />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button onClick={handleReserve} disabled={!canReserve || status === 'loading'} className="w-full">
            {status === 'loading' ? 'Reserving…' : 'Reserve'}
          </Button>
        </div>
      )}
    </Modal>
  );
}
