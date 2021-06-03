import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/db";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ created: string; list: string[] }>
): Promise<void> => {
  try {
    const categories = await db.collection("categories").get();
    const categoriesData = categories.docs[0].data() as { created: string; list: string[] };
    res.status(200).json({ ...categoriesData });
  } catch (e) {
    res.status(400).end();
  }
};
