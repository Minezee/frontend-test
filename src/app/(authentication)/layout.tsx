import type { Metadata } from "next";
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
      {children}
    </CustomProvider>
  );
}
