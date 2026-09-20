import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="text-stone-300">/</span>}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="max-w-[12rem] truncate rounded-full text-stone-500 transition-colors hover:text-brand-600 sm:max-w-[16rem]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="max-w-[12rem] truncate font-medium text-stone-700 sm:max-w-[16rem]"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
