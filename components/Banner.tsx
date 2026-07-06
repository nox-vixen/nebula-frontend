import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { NebulaSearchResult } from "../models/NebulaSearchResult";
import Skeleton from "./Skeleton";

interface Props {
  featured: NebulaSearchResult[];
}

function Banner({ featured }: Props) {
  const [movie, setMovie] = useState<NebulaSearchResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    if (featured.length > 0) {
      setMovie(featured[Math.floor(Math.random() * featured.length)]);
      setLoaded(false);
    }
  }, [featured]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen overflow-hidden">
        {!loaded && <Skeleton className="absolute inset-0" />}

        {movie && (
          <Image
            src={movie.backdrop || movie.poster}
            layout="fill"
            objectFit="cover"
            alt={movie.title}
            className={`transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setLoaded(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title}
      </h1>

      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>

        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            if (!movie) return;
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info{" "}
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
