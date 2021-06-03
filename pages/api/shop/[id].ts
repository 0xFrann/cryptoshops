import { NextApiRequest, NextApiResponse } from "next";
import { TShop } from "../../../types";
import db from "../../../utils/db";

interface IShopRequest extends NextApiRequest {
  query: {
    id: string;
  };
  body: TShop;
}

export default async (req: IShopRequest, res: NextApiResponse): Promise<void> => {
  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      await db
        .collection("shops")
        .doc(id)
        .update({
          ...req.body,
          updated: new Date().toISOString(),
        });
      res.status(200).json({ message: "Shop modified" });
    } else if (req.method === "GET") {
      const doc = await db.collection("shops").doc(id).get();
      if (!doc.exists) {
        res.status(404).json({ message: "Shop doesn't exists" });
      } else {
        res.status(200).json({ id: doc.id, ...doc.data() });
      }
    } else if (req.method === "DELETE") {
      await db.collection("shops").doc(id).delete();
      res.status(200).json({ message: "Shop deleted" });
    }
  } catch (e) {
    res.status(400).end();
  }
};
