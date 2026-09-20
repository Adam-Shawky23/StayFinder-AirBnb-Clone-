export default function Rating({ value, reviewCount }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-stone-700">
      <span aria-hidden="true">★</span>
      <span>{value}</span>
      {typeof reviewCount === 'number' && <span className="text-stone-500">· {reviewCount} reviews</span>}
    </span>
  );
}
