'use client'
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// @Hooks
import { useFetch } from "@/hooks/init";
import { useFilters } from "@/hooks/useFilters";

// @Interface
import { ProductProps } from "@/types/product";

// @Components
import ProductCard from "@/components/UI/ProductCard";
import Select from "@/components/UI/Select";
import Searchbar from "@/components/UI/Searchbar";
import SkeletonCard from "@/components/UI/SkeletonCard";

// @Data
import { sortOption } from "@/utils/data/sortOption";

// @Helpers
import { arrayToObject } from "@/utils/helpers/arrayToObject";

const Product = () => {
  const searchParams = useSearchParams();
  const { data: productData, isLoading, isError } = useFetch('/products', 'products');
  const { data: categoryData, isLoading: categoryLoad, isError: categoryErr } = useFetch('/products/categories', 'categories');

  const { activeCategory, setActiveCategory, sortCriteria, setSortCriteria, applyFiltersAndSorting, searchQuery, setSearchQuery } = useFilters(
    searchParams.get("category") as string, searchParams.get("sort") as string
  );

  const filteredAndSortedProducts = applyFiltersAndSorting(productData || []);

  return (
    <main className="container pb-10">
      {/* @Banner */}
      <header className="relative w-full bg-gray-bg h-auto md:h-72 rounded-lg p-3 md:p-10 flex flex-col-reverse md:flex-row items-center md:items-start justify-between">
        <div className="flex flex-col justify-start md:justify-center h-full gap-3 md:gap-10">
          <h2 className="text-primary font-bold text-2xl md:text-5xl md:max-w-[600px] z-40">Grab Up to 50% Off On Selected Headphone </h2>
          <button className="px-4 py-2 bg-primary w-fit text-white rounded-full">Buy Now</button>
        </div>
        <Image src={"/assets/images/headphone.png"} width={290} height={290} alt="Product-Headphones" className="md:absolute z-10 -right-0 md:top-0 bottom-0 rotate-[15deg] opacity-80 w-[150px] md:w-[290px]" />
      </header>

      <div className="mt-10">
        <div className="w-full flex flex-row justify-between items-center">
          {/* @Category */}
          <div className="lg:flex flex-row gap-4 items-center hidden">
            {!categoryLoad ?
              categoryData?.map((category: string) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category === activeCategory ? '' : category)}
                  className={`px-4 py-2 text-xl rounded-full ${activeCategory === category ? "bg-gray-500 text-white" : "bg-white text-gray-500"} border-2 border-gray-500 hover:scale-110 transition-all duration-150`}
                >
                  {category}
                </button>
              ))
              :
              Array.from({ length: 4 }).map(() => (
                <div className="skeleton-load !rounded-full h-11 w-[180px]">
                </div>
              ))
            }
          </div>

          {/* @Mobile Filter */}
          <div className="block lg:hidden">
            <Select onSelect={setActiveCategory} options={arrayToObject(categoryData)} value={activeCategory} label="Filter" />
          </div>

          {/* @Sorting */}
          <Select onSelect={setSortCriteria} options={sortOption} value={sortCriteria} label="Sort" />
        </div>

        {/* @List Product */}

        <div className="lg:hidden mt-5 w-full flex items-end justify-end">
          <Suspense fallback={<div>Loading...</div>}>
            <Searchbar value={searchQuery} onChange={setSearchQuery} placeholder='Search product...' />
          </Suspense>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10 mt-10 lg:mt-20">
          {!isLoading ?
            filteredAndSortedProducts?.map((product: ProductProps) => (
              <ProductCard key={product.id} product={product} />
            ))
            :
            Array.from({ length: 10 }).map(() => (
              <SkeletonCard />
            ))
          }
        </div>
      </div>
    </main>
  );
};

const ProductPage = () => {
  return (
    <Suspense fallback={<div className="h-[300vh]"></div>}>
      <Product />
    </Suspense>
  )
}

export default ProductPage;
