import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NebulaSearchResult } from "../models/NebulaSearchResult";
import Skeleton from "./Skeleton";

interface Props {
  movie: NebulaSearchResult;
}

export default function Thumbnail({ movie }: Props) {
  const [loaded, setLoaded] = useState(false);

  const image = movie.backdrop || movie.poster;

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative h-28 min-w-[180px] overflow-hidden rounded-md cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        {!loaded && <Skeleton className="absolute inset-0" />}

        {image ? (
          <Image
            src={image}
            layout="fill"
            className={`object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            alt={movie.title}
            onLoadingComplete={() => setLoaded(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-center text-xs text-gray-400 p-2">
            {movie.title}
          </div>
        )}
      </div>
    </Link>
  );
}
