'use client';

import Image from 'next/image';
import Searchbar from '../UI/Searchbar';
import { IoCartOutline } from 'react-icons/io5';
import { MdPerson } from 'react-icons/md';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useFilters } from '@/hooks/useFilters';
import { Suspense } from 'react';

const Navbar = () => {
  const searchParams = useSearchParams();
  const { state } = useCart();
  const { token, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useFilters(
    searchParams.get("category") as string, searchParams.get("sort") as string
  );

  return (
    <nav className="sticky z-50 right-0 left-0 top-0 bg-white/50 backdrop-blur-xl">
      <div className="container py-3 flex flex-row justify-between gap-4 items-center">
        <Link href={'/product'} className="flex flex-row items-center text-primary text-lg font-bold h-[32px] lg:h-[73px]">
          <Image src={'/assets/svg/logo.svg'} width={60} height={60} alt="logo" className='w-9 lg:w-auto'/>
          <span >Shopman</span>
        </Link>

        <div className="flex flex-row items-center gap-3 lg:gap-5">
          <div className='hidden lg:block'>
            <Searchbar value={searchQuery} onChange={setSearchQuery} placeholder='Search product...' />
          </div>
          {!!token ? (
            <>
              <Link
                href={'/cart'}
                className="relative flex flex-row items-center gap-1 text-sm text-gray-500 hover:bg-gray-200 rounded-full p-1"
              >
                <IoCartOutline className="text-3xl" />
                {
                  state.items.length > 0 &&
                  <div className="absolute right-0 top-0 bg-red-600 text-white rounded-full w-4 h-4 aspect-square flex items-center justify-center text-xs">
                    {state.items.length}
                  </div>
                }
              </Link>
              <button
                onClick={logout}
                className="hover:bg-red-500 hover:text-white w-[90px] text-center py-2 text-red-400 text-sm font-semibold bg-transparent rounded-full border-2 border-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={'/signup'} className="hover:opacity-90 w-[90px] text-center py-2 text-primary text-sm font-semibold bg-transparent rounded-full border-2 border-primary">
                Sign Up
              </Link>
              <Link href={'/login'} className="hover:opacity-90 w-[90px] text-center py-2 text-white text-sm bg-primary rounded-full">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
