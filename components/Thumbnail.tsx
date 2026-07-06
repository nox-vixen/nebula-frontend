import Image from "next/image";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { NebulaSearchResult } from "../models/NebulaSearchResult";

interface Props {
  movie: NebulaSearchResult;
}

function Thumbnail({ movie }: Props) {
  const [, setShowModal] = useRecoilState(modalState);
  const [, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={movie.backdrop || movie.poster}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt={movie.title}
      />
    </div>
  );
}

export default Thumbnail;
