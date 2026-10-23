"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "All Games", href: "/game" },
    { label: "Categories", href: "/categories" },
    { label: "My Profile", href: "/profile" },
  ];

  const categories = [
    { label: "Action Games", href: "/game?category=Action" },
    { label: "Adventure Games", href: "/game?category=Adventure" },
    { label: "Racing Games", href: "/game?category=Racing" },
    { label: "Puzzle Games", href: "/game?category=Puzzle" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gray-50 text-gray-700 transition-colors duration-300 dark:border-white/10 dark:bg-[#080910] dark:text-gray-300">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:py-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="NEXPLAY Home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-lg font-black text-white shadow-lg shadow-violet-600/25">
                N
              </span>

              <span className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">
                NEX<span className="text-violet-500">PLAY</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
              Discover exciting games, explore new worlds, and find your next
              favorite adventure. Your next level starts here.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold transition hover:border-violet-500 hover:bg-violet-600 hover:text-white dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-500"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-900 dark:text-white">
              Game Categories
            </h3>

            <ul className="mt-5 space-y-4">
              {categories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-600 transition hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-300"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-900 dark:text-white">
              Join The Adventure
            </h3>

            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Ready to discover your next favorite game? Explore our collection
              and start your next adventure.
            </p>

            <Link
              href="/signup"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              Get Started <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-gray-200 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-white/10">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} NEXPLAY. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Built for gamers, powered by passion.
          </p>

          <div className="flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <Link href="/privacy" className="transition hover:text-violet-500">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-violet-500">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Back To Top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-violet-600 text-xl font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-1 hover:bg-violet-500"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;