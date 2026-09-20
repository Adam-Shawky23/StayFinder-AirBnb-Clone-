import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-30 flex h-11 w-11 animate-fade-in items-center justify-center rounded-full bg-white text-stone-600 shadow-lifted ring-1 ring-stone-200 transition-all hover:-translate-y-0.5 hover:text-brand-600"
    >
      ↑
    </button>
  );
}
