
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const API = "https://www.gamearter.com/api/v1/catalog/games";
const PAGE_SIZE = 12;

const categories = [
  { label: "All Games", value: "" },
  { label: "Action", value: "action" },
  { label: "Adventure", value: "adventure" },
  { label: "Racing", value: "racing" },
  { label: "Driving", value: "driving" },
  { label: "Puzzle", value: "puzzle" },
  { label: "Logic", value: "logic" },
  { label: "Casual", value: "casual" },
  { label: "Sports", value: "sports" },
  { label: "Strategy", value: "strategy" },
  { label: "Multiplayer", value: "multiplayer" },
];

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Firebase authentication state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Check whether the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      },
      () => {
        setUser(null);
        setAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Load games from API
  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          limit: String(PAGE_SIZE),
          offset: String((page - 1) * PAGE_SIZE),
        });

        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        }

        if (activeCategory) {
          params.set("genre", activeCategory);
        }

        const response = await fetch(`${API}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load games. Please try again.");
        }

        const data = await response.json();
        const list = data.games ?? [];

        setTotal(data.total ?? 0);

        const detailedGames = await Promise.all(
          list.map(async (game) => {
            try {
              const detailResponse = await fetch(
                `${API}/${encodeURIComponent(game.slug)}`,
                { signal: controller.signal }
              );

              if (!detailResponse.ok) {
                return game;
              }

              const details = await detailResponse.json();

              return {
                ...game,
                ...details,
                thumbnail:
                  details.images?.thumbnail ||
                  details.thumbnail ||
                  game.thumbnail,
                genres: details.genres || game.genres || [],
                categories:
                  details.categories || game.categories || [],
              };
            } catch (err) {
              if (err.name === "AbortError") {
                throw err;
              }

              return game;
            }
          })
        );

        setGames(detailedGames);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message || "Something went wrong. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadGames();

    return () => controller.abort();
  }, [page, debouncedSearch, activeCategory, retryCount]);

  // Pagination numbers
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));

    return Array.from(
      { length: Math.min(5, totalPages) },
      (_, index) => start + index
    );
  }, [page, totalPages]);

  function changeCategory(value) {
    setActiveCategory(value);
    setPage(1);
  }

  function resetFilters() {
    setSearch("");
    setDebouncedSearch("");
    setActiveCategory("");
    setPage(1);
  }

  function goToPage(number) {
    setPage(number);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-[#080910] dark:text-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-500">
            NEXPLAY Gaming Collection
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Explore <span className="text-violet-500">Games</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
            Discover browser games, explore different categories and
            play your favorite games.
          </p>

          <div className="mt-7 inline-flex rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 dark:border-white/10 dark:bg-white/5">
            <span className="text-xl font-black">
              {total.toLocaleString()}
            </span>

            <span className="ml-2 self-center text-sm text-gray-500 dark:text-gray-400">
              Games available
            </span>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search games..."
            aria-label="Search games"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-[#11121c] md:max-w-md"
          />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {Math.max(totalPages, 1)}
          </p>
        </div>

        {/* Categories */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category.value || "all"}
              type="button"
              onClick={() => changeCategory(category.value)}
              aria-pressed={activeCategory === category.value}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeCategory === category.value
                  ? "bg-violet-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Section Heading */}
        <div className="mb-6 mt-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            {categories.find(
              (item) => item.value === activeCategory
            )?.label || "All Games"}
          </h2>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {total.toLocaleString()} results
          </span>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
          >
            {error}

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="ml-3 font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }, (_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10"
              >
                <div className="aspect-[4/3] bg-gray-200 dark:bg-white/10" />

                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-4 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : !error && games.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center dark:border-white/15">
            <p className="text-4xl">🎮</p>

            <h3 className="mt-4 text-xl font-bold">
              No games found
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          !error && (
            <>
              {/* Game Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {games.map((game) => {
                  const gameCategories = [
                    ...(game.genres || []),
                    ...(game.categories || []),
                  ];

                  const category = gameCategories[0] || "Game";

                  const description =
                    game.description ||
                    "Discover this browser game on NEXPLAY.";

                  const detailsUrl = `/game/${encodeURIComponent(
                    game.slug
                  )}`;

                  // Logged-in users can open details.
                  // Logged-out users go to the login page.
                  const destination = user ? detailsUrl : "/login";

                  return (
                    <article
                      key={game.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-xl dark:border-white/10 dark:bg-[#11121c]"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={destination}
                        aria-label={
                          user
                            ? `View ${game.name} details`
                            : `Login to view ${game.name}`
                        }
                        className="relative block aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800"
                      >
                        {game.thumbnail ? (
                          <img
                            src={game.thumbnail}
                            alt={game.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl">
                            🎮
                          </div>
                        )}

                        <span className="absolute left-3 top-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold capitalize text-white">
                          {category}
                        </span>
                      </Link>

                      {/* Card Content */}
                      <div className="flex flex-1 flex-col p-4">
                        <h3
                          className="truncate text-lg font-bold transition group-hover:text-violet-500"
                          title={game.name}
                        >
                          {game.name}
                        </h3>

                        {/* Description: maximum 2 lines */}
                        <p
                          className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-400"
                          title={description}
                        >
                          {description}
                        </p>

                        {/* Footer */}
                        <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-200 pt-4 dark:border-white/10">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {game.platforms?.mobile
                              ? "Mobile + Desktop"
                              : "Desktop"}
                          </span>

                          {/* Auth-based Button */}
                          {authLoading ? (
                            <button
                              type="button"
                              disabled
                              className="shrink-0 cursor-wait rounded-lg bg-gray-400 px-4 py-2.5 text-sm font-bold text-white"
                            >
                              Checking...
                            </button>
                          ) : (
                            <Link
                              href={destination}
                              className="shrink-0 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                            >
                              {user ? "View Details" : "Login"}
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Game pagination"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => goToPage(Math.max(1, page - 1))}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:border-violet-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10"
                  >
                    Previous
                  </button>

                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      type="button"
                      aria-current={
                        page === number ? "page" : undefined
                      }
                      onClick={() => goToPage(number)}
                      className={`min-w-10 rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                        page === number
                          ? "bg-violet-600 text-white"
                          : "border border-gray-200 hover:border-violet-500 dark:border-white/10"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() =>
                      goToPage(Math.min(totalPages, page + 1))
                    }
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:border-violet-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )
        )}
      </section>
    </main>
  );
}
