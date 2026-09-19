import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import * as wishlistApi from './wishlistApi';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const toggledRef = useRef(false);

  useEffect(() => {
    toggledRef.current = false;
    if (!user) {
      setListings([]);
      return;
    }
    wishlistApi.getWishlist(user.id)
      .then((data) => {
        if (!toggledRef.current) setListings(data);
      })
      .catch(() => {
        if (!toggledRef.current) setListings([]);
      });
  }, [user]);

  const listingIds = listings.map((l) => l.id);

  function isWishlisted(id) {
    return listingIds.includes(id);
  }

  async function toggle(listing) {
    if (!user) return;
    toggledRef.current = true;
    if (isWishlisted(listing.id)) {
      setListings((prev) => prev.filter((l) => l.id !== listing.id));
      await wishlistApi.removeFromWishlist(user.id, listing.id);
    } else {
      setListings((prev) => [...prev, listing]);
      await wishlistApi.addToWishlist(user.id, listing.id);
    }
  }

  return (
    <WishlistContext.Provider value={{ listings, listingIds, isWishlisted, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
