import { NebulaSearchResult } from "../../models/NebulaSearchResult";

const CACHE_PREFIX = "nebula-search:";
const HISTORY_KEY = "nebula-search-history";

const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const MAX_HISTORY = 10;

interface CacheEntry {
  timestamp: number;
  results: NebulaSearchResult[];
}

function cacheKey(query: string) {
  return CACHE_PREFIX + query.trim().toLowerCase();
}

export function getCachedSearch(
  query: string
): NebulaSearchResult[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(cacheKey(query));

    if (!raw) return null;

    const data: CacheEntry = JSON.parse(raw);

    if (Date.now() - data.timestamp > CACHE_TTL) {
      localStorage.removeItem(cacheKey(query));
      return null;
    }

    return data.results;
  } catch {
    return null;
  }
}

export function setCachedSearch(
  query: string,
  results: NebulaSearchResult[]
) {
  if (typeof window === "undefined") return;

  try {
    const entry: CacheEntry = {
      timestamp: Date.now(),
      results
    };

    localStorage.setItem(
      cacheKey(query),
      JSON.stringify(entry)
    );
  } catch {}
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      localStorage.getItem(HISTORY_KEY) ?? "[]"
    );
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string) {
  if (typeof window === "undefined") return;

  const normalized = query.trim();

  if (!normalized) return;

  const history = getRecentSearches()
    .filter(item => item !== normalized);

  history.unshift(normalized);

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history.slice(0, MAX_HISTORY))
  );
}
