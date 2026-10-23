
"use client";

import React, { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Searching games:", search.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="
          group relative flex w-full items-center rounded-xl
          border border-gray-200 bg-gray-100
          transition-all duration-300
          hover:border-violet-400
          focus-within:border-violet-500
          focus-within:ring-4 focus-within:ring-violet-500/10

          dark:border-white/10 dark:bg-[#11121c]
          dark:hover:border-white/20
        "
      >
        {/* Search Icon */}
        <button
          type="submit"
          aria-label="Search games"
          className="
            flex shrink-0 items-center justify-center pl-3.5
            text-gray-500 transition hover:text-violet-500 sm:pl-4
            dark:text-gray-400 dark:hover:text-violet-400
          "
        >
          <SearchIcon size={19} />
        </button>

        {/* Search Input */}
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search games..."
          aria-label="Search games"
          autoComplete="off"
          className="
            min-w-0 flex-1 bg-transparent px-3 py-3
            text-sm text-gray-900 outline-none
            placeholder:text-gray-400
            dark:text-white dark:placeholder:text-gray-500
          "
        />

        {/* Clear Button */}
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="
              mr-2 flex h-7 w-7 shrink-0 items-center
              justify-center rounded-lg text-gray-500
              transition hover:bg-gray-200 hover:text-gray-900
              dark:text-gray-400 dark:hover:bg-white/10
              dark:hover:text-white
            "
          >
            <X size={16} />
          </button>
        )}

        {/* Keyboard Hint */}
        {!search && (
          <span
            className="
              mr-3 hidden shrink-0 rounded-md border
              border-gray-200 px-2 py-1 text-xs text-gray-400
              lg:block
              dark:border-white/10 dark:text-gray-500
            "
          >
            GAME
          </span>
        )}
      </div>
    </form>
  );
};

export default Search;
