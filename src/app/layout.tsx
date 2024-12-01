import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: '/assets/svg/logo.svg',
  title: "Shopman",
  description: "Shopman is a modern e-commerce platform offering a wide variety of products, from electronics to fashion, with seamless shopping and secure checkout experiences. Explore top deals, personalized recommendations, and fast delivery options, all in one place."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
