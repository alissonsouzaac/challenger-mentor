'use client'
import "./globals.css";
import { useEffect, useState } from "react";
import RootLayoutMobile from "./layout_mobile";
import RootLayoutDesktop from "./layout_desktop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 768);
      }
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, [])

  return (
    <>
      {isMobile ? <RootLayoutMobile>{children}</RootLayoutMobile> : <RootLayoutDesktop>{children}</RootLayoutDesktop>}
    </>
  );
}
