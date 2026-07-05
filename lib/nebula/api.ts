import { API_BASE } from "./config"

export async function nebulaFetch(path: string) {
  const response = await fetch(`${API_BASE}${path}`)

  if (!response.ok) {
    throw new Error(`Nebula API Error: ${response.status}`)
  }

  return response.json()
}
