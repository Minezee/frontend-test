'use client'
import React, { ReactNode } from 'react';

// @Context
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// @Library
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const CustomProvider: React.FC<CustomProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          {children}
          <ToastContainer
            position='bottom-right'
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            theme="colored"
            hideProgressBar={true}
            closeButton={false}
            limit={1}
            stacked={false}
            autoClose={2000}
          />
        </CartProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default CustomProvider;
