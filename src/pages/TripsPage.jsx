import { useEffect, useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { getUserBookings } from '../features/booking/bookingApi';
import BookingSummaryCard from '../features/booking/BookingSummaryCard';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

export default function TripsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!user) return;
    setStatus('loading');
    getUserBookings(user.id)
      .then((data) => {
        setBookings(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [user]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Your trips</h1>
      <div className="mt-6 space-y-4">
        {status === 'loading' && <Skeleton className="h-24 w-full" />}
        {status === 'success' && bookings.length === 0 && (
          <EmptyState title="No trips booked yet" description="Find a place and reserve your first stay." />
        )}
        {bookings.map((booking) => <BookingSummaryCard key={booking.id} booking={booking} />)}
      </div>
    </div>
  );
}
