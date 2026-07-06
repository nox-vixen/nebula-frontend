import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { NebulaSearchResult } from "../models/NebulaSearchResult";
import Skeleton from "./Skeleton";

interface Props {
  movie: NebulaSearchResult;
}

function Thumbnail({ movie }: Props) {
  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);

  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative h-28 min-w-[180px] overflow-hidden rounded-md cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      {!loaded && <Skeleton className="absolute inset-0" />}

      <Image
        src={movie.backdrop || movie.poster}
        layout="fill"
        loading="lazy"
        alt={movie.title}
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}

export default Thumbnail;
