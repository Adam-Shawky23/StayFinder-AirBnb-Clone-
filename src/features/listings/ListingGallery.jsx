import { useState } from 'react';

export default function ListingGallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
        <img src={images[active]} alt={title} className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`h-16 w-24 overflow-hidden rounded-lg border-2 ${i === active ? 'border-brand-500' : 'border-transparent'}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
