import type { NextApiHandler } from "next";

const handler: NextApiHandler = (_req, res) => {
  res.json({ success: true });
};

export default handler;
