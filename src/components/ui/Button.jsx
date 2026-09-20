const VARIANTS = {
  primary: 'bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-lifted disabled:bg-stone-300 disabled:shadow-none',
  secondary: 'bg-white text-stone-900 border border-stone-300 hover:bg-stone-50',
  ghost: 'bg-transparent text-stone-700 hover:bg-stone-100',
};

export default function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:active:scale-100 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
