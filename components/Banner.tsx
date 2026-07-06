import { InformationCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

function Banner() {
  const [movie, setMovie] = useState<NebulaSearchResult | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/home");
      const data = await res.json();
      const list = data.netflixOriginals || data.trending || data.results || [];
      if (list.length) {
        setMovie(list[Math.floor(Math.random() * list.length)]);
      }
    }
    load();
  }, []);

  if (!movie) return null;

  return (
    <div
      className="flex h-[95vh] flex-col justify-end bg-cover bg-center"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32">
        <h1 className="text-4xl font-bold md:text-6xl">{movie.title}</h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-200 line-clamp-3">
          {movie.overview}
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            <PlayIcon className="h-6 w-6" />
            Play
          </Link>

          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded bg-gray-600/70 px-6 py-3 font-semibold text-white transition hover:bg-gray-500/70"
          >
            <InformationCircleIcon className="h-6 w-6" />
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
