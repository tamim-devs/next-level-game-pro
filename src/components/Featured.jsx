
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const API = "https://www.gamearter.com/api/v1/catalog/games";
const FEATURED_LIMIT = 6;

const Featured = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [error, setError] = useState("");

  // Firebase authentication
  useEffect(() => {
    if (!auth) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

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

  // Load 6 games from GameArter API
  useEffect(() => {
    const controller = new AbortController();

    async function loadFeaturedGames() {
      setGamesLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          limit: String(FEATURED_LIMIT),
          offset: "0",
        });

        const response = await fetch(`${API}?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load featured games.");
        }

        const data = await response.json();
        const gameList = (data.games || []).slice(0, FEATURED_LIMIT);

        const detailedGames = await Promise.all(
          gameList.map(async (game) => {
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
                genres:
                  details.genres ||
                  game.genres ||
                  [],
                categories:
                  details.categories ||
                  game.categories ||
                  [],
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
            err.message || "Something went wrong while loading games."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setGamesLoading(false);
        }
      }
    }

    loadFeaturedGames();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-white py-16 text-gray-900 transition-colors duration-300 dark:bg-[#080910] dark:text-white sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-violet-500">
              Player Favorites
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Popular <span className="text-violet-500">Games</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
              Explore six featured browser games and discover your next
              favorite adventure.
            </p>
          </div>

          <Link
            href="/game"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold transition hover:border-violet-500 hover:text-violet-500 dark:border-white/10 dark:hover:bg-white/5"
          >
            View All Games <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {gamesLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: FEATURED_LIMIT }, (_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10"
              >
                <div className="aspect-[16/10] bg-gray-200 dark:bg-white/10" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-4 rounded bg-gray-200 dark:bg-white/10" />
                  <div className="h-10 rounded-xl bg-gray-200 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!gamesLoading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-300 bg-red-50 p-6 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
          >
            {error}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ml-3 font-bold underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!gamesLoading && !error && games.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-14 text-center dark:border-white/15">
            <p className="text-4xl">🎮</p>

            <h3 className="mt-4 text-xl font-bold">
              No games available
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please check back later.
            </p>

            <Link
              href="/game"
              className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
            >
              Browse All Games
            </Link>
          </div>
        )}

        {/* Featured Game Cards */}
        {!gamesLoading && !error && games.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {games.map((game) => {
              const gameCategories = [
                ...(game.genres || []),
                ...(game.categories || []),
              ];

              const category = gameCategories[0] || "Featured";

              const description =
                game.description ||
                "Discover this browser game and start your next adventure.";

              const detailsUrl = `/game/${encodeURIComponent(game.slug)}`;

              const destination = user
                ? detailsUrl
                : `/login?redirect=${encodeURIComponent(detailsUrl)}`;

              return (
                <article
                  key={game.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition duration-300 hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-[#11121c]"
                >
                  {/* Game Image */}
                  <Link
                    href={destination}
                    aria-label={
                      user
                        ? `View ${game.name}`
                        : `Login to play ${game.name}`
                    }
                    className="relative block aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-gray-800"
                  >
                    {game.thumbnail ? (
                      <img
                        src={game.thumbnail}
                        alt={game.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">
                        🎮
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-lg border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-semibold capitalize text-white backdrop-blur-md">
                      {category}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                        Featured Game
                      </p>

                      <h3
                        title={game.name}
                        className="mt-1 truncate text-2xl font-black text-white sm:text-3xl"
                      >
                        {game.name}
                      </h3>
                    </div>
                  </Link>

                  {/* Game Details */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p
                      title={description}
                      className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-400"
                    >
                      {description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-200 pt-5 dark:border-white/10">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {authLoading
                          ? "Checking login..."
                          : user
                            ? "Ready to play"
                            : "Login required"}
                      </span>

                      {authLoading ? (
                        <span className="inline-flex shrink-0 items-center rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-bold text-gray-500 dark:bg-white/10 dark:text-gray-300">
                          Checking...
                        </span>
                      ) : (
                        <Link
                          href={destination}
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-500"
                        >
                          {user ? "Play Now" : "Login to Play"}
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;
