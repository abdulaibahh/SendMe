import { useMemo } from 'react';

import { MARKET_CATEGORIES, MARKET_PRODUCTS } from '../core/constants/market';

export function useCatalog(searchTerm = '') {
  return useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return {
      categories: MARKET_CATEGORIES,
      products: normalized
        ? MARKET_PRODUCTS.filter((product) => product.name.toLowerCase().includes(normalized))
        : MARKET_PRODUCTS,
    };
  }, [searchTerm]);
}
