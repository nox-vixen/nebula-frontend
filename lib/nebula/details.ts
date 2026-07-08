export async function getNebulaDetails(
  id: string,
  type: "movie" | "tv"
) {
  const response = await fetch(`/api/${type}/${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${type} details`);
  }

  return response.json();
}
