import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}&api_key=${API_KEY}`);
  return res.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [
      trending,
      originals,
      topRated,
      action,
      comedy,
      horror,
      romance,
      documentaries,
    ] = await Promise.all([
      get("/trending/all/week?language=en-US"),
      get("/discover/movie?with_networks=213"),
      get("/movie/top_rated?language=en-US"),
      get("/discover/movie?language=en-US&with_genres=28"),
      get("/discover/movie?language=en-US&with_genres=35"),
      get("/discover/movie?language=en-US&with_genres=27"),
      get("/discover/movie?language=en-US&with_genres=10749"),
      get("/discover/movie?language=en-US&with_genres=99"),
    ]);

    res.status(200).json({
  featured: originals.results,
  trending: trending.results,
  topRated: topRated.results,
  action: action.results,
  comedy: comedy.results,
  horror: horror.results,
  romance: romance.results,
  documentaries: documentaries.results,
});

  } catch (err) {
    res.status(500).json({
      error: "Failed to load provider",
    });
  }
}
