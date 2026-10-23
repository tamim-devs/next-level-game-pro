
"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function LayoutContentInner({ children }) {
  const pathname = usePathname();

  const hideNavbar = [
    "/login",
    "/signup",
    "/register",
    "/forgot-password",
  ];

  const shouldHideLayout = hideNavbar.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      {children}

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default function LayoutContent({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-[#080910]" />
      }
    >
      <LayoutContentInner>{children}</LayoutContentInner>
    </Suspense>
  );
}
