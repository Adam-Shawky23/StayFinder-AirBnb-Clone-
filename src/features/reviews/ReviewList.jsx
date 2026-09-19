import { useEffect, useState } from 'react';
import { getReviews } from './reviewsApi';

export default function ReviewList({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getReviews(listingId)
      .then((data) => {
        if (!cancelled) {
          setReviews(data);
          setStatus('success');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [listingId]);

  if (status === 'loading') return <p className="text-sm text-gray-500">Loading reviews…</p>;
  if (status === 'error') return <p className="text-sm text-red-600">Couldn't load reviews.</p>;
  if (reviews.length === 0) return <p className="text-sm text-gray-500">No reviews yet.</p>;

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.author}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">★ {review.rating}</p>
          <p className="mt-1 text-gray-700">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
