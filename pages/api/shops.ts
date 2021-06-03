import { NextApiRequest, NextApiResponse } from "next";
import { TShop } from "../../types";
import db from "../../utils/db";

export default async (req: NextApiRequest, res: NextApiResponse<TShop[]>): Promise<void> => {
  try {
    const shops = await db.collection("shops").orderBy("created").get();
    const shopsData = shops.docs.map(
      (entry) =>
        ({
          id: entry.id,
          ...entry.data(),
        } as TShop)
    );
    res.status(200).json([...shopsData]);
  } catch (e) {
    res.status(400).end();
  }
};
