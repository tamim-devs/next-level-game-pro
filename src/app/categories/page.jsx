"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const categories = [
  {
    id: "action",
    name: "Action",
    description: "Fast-paced combat, thrilling missions and intense battles.",
    games: 24,
    symbol: "⚔",
    color: "from-red-500 to-orange-500",
    tags: ["Combat", "Adventure"],
  },
  {
    id: "adventure",
    name: "Adventure",
    description: "Explore mysterious worlds and discover new stories.",
    games: 18,
    symbol: "🌎",
    color: "from-emerald-500 to-teal-500",
    tags: ["Exploration", "Story"],
  },
  {
    id: "racing",
    name: "Racing",
    description: "Race at full speed and leave your rivals behind.",
    games: 16,
    symbol: "🏎",
    color: "from-blue-500 to-cyan-500",
    tags: ["Speed", "Cars"],
  },
  {
    id: "puzzle",
    name: "Puzzle",
    description: "Challenge your mind with clever puzzles and brain teasers.",
    games: 12,
    symbol: "🧩",
    color: "from-violet-500 to-purple-500",
    tags: ["Brain", "Logic"],
  },
  {
    id: "sports",
    name: "Sports",
    description: "Experience competitive sports and become a champion.",
    games: 14,
    symbol: "🏆",
    color: "from-amber-500 to-yellow-500",
    tags: ["Competition", "Skills"],
  },
  {
    id: "multiplayer",
    name: "Multiplayer",
    description: "Team up with friends and compete with players online.",
    games: 21,
    symbol: "🎮",
    color: "from-pink-500 to-rose-500",
    tags: ["Online", "Friends"],
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "Plan your moves, build your tactics and outsmart rivals.",
    games: 9,
    symbol: "♟",
    color: "from-indigo-500 to-blue-600",
    tags: ["Tactics", "Planning"],
  },
  {
    id: "arcade",
    name: "Arcade",
    description: "Enjoy classic-style games and quick challenges.",
    games: 11,
    symbol: "👾",
    color: "from-fuchsia-500 to-violet-600",
    tags: ["Classic", "Casual"],
  },
];

const CategoriesPage = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [search]);

  const totalGames = categories.reduce(
    (total, category) => total + category.games,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#080910] dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-white/10">
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
              Explore NEXPLAY
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              Find Your Next{" "}
              <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base sm:leading-8">
              From intense action battles to relaxing puzzles, explore game
              categories and discover the experience that matches your style.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-2xl font-black text-violet-600 dark:text-violet-400">
                  {categories.length}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Categories
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
                  {totalGames}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Category listings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
              Choose your genre
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Game Categories
            </h2>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Find games that match your mood and play style.
            </p>
          </div>

          <Link
            href="/game"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold transition hover:border-violet-500 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:hover:text-violet-300"
          >
            Browse All Games <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Search */}
        <div className="mt-8">
          <label htmlFor="category-search" className="sr-only">
            Search categories
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 transition focus-within:border-violet-500 dark:border-white/10 dark:bg-white/5 sm:max-w-md">
            <span aria-hidden="true" className="text-lg text-gray-400">
              ⌕
            </span>

            <input
              id="category-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search game categories..."
              className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-gray-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-lg px-2 py-1 text-xs font-bold text-violet-600 hover:bg-violet-500/10 dark:text-violet-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Cards */}
        {filteredCategories.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/game?category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-[#10111c] dark:hover:border-violet-500/60"
              >
                <div
                  className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${category.color} opacity-10 blur-2xl transition duration-300 group-hover:opacity-25`}
                />

                <div className="relative">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-3xl shadow-lg transition duration-300 group-hover:scale-110`}
                  >
                    <span aria-hidden="true">{category.symbol}</span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-extrabold">
                      {category.name}
                    </h3>

                    <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-bold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                      {category.games} games
                    </span>
                  </div>

                  <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
                    <span className="text-sm font-bold text-violet-600 transition group-hover:text-violet-500 dark:text-violet-400">
                      Explore Category
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-lg transition duration-300 group-hover:translate-x-1 group-hover:text-violet-500"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center dark:border-white/15">
            <p className="text-3xl" aria-hidden="true">
              🎮
            </p>

            <h3 className="mt-4 text-xl font-bold">No categories found</h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try a different search term.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
            >
              Show All Categories
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-700 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
              Ready to play?
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Your Next Favorite Game Awaits
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-violet-100">
              Explore the collection and find your next gaming experience.
            </p>

            <Link
              href="/game"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-violet-700 transition hover:-translate-y-0.5 hover:bg-gray-100"
            >
              Explore All Games <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;