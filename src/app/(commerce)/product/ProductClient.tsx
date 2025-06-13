'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// @Hooks
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

type Props = {
    products: ProductProps[];
    categories: string[];
};

const ProductClient = ({ products, categories }: Props) => {
    const searchParams = useSearchParams();

    const {
        activeCategory,
        setActiveCategory,
        sortCriteria,
        setSortCriteria,
        applyFiltersAndSorting,
        searchQuery,
        setSearchQuery,
    } = useFilters(
        searchParams.get("category") ?? "",
        searchParams.get("sort") ?? ""
    );

    const filteredAndSortedProducts = applyFiltersAndSorting(
        products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <main className="container pb-10">
            <div className="mt-10">
                <div className="w-full flex flex-row justify-between items-center">
                    {/* Category Filter (desktop) */}
                    <div className="lg:flex flex-row gap-4 items-center hidden">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() =>
                                    setActiveCategory(category === activeCategory ? "" : category)
                                }
                                className={`px-4 py-2 text-xl rounded-full ${activeCategory === category
                                        ? "bg-gray-500 text-white"
                                        : "bg-white text-gray-500"
                                    } border-2 border-gray-500 hover:scale-110 transition-all duration-150`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Filter */}
                    <div className="block lg:hidden">
                        <Select
                            onSelect={setActiveCategory}
                            options={arrayToObject(categories)}
                            value={activeCategory}
                            label="Filter"
                        />
                    </div>

                    {/* Sorting */}
                    <Select
                        onSelect={setSortCriteria}
                        options={sortOption}
                        value={sortCriteria}
                        label="Sort"
                    />
                </div>

                {/* Searchbar */}
                <div className="lg:hidden mt-5 w-full flex items-end justify-end">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Searchbar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search product..."
                        />
                    </Suspense>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10 mt-10 lg:mt-20">
                    {filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            No products found.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductClient;
