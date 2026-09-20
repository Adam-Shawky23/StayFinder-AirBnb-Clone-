import { Link } from 'react-router-dom';
import Button from './Button';

export default function NotFoundState({
  code = '404',
  title,
  description,
  primaryAction = { label: 'Go home', to: '/' },
  secondaryAction = { label: 'Browse stays', to: '/search' },
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="animate-fade-slide-up text-6xl font-extrabold tracking-tight text-brand-500 sm:text-7xl">
        {code}
      </p>
      <h1 className="mt-4 animate-fade-slide-up text-2xl font-extrabold tracking-tight text-stone-900 [animation-delay:100ms] sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md animate-fade-slide-up text-stone-600 [animation-delay:200ms]">
        {description}
      </p>
      <div className="mt-8 flex animate-fade-slide-up flex-col gap-3 sm:flex-row [animation-delay:300ms]">
        <Link to={primaryAction.to}>
          <Button className="w-full sm:w-auto">{primaryAction.label}</Button>
        </Link>
        {secondaryAction && (
          <Link to={secondaryAction.to}>
            <Button variant="secondary" className="w-full sm:w-auto">{secondaryAction.label}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
