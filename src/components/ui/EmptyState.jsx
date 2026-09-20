export default function EmptyState({ title, description }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-stone-500">{description}</p>}
    </div>
  );
}
