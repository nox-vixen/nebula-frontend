import Link from "next/link";
import Image from "next/image";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

interface Props {
  movie: NebulaSearchResult;
}

export default function SearchCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="cursor-pointer overflow-hidden rounded-lg transition hover:scale-105">
        <Image
          src={movie.poster ?? movie.backdrop ?? "/placeholder.png"}
          alt={movie.title}
          width={500}
          height={750}
          className="h-auto w-full object-cover"
        />
      </div>
    </Link>
  );
}
