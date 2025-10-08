'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardLayout from "./component/layout";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Pages where layout should NOT appear
  const noLayoutPages = ["/login", "/signup"];

  const shouldRenderLayout = !noLayoutPages.includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {shouldRenderLayout ? <DashboardLayout>{children}</DashboardLayout> : children}
      </body>
    </html>
  );
}
