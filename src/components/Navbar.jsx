
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Search from "@/components/Search";
import {
  Gamepad2,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const router = useRouter();

  const closeMenu = () => setMenuOpen(false);

  // Firebase login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Restore saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("nexplay-theme");
    const isDark = savedTheme !== "light";

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Toggle dark / light theme
  const toggleTheme = () => {
    const nextDarkMode = !darkMode;

    setDarkMode(nextDarkMode);
    document.documentElement.classList.toggle("dark", nextDarkMode);
    localStorage.setItem(
      "nexplay-theme",
      nextDarkMode ? "dark" : "light"
    );
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMenu();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const linkClass =
    "rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-violet-500/10 hover:text-violet-500";

  const authButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition";

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-lg backdrop-blur-xl transition-colors ${
        darkMode
          ? "border-white/10 bg-[#080910]/95 text-white shadow-black/10"
          : "border-gray-200 bg-white/95 text-gray-900 shadow-gray-200/40"
      }`}
    >
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/25">
            <Gamepad2 size={24} />
          </span>

          <span className="text-xl font-black tracking-wide sm:text-2xl">
            NEX<span className="text-violet-500">PLAY</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/" className={`${linkClass} text-violet-500`}>
            Home
          </Link>
          <Link href="/game" className={linkClass}>
            game
          </Link>
          <Link href="/categories" className={linkClass}>
            Categories
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden min-w-0 flex-1 md:block md:max-w-xs lg:max-w-sm">
          <Search />
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
              darkMode
                ? "border-white/10 hover:bg-white/10"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Auth Buttons */}
          {!authLoading &&
            (user ? (
              <button
                type="button"
                onClick={handleLogout}
                className={`${authButtonClass} bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white`}
              >
                <LogOut size={17} />
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${authButtonClass} border ${
                    darkMode
                      ? "border-white/10 hover:border-violet-500/50 hover:bg-white/5"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  href="/signup"
                  className={`${authButtonClass} bg-violet-600 text-white hover:bg-violet-500`}
                >
                  <UserPlus size={17} />
                  Sign Up
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition sm:hidden ${
            darkMode
              ? "border-white/10 hover:bg-white/10"
              : "border-gray-200 hover:bg-gray-100"
          }`}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Search */}
      <div
        className={`border-t px-4 py-3 md:hidden ${
          darkMode ? "border-white/5" : "border-gray-200"
        }`}
      >
        <Search />
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className={`border-t px-4 py-5 sm:hidden ${
            darkMode
              ? "border-white/10 bg-[#0d0e18]"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-2">
            <Link href="/" onClick={closeMenu} className={linkClass}>
              Home
            </Link>
            <Link href="/game" onClick={closeMenu} className={linkClass}>
              game
            </Link>
            <Link
              href="/categories"
              onClick={closeMenu}
              className={linkClass}
            >
              Categories
            </Link>

            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`${linkClass} flex items-center gap-3 text-left`}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
              Switch to {darkMode ? "Light" : "Dark"} Mode
            </button>

            {/* Mobile Auth Buttons */}
            {!authLoading && (
              <div
                className={`my-2 grid ${
                  user ? "grid-cols-1" : "grid-cols-2"
                } gap-3 border-t pt-4 ${
                  darkMode ? "border-white/10" : "border-gray-200"
                }`}
              >
                {user ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${authButtonClass} bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white`}
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className={`${authButtonClass} border ${
                        darkMode ? "border-white/10" : "border-gray-200"
                      }`}
                    >
                      <LogIn size={17} />
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      onClick={closeMenu}
                      className={`${authButtonClass} bg-violet-600 text-white hover:bg-violet-500`}
                    >
                      <UserPlus size={17} />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
