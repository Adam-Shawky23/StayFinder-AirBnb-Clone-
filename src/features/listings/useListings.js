import { useEffect, useState } from 'react';
import { getListings } from './listingsApi';

export function useListings(params = {}) {
  const [state, setState] = useState({ listings: [], status: 'idle', error: null });
  const key = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, status: 'loading', error: null }));
    getListings(params)
      .then((listings) => {
        if (!cancelled) setState({ listings, status: 'success', error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ listings: [], status: 'error', error: err.message });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
