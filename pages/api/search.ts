import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.NEBULA_CORE_URL ||
  "https://nebula-core-icht.onrender.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q = "", page = "1" } = req.query;

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/search?q=${encodeURIComponent(
        String(q)
      )}&page=${page}`
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch {
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
}
