import { API_BASE } from "./config";

const DEFAULT_TIMEOUT = 15000;
const MAX_RETRIES = 2;

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function nebulaFetch<T = unknown>(
  path: string,
  init?: RequestInit
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, DEFAULT_TIMEOUT);

    try {
      const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(init?.headers ?? {})
        }
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(
          `Nebula API responded with ${response.status}`
        );
      }

      try {
        return await response.json();
      } catch {
        throw new Error("Nebula API returned invalid JSON.");
      }
    } catch (error) {
      clearTimeout(timeout);

      lastError = error;

      if (attempt < MAX_RETRIES) {
        await sleep(500 * (attempt + 1));
        continue;
      }
    }
  }

  if (lastError instanceof DOMException && lastError.name === "AbortError") {
    throw new Error("Nebula request timed out.");
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Unknown Nebula API error.");
}
