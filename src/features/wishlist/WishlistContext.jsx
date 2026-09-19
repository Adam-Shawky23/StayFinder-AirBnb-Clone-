import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import * as wishlistApi from './wishlistApi';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [status, setStatus] = useState('idle');
  const versionRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const versionAtStart = versionRef.current;
    if (!user) {
      setListings([]);
      setStatus('idle');
      return;
    }
    setStatus('loading');
    wishlistApi.getWishlist(user.id)
      .then((data) => {
        if (!cancelled && versionRef.current === versionAtStart) {
          setListings(data);
          setStatus('success');
        }
      })
      .catch(() => {
        if (!cancelled && versionRef.current === versionAtStart) {
          setListings([]);
          setStatus('error');
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const listingIds = listings.map((l) => l.id);

  function isWishlisted(id) {
    return listingIds.includes(id);
  }

  async function toggle(listing) {
    if (!user) return;
    versionRef.current += 1;
    const wasWishlisted = isWishlisted(listing.id);
    if (wasWishlisted) {
      setListings((prev) => prev.filter((l) => l.id !== listing.id));
    } else {
      setListings((prev) => [...prev, listing]);
    }
    try {
      if (wasWishlisted) {
        await wishlistApi.removeFromWishlist(user.id, listing.id);
      } else {
        await wishlistApi.addToWishlist(user.id, listing.id);
      }
    } catch {
      // roll back the optimistic update on failure
      if (wasWishlisted) {
        setListings((prev) => [...prev, listing]);
      } else {
        setListings((prev) => prev.filter((l) => l.id !== listing.id));
      }
    }
  }

  return (
    <WishlistContext.Provider value={{ listings, listingIds, status, isWishlisted, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
