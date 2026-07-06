import { useEffect, useState } from "react";
import Header from "../components/Header";
import Thumbnail from "../components/Thumbnail";
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
          placeholder="Search movies..."
          className="w-full rounded bg-[#222] p-4 text-lg outline-none"
        />

        {loading && (
          <p className="mt-6 text-gray-400">Searching...</p>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {results.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
