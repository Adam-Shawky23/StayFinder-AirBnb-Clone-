export default function EmptyState({ title, description }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
