'use client';
import React from 'react';
import { useFetch } from '@/hooks/init';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import StarRating from '@/components/UI/StarRating';
import { formatPrice } from '@/utils/helpers/formatPrice';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductDetail = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  const { data: product, isLoading } = useFetch(`/products/${slug}`, `product-${slug}`);
  const { token } = useAuth();
  const { state, dispatch } = useCart();
  const productInCart = slug && !isNaN(parseInt(slug, 10))
    ? state.items.find((item) => item.id === parseInt(slug, 10))
    : undefined;

  const handleIncrement = (id: number) => {

    if (productInCart) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: productInCart.quantity + 1 } });
    } else {
      const priceInCart = product.price * 15836;
      dispatch({ type: "ADD_TO_CART", payload: { ...product, price: priceInCart, quantity: 1 } });
      toast.success("Product added to cart!");
    }
  };

  const handleDecrement = (id: number) => {
    const product = state.items.find((item) => item.id === id);
    if (product && product.quantity > 1) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: product.quantity - 1 } });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
    }
  };

  return (
    <main className="container mx-auto px-4 lg:px-16 pt-10 pb-20 flex items-center justify-center lg:h-[80vh]">
      {!isLoading ?
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
          <div className="w-full lg:w-[300px] aspect-square flex items-center justify-center bg-[#F5F6F6] p-5 rounded-xl">
            <Image src={product.image} width={282} height={282} alt={product.title} className="scale-95 h-full w-auto mix-blend-multiply contrast-100 transition-all duration-300" />
          </div>
          <div className="flex-1 w-full flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-4">{formatPrice(product.price * 15836)}</p>
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating.rate} />
              <span className="ml-2 text-sm text-gray-500">({product.rating.count} reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            {token &&
              <div className="flex flex-row items-center gap-1 w-fit px-1 text-sm">
                <button onClick={() => handleDecrement(product.id)} className='border border-gray-500 p-2 rounded-full'>
                  <FaMinus />
                </button>
                <div className="w-20 text-center text-lg border rounded-full border-gray-500">{productInCart ? productInCart.quantity : 0}</div>
                <button onClick={() => handleIncrement(product.id)} className='border border-gray-500 p-2 rounded-full'>
                  <FaPlus />
                </button>
              </div>
            }
          </div>
        </div>
        :
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20 w-full">
          <div className='w-full lg:w-[300px] aspect-square skeleton-load'></div>
          <div className="flex-1 w-full flex flex-col">
            <div className="h-8 w-1/2 skeleton-load font-bold mb-4"></div>
            <div className="h-6 lg:h-7 w-1/5 skeleton-load mb-4"></div>
            <div className="h-5 skeleton-load w-1/4 mb-4">
            </div>
            <div className='flex flex-col gap-2'>
              <div className='h-5 skeleton-load w-full'></div>
              <div className='h-5 skeleton-load w-full'></div>
              <div className='h-5 skeleton-load w-full'></div>
              <div className='h-5 skeleton-load w-1/2'></div>
            </div>
            </div>
        </div>
      }
    </main>
  );
};

export default ProductDetail;
