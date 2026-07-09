import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SearchCard from "../components/SearchCard";
import { NebulaSearchResult } from "../models/NebulaSearchResult";
import {
  getCachedSearch,
  setCachedSearch,
  addRecentSearch,
  getRecentSearches
} from "../lib/nebula/searchCache";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NebulaSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  useEffect(() => {
    controllerRef.current?.abort();

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    const cached = getCachedSearch(query);

    if (cached) {
      setResults(cached);
      setError("");
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      const controller = new AbortController();
      controllerRef.current = controller;

      const requestId = ++requestIdRef.current;

      setLoading(true);
      setError("");

      fetch("/api/search?q=" + encodeURIComponent(query), {
        signal: controller.signal,
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Search failed.");
          return res.json();
        })
        .then((json) => {
          if (requestId !== requestIdRef.current) return;

          const items = Array.isArray(json.results)
            ? json.results
            : [];

          setResults(items);
          setCachedSearch(query, items);
          addRecentSearch(query);
          setRecent(getRecentSearches());
        })
        .catch((err: any) => {
          if (err?.name === "AbortError") return;
          if (requestId !== requestIdRef.current) return;

          setResults([]);
          setError(err?.message ?? "Search failed.");
        })
        .finally(() => {
          if (requestId === requestIdRef.current) {
            setLoading(false);
          }
        });
    }, 400);

    return () => {
      clearTimeout(timer);
      controllerRef.current?.abort();
    };
  }, [query]);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-6 pt-28">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows..."
          className="w-full rounded-md bg-[#222] p-4 text-lg outline-none ring-1 ring-transparent focus:ring-red-600"
        />

        {!query.trim() && recent.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-sm text-gray-400">
              Recent Searches
            </h2>

            <div className="flex flex-wrap gap-2">
              {recent.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="rounded bg-[#2b2b2b] px-3 py-2 text-sm hover:bg-[#3a3a3a]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <p className="mt-8 animate-pulse text-center text-gray-400">
            Searching...
          </p>
        )}

        {!loading && error && (
          <p className="mt-8 text-center text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && query.trim() && (
          <p className="mt-6 text-sm text-gray-400">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
        )}

        {!loading && !error && query.trim() && results.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No results found.
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {results.map((movie) => (
              <SearchCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
