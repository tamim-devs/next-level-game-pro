
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const API = "https://www.gamearter.com/api/v1/catalog/games";

export default function GameDetailsPage() {
  const params = useParams();
  const slug = params?.id;

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    async function fetchGame() {
      setLoading(true);
      setError("");
      setGame(null);

      try {
        const response = await fetch(
          `${API}/${encodeURIComponent(slug)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          throw new Error("This game is no longer available.");
        }

        if (!response.ok) {
          throw new Error("Unable to load the game. Please try again.");
        }

        const data = await response.json();

        if (!data.url || !data.name) {
          throw new Error("Game information is incomplete.");
        }

        // Only allow games hosted on GameArter.
        const gameUrl = new URL(data.url);

        if (
          gameUrl.protocol !== "https:" ||
          gameUrl.hostname !== "www.gamearter.com"
        ) {
          throw new Error("This game's play URL is not supported.");
        }

        setGame(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchGame();

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 dark:bg-[#080910]">
        <p className="animate-pulse text-lg font-semibold text-violet-500">
          Loading game...
        </p>
      </main>
    );
  }

  if (error || !game) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 dark:bg-[#080910]">
        <div className="max-w-md text-center">
          <p className="text-5xl">🎮</p>
          <h1 className="mt-5 text-2xl font-black text-gray-900 dark:text-white">
            Game unavailable
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {error || "We couldn't find this game."}
          </p>
          <Link
            href="/game"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-500"
          >
            Browse Games
          </Link>
        </div>
      </main>
    );
  }

  const categories = game.genres || game.categories || [];
  const thumbnail =
    game.images?.thumbnail || game.thumbnail || "";

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-[#080910] dark:text-white">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10 lg:px-10">
        <Link
          href="/game"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition hover:text-violet-400"
        >
          <span aria-hidden="true">←</span>
          Back to Games
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  {game.name}
                </h1>

                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-bold capitalize text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {game.developer && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {game.developer}
                </p>
              )}
            </div>

            {/* Actual Game */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-xl dark:border-white/10">
              <iframe
                key={game.slug}
                src={game.url}
                title={game.name}
                className="block aspect-[4/3] w-full border-0 sm:aspect-video"
                allow="fullscreen; autoplay; gamepad"
                allowFullScreen
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              The game runs on GameArter. Some games may require keyboard
              controls or a compatible browser.
            </p>

            {game.controls && (
              <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5">
                <h2 className="text-lg font-bold">Game Controls</h2>

                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {game.controls.replace(/\*/g, "")}
                </pre>
              </section>
            )}

            <section className="mt-8">
              <h2 className="text-xl font-black">About This Game</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300">
                {game.description || "No description is available for this game."}
              </p>
            </section>
          </div>

          <aside className="space-y-5">
            {thumbnail && (
              <img
                src={thumbnail}
                alt={game.name}
                className="w-full rounded-2xl border border-gray-200 object-cover dark:border-white/10"
              />
            )}

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-[#11121c]">
              <h2 className="text-lg font-bold">Game Information</h2>

              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">
                    Category
                  </dt>
                  <dd className="mt-1 font-semibold capitalize">
                    {categories.join(", ") || "General"}
                  </dd>
                </div>

                <div>
                  <dt className="text-gray-500 dark:text-gray-400">
                    Platform
                  </dt>
                  <dd className="mt-1 font-semibold">
                    {game.platforms?.mobile
                      ? "Mobile and Desktop"
                      : "Desktop"}
                  </dd>
                </div>

                {game.min_age != null && (
                  <div>
                    <dt className="text-gray-500 dark:text-gray-400">
                      Recommended Age
                    </dt>
                    <dd className="mt-1 font-semibold">
                      {game.min_age}+
                    </dd>
                  </div>
                )}
              </dl>

              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center rounded-xl border border-violet-500 px-4 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-500/10 dark:text-violet-300"
              >
                Open Game Separately ↗
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
