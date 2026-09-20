import { useState } from 'react';

export default function ListingGallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-stone-100 shadow-soft">
        <img src={images[active]} alt={title} className="h-full w-full object-cover transition-opacity duration-300" />
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${i === active ? 'border-brand-500' : 'border-transparent hover:border-stone-300'}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
