
"use client";

import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#080910] dark:text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />

      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-24">
        {/* Left Content */}
        <div className="z-10 text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-300">
            <span aria-hidden="true">✦</span>
            Your Next Gaming Adventure Starts Here
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            LEVEL UP
            <br />
            YOUR{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              GAME
            </span>
            <span className="text-violet-500">.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base sm:leading-8 lg:mx-0">
            Discover exciting games, explore new worlds, and find your next
            favorite adventure. Your ultimate gaming destination starts here.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/game"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:bg-violet-500"
            >
              <span aria-hidden="true">▶</span>
              Play Now
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-bold transition hover:border-violet-500 hover:text-violet-600 dark:border-white/15 dark:bg-white/5 dark:hover:text-violet-300"
            >
              <span aria-hidden="true">🎮</span>
              Explore Games
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex items-center justify-center gap-6 sm:gap-10 lg:justify-start">
            <div>
              <p className="text-2xl font-black sm:text-3xl">8+</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                Games to Explore
              </p>
            </div>

            <div className="h-10 w-px bg-gray-300 dark:bg-white/15" />

            <div>
              <p className="text-2xl font-black sm:text-3xl">24/7</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                Gaming Fun
              </p>
            </div>

            <div className="h-10 w-px bg-gray-300 dark:bg-white/15" />

            <div>
              <p className="text-2xl font-black sm:text-3xl">Free</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                To Get Started
              </p>
            </div>
          </div>
        </div>

        {/* Right Gaming Visual */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute inset-5 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-violet-100 via-white to-cyan-50 p-5 shadow-2xl shadow-violet-500/10 dark:border-white/10 dark:from-[#171329] dark:via-[#10111c] dark:to-[#091b25] sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3">
              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold tracking-wider text-violet-600 dark:text-violet-300">
                FEATURED EXPERIENCE
              </span>

              <span className="flex shrink-0 items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                READY TO PLAY
              </span>
            </div>

            <div className="relative flex aspect-[4/3] items-center justify-center">
              <div className="absolute h-44 w-44 rounded-full border border-violet-500/20 sm:h-56 sm:w-56" />

              <div className="absolute h-32 w-32 rounded-full border border-cyan-500/30 sm:h-44 sm:w-44" />

              <div className="relative flex h-32 w-32 -rotate-6 items-center justify-center rounded-[2rem] border border-violet-400/40 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-6xl text-white shadow-2xl shadow-violet-600/40 sm:h-44 sm:w-44 sm:rounded-[2.5rem] sm:text-8xl">
                🎮
              </div>

              <div className="absolute left-2 top-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white/90 text-2xl shadow-xl dark:border-white/10 dark:bg-[#181927]/90 sm:left-6 sm:top-12 sm:h-16 sm:w-16">
                ▶
              </div>

              <div className="absolute bottom-8 right-2 rounded-2xl border border-gray-200 bg-white/90 px-4 py-3 shadow-xl dark:border-white/10 dark:bg-[#181927]/90 sm:bottom-10 sm:right-6">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  GAMING MODE
                </p>
                <p className="mt-1 font-bold text-violet-600 dark:text-violet-300">
                  UNLIMITED
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-3 border-t border-gray-200 pt-5 dark:border-white/10">
              <div>
                <p className="text-lg font-black sm:text-xl">
                  Ready, Player One?
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Your next adventure awaits.
                </p>
              </div>

              <Link
                href="/game"
                aria-label="Browse games"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-xl text-white transition hover:bg-violet-500"
              >
                →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
