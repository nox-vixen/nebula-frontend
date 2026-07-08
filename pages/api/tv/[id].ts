import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.NEBULA_CORE_URL ||
  "https://nebula-core-icht.onrender.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `${BACKEND_URL}/api/tv/${encodeURIComponent(String(id))}`
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch {
    res.status(500).json({
      success: false,
      message: "Unable to connect to Nebula Core",
    });
  }
}
