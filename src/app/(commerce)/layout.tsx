import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import Navbar from "@/components/Layout/Navbar";
import CustomProvider from "@/layouts/CustomProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <CustomProvider>
      <Suspense fallback={<div className="skeleton-load h-[63px] lg:h-[97px] w-full !rounded-none"></div>}>
        <Navbar />
      </Suspense>
      {children}
    </CustomProvider>
  );
}
