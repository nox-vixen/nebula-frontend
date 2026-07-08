export interface NebulaSearchResult {
  id: string;
  provider: string;

  type: "movie" | "tv";

  title: string;

  overview?: string;

  poster?: string;

  backdrop?: string;

  rating?: number;

  year?: number;
}
