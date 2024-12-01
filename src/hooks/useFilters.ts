import { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

export const useFilters = (initialCategory: string, initialSort: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortCriteria, setSortCriteria] = useState<string>(initialSort);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateQueryParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeCategory) {
      params.set('category', activeCategory);
    } else {
      params.delete('category');
    }

    if (sortCriteria) {
      params.set('sort', sortCriteria);
    } else {
      params.delete('sort');
    }

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    window.history.pushState(null, '', `${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    updateQueryParams();
  }, [activeCategory, sortCriteria, searchQuery]);

  useEffect(() => {
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const search = searchParams.get('search');
    setActiveCategory(category ? category : '');
    setSortCriteria(sort ? sort : '');
    setSearchQuery(search ? search : '');
  }, [searchParams]);

  const applyFiltersAndSorting = (productData: any[]) => {
    let filteredProducts = productData;

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === activeCategory);
    }

    // Sorting logic
    filteredProducts = filteredProducts.slice().sort((a, b) => {
      switch (sortCriteria) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'ratingAsc':
          return a.rating.rate - b.rating.rate;
        case 'ratingDesc':
          return b.rating.rate - a.rating.rate;
        case 'nameAsc':
          return a.title.localeCompare(b.title);
        case 'nameDesc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  
    filteredProducts = filteredProducts.map((product) => ({
      ...product,
      price: product.price*15836,
    }));

    return filteredProducts;
  };

  return {
    activeCategory,
    setActiveCategory,
    sortCriteria,
    setSortCriteria,
    searchQuery,
    setSearchQuery,
    applyFiltersAndSorting
  };
};
