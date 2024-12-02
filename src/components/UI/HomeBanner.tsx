'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { useFetch } from '@/hooks/init'
import { ProductProps } from '@/types/product'
import Link from 'next/link'

const HomeBanner = () => {
  const { data: productData, isLoading } = useFetch('/products', 'promo-product');

  const filteredProducts = productData?.filter((product: { rating: { rate: number } }) => product.rating.rate > 4.6);

  return (
    <>
      {!isLoading ?
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[Autoplay]}
          className="md:absolute z-10 -right-0 md:top-0 bottom-0"
        >
          {filteredProducts?.map((products: ProductProps) => (
            <SwiperSlide key={`banner-${products.id}`}>
              <header className="relative w-full bg-gray-bg h-auto md:h-72 rounded-lg p-3 md:p-10 flex flex-col-reverse md:flex-row items-center md:items-start gap-4 justify-between">
                <div className="flex flex-col justify-start md:justify-center h-full gap-3 md:gap-10">
                  <h2 className="text-primary font-bold text-2xl md:text-5xl md:max-w-[600px] z-40">Grab Up to 5% Off On Top Rating Products </h2>
                  <Link href={`/product/${products.id}`} className="px-4 py-2 bg-primary w-fit text-white rounded-full">Buy Now</Li>
                </div>
                <div className='md:absolute z-10 right-12 bottom-4 w-[150px] md:w-[250px] h-[150px] md:h-[250px] aspect-square bg-gray-bg flex justify-end'>
                  <Image src={products.image} width={290} height={290} alt="Product-Headphones" className="h-full w-auto mix-blend-multiply contrast-100 opacity-90" />
                </div>
              </header>
            </SwiperSlide>
          ))}
        </Swiper >
        :
        <div className='h-[306px] md:h-72 w-full skeleton-load'></div>
      }
    </>
  )
}

export default HomeBanner
