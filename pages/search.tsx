import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchCard from "../components/SearchCard";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NebulaSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          "/api/search?q=" + encodeURIComponent(query)
        );
        const json = await res.json();
        setResults(json.results || []);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
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

        {!query.trim() && (
          <p className="mt-8 text-center text-gray-500">
            Start typing to search NebulaOS.
          </p>
        )}

        {loading && (
          <p className="mt-8 text-center text-gray-400 animate-pulse">
            Searching...
          </p>
        )}

        {!loading && query.trim() && (
          <p className="mt-6 text-sm text-gray-400">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
        )}

        {!loading && query.trim() && results.length === 0 && (
          <p className="mt-10 text-center text-gray-500">
            No results found.
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {results.map((movie) => (
              <SearchCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
