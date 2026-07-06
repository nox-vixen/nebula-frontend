import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

interface Props {
  movie: NebulaSearchResult;
}

export default function SearchCard({ movie }: Props) {
  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
      className="cursor-pointer overflow-hidden rounded-lg bg-[#1b1b1b] transition duration-300 hover:scale-105 hover:bg-[#242424]"
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={movie.poster || movie.backdrop}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="truncate font-semibold">{movie.title}</h3>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>{movie.year}</span>
          <span>⭐ {movie.rating.toFixed(1)}</span>
        </div>

        <span className="mt-2 inline-block rounded bg-red-600 px-2 py-1 text-xs uppercase">
          {movie.type}
        </span>
      </div>
    </div>
  );
}
