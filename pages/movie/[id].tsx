import { GetServerSideProps } from "next";
import Header from "../../components/Header";

interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  overview: string;
  poster?: string;
  backdrop?: string;
  releaseDate?: string;
  runtime?: number;
  rating?: number;
  genres?: string[];
}

interface Props {
  movie: Movie;
}

export default function MoviePage({ movie }: Props) {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Header />

      <div
        className="h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="flex h-full items-end bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent">
          <div className="mx-auto flex w-full max-w-7xl gap-8 px-6 pb-10">
            <img
              src={movie.poster}
              alt={movie.title}
              className="hidden w-56 rounded-lg shadow-2xl md:block"
            />

            <div>
              <h1 className="text-5xl font-bold">{movie.title}</h1>

              <p className="mt-3 text-gray-300">
                ⭐ {movie.rating?.toFixed(1)} • {movie.runtime} min •{" "}
                {movie.releaseDate?.slice(0,4)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g}
                    className="rounded bg-red-600 px-3 py-1 text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-3xl text-lg text-gray-200">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://nebula-core-icht.onrender.com/api/movie/${params?.id}`
  );

  const json = await res.json();

  return {
    props: {
      movie: json.movie,
    },
  };
};
