import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.NEBULA_CORE_URL ||
  "https://nebula-core-icht.onrender.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/home`);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: "Nebula Core request failed"
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Nebula Core"
    });
  }
}
