import { Suspense } from "react";
import ProductClient from "../ProductClient";
import { ProductProps } from "@/types/product";

const getData = async () => {
    const [productRes, categoryRes] = await Promise.all([
        fetch("https://fakestoreapi.com/products", {
            next: {
                revalidate: 60,
            }
        }),
        fetch("https://fakestoreapi.com/products/categories", {
            next: {
                revalidate: 60,
            }
        }),
    ]);

    const products: ProductProps[] = await productRes.json();
    const categories: string[] = await categoryRes.json();

    return { products, categories };
};

const ProductPage = async () => {
    const { products, categories } = await getData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductClient products={products} categories={categories} />
        </Suspense>
    )
};

export default ProductPage;
