import type { NextApiRequest, NextApiResponse } from "next";

const BACKEND_URL =
  process.env.NEBULA_CORE_URL ||
  "https://nebula-core-icht.onrender.com";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/debug/cluster`
    );

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to reach Nebula Core cluster status."
    });
  }
}
